import fs from "node:fs/promises";
import path from "node:path";

const ENGINE_RUN_ID = /^[a-z0-9][a-z0-9._-]{5,80}$/;
const POLICY_VERSION = /^[a-z0-9][a-z0-9._-]{0,63}$/i;
const PUBLIC_CRITERION = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const TOP_LEVEL_KEYS = new Set([
  "outcome",
  "engineRunId",
  "timestamp",
  "title",
  "topic",
  "source",
  "scoreTotal",
  "scoreBreakdown",
  "policyVersion",
  "reason",
  "topicFingerprint",
  "editorialMetadata",
  "assetReference",
]);
const SOURCE_KEYS = new Set(["name", "url"]);
const BREAKDOWN_KEYS = new Set(["criterion", "score"]);
const ASSET_KEYS = new Set(["kind", "reference", "source", "credit"]);
const EDITORIAL_KEYS = new Set([
  "contentType",
  "contentPurpose",
  "territory",
  "category",
  "primaryKeyword",
  "searchIntent",
  "primaryEntity",
  "secondaryEntities",
  "visualType",
  "visualSubject",
]);
const SENSITIVE_KEY = /(weight|threshold|formula|prompt|reasoning|chain.?of.?thought|research.?notes?|model.?config|instruction)/i;
const SECRET_VALUE = /(gh[pousr]_[a-z0-9]{20,}|sk-[a-z0-9_-]{16,}|bearer\s+[a-z0-9._-]{16,}|(?:token|api[_-]?key|secret|signature|x-amz-credential)=)/i;

function plainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function requiredText(value, field, maxLength = 500) {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    throw new Error(`${field} debe ser texto no vacío de hasta ${maxLength} caracteres`);
  }
  return value.trim();
}

function assertKnownKeys(value, allowed, field) {
  if (!plainObject(value)) throw new Error(`${field} debe ser un objeto`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length) throw new Error(`${field} contiene campos no persistibles: ${unknown.join(", ")}`);
  const sensitive = Object.keys(value).find((key) => SENSITIVE_KEY.test(key));
  if (sensitive) throw new Error(`${field}.${sensitive} no puede persistirse en el historial`);
}

function optionalText(value, field, maxLength = 500) {
  if (value === undefined || value === null) return null;
  return requiredText(value, field, maxLength);
}

function normalizeSource(source) {
  assertKnownKeys(source, SOURCE_KEYS, "source");
  const url = requiredText(source.url, "source.url", 2_000);
  let parsed;
  try { parsed = new URL(url); } catch { throw new Error("source.url debe ser una URL válida"); }
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("source.url debe usar HTTP(S)");
  return { name: requiredText(source.name, "source.name", 200), url: parsed.toString() };
}

function normalizeBreakdown(breakdown) {
  if (!Array.isArray(breakdown) || breakdown.length === 0 || breakdown.length > 20) {
    throw new Error("scoreBreakdown debe tener entre 1 y 20 criterios normalizados");
  }
  const seen = new Set();
  return breakdown.map((item, index) => {
    assertKnownKeys(item, BREAKDOWN_KEYS, `scoreBreakdown[${index}]`);
    const criterion = requiredText(item.criterion, `scoreBreakdown[${index}].criterion`, 64);
    if (!PUBLIC_CRITERION.test(criterion)) throw new Error(`${criterion} no es un alias normalizado de criterio válido`);
    if (seen.has(criterion)) throw new Error(`scoreBreakdown repite el criterio ${criterion}`);
    seen.add(criterion);
    if (typeof item.score !== "number" || !Number.isFinite(item.score) || item.score < 0 || item.score > 100) {
      throw new Error(`scoreBreakdown[${index}].score debe estar entre 0 y 100`);
    }
    return { criterion, score: item.score };
  });
}

function normalizeEditorialMetadata(metadata = {}) {
  assertKnownKeys(metadata, EDITORIAL_KEYS, "editorialMetadata");
  const normalized = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (key === "secondaryEntities") {
      if (!Array.isArray(value) || value.length > 10 || value.some((item) => typeof item !== "string" || !item.trim() || item.length > 120)) {
        throw new Error("editorialMetadata.secondaryEntities debe ser un array de hasta 10 textos");
      }
      normalized[key] = value.map((item) => item.trim());
    } else {
      normalized[key] = requiredText(value, `editorialMetadata.${key}`, 500);
    }
  }
  return normalized;
}

function normalizeAssetReference(asset) {
  if (asset === undefined || asset === null) return null;
  assertKnownKeys(asset, ASSET_KEYS, "assetReference");
  return {
    kind: requiredText(asset.kind, "assetReference.kind", 80),
    reference: requiredText(asset.reference, "assetReference.reference", 2_000),
    source: optionalText(asset.source, "assetReference.source", 500),
    credit: optionalText(asset.credit, "assetReference.credit", 500),
  };
}

