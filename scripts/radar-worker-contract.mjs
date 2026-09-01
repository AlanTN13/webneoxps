import crypto from "node:crypto";
import net from "node:net";
import { createNoPublicationRecord } from "./radar-v3-no-publication-store.mjs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const WORKSPACE_ID = /^[a-z0-9][a-z0-9_-]{1,63}$/;
const RESULT_STATUSES = new Set(["suggested", "review_pending", "no_publication", "failed"]);
const REQUEST_KEYS = new Set([
  "schemaVersion", "requestId", "workspaceId", "trigger", "mode", "intent",
  "manualNote", "callbackUrl", "publicationGate", "requestedAt",
]);
const MANUAL_NOTE_KEYS = new Set(["title", "sourceUrl", "instructions"]);
const RESULT_KEYS = new Set([
  "schemaVersion", "requestId", "workspaceId", "status", "generatedAt",
  "publicationGate", "publicMessage", "candidate", "resultReason", "noPublication",
  "externalRunId", "externalRunUrl",
]);
const CANDIDATE_KEYS = new Set([
  "title", "summary", "topic", "source", "scoreTotal", "scoreBreakdown",
  "businessReasons", "policyVersion", "topicFingerprint", "editorialMetadata", "draft",
]);
const SOURCE_KEYS = new Set(["name", "url"]);
const DRAFT_KEYS = new Set(["headline", "deck", "bodyMarkdown"]);
const EDITORIAL_KEYS = new Set([
  "contentType", "contentPurpose", "territory", "category", "primaryKeyword",
  "searchIntent", "primaryEntity", "secondaryEntities",
]);
const FORBIDDEN_KEY = /(image|asset|cover|prompt|reasoning|chain.?of.?thought|api.?key|secret|token|authorization)/i;
const SECRET_VALUE = /(gh[pousr]_[a-z0-9]{20,}|sk-[a-z0-9_-]{16,}|bearer\s+[a-z0-9._-]{16,}|(?:token|api[_-]?key|secret|signature)=)/i;
const IMAGE_MARKUP = /!\[[^\]]*\]\([^)]*\)|<img\b|data:image/i;

const plainObject = (value) => value && typeof value === "object" && !Array.isArray(value);

function knownObject(value, allowed, field) {
  if (!plainObject(value)) throw new Error(`${field} debe ser un objeto`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length) throw new Error(`${field} contiene campos no permitidos: ${unknown.join(", ")}`);
  const forbidden = Object.keys(value).find((key) => FORBIDDEN_KEY.test(key));
  if (forbidden) throw new Error(`${field}.${forbidden} no está permitido en el worker textual`);
}

function text(value, field, maxLength = 500, { optional = false } = {}) {
  if ((value === undefined || value === null || value === "") && optional) return null;
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    throw new Error(`${field} debe ser texto no vacío de hasta ${maxLength} caracteres`);
  }
  return value.trim();
}

function normalizedTimestamp(value, field) {
  const normalized = text(value, field, 40);
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime()) || date.toISOString() !== normalized) {
    throw new Error(`${field} debe ser ISO-8601 UTC normalizado`);
  }
  return normalized;
}

function privateIp(hostname) {
  if (net.isIPv4(hostname)) {
    const parts = hostname.split(".").map(Number);
    return parts[0] === 10 || parts[0] === 127 || parts[0] === 0 ||
      (parts[0] === 169 && parts[1] === 254) || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168);
  }
  if (net.isIPv6(hostname)) {
    const lower = hostname.toLowerCase();
    return lower === "::1" || lower === "::" || lower.startsWith("fc") || lower.startsWith("fd") ||
      lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb");
  }
  return false;
}

function httpsUrl(value, field, { allowPrivate = false } = {}) {
  const normalized = text(value, field, 2_000);
  let parsed;
  try { parsed = new URL(normalized); } catch { throw new Error(`${field} debe ser una URL válida`); }
  if (parsed.protocol !== "https:") throw new Error(`${field} debe usar HTTPS`);
  if (parsed.username || parsed.password) throw new Error(`${field} no puede incluir credenciales`);
  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  if (!allowPrivate && (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || privateIp(hostname))) {
    throw new Error(`${field} debe apuntar a un host público`);
  }
  return parsed;
}

