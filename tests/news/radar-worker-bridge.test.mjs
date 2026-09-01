import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  canonicalJson,
  createCallbackEnvelope,
  signCallback,
  validateWorkerRequest,
  validateWorkerResult,
  verifyCallback,
} from "../../scripts/radar-worker-contract.mjs";
import { deliverResultFiles } from "../../scripts/radar-worker-delivery.mjs";
import { validateRequestFile } from "../../scripts/radar-worker-intake.mjs";

const REQUEST_ID = "c40b81b7-6ac4-4da1-92e8-86a7a50f9dc4";
const ALLOWED = "https://portal.nexopstech.com";
const SECRET = "radar-test-secret-with-at-least-32-characters";

function request(overrides = {}) {
  return {
    schemaVersion: 1,
    requestId: REQUEST_ID,
    workspaceId: "nexops",
    trigger: "manual",
    mode: "review",
    intent: "opportunity_search",
    manualNote: null,
    callbackUrl: "https://portal.nexopstech.com/api/radar/callback",
    publicationGate: false,
    requestedAt: "2026-09-01T18:00:00.000Z",
    ...overrides,
  };
}

function candidate() {
  return {
    title: "La automatización operativa entra en una etapa de control",
    summary: "Una oportunidad editorial actual y verificable para equipos de operaciones.",
    topic: "Automatización",
    source: { name: "Fuente oficial", url: "https://example.com/research" },
    scoreTotal: 91,
    scoreBreakdown: [{ criterion: "relevance", score: 91 }],
    businessReasons: ["Tiene impacto operativo directo", "La fuente es actual y verificable"],
    policyVersion: "radar-v3.1",
    topicFingerprint: "automation:control:2026",
    editorialMetadata: { contentType: "actualidad", secondaryEntities: ["operaciones"] },
    draft: {
      headline: "Automatizar ya no alcanza: ahora hay que gobernar",
      deck: "Qué cambia cuando la automatización llega a procesos críticos.",
      bodyMarkdown: "## Del experimento a la operación\n\nLos equipos necesitan trazabilidad y revisión.",
    },
  };
}

function reviewResult(overrides = {}) {
  return {
    schemaVersion: 1,
    requestId: REQUEST_ID,
    workspaceId: "nexops",
    status: "review_pending",
    generatedAt: "2026-09-01T18:10:00.000Z",
    publicationGate: false,
    publicMessage: "Hay una nota textual lista para revisar.",
    candidate: candidate(),
    resultReason: null,
    noPublication: null,
    externalRunId: "codex-task-123",
    externalRunUrl: "https://chatgpt.com/codex/tasks/task-123",
    ...overrides,
  };
}

function noPublicationResult(overrides = {}) {
  const reason = "No apareció una fuente suficientemente relevante para avanzar.";
  return {
    schemaVersion: 1,
    requestId: REQUEST_ID,
    workspaceId: "nexops",
    status: "no_publication",
    generatedAt: "2026-09-01T18:10:00.000Z",
    publicationGate: false,
    publicMessage: "La corrida terminó sin candidato.",
    candidate: null,
    resultReason: reason,
    noPublication: {
      outcome: "NO_PUBLICATION",
      engineRunId: REQUEST_ID,
      timestamp: "2026-09-01T18:10:00.000Z",
      title: "Sin candidato",
      topic: "Automatización",
      source: { name: "Fuente oficial", url: "https://example.com/research" },
      scoreTotal: 42,
      scoreBreakdown: [{ criterion: "relevance", score: 42 }],
      policyVersion: "radar-v3.1",
      reason,
      topicFingerprint: "automation:none:2026",
      editorialMetadata: { contentType: "actualidad" },
      assetReference: null,
    },
    externalRunId: null,
    externalRunUrl: null,
    ...overrides,
  };
}

test("acepta una solicitud manual y una programada con publicationGate cerrado", () => {
  const manual = validateWorkerRequest(request(), { allowedCallbackOrigins: ALLOWED });
  const scheduled = validateWorkerRequest(request({ trigger: "scheduled" }), { allowedCallbackOrigins: ALLOWED });
  assert.equal(manual.trigger, "manual");
  assert.equal(scheduled.trigger, "scheduled");
  assert.equal(manual.publicationGate, false);
  assert.equal(validateWorkerRequest(request({ callbackUrl: "https://portal.nexopstech.com" }), { allowedCallbackOrigins: ALLOWED }).callbackUrl, "https://portal.nexopstech.com");
  assert.throws(
    () => validateWorkerRequest(request({ requestedAt: "2026-09-01T18:00:00Z" }), { allowedCallbackOrigins: ALLOWED }),
    /ISO-8601 UTC normalizado/,
  );
});

test("manual_note exige review y una fuente HTTPS pública", () => {
  assert.equal(validateWorkerRequest(request({
    intent: "manual_note",
    manualNote: { title: "Nota", sourceUrl: "https://example.com/source", instructions: "Enfoque operativo" },
  }), { allowedCallbackOrigins: ALLOWED }).mode, "review");
  assert.throws(() => validateWorkerRequest(request({
    intent: "manual_note",
    manualNote: { title: "Nota", sourceUrl: "https://127.0.0.1/private", instructions: null },
  }), { allowedCallbackOrigins: ALLOWED }), /host público/);
});