export function createNoPublicationRecord(payload) {
  assertKnownKeys(payload, TOP_LEVEL_KEYS, "NO_PUBLICATION");
  if (payload.outcome !== "NO_PUBLICATION") throw new Error("outcome debe ser NO_PUBLICATION");
  const engineRunId = requiredText(payload.engineRunId, "engineRunId", 81);
  if (!ENGINE_RUN_ID.test(engineRunId)) throw new Error("engineRunId no cumple el formato seguro");
  const timestamp = requiredText(payload.timestamp, "timestamp", 40);
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime()) || date.toISOString() !== timestamp) throw new Error("timestamp debe ser ISO-8601 UTC normalizado");
  if (typeof payload.scoreTotal !== "number" || !Number.isFinite(payload.scoreTotal) || payload.scoreTotal < 0 || payload.scoreTotal > 100) {
    throw new Error("scoreTotal debe estar entre 0 y 100");
  }
  const policyVersion = requiredText(payload.policyVersion, "policyVersion", 64);
  if (!POLICY_VERSION.test(policyVersion)) throw new Error("policyVersion no cumple el formato seguro");

  const record = {
    schemaVersion: 1,
    store: "github-private",
    outcome: "NO_PUBLICATION",
    engineRunId,
    timestamp,
    candidate: {
      title: requiredText(payload.title, "title", 300),
      topic: requiredText(payload.topic, "topic", 300),
      source: normalizeSource(payload.source),
    },
    score: {
      total: payload.scoreTotal,
      breakdown: normalizeBreakdown(payload.scoreBreakdown),
    },
    policyVersion,
    rejectionReason: requiredText(payload.reason, "reason", 1_000),
    topicFingerprint: requiredText(payload.topicFingerprint, "topicFingerprint", 300),
    editorialMetadata: normalizeEditorialMetadata(payload.editorialMetadata),
    assetReference: normalizeAssetReference(payload.assetReference),
  };
  if (SECRET_VALUE.test(JSON.stringify(record))) throw new Error("El registro parece contener una credencial o URL firmada");
  return record;
}

export function noPublicationRecordPath(record) {
  return `no-publication/${record.engineRunId}.json`;
}

function serialize(record) {
  return `${JSON.stringify(record, null, 2)}\n`;
}

export class FileNoPublicationStore {
  constructor(rootDirectory) {
    this.rootDirectory = path.resolve(rootDirectory);
  }

  async persist(record) {
    const relativePath = noPublicationRecordPath(record);
    const destination = path.resolve(this.rootDirectory, relativePath);
    if (!destination.startsWith(`${this.rootDirectory}${path.sep}`)) throw new Error("Ruta de historial insegura");
    const content = serialize(record);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    try {
      await fs.writeFile(destination, content, { encoding: "utf8", flag: "wx" });
      return { created: true, path: relativePath, reference: destination };
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      const existing = await fs.readFile(destination, "utf8");
      if (existing !== content) throw new Error("La corrida ya existe con otro contenido");
      return { created: false, path: relativePath, reference: destination };
    }
  }
}

class GitHubApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class GitHubNoPublicationStore {
  constructor({ repository, token, branch, fetchImpl = fetch }) {
    if (!repository?.includes("/") || !branch || !token) throw new Error("GitHub store privado requiere repository, branch y token");
    this.repository = repository;
    this.token = token;
    this.branch = branch;
    this.fetchImpl = fetchImpl;
  }

  async api(method, endpoint, body) {
    const response = await this.fetchImpl(`https://api.github.com/repos/${this.repository}${endpoint}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
        "x-github-api-version": "2022-11-28",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const responseBody = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) throw new GitHubApiError(responseBody?.message || `GitHub API respondió ${response.status}`, response.status);
    return responseBody;
  }

  async branchHead() {
    try {
      const ref = await this.api("GET", `/git/ref/heads/${encodeURIComponent(this.branch)}`);
      const commit = await this.api("GET", `/git/commits/${ref.object.sha}`);
      return { commitSha: ref.object.sha, treeSha: commit.tree.sha };
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async existingContent(relativePath) {
    try {
      const encodedPath = relativePath.split("/").map(encodeURIComponent).join("/");
      const file = await this.api("GET", `/contents/${encodedPath}?ref=${encodeURIComponent(this.branch)}`);
      return Buffer.from(String(file.content || "").replace(/\s/g, ""), "base64").toString("utf8");
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async persist(record) {
    const repository = await this.api("GET", "");
    if (repository.private !== true || repository.visibility !== "private") {
      throw new Error("El store configurado debe ser un repositorio privado");
    }
    const relativePath = noPublicationRecordPath(record);
    const content = serialize(record);
    const existing = await this.existingContent(relativePath);
    if (existing !== null) {
      if (existing !== content) throw new Error("La corrida ya existe con otro contenido");
      return { created: false, path: relativePath, reference: `refs/heads/${this.branch}:${relativePath}` };
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const head = await this.branchHead();
      const blob = await this.api("POST", "/git/blobs", { content, encoding: "utf-8" });
      const treeBody = {
        tree: [{ path: relativePath, mode: "100644", type: "blob", sha: blob.sha }],
        ...(head ? { base_tree: head.treeSha } : {}),
      };
      const tree = await this.api("POST", "/git/trees", treeBody);
      const commit = await this.api("POST", "/git/commits", {
        message: `radar: record NO_PUBLICATION ${record.engineRunId}`,
        tree: tree.sha,
        parents: head ? [head.commitSha] : [],
      });
      try {
        if (head) await this.api("PATCH", `/git/refs/heads/${encodeURIComponent(this.branch)}`, { sha: commit.sha, force: false });
        else await this.api("POST", "/git/refs", { ref: `refs/heads/${this.branch}`, sha: commit.sha });
        return { created: true, path: relativePath, reference: `refs/heads/${this.branch}:${relativePath}`, commitSha: commit.sha };
      } catch (error) {
        if (![409, 422].includes(error.status) || attempt === 4) throw error;
        const racedContent = await this.existingContent(relativePath);
        if (racedContent !== null) {
          if (racedContent !== content) throw new Error("La corrida ya existe con otro contenido");
          return { created: false, path: relativePath, reference: `refs/heads/${this.branch}:${relativePath}` };
        }
      }
    }
    throw new Error("No se pudo persistir NO_PUBLICATION después de 5 intentos");
  }
}
