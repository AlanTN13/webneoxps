import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "../..");
const CLI = path.join(ROOT, "scripts/radar-v3-no-publication.mjs");

function payload(overrides = {}) {
  return {
    outcome: "NO_PUBLICATION",
    engineRunId: "radar-2026-08-23-009",
    timestamp: "2026-08-23T23:10:00.000Z",
    title: "Una actualización menor de una plataforma de CRM",
    topic: "Cambio de interfaz sin impacto operativo comprobable",
    source: { name: "Documentación oficial", url: "https://example.com/product-update" },
    scoreTotal: 61,
    scoreBreakdown: [
      { criterion: "relevance", score: 72 },
      { criterion: "novelty", score: 41 },
      { criterion: "editorial-fit", score: 68 },
    ],
    policyVersion: "radar-v3.1",
    reason: "No supera el umbral editorial por baja novedad y escaso impacto operativo.",
    topicFingerprint: "crm:product-update:minor-ui",
    editorialMetadata: {
      contentType: "actualidad",
      contentPurpose: "actualidad",
      territory: "crm-automatizacion-comercial",
      category: "crm",
      primaryEntity: "Plataforma CRM",
      visualType: "product-interface",
    },
    assetReference: {
      kind: "official-product-reference",
      reference: "https://example.com/product-update/cover.png",
      source: "Documentación oficial",
      credit: "Referencia evaluada; no publicada.",
    },
    ...overrides,
  };
}

async function runCli(rootDirectory, eventPayload, suffix = "event") {
  const eventPath = path.join(rootDirectory, `${suffix}.json`);
  const resultPath = path.join(rootDirectory, `${suffix}-result.json`);
  await fs.writeFile(eventPath, JSON.stringify({ client_payload: eventPayload }), "utf8");
  const processResult = spawnSync(process.execPath, [CLI, eventPath], {
    cwd: ROOT,
    encoding: "utf8",
    env: {
      ...process.env,
      RADAR_HISTORY_LOCAL_DIR: path.join(rootDirectory, "history"),
      RADAR_NO_PUBLICATION_RESULT: resultPath,
    },
  });
  return { processResult, resultPath };
}

test("NO_PUBLICATION persiste en un store real, durable e idempotente sin tocar el corpus", async (t) => {
  const rootDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "radar-no-publication-"));
  t.after(() => fs.rm(rootDirectory, { recursive: true, force: true }));
  const newsBefore = await fs.readdir(path.join(ROOT, "src/data/news"));

  const first = await runCli(rootDirectory, payload(), "first");
  assert.equal(first.processResult.status, 0, first.processResult.stderr);
  const result = JSON.parse(await fs.readFile(first.resultPath, "utf8"));
  const storedPath = path.join(rootDirectory, "history", result.storage.path);
  const stored = JSON.parse(await fs.readFile(storedPath, "utf8"));

  assert.equal(result.storage.created, true);
  assert.equal(stored.outcome, "NO_PUBLICATION");
  assert.equal(stored.engineRunId, "radar-2026-08-23-009");
  assert.equal(stored.score.total, 61);
  assert.equal(stored.score.breakdown.length, 3);
  assert.equal(stored.rejectionReason, payload().reason);
  assert.equal(stored.assetReference.kind, "official-product-reference");
  assert.doesNotMatch(JSON.stringify(stored), /weight|threshold|formula|prompt|reasoning|researchNotes/i);
  assert.deepEqual(await fs.readdir(path.join(ROOT, "src/data/news")), newsBefore);

  const second = await runCli(rootDirectory, payload(), "second");
  assert.equal(second.processResult.status, 0, second.processResult.stderr);
  const repeated = JSON.parse(await fs.readFile(second.resultPath, "utf8"));
  assert.equal(repeated.storage.created, false);
  assert.deepEqual(JSON.parse(await fs.readFile(storedPath, "utf8")), stored);
});

test("NO_PUBLICATION rechaza know-how sensible y no crea ningún registro", async (t) => {
  const rootDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "radar-no-publication-private-"));
  t.after(() => fs.rm(rootDirectory, { recursive: true, force: true }));
  const unsafe = payload({ scoringFormula: "0.6 * novelty + 0.4 * authority" });
  const result = await runCli(rootDirectory, unsafe, "unsafe");
  assert.notEqual(result.processResult.status, 0);
  assert.match(result.processResult.stderr, /campos no persistibles/);
  await assert.rejects(fs.access(path.join(rootDirectory, "history")));

  const signedAsset = payload({
    engineRunId: "radar-2026-08-23-010",
    assetReference: {
      kind: "licensed-photo",
      reference: "https://assets.example.com/cover.jpg?token=private-value",
    },
  });
  const secretResult = await runCli(rootDirectory, signedAsset, "signed-asset");
  assert.notEqual(secretResult.processResult.status, 0);
  assert.match(secretResult.processResult.stderr, /credencial o URL firmada/);
  await assert.rejects(fs.access(path.join(rootDirectory, "history")));
});

test("NO_PUBLICATION nunca sobrescribe un engineRunId con contenido diferente", async (t) => {
  const rootDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "radar-no-publication-collision-"));
  t.after(() => fs.rm(rootDirectory, { recursive: true, force: true }));
  const first = await runCli(rootDirectory, payload(), "original");
  assert.equal(first.processResult.status, 0, first.processResult.stderr);
  const collision = await runCli(rootDirectory, payload({ reason: "Un motivo incompatible para el mismo ID." }), "collision");
  assert.notEqual(collision.processResult.status, 0);
  assert.match(collision.processResult.stderr, /corrida ya existe con otro contenido/);
});
