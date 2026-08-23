import assert from "node:assert/strict";
import test from "node:test";
import { executeRadarV3, RadarV3Error } from "../../scripts/radar-v3-core.mjs";
import {
  createNoPublicationRecord,
  GitHubNoPublicationStore,
  noPublicationRecordPath,
} from "../../scripts/radar-v3-no-publication-store.mjs";

function payload(suffix = "001", overrides = {}) {
  return {
    outcome: "NO_PUBLICATION",
    engineRunId: `radar-2026-08-23-${suffix}`,
    timestamp: `2026-08-23T23:${suffix.slice(-2).padStart(2, "0")}:00.000Z`,
    title: `Candidato rechazado ${suffix}`,
    topic: "Actualización sin impacto operativo suficiente",
    source: { name: "Fuente oficial", url: `https://example.com/update-${suffix}` },
    scoreTotal: 62,
    scoreBreakdown: [
      { criterion: "relevance", score: 70 },
      { criterion: "novelty", score: 43 },
    ],
    policyVersion: "radar-v3.1",
    reason: "No supera los gates editoriales.",
    topicFingerprint: `crm:update:${suffix}`,
    editorialMetadata: { contentType: "actualidad", category: "crm" },
    assetReference: null,
    ...overrides,
  };
}

function jsonResponse(status, body) {
  return {
    status,
    ok: status >= 200 && status < 300,
    async json() { return body; },
  };
}

class FakeGitHubApi {
  constructor({ repository = "private-owner/private-radar-history", branch = "history", privateRepository = true } = {}) {
    this.repository = repository;
    this.branch = branch;
    this.refs = new Map();
    this.blobs = new Map();
    this.trees = new Map();
    this.commits = new Map();
    this.requests = [];
    this.sequence = 0;
    this.conflictOnNextRefUpdate = false;
    this.failure = null;
    this.privateRepository = privateRepository;
  }

  next(prefix) {
    this.sequence += 1;
    return `${prefix}-${this.sequence}`;
  }

  failNext(method, endpoint, status = 500) {
    this.failure = { method, endpoint, status };
  }

  branchContent(relativePath) {
    const commitSha = this.refs.get(this.branch);
    if (!commitSha) return null;
    const tree = this.trees.get(this.commits.get(commitSha).tree);
    const blobSha = tree?.get(relativePath);
    return blobSha ? this.blobs.get(blobSha) : null;
  }

  advanceBranchForRace() {
    const parent = this.refs.get(this.branch);
    const parentTree = parent ? this.commits.get(parent).tree : null;
    const blobSha = this.next("blob-race");
    this.blobs.set(blobSha, "{\"race\":true}\n");
    const treeSha = this.next("tree-race");
    const tree = new Map(parentTree ? this.trees.get(parentTree) : []);
    tree.set(`no-publication/race-${this.sequence}.json`, blobSha);
    this.trees.set(treeSha, tree);
    const commitSha = this.next("commit-race");
    this.commits.set(commitSha, { tree: treeSha, parents: parent ? [parent] : [] });
    this.refs.set(this.branch, commitSha);
  }

