import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { detectAddAction } from "./news-contract.mjs";
import { addNewsFile } from "./news-add.mjs";
import { readNewsFiles } from "./news-validate.mjs";

const ROOT = process.cwd();
const TMP = path.resolve(".radar");
const RESULT = path.join(TMP, "result.json");
const CANDIDATE = path.join(TMP, "candidate.json");
const PURPOSES = new Set(["seo", "criterio", "caso"]);
const TERRITORIES = new Set(["automatizacion-procesos", "ia-aplicada-empresas", "crm-automatizacion-comercial", "data-analytics"]);
const CTA = {
  "automatizacion-procesos": "/servicios/process-automation",
  "ia-aplicada-empresas": "/servicios/ai-agents",
  "crm-automatizacion-comercial": "/servicios/software-integrations",
  "data-analytics": "/servicios/data-engineering",
};
const CATEGORY = {
  "automatizacion-procesos": "Automatización",
  "ia-aplicada-empresas": "IA aplicada",
  "crm-automatizacion-comercial": "CRM y automatización comercial",
  "data-analytics": "Data & Analytics",
};
const TYPE = { seo: "guia", criterio: "analisis", caso: "caso" };
const STOP = new Set("a al ante como con de del desde el en entre es la las lo los para por que se sin su sus un una y".split(" "));

