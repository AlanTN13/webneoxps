import fs from "node:fs/promises";
import { createHmac } from "node:crypto";

const tracePath = process.argv[2];
const secret = process.env.RADAR_PORTAL_CALLBACK_SECRET || "";
const runId = process.env.GITHUB_RUN_ID;
const repository = process.env.GITHUB_REPOSITORY;

if (!tracePath || secret.length < 32) throw new Error("El callback al Portal no está configurado");
const trace = JSON.parse(await fs.readFile(tracePath, "utf8"));
const callback = trace.portalCallback;
if (!callback || callback.runId !== trace.engineRunId || !/^[0-9a-f]{64}$/.test(callback.compositionDigest || "")) {
  throw new Error("La traza no contiene un callback aprobado");
}
const callbackUrl = new URL(callback.url);
if (callbackUrl.protocol !== "https:" || callbackUrl.origin !== "https://portal.nexopstech.com" || callbackUrl.pathname !== `/api/radar/runs/${trace.engineRunId}/publication`) {
  throw new Error("El callback no apunta al Portal productivo permitido");
}
const published = trace.status === "SUCCESS" && /^[0-9a-f]{40}$/.test(trace.github?.mergeSha || "") && trace.production?.verification?.articleUrl;
const body = JSON.stringify({
  schemaVersion: 1,
  event: "radar.publication.completed",
  requestId: trace.engineRunId,
  compositionDigest: callback.compositionDigest,
  status: published ? "published" : "failed",
  workflowUrl: repository && runId ? `https://github.com/${repository}/actions/runs/${runId}` : null,
  mergeSha: published ? trace.github.mergeSha : null,
  finalUrl: published ? trace.production.verification.articleUrl : null,
  errorMessage: published ? null : String(trace.reason || "La publicación no completó los gates de webneoxps").slice(0, 500),
});
const timestamp = String(Math.floor(Date.now() / 1000));
const deliveryId = `radar-publication-${trace.engineRunId}`;
const signature = `v1=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
const response = await fetch(callbackUrl, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-radar-timestamp": timestamp,
    "x-radar-signature": signature,
    "x-radar-delivery-id": deliveryId,
    "idempotency-key": deliveryId,
  },
  body,
  signal: AbortSignal.timeout(20_000),
});
if (!response.ok) throw new Error(`El Portal rechazó el cierre de publicación (${response.status})`);
console.log(`Portal callback OK — ${trace.engineRunId} (${published ? "published" : "failed"})`);
