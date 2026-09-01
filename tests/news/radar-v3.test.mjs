import assert from "node:assert/strict";
import test from "node:test";
import { executeRadarV3, RadarV3Error, validateRadarDecision } from "../../scripts/radar-v3-core.mjs";

const article = {
  title: "Cómo automatizar cobranzas sin perder trazabilidad",
  slug: "automatizar-cobranzas-sin-perder-trazabilidad",
  generatedByEngine: true,
  engineRunId: "c40b81b7-6ac4-4da1-92e8-86a7a50f9dc4",
  engineScore: 92,
  topicFingerprint: "operaciones:cobranzas:automatizacion",
  coverImage: "/assets/insights/editorial/automatizar-cobranzas.png",
  ogImage: "/assets/insights/editorial/automatizar-cobranzas.png",
  assetSource: "nexops-original",
  assetCredit: "Diagrama editorial original NexOps.",
};

const publication = {
  outcome: "PUBLICATION",
  engineRunId: article.engineRunId,
  article: "./candidate.json",
  coverAsset: "./cover.png",
  publicationMode: "manual_review",
  approval: {
    type: "portal_explicit_manual_review",
    runId: article.engineRunId,
    workspaceId: "nexops",
    approvedBy: "a40b81b7-6ac4-4da1-92e8-86a7a50f9dc4",
    approvedAt: "2026-09-01T20:00:00.000Z",
    compositionDigest: "a".repeat(64),
  },
  portalCallback: {
    url: `https://portal.nexopstech.com/api/radar/runs/${article.engineRunId}/publication`,
    runId: article.engineRunId,
    compositionDigest: "a".repeat(64),
  },
  gateReport: {
    engineThreshold: 85,
    sourceVerified: true,
    rightsVerified: true,
    coverSemantic: true,
    coverResponsive: true,
    clientClaimsAuthorizedOrAbsent: true,
    noCriticalWarnings: true,
    criticalWarnings: [],
  },
};

function mockServices({ failAt } = {}) {
  const calls = [];
  const traces = [];
  const step = async (name, value) => {
    calls.push(name);
    if (failAt === name) throw new Error(`${name} falló`);
    return value;
  };
  return {
    calls,
    traces,
    services: {
      preflightPublication: () => step("preflight", { branch: `radar/${article.engineRunId}`, productionBaseline: { deploymentId: "dpl_previous", state: "READY" } }),
      materialize: () => step("materialize", { files: ["article.json", "cover.png"] }),
      runGates: () => step("gates"),
      commit: () => step("commit", "content-sha"),
      push: () => step("push"),
      refreshPullRequest: () => step("refresh-pr", { number: 49, url: "https://github.com/AlanTN13/webneoxps/pull/49", isDraft: false }),
      waitForChecks: () => step("checks", [{ name: "validate", state: "pass" }, { name: "Vercel", state: "pass" }]),
      mergePullRequest: () => step("merge", { sha: "merge-sha", mergedAt: "2026-08-23T22:00:00.000Z" }),
      waitForProduction: () => step("deploy", { deploymentId: "dpl_ready", state: "READY", target: "production" }),
      verifyProduction: () => step("verify", { articleUrl: `https://www.nexopstech.com/noticias/${article.slug}`, ogImage: `https://www.nexopstech.com${article.ogImage}` }),
      rollbackMaterialization: () => step("rollback-materialization"),
      prepareRollback: () => step("prepare-rollback", { branch: "radar/rollback-run", compareUrl: "https://github.com/AlanTN13/webneoxps/compare/main...radar%2Frollback-run?expand=1", previousDeploymentId: "dpl_previous" }),
      persistNoPublication: () => step("persist-no-publication", { reference: "private-store:no-publication/run.json", created: true }),
      recordTrace: async (trace) => {
        calls.push("trace");
        traces.push(structuredClone(trace));
      },
    },
  };
}

