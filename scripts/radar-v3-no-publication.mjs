import fs from "node:fs/promises";
import path from "node:path";
import {
  createNoPublicationRecord,
  FileNoPublicationStore,
  GitHubNoPublicationStore,
} from "./radar-v3-no-publication-store.mjs";
import { executeRadarV3 } from "./radar-v3-core.mjs";

async function main() {
  const inputPath = process.argv[2] || process.env.GITHUB_EVENT_PATH;
  if (!inputPath) throw new Error("Falta el JSON de repository_dispatch");
  const event = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
  const payload = event.client_payload?.record ?? event.client_payload ?? event;
  const record = createNoPublicationRecord(payload);
  const store = process.env.RADAR_HISTORY_LOCAL_DIR
    ? new FileNoPublicationStore(process.env.RADAR_HISTORY_LOCAL_DIR)
    : new GitHubNoPublicationStore({
      repository: process.env.RADAR_HISTORY_REPOSITORY,
      token: process.env.GH_TOKEN,
      branch: process.env.RADAR_HISTORY_BRANCH,
    });
  let storage;
  const trace = await executeRadarV3({
    decision: { outcome: record.outcome, engineRunId: record.engineRunId, reason: record.rejectionReason },
    services: {
      async persistNoPublication() {
        storage = await store.persist(record);
        return storage;
      },
      async recordTrace() {},
    },
  });
  const output = { record, storage, trace };
  const resultPath = process.env.RADAR_NO_PUBLICATION_RESULT;
  if (resultPath) {
    await fs.mkdir(path.dirname(path.resolve(resultPath)), { recursive: true });
    await fs.writeFile(path.resolve(resultPath), `${JSON.stringify(output, null, 2)}\n`, "utf8");
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, [
      "## Radar V3 — NO_PUBLICATION persistido",
      `- Resultado: \`${storage.created ? "CREATED" : "IDEMPOTENT"}\``,
      "- Store privado: `CONFIRMED`",
      "",
    ].join("\n"), "utf8");
  }
  console.log(JSON.stringify({ outcome: record.outcome, persisted: true, created: storage.created }));
}

main().catch((error) => {
  console.error(`radar:v3:no-publication ERROR — ${error.message}`);
  process.exitCode = 1;
});
