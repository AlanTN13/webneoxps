const OUTCOMES = new Set(["NO_PUBLICATION", "PUBLICATION"]);
const REQUIRED_GATE_FLAGS = [
  "sourceVerified",
  "rightsVerified",
  "coverSemantic",
  "coverResponsive",
  "clientClaimsAuthorizedOrAbsent",
  "noCriticalWarnings",
];

const text = (value) => typeof value === "string" && value.trim().length > 0;
const ENGINE_RUN_ID = /^[a-z0-9][a-z0-9._-]{5,80}$/;

export class RadarV3Error extends Error {
  constructor(message, { cause, trace } = {}) {
    super(message, { cause });
    this.name = "RadarV3Error";
    this.trace = trace;
  }
}

export function validateRadarDecision(decision, article = null) {
  const errors = [];
  if (!decision || typeof decision !== "object" || Array.isArray(decision)) return ["decision debe ser un objeto JSON"];
  if (!OUTCOMES.has(decision.outcome)) return ["outcome debe ser NO_PUBLICATION o PUBLICATION"];
  if (!text(decision.engineRunId) || !ENGINE_RUN_ID.test(decision.engineRunId)) errors.push("engineRunId debe usar 6-81 caracteres seguros");

  if (decision.outcome === "NO_PUBLICATION") {
    if (!text(decision.reason)) errors.push("NO_PUBLICATION requiere reason");
    if (decision.article || decision.coverAsset) errors.push("NO_PUBLICATION no puede declarar article ni coverAsset");
    return errors;
  }

  if (!text(decision.article)) errors.push("PUBLICATION requiere article");
  if (!article || typeof article !== "object" || Array.isArray(article)) {
    errors.push("PUBLICATION requiere un artículo JSON válido");
    return errors;
  }
  if (article.generatedByEngine !== true) errors.push("PUBLICATION autónoma requiere generatedByEngine=true");
  if (!text(article.engineRunId) || article.engineRunId !== decision.engineRunId) errors.push("engineRunId de decision y article debe coincidir");

  const report = decision.gateReport;
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    errors.push("PUBLICATION requiere gateReport");
    return errors;
  }
  if (!Number.isInteger(report.engineThreshold) || report.engineThreshold < 0 || report.engineThreshold > 100) {
    errors.push("gateReport.engineThreshold debe ser entero 0-100");
  } else if (!Number.isInteger(article.engineScore) || article.engineScore < report.engineThreshold) {
    errors.push(`engineScore ${String(article.engineScore)} no supera el threshold ${report.engineThreshold}`);
  }
  for (const flag of REQUIRED_GATE_FLAGS) {
    if (report[flag] !== true) errors.push(`gateReport.${flag} debe ser true`);
  }
  if (!Array.isArray(report.criticalWarnings)) errors.push("gateReport.criticalWarnings debe ser array");
  else if (report.criticalWarnings.length > 0) errors.push("gateReport.criticalWarnings debe estar vacío");
  return errors;
}

function baseTrace(decision, article, now) {
  return {
    schemaVersion: 1,
    workflow: "radar-v3",
    engineRunId: decision.engineRunId || article?.engineRunId || null,
    outcome: decision.outcome,
    status: "RUNNING",
    reason: decision.reason || null,
    startedAt: now(),
    completedAt: null,
    article: article ? {
      slug: article.slug,
      engineScore: article.engineScore,
      engineThreshold: decision.gateReport?.engineThreshold,
      topicFingerprint: article.topicFingerprint,
      coverImage: article.coverImage,
      assetSource: article.assetSource,
      assetCredit: article.assetCredit,
    } : null,
    gateReport: decision.gateReport || null,
    github: {},
    production: {},
    rollback: { required: false, status: "NOT_REQUIRED" },
  };
}

async function recordSafely(services, trace) {
  try {
    await services.recordTrace(trace);
  } catch (error) {
    trace.traceError = error.message;
  }
}

export async function executeRadarV3({ decision, article = null, services, now = () => new Date().toISOString() }) {
  const validationErrors = validateRadarDecision(decision, article);
  const trace = baseTrace(decision, article, now);
  if (validationErrors.length > 0) {
    trace.status = "FAILED";
    trace.reason = validationErrors.join("; ");
    trace.completedAt = now();
    await recordSafely(services, trace);
    throw new RadarV3Error("La decisión no pasa el contrato de Radar V3", { trace });
  }

  if (decision.outcome === "NO_PUBLICATION") {
    trace.status = "NO_PUBLICATION";
    trace.completedAt = now();
    try {
      if (typeof services.persistNoPublication !== "function") throw new Error("NO_PUBLICATION requiere un store durable");
      trace.noPublicationStore = await services.persistNoPublication({ decision, trace });
      await services.recordTrace(trace);
      return trace;
    } catch (error) {
      trace.status = "FAILED";
      trace.reason = `No se pudo cerrar NO_PUBLICATION: ${error.message}`;
      trace.completedAt = now();
      await recordSafely(services, trace);
      throw new RadarV3Error(trace.reason, { cause: error, trace });
    }
  }

  let materialization = null;
  let commitSha = null;
  let pullRequest = null;
  let merge = null;
  try {
    const preflight = await services.preflightPublication({ decision, article });
    trace.github.branch = preflight.branch;
    if (preflight.pullRequest) trace.github.pullRequest = preflight.pullRequest;
    trace.production.baseline = preflight.productionBaseline || null;

    materialization = await services.materialize({ decision, article });
    await services.runGates({ decision, article, materialization });
    commitSha = await services.commit({ decision, article, materialization });
    trace.github.commitSha = commitSha;
    await services.push({ branch: preflight.branch, commitSha });

    pullRequest = await services.refreshPullRequest({ decision, article, branch: preflight.branch, commitSha });
    trace.github.pullRequest = pullRequest;
    await services.waitForChecks({ pullRequest, commitSha });

    merge = await services.mergePullRequest({ pullRequest, article });
    trace.github.mergeSha = merge.sha;
    trace.github.mergedAt = merge.mergedAt;

    const deployment = await services.waitForProduction({ mergeSha: merge.sha, article });
    trace.production = { ...trace.production, ...deployment };
    const verification = await services.verifyProduction({ deployment, article, mergeSha: merge.sha });
    trace.production.verification = verification;
    trace.status = "SUCCESS";
    trace.completedAt = now();
    await services.recordTrace(trace);
    return trace;
  } catch (error) {
    trace.reason = error.message;
    if (materialization && !commitSha) {
      try { await services.rollbackMaterialization(materialization); } catch (rollbackError) {
        trace.materializationRollbackError = rollbackError.message;
      }
    }
    if (merge?.sha) {
      trace.rollback.required = true;
      try {
        trace.rollback = {
          required: true,
          status: "PREPARED",
          ...(await services.prepareRollback({ mergeSha: merge.sha, article, trace })),
        };
      } catch (rollbackError) {
        trace.rollback = { required: true, status: "PREPARATION_FAILED", error: rollbackError.message };
      }
    }
    trace.status = "FAILED";
    trace.completedAt = now();
    await recordSafely(services, trace);
    throw new RadarV3Error(`Radar V3 falló: ${error.message}`, { cause: error, trace });
  }
}