test("Radar V3 recorre el camino feliz hasta producción verificada", async () => {
  const mock = mockServices();
  const trace = await executeRadarV3({ decision: publication, article, services: mock.services });
  assert.equal(trace.status, "SUCCESS");
  assert.equal(trace.github.mergeSha, "merge-sha");
  assert.equal(trace.production.state, "READY");
  assert.equal(trace.production.target, "production");
  assert.equal(trace.production.verification.articleUrl, `https://www.nexopstech.com/noticias/${article.slug}`);
  assert.deepEqual(mock.calls, ["preflight", "materialize", "gates", "commit", "push", "refresh-pr", "checks", "merge", "deploy", "verify", "trace"]);
});

test("Radar V3 NO_PUBLICATION no materializa, no abre PR y no muta el repo", async () => {
  const mock = mockServices();
  const decision = { outcome: "NO_PUBLICATION", engineRunId: "radar-2026-08-23-002", reason: "No hay candidato sólido." };
  const trace = await executeRadarV3({ decision, services: mock.services });
  assert.equal(trace.status, "NO_PUBLICATION");
  assert.equal(trace.reason, decision.reason);
  assert.equal(trace.noPublicationStore.created, true);
  assert.deepEqual(mock.calls, ["persist-no-publication", "trace"]);
});

test("Radar V3 NO_PUBLICATION falla cerrado si no existe un store durable", async () => {
  const mock = mockServices();
  delete mock.services.persistNoPublication;
  const decision = { outcome: "NO_PUBLICATION", engineRunId: "radar-2026-08-23-003", reason: "No hay candidato sólido." };
  await assert.rejects(
    executeRadarV3({ decision, services: mock.services }),
    (error) => error instanceof RadarV3Error && error.trace.status === "FAILED" && error.trace.reason.includes("store durable"),
  );
  assert.deepEqual(mock.calls, ["trace"]);
});

test("Radar V3 falla cerrado si un gate técnico o editorial falla", async () => {
  const mock = mockServices({ failAt: "gates" });
  await assert.rejects(
    executeRadarV3({ decision: publication, article, services: mock.services }),
    (error) => error instanceof RadarV3Error && error.trace.status === "FAILED" && !error.trace.github.mergeSha,
  );
  assert.deepEqual(mock.calls, ["preflight", "materialize", "gates", "rollback-materialization", "trace"]);
  assert.equal(mock.traces.at(-1).rollback.status, "NOT_REQUIRED");
});

test("Radar V3 no declara éxito ante deploy fallido y prepara rollback", async () => {
  const mock = mockServices({ failAt: "deploy" });
  await assert.rejects(
    executeRadarV3({ decision: publication, article, services: mock.services }),
    (error) => error instanceof RadarV3Error && error.trace.status === "FAILED" && error.trace.rollback.status === "PREPARED",
  );
  assert.deepEqual(mock.calls, ["preflight", "materialize", "gates", "commit", "push", "refresh-pr", "checks", "merge", "deploy", "prepare-rollback", "trace"]);
  assert.equal(mock.traces.at(-1).rollback.compareUrl, "https://github.com/AlanTN13/webneoxps/compare/main...radar%2Frollback-run?expand=1");
});

test("Radar V3 exige threshold, ausencia de warnings críticos y attestations editoriales", () => {
  const errors = validateRadarDecision({
    ...publication,
    gateReport: {
      ...publication.gateReport,
      engineThreshold: 95,
      coverSemantic: false,
      criticalWarnings: ["fuente dudosa"],
    },
  }, article);
  assert.ok(errors.some((error) => error.includes("no supera el threshold")));
  assert.ok(errors.some((error) => error.includes("coverSemantic")));
  assert.ok(errors.some((error) => error.includes("criticalWarnings debe estar vacío")));
});

test("Radar V3 rechaza publicación sin la segunda aprobación explícita del Portal", () => {
  const errors = validateRadarDecision({ ...publication, approval: undefined }, article);
  assert.ok(errors.some((error) => error.includes("aprobación explícita")));
});