function todayART() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts().map(({ type, value }) => [type, value]));
  return `${p.year}-${p.month}-${p.day}`;
}
function norm(v = "") { return String(v).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim(); }
function slugify(v = "") { return norm(v).replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 90); }
function tokens(v = "") { return new Set(norm(v).split(/[\s-]+/).filter((x) => x.length > 2 && !STOP.has(x))); }
export function jaccardSimilarity(a, b) {
  const x = tokens(a), y = tokens(b); if (!x.size || !y.size) return 0;
  let i = 0; for (const t of x) if (y.has(t)) i += 1;
  return i / (x.size + y.size - i);
}
export function semanticCollision(existing, candidate, threshold = 0.72) {
  let best = { similarity: 0, slug: null };
  const c = `${candidate.title || ""} ${candidate.primaryKeyword || ""}`;
  for (const a of existing) {
    const similarity = jaccardSimilarity(c, `${a.title || ""} ${a.primaryKeyword || ""}`);
    if (similarity > best.similarity) best = { similarity, slug: a.slug };
  }
  return { conflict: best.similarity >= threshold, ...best };
}
function compact(articles) { return articles.map(({ title, slug, contentPurpose, contentType, territory, excerpt, primaryKeyword, topicFingerprint }) => ({ title, slug, contentPurpose, contentType, territory, excerpt, primaryKeyword, topicFingerprint })); }
async function optional(file, n) { try { return (await fs.readFile(path.resolve(file), "utf8")).slice(0, n); } catch { return ""; } }
function promptFor(articles, context, today) {
  const corpus = compact(articles);
  return `Sos Radar V2, editor autónomo de NexOps. Elegí como máximo UNA pieza evergreen nueva.\n\nFASE SEGURA:\n- Sólo contentPurpose seo, criterio o caso. Nunca actualidad: este runner no tiene recuperación web de fuentes primarias.\n- Publicar sólo con engineScore >=85. Si no hay oportunidad fuerte y distinta, decision=skip.\n- No inventar clientes, métricas, estudios, benchmarks, fechas, regulación ni resultados. No hacer afirmaciones externas que requieran verificación web.\n- Usar razonamiento operativo, ejemplos hipotéticos explícitos e internal linking.\n- No repetir problema, intención, promesa ni núcleo semántico de artículos existentes.\n- 1.100-1.700 palabras, español profesional rioplatense, sin humo de IA.\n- sources debe ser []. No incluir readingTime ni coverImage ni engineRunId.\n- relatedSlugs: 2-3 slugs existentes. Links de content sólo /noticias/<slug>.\n- Bloques permitidos: paragraph, heading, list, quote, link.\n- seoTitle 20-70; metaDescription 70-180; excerpt <=280; slug lower-kebab.\n- CTA a un servicio real.\n\nScore 100: fit/problema 25, intención 20, utilidad 20, proximidad comercial 15, criterio NexOps 10, cluster 5, base segura 5.\nFecha: ${today}.\nCTA por territorio: ${JSON.stringify(CTA)}\nCorpus activo: ${JSON.stringify(corpus, null, 2)}\nContexto editorial:\n${context}\n\nDevolvé JSON puro: {"decision":"skip","reason":"..."} o {"decision":"publish","reason":"...","article":{...}}.\narticle debe incluir: title, slug, contentPurpose, contentType, territory, category, publishedAt, excerpt, seoTitle, metaDescription, primaryKeyword, searchIntent, sources, content, relatedSlugs, topicFingerprint, engineScore, generatedByEngine, cta.`;
}
async function modelId(token) {
  if (process.env.RADAR_MODEL) return process.env.RADAR_MODEL;
  const prefs = ["openai/gpt-5.1", "openai/gpt-5", "openai/gpt-4.1", "openai/gpt-4o"];
  try {
    const r = await fetch("https://models.github.ai/catalog/models", { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2026-03-10" } });
    if (r.ok) { const c = await r.json(); const ids = new Set(c.map((m) => m.id)); return prefs.find((id) => ids.has(id)) || c.find((m) => m.publisher?.toLowerCase() === "openai" && m.supported_output_modalities?.includes("text"))?.id || "openai/gpt-4.1"; }
  } catch { /* fallback below */ }
  return "openai/gpt-4.1";
}
async function askModel(token, prompt) {
  if (!token) throw new Error("GITHUB_TOKEN ausente");
  const model = await modelId(token);
  const r = await fetch("https://models.github.ai/inference/chat/completions", {
    method: "POST",
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2026-03-10", "Content-Type": "application/json" },
    body: JSON.stringify({ model, temperature: 0.2, max_tokens: 12000, response_format: { type: "json_object" }, messages: [{ role: "system", content: "Sé conservador con hechos, exigente con duplicación y estricto con el JSON." }, { role: "user", content: prompt }] }),
  });
  const text = await r.text(); if (!r.ok) throw new Error(`GitHub Models ${r.status}: ${text.slice(0, 400)}`);
  const payload = JSON.parse(text); return { model, data: JSON.parse(payload.choices?.[0]?.message?.content || "{}") };
}
function sanitize(raw, today, runId) {
  if (!raw || typeof raw !== "object") throw new Error("article inválido");
  if (!PURPOSES.has(raw.contentPurpose) || !TERRITORIES.has(raw.territory)) throw new Error("purpose/territory fuera de fase");
  const slug = slugify(raw.slug || raw.title); if (!slug) throw new Error("slug vacío");
  const content = Array.isArray(raw.content) ? raw.content : [];
  for (const b of content) {
    if (!["paragraph", "heading", "list", "quote", "link"].includes(b?.type)) throw new Error(`bloque fuera de fase: ${b?.type}`);
    if (b.type === "link" && !String(b.href || "").startsWith("/noticias/")) throw new Error("content link externo/no permitido");
  }
  return {
    title: String(raw.title || "").trim(), slug, contentPurpose: raw.contentPurpose, contentType: TYPE[raw.contentPurpose], territory: raw.territory,
    category: CATEGORY[raw.territory], publishedAt: today, excerpt: String(raw.excerpt || "").trim(), seoTitle: String(raw.seoTitle || "").trim(),
    metaDescription: String(raw.metaDescription || "").trim(), primaryKeyword: String(raw.primaryKeyword || "").trim(), searchIntent: String(raw.searchIntent || "informacional-comercial").trim(),
    sources: [], content, relatedSlugs: Array.isArray(raw.relatedSlugs) ? raw.relatedSlugs.slice(0, 3) : [],
    topicFingerprint: String(raw.topicFingerprint || `${raw.contentPurpose}:${raw.territory}:${slug}`).trim().toLowerCase(), engineRunId: runId,
    engineScore: Number.isInteger(raw.engineScore) ? raw.engineScore : Math.round(Number(raw.engineScore) || 0), generatedByEngine: true,
    cta: { label: String(raw.cta?.label || "Conversar sobre este proceso").trim(), href: CTA[raw.territory] },
  };
}

const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const t = Buffer.from(type), l = Buffer.alloc(4), c = Buffer.alloc(4); l.writeUInt32BE(data.length); c.writeUInt32BE(crc32(Buffer.concat([t, data]))); return Buffer.concat([l, t, data, c]); }
export function createRadarCoverBuffer({ slug, territory, width = 1600, height = 900 }) {
  const palettes = {
    "automatizacion-procesos": [[9, 18, 38], [48, 46, 129], [129, 140, 248]], "ia-aplicada-empresas": [[20, 12, 42], [88, 28, 135], [167, 139, 250]],
    "crm-automatizacion-comercial": [[7, 24, 43], [10, 86, 140], [56, 189, 248]], "data-analytics": [[6, 27, 36], [14, 116, 144], [34, 211, 238]],
  };
  const [a, b, accent] = palettes[territory] || palettes["automatizacion-procesos"];
  const seed = crypto.createHash("sha256").update(slug).digest().readUInt32BE(0), row = width * 3, raw = Buffer.alloc((row + 1) * height);
  for (let y = 0; y < height; y++) {
    const ro = y * (row + 1); raw[ro] = 0;
    for (let x = 0; x < width; x++) {
      const p = ro + 1 + x * 3, mix = Math.min(1, y / height * 0.55 + x / width * 0.25), grid = (x % 160 < 2 || y % 140 < 2), lane = Math.abs(y - (260 + ((seed >>> 3) & 31))) < 5 || Math.abs(y - (450 + ((seed >>> 8) & 31))) < 5 || Math.abs(y - (640 + ((seed >>> 13) & 31))) < 5;
      for (let k = 0; k < 3; k++) { let v = a[k] * (1 - mix) + b[k] * mix; if (grid) v = v * 0.9 + 255 * 0.1; if (lane && x > 180 && x < 1420) v = v * 0.55 + accent[k] * 0.45; raw[p + k] = Math.round(v); }
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
export function inspectPng(b) { if (b.length < 33 || !b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error("PNG inválido"); return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), bytes: b.length }; }

async function output(name, value) { if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `${name}=${String(value).replace(/\n/g, " ")}\n`); }
async function writeResult(x) { await fs.mkdir(TMP, { recursive: true }); await fs.writeFile(RESULT, `${JSON.stringify(x, null, 2)}\n`); }
async function gh(route, options = {}) {
  const token = process.env.GITHUB_TOKEN; if (!token) throw new Error("GITHUB_TOKEN ausente");
  const r = await fetch(`https://api.github.com${route}`, { ...options, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2026-03-10", ...(options.headers || {}) } });
  const text = await r.text(); if (!r.ok) throw new Error(`GitHub API ${r.status}: ${text.slice(0, 400)}`); return text ? JSON.parse(text) : null;
}
async function gate() {
  const repo = process.env.GITHUB_REPOSITORY || "AlanTN13/webneoxps", pulls = await gh(`/repos/${repo}/pulls?state=open&per_page=100`);
  const active = pulls.filter((p) => p.head?.ref?.startsWith("radar/") || p.title?.startsWith("[Radar V2]"));
  await output("blocked", active.length ? "true" : "false"); await output("active_pr", active[0]?.number || "");
  console.log(active.length ? `Backpressure: PR Radar #${active[0].number} abierto.` : "Backpressure: libre.");
}
async function plan() {
  const articles = await readNewsFiles(), today = todayART(), runNumber = process.env.GITHUB_RUN_NUMBER || "manual", runId = `radar-v2-${today}-${runNumber}`;
  const context = [await optional("docs/content-engine/README.md", 9000), await optional("docs/content-engine-v1.md", 6000)].filter(Boolean).join("\n---\n");
  const { model, data } = await askModel(process.env.GITHUB_TOKEN, promptFor(articles, context, today));
  if (data.decision !== "publish") { const r = { decision: "skip", reason: String(data.reason || "Sin candidato >85"), model, runId, today }; await writeResult(r); await output("decision", "skip"); await output("reason", r.reason); return; }
  const article = sanitize(data.article, today, runId);
  if (article.engineScore < 85) { const r = { decision: "skip", reason: `Score ${article.engineScore}/100`, model, runId, today }; await writeResult(r); await output("decision", "skip"); await output("reason", r.reason); return; }
  const semantic = semanticCollision(articles, article); if (semantic.conflict) { const r = { decision: "skip", reason: `Solapamiento con ${semantic.slug} (${semantic.similarity.toFixed(2)})`, model, runId, today }; await writeResult(r); await output("decision", "skip"); await output("reason", r.reason); return; }
  article.coverImage = `/assets/insights/cover-radar-${article.slug}.png`;
  const check = detectAddAction(articles, article); if (check.action !== "add") { const r = { decision: "skip", reason: (check.errors || []).join(" | "), model, runId, today }; await writeResult(r); await output("decision", "skip"); await output("reason", r.reason); return; }
  await fs.mkdir(TMP, { recursive: true }); await fs.writeFile(CANDIDATE, `${JSON.stringify(article, null, 2)}\n`);
  const cover = createRadarCoverBuffer({ slug: article.slug, territory: article.territory }), info = inspectPng(cover), ratio = info.width / info.height;
  if (info.width < 1600 || info.height < 900 || Math.abs(ratio - 16/9) > 0.01 || info.bytes < 5000 || info.bytes > 1500000) throw new Error(`cover gate: ${info.width}x${info.height}, ${info.bytes} bytes`);
  const coverFile = path.resolve("public", article.coverImage.slice(1)); await fs.mkdir(path.dirname(coverFile), { recursive: true }); await fs.writeFile(coverFile, cover);
  const articleFile = await addNewsFile({ source: CANDIDATE }), branch = `radar/${today}-${runNumber}-${article.slug}`;
  const r = { decision: "publish", reason: String(data.reason || "Supera gates"), model, runId, today, branch, slug: article.slug, title: article.title, score: article.engineScore, purpose: article.contentPurpose, territory: article.territory, articleFile: path.relative(ROOT, articleFile), coverFile: path.relative(ROOT, coverFile), cover: info, semanticClosest: semantic };
  await writeResult(r); for (const [k,v] of Object.entries({ decision: "publish", branch, slug: article.slug, title: article.title })) await output(k, v);
}
async function openPr() {
  const repo = process.env.GITHUB_REPOSITORY || "AlanTN13/webneoxps", r = JSON.parse(await fs.readFile(RESULT, "utf8")); if (r.decision !== "publish") throw new Error("No hay publicación");
  const body = `## Radar V2 — publicación autónoma controlada\n\n- **Título:** ${r.title}\n- **Purpose:** \`${r.purpose}\`\n- **Territorio:** \`${r.territory}\`\n- **Score:** ${r.score}/100\n- **Modelo:** \`${r.model}\`\n- **Run:** \`${r.runId}\`\n\n### Gates previos\n- backpressure: PASS\n- dedupe contractual: PASS\n- dedupe semántico heurístico: PASS\n- portada PNG 1600×900: PASS\n- news:validate / news:test / lint / build: PASS\n\n### Guardrail\nEste flujo **no mergea main**. El PR queda para revisión humana; Vercel puede crear preview por integración Git y el Content Engine se re-despacha sobre la rama.`;
  const pr = await gh(`/repos/${repo}/pulls`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `[Radar V2] ${r.title}`, head: r.branch, base: "main", body, draft: false }) });
  await output("pr_number", pr.number); await output("pr_url", pr.html_url); console.log(pr.html_url);
}
async function dispatchValidation() {
  const repo = process.env.GITHUB_REPOSITORY || "AlanTN13/webneoxps", r = JSON.parse(await fs.readFile(RESULT, "utf8")); if (r.decision !== "publish") return;
  await gh(`/repos/${repo}/actions/workflows/content-engine-validation.yml/dispatches`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: r.branch }) });
}
async function main() { const cmd = process.argv[2] || "plan"; if (cmd === "gate") return gate(); if (cmd === "plan") return plan(); if (cmd === "open-pr") return openPr(); if (cmd === "dispatch-validation") return dispatchValidation(); throw new Error(`Comando desconocido: ${cmd}`); }
const cli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (cli) main().catch((e) => { console.error(`Radar V2 ERROR — ${e.message}`); process.exitCode = 1; });
