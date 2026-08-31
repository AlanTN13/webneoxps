import { projectRadarHistory } from "../server/radar-projection.mjs";

const MAX_RECORDS = 200;

function configuration() {
  return {
    repository: process.env.RADAR_HISTORY_REPOSITORY,
    branch: process.env.RADAR_HISTORY_BRANCH,
    token: process.env.RADAR_HISTORY_READ_TOKEN,
  };
}

async function githubApi(config, endpoint) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`https://api.github.com/repos/${config.repository}${endpoint}`, {
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${config.token}`,
        "user-agent": "NexOps-Radar-Control-Center",
        "x-github-api-version": "2022-11-28",
      },
      signal: controller.signal,
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.message || `GitHub respondió ${response.status}`);
    return body;
  } finally {
    clearTimeout(timeout);
  }
}

async function readHistory(config) {
  const metadata = await githubApi(config, "");
  if (metadata.private !== true || metadata.visibility !== "private") throw new Error("La fuente configurada no es privada");

  const ref = await githubApi(config, `/git/ref/heads/${encodeURIComponent(config.branch)}`);
  const tree = await githubApi(config, `/git/trees/${ref.object.sha}?recursive=1`);
  const entries = (tree.tree || [])
    .filter((entry) => entry.type === "blob" && /^no-publication\/[a-z0-9][a-z0-9._-]{5,80}\.json$/.test(entry.path))
    .slice(-MAX_RECORDS);

  const records = [];
  for (let index = 0; index < entries.length; index += 10) {
    const batch = entries.slice(index, index + 10);
    const blobs = await Promise.all(batch.map((entry) => githubApi(config, `/git/blobs/${entry.sha}`)));
    for (const blob of blobs) {
      try {
        records.push(JSON.parse(Buffer.from(String(blob.content || "").replace(/\s/g, ""), "base64").toString("utf8")));
      } catch {
        // Un registro inválido se omite; nunca se devuelve contenido sin validar.
      }
    }
  }
  return projectRadarHistory(records);
}

function send(response, status, body) {
  response.status(status);
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.send(JSON.stringify(body));
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    send(response, 405, { status: "error", message: "Método no permitido" });
    return;
  }

  const config = configuration();
  if (!config.repository?.includes("/") || !config.branch || !config.token) {
    send(response, 503, {
      status: "unavailable",
      message: "El historial de decisiones todavía no está conectado en este entorno.",
      decisions: [],
    });
    return;
  }

  try {
    const decisions = await readHistory(config);
    send(response, 200, {
      status: "ready",
      generatedAt: new Date().toISOString(),
      decisions,
    });
  } catch {
    send(response, 502, {
      status: "error",
      message: "Radar no pudo consultar el historial de decisiones.",
      decisions: [],
    });
  }
}
