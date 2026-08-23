import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { executeRadarV3, RadarV3Error } from "./radar-v3-core.mjs";
import { runAutonomousGates, runNewsDecision } from "./news-run.mjs";

const ROOT = process.cwd();
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const BRANCH = process.env.RADAR_SOURCE_BRANCH || process.env.GITHUB_REF_NAME;
const EXISTING_PR_NUMBER = process.env.RADAR_PR_NUMBER;
const SOURCE_SHA = process.env.RADAR_SOURCE_SHA;
const BASE_SHA = process.env.RADAR_BASE_SHA;
const RUN_ID = process.env.GITHUB_RUN_ID;
const RUN_URL = REPOSITORY && RUN_ID ? `https://github.com/${REPOSITORY}/actions/runs/${RUN_ID}` : null;
const TRACE_PATH = path.resolve(process.env.RADAR_TRACE_PATH || path.join(process.env.RUNNER_TEMP || ROOT, "radar-v3-result.json"));
const PRODUCTION_ORIGIN = (process.env.RADAR_PRODUCTION_ORIGIN || "https://www.nexopstech.com").replace(/\/+$/, "");
const REQUIRED_CHECKS = (process.env.RADAR_REQUIRED_CHECKS || "validate,Vercel").split(",").map((value) => value.trim()).filter(Boolean);
const CHECK_TIMEOUT_MS = Number(process.env.RADAR_CHECK_TIMEOUT_MS || 20 * 60 * 1000);
const DEPLOY_TIMEOUT_MS = Number(process.env.RADAR_DEPLOY_TIMEOUT_MS || 20 * 60 * 1000);
const POLL_INTERVAL_MS = Number(process.env.RADAR_POLL_INTERVAL_MS || 10_000);

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function command(commandName, args, { allowFailure = false, inherit = false } = {}) {
  const result = spawnSync(commandName, args, { encoding: "utf8", stdio: inherit ? "inherit" : "pipe" });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) {
    throw new Error((result.stderr || result.stdout || `${commandName} ${args.join(" ")} falló`).trim());
  }
  return result;
}

const output = (commandName, args) => command(commandName, args).stdout.trim();
const git = (args, options) => command("git", args, options);
const gitOutput = (args) => output("git", args);
const gh = (args, options) => command("gh", args, options);
const ghOutput = (args) => output("gh", args);
const ghJson = (args) => JSON.parse(ghOutput(args));