test("rechaza publicación, imágenes, assets y metadatos editoriales no permitidos", () => {
  assert.throws(() => validateWorkerRequest(request({ publicationGate: true }), { allowedCallbackOrigins: ALLOWED }), /permanecer en false/);
  assert.throws(() => validateWorkerResult(reviewResult({ candidate: { ...candidate(), coverImage: "https://example.com/a.png" } }), request()), /campos no permitidos/);
  assert.throws(() => validateWorkerResult(reviewResult({
    candidate: { ...candidate(), draft: { ...candidate().draft, bodyMarkdown: "![portada](https://example.com/a.png)" } },
  }), request()), /sólo texto/);
  assert.throws(() => validateWorkerResult(reviewResult({ candidate: { ...candidate(), editorialMetadata: { prompt: { secret: "x" } } } }), request()), /campos no permitidos/);
  assert.throws(() => validateWorkerResult(noPublicationResult({
    noPublication: { ...noPublicationResult().noPublication, assetReference: { kind: "image", reference: "x", source: null, credit: null } },
  }), request()), /no admite assetReference/);
});

test("NO_PUBLICATION queda ligado al requestId", () => {
  assert.throws(() => validateWorkerResult(noPublicationResult({
    noPublication: { ...noPublicationResult().noPublication, engineRunId: "c40b81b7-6ac4-4da1-92e8-86a7a50f9dc5" },
  }), request()), /debe coincidir con requestId/);
});

test("la firma HMAC cubre timestamp y bytes exactos del callback", () => {
  const normalizedRequest = validateWorkerRequest(request(), { allowedCallbackOrigins: ALLOWED });
  const normalizedResult = validateWorkerResult(reviewResult(), normalizedRequest);
  const rawBody = canonicalJson(createCallbackEnvelope(normalizedRequest, normalizedResult));
  const signature = signCallback(rawBody, SECRET, "1788286200");
  assert.equal(verifyCallback(rawBody, SECRET, "1788286200", signature), true);
  assert.equal(verifyCallback(`${rawBody} `, SECRET, "1788286200", signature), false);
  const envelope = createCallbackEnvelope(normalizedRequest, normalizedResult);
  assert.equal(envelope.publicationGate, false);
  assert.equal(envelope.result.publicationGate, false);
  assert.equal(envelope.resultDigest, createHash("sha256").update(canonicalJson(envelope.result)).digest("hex"));
  assert.deepEqual(Object.keys(envelope.result.candidate).sort(), [
    "businessReasons", "draft", "score", "sourceName", "sourceUrl", "title", "topic",
  ]);
});

test("vector contractual compartido conserva digests interoperables con Portal", () => {
  const normalizedRequest = validateWorkerRequest(request({ callbackUrl: "https://portal.nexopstech.com" }), { allowedCallbackOrigins: ALLOWED });
  const normalizedResult = validateWorkerResult({
    schemaVersion: 1,
    requestId: REQUEST_ID,
    workspaceId: "nexops",
    status: "failed",
    generatedAt: "2026-09-01T18:10:00.000Z",
    publicationGate: false,
    publicMessage: "La corrida no pudo completarse.",
    candidate: null,
    resultReason: "Falló la investigación temporal.",
    noPublication: null,
    externalRunId: null,
    externalRunUrl: null,
  }, normalizedRequest);
  const envelope = createCallbackEnvelope(normalizedRequest, normalizedResult);
  assert.equal(envelope.requestDigest, "485b139c08079f03dd7407ae3dfc7ec0dffd14f2c61fb15cf5bf183ecdb4543a");
  assert.equal(envelope.resultDigest, "3e56b166ebae52c0456ffed7a5ea77bb5ae77d74bde210f8c19c8ca47a2d7b9b");
});

test("intake ancla el request original y rechaza una mutación posterior", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "radar-intake-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const requestPath = path.join(root, "request.json");
  await fs.writeFile(requestPath, JSON.stringify(request()), "utf8");
  assert.equal((await validateRequestFile(requestPath, { allowedCallbackOrigins: ALLOWED, historyRoot: root })).persisted, true);
  assert.equal((await validateRequestFile(requestPath, { allowedCallbackOrigins: ALLOWED, historyRoot: root })).persisted, false);
  await fs.writeFile(requestPath, JSON.stringify(request({ mode: "suggest" })), "utf8");
  await assert.rejects(
    validateRequestFile(requestPath, { allowedCallbackOrigins: ALLOWED, historyRoot: root }),
    /requestId ya existe con otra solicitud/,
  );
});

test("delivery persiste resultado, NO_PUBLICATION e idempotencia antes de cerrar", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "radar-worker-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const requestPath = path.join(root, "request.json");
  const resultPath = path.join(root, "result.json");
  await fs.writeFile(requestPath, JSON.stringify(request()), "utf8");
  await fs.writeFile(resultPath, JSON.stringify(noPublicationResult()), "utf8");
  const callbacks = [];
  const options = {
    requestPath,
    resultPath,
    historyRoot: root,
    allowedCallbackOrigins: ALLOWED,
    callbackSecret: SECRET,
    now: () => new Date("2026-09-01T18:20:00.000Z"),
    fetchImpl: async (url, init) => {
      callbacks.push({ url, init });
      return { ok: true, status: 204 };
    },
  };
  const first = await deliverResultFiles(options);
  const retry = await deliverResultFiles(options);
  assert.equal(first.duplicate, false);
  assert.equal(retry.duplicate, true);
  assert.equal(callbacks.length, 1);
  assert.ok(await fs.readFile(path.join(root, "no-publication", `${REQUEST_ID}.json`), "utf8"));
  assert.ok(await fs.readFile(path.join(root, "deliveries", `${REQUEST_ID}.json`), "utf8"));
  assert.equal(callbacks[0].init.headers["idempotency-key"], REQUEST_ID);
  assert.equal(callbacks[0].init.headers["x-radar-delivery-id"], `radar-${REQUEST_ID}`);
  const callbackBody = JSON.parse(callbacks[0].init.body);
  assert.equal(callbackBody.resultDigest, createHash("sha256").update(canonicalJson(callbackBody.result)).digest("hex"));
});
