import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowUrl = new URL("../../.github/workflows/radar-v3-publication.yml", import.meta.url);

test("Radar V3 initializes its trace with the runner temp environment variable", async () => {
  const workflow = await readFile(workflowUrl, "utf8");

  assert.doesNotMatch(workflow, /RADAR_TRACE_PATH:\s*\$\{\{\s*runner\.temp\s*\}\}/);
  assert.match(workflow, /> "\$RUNNER_TEMP\/radar-v3-result\.json"/);
  assert.match(workflow, /path:\s*\$\{\{\s*runner\.temp\s*\}\}\/radar-v3-result\.json/);
});
