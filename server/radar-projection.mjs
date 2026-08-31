const SENSITIVE_VALUE = /(gh[pousr]_[a-z0-9]{20,}|sk-[a-z0-9_-]{16,}|bearer\s+[a-z0-9._-]{16,}|(?:token|api[_-]?key|secret|signature|x-amz-credential)=)/i;
const ENGINE_RUN_ID = /^[a-z0-9][a-z0-9._-]{5,80}$/;

const DIMENSIONS = new Map([
  ["seo", { dimension: "seo", label: "Valor SEO" }],
  ["search-intent", { dimension: "seo", label: "Valor SEO" }],
  ["business", { dimension: "business", label: "Relevancia comercial" }],
  ["commercial", { dimension: "business", label: "Relevancia comercial" }],
  ["relevance", { dimension: "business", label: "Relevancia comercial" }],
  ["timeliness", { dimension: "timeliness", label: "Actualidad" }],
  ["recency", { dimension: "timeliness", label: "Actualidad" }],
  ["source", { dimension: "source", label: "Calidad de fuente" }],
  ["authority", { dimension: "source", label: "Calidad de fuente" }],
  ["novelty", { dimension: "novelty", label: "Novedad" }],
  ["editorial-fit", { dimension: "novelty", label: "Novedad" }],
]);

function text(value, maxLength) {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) return null;
  return value.trim();
}

function safeUrl(value) {
  const normalized = text(value, 2_000);
  if (!normalized) return null;
  try {
    const parsed = new URL(normalized);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function classifyRecord(record) {
  const combined = `${record?.candidate?.title || ""} ${record?.candidate?.topic || ""}`;
  let hostname = "";
  try { hostname = new URL(record?.candidate?.source?.url).hostname; } catch { /* invalid URLs fail later */ }
  return hostname === "example.com" || /sint[eé]tic|validaci[oó]n post-merge/i.test(combined)
    ? "validation"
    : "opportunity";
}

function projectBreakdown(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    const criterion = text(entry?.criterion, 64)?.toLowerCase();
    const mapped = criterion ? DIMENSIONS.get(criterion) : null;
    if (!mapped || typeof entry?.score !== "number" || !Number.isFinite(entry.score) || entry.score < 0 || entry.score > 100) return [];
    return [{ ...mapped, score: entry.score }];
  });
}

export function projectRadarHistoryRecord(record) {
  if (!record || record.schemaVersion !== 1 || record.outcome !== "NO_PUBLICATION") return null;
  const engineRunId = text(record.engineRunId, 81);
  const detectedAt = text(record.timestamp, 40);
  const title = text(record.candidate?.title, 300);
  const topic = text(record.candidate?.topic, 300);
  const sourceName = text(record.candidate?.source?.name, 200);
  const sourceUrl = safeUrl(record.candidate?.source?.url);
  const reason = text(record.rejectionReason, 1_000);
  const score = record.score?.total;
  const parsedDate = detectedAt ? new Date(detectedAt) : null;

  if (
    !engineRunId || !ENGINE_RUN_ID.test(engineRunId) || !detectedAt || !parsedDate || Number.isNaN(parsedDate.getTime()) ||
    !title || !topic || !sourceName || !sourceUrl || !reason ||
    typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100
  ) return null;

  const projected = {
    id: engineRunId,
    runId: engineRunId,
    kind: classifyRecord(record),
    outcome: "NO_PUBLICATION",
    detectedAt: parsedDate.toISOString(),
    title,
    topic,
    sourceName,
    sourceUrl,
    score,
    scoreBreakdown: projectBreakdown(record.score?.breakdown),
    reason,
    category: text(record.editorialMetadata?.category, 120) || "Radar NexOps",
    territory: text(record.editorialMetadata?.territory, 120),
  };

  return SENSITIVE_VALUE.test(JSON.stringify(projected)) ? null : projected;
}

export function projectRadarHistory(records) {
  return records
    .map(projectRadarHistoryRecord)
    .filter(Boolean)
    .sort((left, right) => right.detectedAt.localeCompare(left.detectedAt));
}
