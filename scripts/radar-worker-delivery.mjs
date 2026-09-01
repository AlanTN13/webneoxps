import fs from "node:fs/promises";
import path from "node:path";
import {
  canonicalJson,
  createCallbackEnvelope,
  digest,
  signCallback,
  validateWorkerRequest,
  validateWorkerResult,
} from "./radar-worker-contract.mjs";
import { FileNoPublicationStore } from "./radar-v3-no-publication-store.mjs";

async function existingJson(filePath) {
  try { return JSON.parse(await fs.readFile(filePath, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}

async function writeExclusiveOrMatch(filePath, value) {
  const body = `${JSON.stringify(value, null, 2)}\n`;
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.writeFile(filePath, body, { encoding: "utf8", flag: "wx" });
    return true;
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    if (await fs.readFile(filePath, "utf8") !== body) throw new Error(`Colisión idempotente en ${path.basename(filePath)}`);
    return false;
  }
}

export async function deliverResultFiles({
  requestPath: inputRequestPath,
  resultPath: inputResultPath,
  historyRoot,
  allowedCallbackOrigins,
  callbackSecret,
  fetchImpl = fetch,
  now = () => new Date(),
}) {
  const request = validateWorkerRequest(JSON.parse(await fs.readFile(path.resolve(inputRequestPath), "utf8")), { allowedCallbackOrigins });
  const result = validateWorkerResult(JSON.parse(await fs.readFile(path.resolve(inputResultPath), "utf8")), request);
  const root = path.resolve(historyRoot || ".");
  const persistedResultPath = path.resolve(root, "results", `${request.requestId}.json`);
  const deliveryPath = path.resolve(root, "deliveries", `${request.requestId}.json`);
  const privateResultDigest = digest(result);
  const existingDelivery = await existingJson(deliveryPath);
  if (existingDelivery) {
    if (existingDelivery.privateResultDigest !== privateResultDigest) throw new Error("requestId ya fue entregado con otro resultado");
    return { duplicate: true, request, result, delivery: existingDelivery };
  }

  await writeExclusiveOrMatch(persistedResultPath, result);
  let noPublicationStorage = null;
  if (result.status === "no_publication") {
    noPublicationStorage = await new FileNoPublicationStore(root).persist(result.noPublication);
  }

  const envelope = createCallbackEnvelope(request, result);
  const rawBody = canonicalJson(envelope);
  const timestamp = String(Math.floor(now().getTime() / 1_000));
  const signature = signCallback(rawBody, callbackSecret, timestamp);
  const response = await fetchImpl(request.callbackUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": request.requestId,
      "x-radar-delivery-id": envelope.deliveryId,
      "x-radar-signature": signature,
      "x-radar-timestamp": timestamp,
    },
    body: rawBody,
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Callback rechazado con HTTP ${response.status}`);

  const delivery = {
    schemaVersion: 1,
    requestId: request.requestId,
    privateResultDigest,
    callbackResultDigest: envelope.resultDigest,
    callbackStatus: "DELIVERED",
    deliveredAt: now().toISOString(),
    noPublicationPath: noPublicationStorage?.path || null,
  };
  await writeExclusiveOrMatch(deliveryPath, delivery);
  return { duplicate: false, request, result, delivery, envelope };
}

async function main() {
  const [requestPath, resultPath, historyRoot] = process.argv.slice(2);
  if (!requestPath || !resultPath || !historyRoot) {
    throw new Error("Uso: radar-worker-delivery.mjs <request.json> <result.json> <history-root>");
  }
  const output = await deliverResultFiles({
    requestPath,
    resultPath,
    historyRoot,
    allowedCallbackOrigins: process.env.RADAR_ALLOWED_CALLBACK_ORIGINS,
    callbackSecret: process.env.RADAR_CALLBACK_SECRET,
  });
  const summary = JSON.stringify({
    requestId: output.request.requestId,
    status: output.result.status,
    duplicate: output.duplicate,
  });
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `delivery=${summary}\n`, "utf8");
  console.log(summary);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((error) => {
    console.error(`radar:worker:delivery ERROR — ${error.message}`);
    process.exitCode = 1;
  });
}