function assertNoSecrets(value, field) {
  const serialized = JSON.stringify(value);
  if (SECRET_VALUE.test(serialized)) throw new Error(`${field} parece contener una credencial`);
}

function allowedCallback(parsed, allowedOrigins) {
  const origins = (allowedOrigins || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => new URL(entry).origin);
  if (origins.length === 0) throw new Error("RADAR_ALLOWED_CALLBACK_ORIGINS debe declarar al menos un origen HTTPS");
  if (!origins.includes(parsed.origin)) throw new Error("callbackUrl no pertenece a un origen permitido");
}

export function validateWorkerRequest(input, { allowedCallbackOrigins } = {}) {
  knownObject(input, REQUEST_KEYS, "request");
  if (input.schemaVersion !== 1) throw new Error("request.schemaVersion debe ser 1");
  const requestId = text(input.requestId, "request.requestId", 36);
  if (!UUID.test(requestId)) throw new Error("request.requestId debe ser UUID");
  const workspaceId = text(input.workspaceId, "request.workspaceId", 64).toLowerCase();
  if (!WORKSPACE_ID.test(workspaceId)) throw new Error("request.workspaceId no cumple el formato seguro");
  if (!["manual", "scheduled"].includes(input.trigger)) throw new Error("request.trigger debe ser manual o scheduled");
  if (!["suggest", "review"].includes(input.mode)) throw new Error("request.mode debe ser suggest o review");
  if (!["opportunity_search", "manual_note"].includes(input.intent)) {
    throw new Error("request.intent debe ser opportunity_search o manual_note");
  }
  if (input.publicationGate !== false) throw new Error("request.publicationGate debe permanecer en false");
  const callbackUrlValue = text(input.callbackUrl, "request.callbackUrl", 2_000);
  const callbackUrl = httpsUrl(callbackUrlValue, "request.callbackUrl", { allowPrivate: true });
  allowedCallback(callbackUrl, allowedCallbackOrigins);

  let manualNote = null;
  if (input.intent === "manual_note") {
    if (input.mode !== "review") throw new Error("manual_note debe operar en modo review");
    knownObject(input.manualNote, MANUAL_NOTE_KEYS, "request.manualNote");
    manualNote = {
      title: text(input.manualNote.title, "request.manualNote.title", 300, { optional: true }),
      sourceUrl: (() => {
        const value = text(input.manualNote.sourceUrl, "request.manualNote.sourceUrl", 2_000);
        httpsUrl(value, "request.manualNote.sourceUrl");
        return value;
      })(),
      instructions: text(input.manualNote.instructions, "request.manualNote.instructions", 2_000, { optional: true }),
    };
  } else if (input.manualNote !== null) {
    throw new Error("opportunity_search requiere manualNote=null");
  }

  const request = {
    schemaVersion: 1,
    requestId: requestId.toLowerCase(),
    workspaceId,
    trigger: input.trigger,
    mode: input.mode,
    intent: input.intent,
    manualNote,
    callbackUrl: callbackUrlValue,
    publicationGate: false,
    requestedAt: normalizedTimestamp(input.requestedAt, "request.requestedAt"),
  };
  assertNoSecrets(request, "request");
  return request;
}

function normalizeSource(input, field) {
  knownObject(input, SOURCE_KEYS, field);
  const url = text(input.url, `${field}.url`, 2_000);
  httpsUrl(url, `${field}.url`);
  return {
    name: text(input.name, `${field}.name`, 200),
    url,
  };
}