function requireEnvironment() {
  const missing = ["GITHUB_REPOSITORY", "GITHUB_RUN_ID", "GH_TOKEN", "RADAR_SOURCE_BRANCH", "RADAR_PR_NUMBER", "RADAR_SOURCE_SHA", "RADAR_BASE_SHA"].filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Faltan variables del workflow: ${missing.join(", ")}`);
}

function resolveDecisionPath(argument) {
  if (!argument || path.isAbsolute(argument) || argument.includes("..")) throw new Error("decision_path debe ser una ruta relativa segura");
  const relative = path.normalize(argument).replaceAll("\\", "/");
  if (!/^\.radar\/runs\/[a-z0-9][a-z0-9._-]{5,80}\/decision\.json$/.test(relative)) {
    throw new Error("decision_path debe usar .radar/runs/<engineRunId>/decision.json");
  }
  return { absolute: path.resolve(ROOT, relative), relative, runDirectory: path.posix.dirname(relative) };
}

async function readDecision(decisionContext) {
  const decisionStat = await fs.lstat(decisionContext.absolute);
  if (!decisionStat.isFile() || decisionStat.isSymbolicLink()) throw new Error("decision.json debe ser un archivo regular");
  const decision = JSON.parse(await fs.readFile(decisionContext.absolute, "utf8"));
  let article = null;
  if (decision.outcome === "PUBLICATION" && typeof decision.article === "string") {
    const articlePath = path.resolve(path.dirname(decisionContext.absolute), decision.article);
    const runRoot = path.resolve(ROOT, decisionContext.runDirectory);
    if (!articlePath.startsWith(`${runRoot}${path.sep}`)) throw new Error("article debe permanecer dentro del directorio de la corrida");
    const articleStat = await fs.lstat(articlePath);
    if (!articleStat.isFile() || articleStat.isSymbolicLink()) throw new Error("article debe ser un archivo regular");
    article = JSON.parse(await fs.readFile(articlePath, "utf8"));
    if (typeof decision.coverAsset === "string") {
      const coverPath = path.resolve(path.dirname(decisionContext.absolute), decision.coverAsset);
      if (!coverPath.startsWith(`${runRoot}${path.sep}`)) throw new Error("coverAsset debe permanecer dentro del directorio de la corrida");
      const coverStat = await fs.lstat(coverPath);
      if (!coverStat.isFile() || coverStat.isSymbolicLink()) throw new Error("coverAsset debe ser un archivo regular");
    }
  }
  return { decision, article };
}

async function hydrateDecisionBundle(decisionContext) {
  const compare = ghJson(["api", `repos/${REPOSITORY}/compare/${BASE_SHA}...${SOURCE_SHA}`]);
  const changedFiles = (compare.files || []).map((file) => file.filename);
  if (!changedFiles.length || changedFiles.some((file) => !file.startsWith(`${decisionContext.runDirectory}/`))) {
    throw new Error("El PR Radar sólo puede contener el bundle de decision.json de esta corrida");
  }
  const tree = ghJson(["api", `repos/${REPOSITORY}/git/trees/${SOURCE_SHA}?recursive=1`]).tree || [];
  const entries = tree.filter((entry) => entry.path.startsWith(`${decisionContext.runDirectory}/`));
  if (!entries.length || entries.some((entry) => entry.type !== "blob" || entry.mode !== "100644")) {
    throw new Error("El bundle Radar sólo admite archivos regulares");
  }
  if (entries.length > 4 || entries.reduce((total, entry) => total + Number(entry.size || 0), 0) > 20 * 1024 * 1024) {
    throw new Error("El bundle Radar excede el límite de 4 archivos o 20 MB");
  }
  const entryPaths = new Set(entries.map((entry) => entry.path));
  if (changedFiles.some((file) => !entryPaths.has(file))) throw new Error("El bundle Radar contiene eliminaciones o rutas no materializables");
  for (const entry of entries) {
    const blob = ghJson(["api", `repos/${REPOSITORY}/git/blobs/${entry.sha}`]);
    if (blob.encoding !== "base64") throw new Error(`Encoding no admitido para ${entry.path}`);
    const destination = path.resolve(ROOT, entry.path);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, Buffer.from(blob.content.replace(/\s/g, ""), "base64"));
  }
}

function assertSourceContext(decisionContext, decision) {
  if (!BRANCH?.startsWith("radar/")) throw new Error("Radar V3 sólo se ejecuta desde ramas radar/<engineRunId>");
  if (decision.engineRunId && BRANCH !== `radar/${decision.engineRunId}`) throw new Error("La rama debe coincidir con radar/<engineRunId>");
  if (gitOutput(["status", "--porcelain", "--untracked-files=no"])) throw new Error("El checkout confiable debe estar limpio");
  git(["fetch", "origin", "main"], { inherit: true });
  if (gitOutput(["rev-parse", "origin/main"]) !== BASE_SHA || gitOutput(["rev-parse", "HEAD"]) !== BASE_SHA) {
    throw new Error("La rama Radar debe partir del main vigente");
  }
}

function statusForCommit(sha) {
  return ghJson(["api", `repos/${REPOSITORY}/commits/${sha}/status`]);
}

function vercelStatusForCommit(sha) {
  const combined = statusForCommit(sha);
  return (combined.statuses || []).find((status) => status.context === "Vercel") || null;
}

function deploymentIdFromStatus(status) {
  if (!status?.target_url) return null;
  try { return new URL(status.target_url).pathname.split("/").filter(Boolean).at(-1) || null; } catch { return null; }
}

function checkMatches(name, expected) {
  return name === expected || name.endsWith(` / ${expected}`);
}

function normalizeChecks(pullRequestNumber) {
  const result = gh(["pr", "checks", String(pullRequestNumber), "--repo", REPOSITORY, "--json", "bucket,link,name,state,workflow"], { allowFailure: true });
  if (!result.stdout.trim()) return [];
  return JSON.parse(result.stdout)
    .filter((check) => !RUN_ID || !String(check.link || "").includes(`/actions/runs/${RUN_ID}`))
    .map((check) => ({ name: check.name, state: check.bucket || check.state?.toLowerCase(), url: check.link, workflow: check.workflow }));
}

function failedCheck(check) {
  return ["fail", "cancel", "failure", "error", "cancelled", "timed_out", "action_required", "stale"].includes(check.state);
}

function successfulCheck(check) {
  return ["pass", "skipping", "success", "neutral", "skipped"].includes(check.state);
}

async function waitForChecks(pullRequestNumber) {
  const deadline = Date.now() + CHECK_TIMEOUT_MS;
  let stableSuccessPolls = 0;
  while (Date.now() < deadline) {
    const checks = normalizeChecks(pullRequestNumber);
    const failed = checks.find(failedCheck);
    if (failed) throw new Error(`Check fallido: ${failed.name} (${failed.state})`);
    const requiredFound = REQUIRED_CHECKS.every((expected) => checks.some((check) => checkMatches(check.name, expected) && successfulCheck(check)));
    const allReportedFinished = checks.length > 0 && checks.every(successfulCheck);
    if (requiredFound && allReportedFinished) {
      stableSuccessPolls += 1;
      if (stableSuccessPolls >= 2) return checks;
    } else {
      stableSuccessPolls = 0;
    }
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error(`Timeout esperando checks requeridos: ${REQUIRED_CHECKS.join(", ")}`);
}

async function waitForVercelProduction(mergeSha) {
  const deadline = Date.now() + DEPLOY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const status = vercelStatusForCommit(mergeSha);
    if (status?.state === "success") {
      return {
        target: "production",
        state: "READY",
        commitSha: mergeSha,
        deploymentId: deploymentIdFromStatus(status),
        dashboardUrl: status.target_url,
      };
    }
    if (["failure", "error"].includes(status?.state)) throw new Error(`Vercel production terminó en ${status.state}`);
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error("Timeout esperando Vercel production READY");
}

function decodeHtml(value) {
  return value
    ?.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function metaContent(html, key, attribute = "property") {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const tag of tags) {
    const attributes = Object.fromEntries([...tag.matchAll(/([:\w-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), match[2]]));
    if (attributes[attribute] === key) return decodeHtml(attributes.content) || null;
  }
  return null;
}

async function verifyProductionArticle(article, mergeSha) {
  const canonical = `${PRODUCTION_ORIGIN}/noticias/${article.slug}`;
  const expectedImage = new URL(article.ogImage || article.coverImage, `${PRODUCTION_ORIGIN}/`).toString();
  const deadline = Date.now() + Math.min(DEPLOY_TIMEOUT_MS, 5 * 60 * 1000);
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${canonical}?radar=${encodeURIComponent(mergeSha)}`, { headers: { "cache-control": "no-cache" } });
      if (!response.ok) throw new Error(`URL pública respondió ${response.status}`);
      const html = await response.text();
      if (metaContent(html, "og:url") !== canonical) throw new Error("og:url no coincide con la URL pública");
      if (metaContent(html, "og:image") !== expectedImage) throw new Error("og:image no coincide con la portada final");
      if (metaContent(html, "og:title") !== article.seoTitle) throw new Error("og:title no coincide con seoTitle");
      const imageResponse = await fetch(expectedImage, { headers: { "cache-control": "no-cache" } });
      if (!imageResponse.ok || !imageResponse.headers.get("content-type")?.startsWith("image/")) throw new Error("La portada pública no responde como imagen");
      return { articleUrl: canonical, ogImage: expectedImage, httpStatus: response.status, verifiedAt: new Date().toISOString() };
    } catch (error) {
      lastError = error;
      await sleep(POLL_INTERVAL_MS);
    }
  }
  throw new Error(`Verificación pública fallida: ${lastError?.message || "sin detalle"}`);
}