  fetch = async (input, options = {}) => {
    const url = new URL(input);
    const prefix = `/repos/${this.repository}`;
    assert.ok(url.pathname.startsWith(prefix), `repo inesperado: ${url.pathname}`);
    const endpoint = url.pathname.slice(prefix.length);
    const method = options.method || "GET";
    const body = options.body ? JSON.parse(options.body) : null;
    this.requests.push({ method, endpoint, body });

    if (this.failure?.method === method && this.failure.endpoint === endpoint) {
      const failure = this.failure;
      this.failure = null;
      return jsonResponse(failure.status, { message: "persistencia privada no disponible" });
    }

    if (method === "GET" && endpoint === "") {
      return jsonResponse(200, {
        private: this.privateRepository,
        visibility: this.privateRepository ? "private" : "public",
      });
    }

    if (method === "GET" && endpoint === `/git/ref/heads/${this.branch}`) {
      const sha = this.refs.get(this.branch);
      return sha ? jsonResponse(200, { object: { sha } }) : jsonResponse(404, { message: "Not Found" });
    }
    if (method === "GET" && endpoint.startsWith("/git/commits/")) {
      const sha = endpoint.slice("/git/commits/".length);
      const commit = this.commits.get(sha);
      return commit ? jsonResponse(200, { tree: { sha: commit.tree }, parents: commit.parents.map((parentSha) => ({ sha: parentSha })) }) : jsonResponse(404, { message: "Not Found" });
    }
    if (method === "GET" && endpoint.startsWith("/contents/")) {
      const relativePath = endpoint.slice("/contents/".length).split("/").map(decodeURIComponent).join("/");
      const content = this.branchContent(relativePath);
      return content === null
        ? jsonResponse(404, { message: "Not Found" })
        : jsonResponse(200, { content: Buffer.from(content).toString("base64") });
    }
    if (method === "POST" && endpoint === "/git/blobs") {
      const sha = this.next("blob");
      this.blobs.set(sha, body.content);
      return jsonResponse(201, { sha });
    }
    if (method === "POST" && endpoint === "/git/trees") {
      const sha = this.next("tree");
      const tree = new Map(body.base_tree ? this.trees.get(body.base_tree) : []);
      for (const entry of body.tree) tree.set(entry.path, entry.sha);
      this.trees.set(sha, tree);
      return jsonResponse(201, { sha });
    }
    if (method === "POST" && endpoint === "/git/commits") {
      const sha = this.next("commit");
      this.commits.set(sha, { tree: body.tree, parents: body.parents });
      return jsonResponse(201, { sha });
    }
    if (method === "POST" && endpoint === "/git/refs") {
      if (this.refs.has(this.branch)) return jsonResponse(422, { message: "Reference already exists" });
      this.refs.set(this.branch, body.sha);
      return jsonResponse(201, { ref: body.ref, object: { sha: body.sha } });
    }
    if (method === "PATCH" && endpoint === `/git/refs/heads/${this.branch}`) {
      if (this.conflictOnNextRefUpdate) {
        this.conflictOnNextRefUpdate = false;
        this.advanceBranchForRace();
        return jsonResponse(422, { message: "Update is not a fast forward" });
      }
      const current = this.refs.get(this.branch);
      const candidate = this.commits.get(body.sha);
      if (body.force !== false || candidate?.parents[0] !== current) return jsonResponse(422, { message: "Update is not a fast forward" });
      this.refs.set(this.branch, body.sha);
      return jsonResponse(200, { object: { sha: body.sha } });
    }
    return jsonResponse(404, { message: `Ruta fake no implementada: ${method} ${endpoint}` });
  };
}

function adapter(api) {
  return new GitHubNoPublicationStore({
    repository: api.repository,
    branch: api.branch,
    token: "test-token-private-repo",
    fetchImpl: api.fetch,
  });
}

test("GitHubNoPublicationStore crea el historial privado con un root commit", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const record = createNoPublicationRecord(payload());
  const result = await store.persist(record);
  const head = api.commits.get(api.refs.get(api.branch));
  assert.equal(result.created, true);
  assert.deepEqual(head.parents, []);
  assert.equal(JSON.parse(api.branchContent(noPublicationRecordPath(record))).engineRunId, record.engineRunId);
});

test("GitHubNoPublicationStore agrega registros sobre el historial existente", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const first = createNoPublicationRecord(payload("001"));
  const second = createNoPublicationRecord(payload("002"));
  await store.persist(first);
  const firstHead = api.refs.get(api.branch);
  await store.persist(second);
  const secondHead = api.commits.get(api.refs.get(api.branch));
  assert.deepEqual(secondHead.parents, [firstHead]);
  assert.ok(api.branchContent(noPublicationRecordPath(first)));
  assert.ok(api.branchContent(noPublicationRecordPath(second)));
});