function normalizeCandidate(input) {
  knownObject(input, CANDIDATE_KEYS, "result.candidate");
  knownObject(input.draft, DRAFT_KEYS, "result.candidate.draft");
  if (typeof input.scoreTotal !== "number" || !Number.isFinite(input.scoreTotal) || input.scoreTotal < 0 || input.scoreTotal > 100) {
    throw new Error("result.candidate.scoreTotal debe estar entre 0 y 100");
  }
  if (!Array.isArray(input.scoreBreakdown) || input.scoreBreakdown.length === 0 || input.scoreBreakdown.length > 20) {
    throw new Error("result.candidate.scoreBreakdown debe tener entre 1 y 20 criterios");
  }
  const bodyMarkdown = text(input.draft.bodyMarkdown, "result.candidate.draft.bodyMarkdown", 20_000);
  if (IMAGE_MARKUP.test(bodyMarkdown)) throw new Error("result.candidate.draft.bodyMarkdown debe contener sólo texto, sin imágenes");
  if (!Array.isArray(input.businessReasons) || input.businessReasons.length === 0 || input.businessReasons.length > 5) {
    throw new Error("result.candidate.businessReasons debe tener entre 1 y 5 razones");
  }
  const candidate = {
    title: text(input.title, "result.candidate.title", 300),
    summary: text(input.summary, "result.candidate.summary", 1_000),
    topic: text(input.topic, "result.candidate.topic", 300),
    source: normalizeSource(input.source, "result.candidate.source"),
    scoreTotal: input.scoreTotal,
    scoreBreakdown: input.scoreBreakdown.map((entry, index) => {
      knownObject(entry, new Set(["criterion", "score"]), `result.candidate.scoreBreakdown[${index}]`);
      if (typeof entry.score !== "number" || !Number.isFinite(entry.score) || entry.score < 0 || entry.score > 100) {
        throw new Error(`result.candidate.scoreBreakdown[${index}].score debe estar entre 0 y 100`);
      }
      return { criterion: text(entry.criterion, `result.candidate.scoreBreakdown[${index}].criterion`, 64), score: entry.score };
    }),
    businessReasons: input.businessReasons.map((reason, index) => text(reason, `result.candidate.businessReasons[${index}]`, 300)),
    policyVersion: text(input.policyVersion, "result.candidate.policyVersion", 64),
    topicFingerprint: text(input.topicFingerprint, "result.candidate.topicFingerprint", 300),
    editorialMetadata: normalizeEditorialMetadata(input.editorialMetadata),
    draft: {
      headline: text(input.draft.headline, "result.candidate.draft.headline", 300),
      deck: text(input.draft.deck, "result.candidate.draft.deck", 500),
      bodyMarkdown,
    },
  };
  assertNoSecrets(candidate, "result.candidate");
  return candidate;
}

function normalizeEditorialMetadata(input = {}) {
  knownObject(input, EDITORIAL_KEYS, "result.candidate.editorialMetadata");
  return Object.fromEntries(Object.entries(input).map(([key, value]) => {
    if (key === "secondaryEntities") {
      if (!Array.isArray(value) || value.length > 10) throw new Error("editorialMetadata.secondaryEntities admite hasta 10 textos");
      return [key, value.map((item, index) => text(item, `editorialMetadata.secondaryEntities[${index}]`, 120))];
    }
    return [key, text(value, `editorialMetadata.${key}`, 500)];
  }));
}