async function appendSummary(trace) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  const lines = [
    `## Radar V3 — ${trace.status}`,
    `- Engine run: \`${trace.engineRunId || "n/a"}\``,
    `- Outcome: \`${trace.outcome}\``,
    `- Reason: ${trace.reason || "—"}`,
    trace.github?.pullRequest?.url ? `- PR: ${trace.github.pullRequest.url}` : null,
    trace.github?.mergeSha ? `- Merge: \`${trace.github.mergeSha}\`` : null,
    trace.production?.dashboardUrl ? `- Vercel: ${trace.production.dashboardUrl} (\`${trace.production.state}\`)` : null,
    trace.production?.verification?.articleUrl ? `- URL: ${trace.production.verification.articleUrl}` : null,
    trace.rollback?.compareUrl ? `- Rollback preparado: ${trace.rollback.compareUrl}` : null,
    "",
  ].filter(Boolean);
  await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`, "utf8");
}

function traceComment(trace) {
  return [
    `### Radar V3 — ${trace.status}`,
    "",
    `- \`engineRunId\`: \`${trace.engineRunId}\``,
    `- commit: \`${trace.github.commitSha || "n/a"}\``,
    `- merge: \`${trace.github.mergeSha || "n/a"}\``,
    `- Vercel production: \`${trace.production.state || "n/a"}\` (${trace.production.deploymentId || "sin deployment ID"})`,
    `- URL pública: ${trace.production.verification?.articleUrl || "no verificada"}`,
    `- rollback: \`${trace.rollback.status}\`${trace.rollback.compareUrl ? ` — ${trace.rollback.compareUrl}` : ""}`,
    `- motivo: ${trace.reason || "—"}`,
  ].join("\n");
}