test("GitHubNoPublicationStore trata un retry idéntico como idempotente", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const record = createNoPublicationRecord(payload());
  await store.persist(record);
  const commitsBefore = api.commits.size;
  const result = await store.persist(record);
  assert.equal(result.created, false);
  assert.equal(api.commits.size, commitsBefore);
});

test("GitHubNoPublicationStore rechaza colisiones de engineRunId", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const original = createNoPublicationRecord(payload());
  const collision = createNoPublicationRecord(payload("001", { reason: "Otro resultado para el mismo ID." }));
  await store.persist(original);
  await assert.rejects(store.persist(collision), /corrida ya existe con otro contenido/);
  assert.equal(JSON.parse(api.branchContent(noPublicationRecordPath(original))).rejectionReason, original.rejectionReason);
});

test("GitHubNoPublicationStore reintenta una carrera de actualización sin perder commits", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const first = createNoPublicationRecord(payload("001"));
  const second = createNoPublicationRecord(payload("002"));
  await store.persist(first);
  api.conflictOnNextRefUpdate = true;
  const result = await store.persist(second);
  const patches = api.requests.filter((request) => request.method === "PATCH");
  assert.equal(result.created, true);
  assert.ok(patches.length >= 2);
  assert.ok(api.branchContent(noPublicationRecordPath(first)));
  assert.ok(api.branchContent(noPublicationRecordPath(second)));
  assert.ok([...api.trees.get(api.commits.get(api.refs.get(api.branch)).tree).keys()].some((entry) => entry.includes("race-")));
});

test("GitHubNoPublicationStore nunca actualiza una referencia con force", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  await store.persist(createNoPublicationRecord(payload("001")));
  await store.persist(createNoPublicationRecord(payload("002")));
  const patches = api.requests.filter((request) => request.method === "PATCH" && request.endpoint.includes("/git/refs/"));
  assert.ok(patches.length > 0);
  assert.ok(patches.every((request) => request.body.force === false));
  assert.equal(api.requests.some((request) => request.body?.force === true), false);
});

test("Radar V3 falla cerrado cuando GitHubNoPublicationStore no confirma la escritura", async () => {
  const api = new FakeGitHubApi();
  const store = adapter(api);
  const rejected = payload();
  const record = createNoPublicationRecord(rejected);
  const traces = [];
  api.failNext("POST", "/git/blobs", 500);
  await assert.rejects(
    executeRadarV3({
      decision: { outcome: "NO_PUBLICATION", engineRunId: record.engineRunId, reason: record.rejectionReason },
      services: {
        persistNoPublication: () => store.persist(record),
        recordTrace: async (trace) => traces.push(structuredClone(trace)),
      },
    }),
    (error) => error instanceof RadarV3Error && error.trace.status === "FAILED",
  );
  assert.equal(traces.at(-1).status, "FAILED");
  assert.equal(api.refs.size, 0);
});

test("GitHubNoPublicationStore falla cerrado si falta configuración privada", () => {
  const fetchImpl = async () => jsonResponse(500, { message: "no debería ejecutarse" });
  assert.throws(() => new GitHubNoPublicationStore({ repository: "", branch: "history", token: "token", fetchImpl }), /requiere repository, branch y token/);
  assert.throws(() => new GitHubNoPublicationStore({ repository: "private-owner/history", branch: "", token: "token", fetchImpl }), /requiere repository, branch y token/);
  assert.throws(() => new GitHubNoPublicationStore({ repository: "private-owner/history", branch: "history", token: "", fetchImpl }), /requiere repository, branch y token/);
});

test("GitHubNoPublicationStore rechaza un repositorio público aunque esté configurado", async () => {
  const api = new FakeGitHubApi({ privateRepository: false });
  const store = adapter(api);
  await assert.rejects(store.persist(createNoPublicationRecord(payload())), /debe ser un repositorio privado/);
  assert.equal(api.blobs.size, 0);
  assert.equal(api.refs.size, 0);
});
