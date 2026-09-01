import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowUrl = new URL("../../.github/workflows/radar-v3-publication.yml", import.meta.url);
const runnerUrl = new URL("../../scripts/radar-v3-ci.mjs", import.meta.url);

test("Radar V3 initializes its trace with the runner temp environment variable", async () => {
  const workflow = await readFile(workflowUrl, "utf8");

  assert.doesNotMatch(workflow, /RADAR_TRACE_PATH:\s*\$\{\{\s*runner\.temp\s*\}\}/);
  assert.match(workflow, /> "\$RUNNER_TEMP\/radar-v3-result\.json"/);
  assert.match(workflow, /path:\s*\$\{\{\s*runner\.temp\s*\}\}\/radar-v3-result\.json/);
});

test("Radar V3 reserves enough output buffer for GitHub repository trees", async () => {
  const runner = await readFile(runnerUrl, "utf8");

  assert.match(runner, /COMMAND_MAX_BUFFER\s*=\s*20\s*\*\s*1024\s*\*\s*1024/);
  assert.match(runner, /maxBuffer:\s*COMMAND_MAX_BUFFER/);
});