async function main() {
  requireEnvironment();
  const decisionContext = resolveDecisionPath(process.argv[2]);
  await hydrateDecisionBundle(decisionContext);
  const { decision, article } = await readDecision(decisionContext);
  assertSourceContext(decisionContext, decision);

  let transaction = null;
  let currentPullRequest = null;
  let baselineMainSha = null;
  const services = {
    async preflightPublication() {
      currentPullRequest = ghJson(["pr", "view", String(EXISTING_PR_NUMBER), "--repo", REPOSITORY, "--json", "number,url,isDraft,headRefName,headRefOid,baseRefName"]);
      if (currentPullRequest.isDraft || currentPullRequest.headRefName !== BRANCH || currentPullRequest.baseRefName !== "main") {
        throw new Error("El PR Radar debe ser no-draft, pertenecer a la rama de la corrida y apuntar a main");
      }
      const openPullRequests = ghJson(["pr", "list", "--repo", REPOSITORY, "--base", "main", "--state", "open", "--json", "number,headRefName,url"]);
      const pendingRadar = openPullRequests.find((pr) => pr.headRefName?.startsWith("radar/") && pr.number !== currentPullRequest.number);
      if (pendingRadar) throw new Error(`Ya existe un PR Radar abierto: ${pendingRadar.url}`);
      baselineMainSha = gitOutput(["rev-parse", "origin/main"]);
      const baselineStatus = vercelStatusForCommit(baselineMainSha);
      return {
        branch: BRANCH,
        pullRequest: currentPullRequest,
        productionBaseline: baselineStatus ? {
          commitSha: baselineMainSha,
          deploymentId: deploymentIdFromStatus(baselineStatus),
          dashboardUrl: baselineStatus.target_url,
          state: baselineStatus.state === "success" ? "READY" : baselineStatus.state,
        } : { commitSha: baselineMainSha, state: "UNKNOWN" },
      };
    },
    async materialize() {
      transaction = await runNewsDecision({ decisionPath: decisionContext.absolute });
      return transaction;
    },
    async runGates() {
      runAutonomousGates();
    },
    async commit({ materialization }) {
      const relativeFiles = materialization.files.map((file) => path.relative(ROOT, file));
      await fs.rm(path.resolve(ROOT, decisionContext.runDirectory), { recursive: true, force: true });
      git(["add", "--", ...relativeFiles], { inherit: true });
      git(["diff", "--cached", "--check"], { inherit: true });
      git(["config", "user.name", "nexops-radar-v3"]);
      git(["config", "user.email", "nexops-radar-v3@users.noreply.github.com"]);
      git(["commit", "-m", `content: publish ${article.slug} [Radar V3]`], { inherit: true });
      return gitOutput(["rev-parse", "HEAD"]);
    },
    async push() {
      git(["push", "origin", `--force-with-lease=refs/heads/${BRANCH}:${SOURCE_SHA}`, `HEAD:refs/heads/${BRANCH}`], { inherit: true });
    },
    async refreshPullRequest({ commitSha }) {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        currentPullRequest = ghJson(["pr", "view", String(EXISTING_PR_NUMBER), "--repo", REPOSITORY, "--json", "number,url,isDraft,headRefOid"]);
        if (!currentPullRequest.isDraft && currentPullRequest.headRefOid === commitSha) return currentPullRequest;
        await sleep(2_000);
      }
      throw new Error("GitHub no actualizó el PR no-draft al commit materializado");
    },
    async waitForChecks({ pullRequest }) {
      return waitForChecks(pullRequest.number);
    },
    async mergePullRequest({ pullRequest }) {
      git(["fetch", "origin", "main"], { inherit: true });
      const currentMainSha = gitOutput(["rev-parse", "origin/main"]);
      if (currentMainSha !== baselineMainSha) throw new Error("main cambió durante la corrida; se requiere una nueva decisión sobre el corpus vigente");
      gh(["pr", "merge", String(pullRequest.number), "--repo", REPOSITORY, "--squash", "--delete-branch", "--subject", `content: publish ${article.slug} [Radar V3]`], { inherit: true });
      const merged = ghJson(["pr", "view", String(pullRequest.number), "--repo", REPOSITORY, "--json", "state,mergedAt,mergeCommit"]);
      if (merged.state !== "MERGED" || !merged.mergeCommit?.oid) throw new Error("GitHub no confirmó el merge del PR");
      return { sha: merged.mergeCommit.oid, mergedAt: merged.mergedAt };
    },
    async waitForProduction({ mergeSha }) {
      return waitForVercelProduction(mergeSha);
    },
    async verifyProduction({ article: publishedArticle, mergeSha }) {
      return verifyProductionArticle(publishedArticle, mergeSha);
    },
    async rollbackMaterialization(materialization) {
      for (const file of materialization.files) {
        const relative = path.relative(ROOT, file);
        git(["restore", "--staged", "--", relative], { allowFailure: true });
        await fs.rm(file, { force: true });
      }
    },
    async prepareRollback({ mergeSha, trace }) {
      const rollbackBranch = `radar/rollback-${article.engineRunId}-${mergeSha.slice(0, 7)}`;
      git(["fetch", "origin", "main"], { inherit: true });
      git(["switch", "-c", rollbackBranch, "origin/main"], { inherit: true });
      git(["config", "user.name", "nexops-radar-v3"]);
      git(["config", "user.email", "nexops-radar-v3@users.noreply.github.com"]);
      git(["revert", "--no-edit", mergeSha], { inherit: true });
      git(["push", "origin", `HEAD:refs/heads/${rollbackBranch}`], { inherit: true });
      const compareUrl = `https://github.com/${REPOSITORY}/compare/main...${encodeURIComponent(rollbackBranch)}?expand=1`;
      return {
        branch: rollbackBranch,
        compareUrl,
        reason: trace.reason || "gate de producción fallido",
        revertedMergeSha: mergeSha,
        previousDeploymentId: trace.production.baseline?.deploymentId || null,
        vercelCommand: trace.production.baseline?.deploymentId ? `vercel rollback ${trace.production.baseline.deploymentId}` : "vercel rollback",
      };
    },
    async recordTrace(trace) {
      await fs.mkdir(path.dirname(TRACE_PATH), { recursive: true });
      await fs.writeFile(TRACE_PATH, `${JSON.stringify({ ...trace, workflowRunUrl: RUN_URL }, null, 2)}\n`, "utf8");
      await appendSummary(trace);
      if (trace.github?.pullRequest?.number) {
        gh(["pr", "comment", String(trace.github.pullRequest.number), "--repo", REPOSITORY, "--body", traceComment(trace)], { inherit: true, allowFailure: true });
      }
    },
  };

  const trace = await executeRadarV3({ decision, article, services });
  console.log(`Radar V3 ${trace.status} — ${trace.engineRunId || trace.reason}`);
}

main().catch(async (error) => {
  const failureTrace = error instanceof RadarV3Error
    ? { ...error.trace, workflowRunUrl: RUN_URL }
    : {
      schemaVersion: 1,
      workflow: "radar-v3",
      outcome: "UNKNOWN",
      status: "FAILED",
      reason: error.message,
      workflowRunUrl: RUN_URL,
      completedAt: new Date().toISOString(),
    };
  await fs.mkdir(path.dirname(TRACE_PATH), { recursive: true });
  await fs.writeFile(TRACE_PATH, `${JSON.stringify(failureTrace, null, 2)}\n`, "utf8");
  console.error(error.message);
  process.exitCode = 1;
});