export function validateWorkerResult(input, request) {
  knownObject(input, RESULT_KEYS, "result");
  if (input.schemaVersion !== 1) throw new Error("result.schemaVersion debe ser 1");
  if (input.requestId !== request.requestId) throw new Error("result.requestId no coincide con request");
  if (input.workspaceId !== request.workspaceId) throw new Error("result.workspaceId no coincide con request");
  if (!RESULT_STATUSES.has(input.status)) throw new Error("result.status no está permitido por el worker temporal");
  if (input.publicationGate !== false) throw new Error("result.publicationGate debe permanecer en false");
  const publicMessage = text(input.publicMessage, "result.publicMessage", 500);
  const externalRunId = text(input.externalRunId, "result.externalRunId", 200, { optional: true });
  const externalRunUrl = input.externalRunUrl === undefined || input.externalRunUrl === null
    ? null
    : (() => {
      const value = text(input.externalRunUrl, "result.externalRunUrl", 2_000);
      httpsUrl(value, "result.externalRunUrl");
      return value;
    })();

  let candidate = null;
  let noPublication = null;
  let resultReason = null;
  if (["suggested", "review_pending"].includes(input.status)) {
    if (input.status === "suggested" && request.mode !== "suggest") throw new Error("suggested sólo corresponde a mode=suggest");
    if (input.status === "review_pending" && request.mode !== "review") throw new Error("review_pending sólo corresponde a mode=review");
    candidate = normalizeCandidate(input.candidate);
    if (input.noPublication !== null || input.resultReason !== null) throw new Error(`${input.status} sólo admite candidate`);
  } else if (input.status === "no_publication") {
    if (input.candidate !== null) throw new Error("no_publication no admite candidate");
    noPublication = createNoPublicationRecord(input.noPublication);
    if (noPublication.engineRunId !== request.requestId) throw new Error("noPublication.engineRunId debe coincidir con requestId");
    if (noPublication.assetReference !== null) throw new Error("El worker temporal no admite assetReference");
    httpsUrl(noPublication.candidate.source.url, "result.noPublication.source.url");
    if ("visualType" in noPublication.editorialMetadata || "visualSubject" in noPublication.editorialMetadata) {
      throw new Error("El worker temporal no admite metadatos visuales");
    }
    resultReason = text(input.resultReason, "result.resultReason", 1_000);
    if (resultReason !== noPublication.rejectionReason) throw new Error("resultReason debe coincidir con noPublication.reason");
  } else {
    if (input.candidate !== null || input.noPublication !== null) throw new Error("failed no admite candidate ni noPublication");
    resultReason = text(input.resultReason, "result.resultReason", 1_000);
  }

  const result = {
    schemaVersion: 1,
    requestId: input.requestId,
    workspaceId: input.workspaceId,
    status: input.status,
    generatedAt: normalizedTimestamp(input.generatedAt, "result.generatedAt"),
    publicationGate: false,
    publicMessage,
    candidate,
    resultReason,
    noPublication,
    externalRunId,
    externalRunUrl,
  };
  assertNoSecrets(result, "result");
  return result;
}

export function canonicalJson(value) {
  const sort = (entry) => {
    if (Array.isArray(entry)) return entry.map(sort);
    if (!plainObject(entry)) return entry;
    return Object.fromEntries(Object.keys(entry).sort().map((key) => [key, sort(entry[key])]));
  };
  return JSON.stringify(sort(value));
}

export function digest(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

export function createCallbackEnvelope(request, result) {
  const candidate = result.candidate ? {
    title: result.candidate.title,
    topic: result.candidate.topic,
    sourceName: result.candidate.source.name,
    sourceUrl: result.candidate.source.url,
    score: result.candidate.scoreTotal,
    businessReasons: result.candidate.businessReasons,
    draft: result.candidate.draft,
  } : null;
  const publicResult = {
    status: result.status,
    publicationGate: false,
    publicMessage: result.publicMessage,
    candidate,
    resultReason: result.resultReason,
    externalRunId: result.externalRunId,
    externalRunUrl: result.externalRunUrl,
  };
  return {
    schemaVersion: 1,
    event: "radar.worker.completed",
    deliveryId: `radar-${request.requestId}`,
    requestId: request.requestId,
    workspaceId: request.workspaceId,
    trigger: request.trigger,
    mode: request.mode,
    intent: request.intent,
    publicationGate: false,
    requestDigest: digest(request),
    resultDigest: digest(publicResult),
    result: publicResult,
  };
}

export function signCallback(rawBody, secret, timestamp) {
  if (typeof secret !== "string" || secret.length < 32) throw new Error("RADAR_CALLBACK_SECRET debe tener al menos 32 caracteres");
  const normalizedTimestamp = String(timestamp);
  if (!/^\d{10}$/.test(normalizedTimestamp)) throw new Error("timestamp HMAC inválido");
  const signature = crypto.createHmac("sha256", secret).update(`${normalizedTimestamp}.${rawBody}`).digest("hex");
  return `v1=${signature}`;
}

export function verifyCallback(rawBody, secret, timestamp, signature) {
  const expected = signCallback(rawBody, secret, timestamp);
  const actualBuffer = Buffer.from(String(signature));
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}
