import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://www.nexopstech.com";
const ROOT = process.cwd();

function text(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function absoluteUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function articleSource(article) {
  const source = Array.isArray(article.sources)
    ? article.sources.find((item) => item?.name && item?.url)
    : null;
  return {
    name: text(article.sourceName, text(source?.name, "NexOps")),
    url: text(article.sourceUrl, text(source?.url, `${SITE_URL}/noticias/${article.slug}`)),
  };
}

export function projectRadarPublication(article) {
  if (
    !article ||
    article.generatedByEngine !== true ||
    !text(article.slug) ||
    !text(article.title) ||
    !text(article.engineRunId) ||
    !Number.isFinite(article.engineScore) ||
    !text(article.publishedAt)
  ) return null;

  const source = articleSource(article);
  const publishedAt = new Date(article.publishedAt);
  if (Number.isNaN(publishedAt.getTime())) return null;

  return {
    id: `publication-${article.slug}`,
    runId: article.engineRunId,
    outcome: "PUBLICATION",
    status: "verified",
    title: article.title,
    topic: text(article.primaryEntity, text(article.primaryKeyword, text(article.category, "Radar NexOps"))),
    category: text(article.category, text(article.territory, "Radar NexOps")),
    summary: text(article.excerpt, text(article.metaDescription, "Publicación generada por Radar.")),
    sourceName: source.name,
    sourceUrl: source.url,
    score: article.engineScore,
    scoreBreakdown: [],
    publishedAt: publishedAt.toISOString(),
    url: `${SITE_URL}/noticias/${article.slug}`,
    imageUrl: absoluteUrl(article.coverImage),
    reason: text(article.excerpt, "Radar validó la oportunidad y la convirtió en contenido público."),
  };
}

export async function generateRadarManifest({
  newsDirectory = path.join(ROOT, "src/data/news"),
  outputFile = path.join(ROOT, "public/radar-publications.json"),
  generatedAt = new Date().toISOString(),
} = {}) {
  const names = (await fs.readdir(newsDirectory)).filter((name) => name.endsWith(".json")).sort();
  const publications = [];

  for (const name of names) {
    const article = JSON.parse(await fs.readFile(path.join(newsDirectory, name), "utf8"));
    const publication = projectRadarPublication(article);
    if (publication) publications.push(publication);
  }

  publications.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  const manifest = {
    schemaVersion: 1,
    workspace: "nexops",
    generatedAt,
    publications,
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifest = await generateRadarManifest();
  console.log(`radar:manifest OK — ${manifest.publications.length} publicación(es) reales`);
}
