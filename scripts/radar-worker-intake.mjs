import fs from "node:fs/promises";
import path from "node:path";
import { validateWorkerRequest } from "./radar-worker-contract.mjs";

export async function validateRequestFile(inputPath, options = {}) {
  const parsed = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
  const request = validateWorkerRequest(parsed, options);
  if (options.historyRoot) {
    const destination = path.resolve(options.historyRoot, "requests", `${request.requestId}.json`);
    const body = `${JSON.stringify(request, null, 2)}\n`;
    await fs.mkdir(path.dirname(destination), { recursive: true });
    try {
      await fs.writeFile(destination, body, { encoding: "utf8", flag: "wx" });
      request.persisted = true;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      if (await fs.readFile(destination, "utf8") !== body) throw new Error("requestId ya existe con otra solicitud");
      request.persisted = false;
    }
  }
  return request;
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) throw new Error("Uso: radar-worker-intake.mjs <request.json>");
  const historyRoot = process.argv[3];
  const request = await validateRequestFile(inputPath, {
    allowedCallbackOrigins: process.env.RADAR_ALLOWED_CALLBACK_ORIGINS,
    historyRoot,
  });
  const output = JSON.stringify({
    valid: true,
    requestId: request.requestId,
    workspaceId: request.workspaceId,
    persisted: request.persisted ?? null,
  });
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `request=${output}\n`, "utf8");
  console.log(output);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((error) => {
    console.error(`radar:worker:intake ERROR — ${error.message}`);
    process.exitCode = 1;
  });
}
