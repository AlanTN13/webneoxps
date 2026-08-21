import fs from "node:fs/promises";
import path from "node:path";
import { getReadingTimeMinutes } from "../src/data/news/reading-time.js";
import { applyCoverOverride } from "../src/data/news/cover-overrides.js";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const NEWS_DIR = path.join(ROOT, "src/data/news");
const SITE_URL = "https://www.nexopstech.com";
const FALLBACK_IMAGE = `${SITE_URL}/nexops-sin-aire.png`;

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const escapeXml = escapeHtml;

async function readArticles() {
  const names = (await fs.readdir(NEWS_DIR)).filter((name) => name.endsWith(".json")).sort();
  const articles = [];
  for (const name of names) {
    const article = JSON.parse(await fs.readFile(path.join(NEWS_DIR, name), "utf8"));
    articles.push(applyCoverOverride(article));
  }
  return articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function absoluteUrl(value) {
  if (!value) return FALLBACK_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function renderContent(content = []) {
  return content.map((block) => {
    if (block.type === "heading") {
      const tag = block.level === 3 ? "h3" : "h2";
      return `<${tag}>${escapeHtml(block.text)}</${tag}>`;
    }
    if (block.type === "list") {
      const tag = block.ordered ? "ol" : "ul";
      return `<${tag}>${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
    }
    if (block.type === "quote") return `<blockquote>${escapeHtml(block.text)}</blockquote>`;
    if (block.type === "link") return `<p><a href="${escapeHtml(block.href)}">${escapeHtml(block.text)}</a></p>`;
    if (block.type === "image") return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" loading="lazy">${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}</figure>`;
    return `<p>${escapeHtml(block.text || "")}</p>`;
  }).join("\n");
}

function articleSources(article) {
  const sources = [];
  if (article.sourceUrl) sources.push(article.sourceUrl);
  for (const source of article.sources || []) if (source?.url && !sources.includes(source.url)) sources.push(source.url);
  return sources;
}

function jsonLd(article) {
  const canonical = `${SITE_URL}/noticias/${article.slug}`;
  const readingTime = getReadingTimeMinutes(article);
  const data = {
    "@context": "https://schema.org",
    "@type": article.contentPurpose === "actualidad" || (!article.contentPurpose && article.contentType === "actualidad") ? "NewsArticle" : "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    timeRequired: `PT${readingTime}M`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    image: [absoluteUrl(article.coverImage)],
    author: { "@type": "Organization", name: "NexOps", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "NexOps",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/nexops-logo-blanco.png` },
    },
    ...(articleSources(article).length ? { citation: articleSources(article) } : {}),
  };
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

function breadcrumbJsonLd(article) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NexOps", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/noticias` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/noticias/${article.slug}` },
    ],
  }).replaceAll("<", "\\u003c");
}

function injectHead(template, { title, description, canonical, image, article }) {
  const clean = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+(?:property|name)=["'](?:og|twitter):[^"']+["'][^>]*>/gi, "");
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="${article ? "article" : "website"}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(image || FALLBACK_IMAGE)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(image || FALLBACK_IMAGE)}">`,
    ...(article ? [
      `<meta property="article:published_time" content="${escapeHtml(article.publishedAt)}">`,
      `<script type="application/ld+json">${jsonLd(article)}</script>`,
      `<script type="application/ld+json">${breadcrumbJsonLd(article)}</script>`,
    ] : []),
  ].join("\n    ");
  return clean.replace("</head>", `    ${tags}\n  </head>`);
}

function injectStaticRoot(template, content) {
  return template.replace(/<div\s+id=["']root["']\s*><\/div>/i, `<div id="root">${content}</div>`);
}

function articleFallback(article) {
  const readingTime = getReadingTimeMinutes(article);
  return `<main data-static-seo="article"><article><nav><a href="/">NexOps</a> / <a href="/noticias">Insights</a></nav><p>${escapeHtml(article.contentPurpose || article.category || article.contentType)} · ${readingTime} min de lectura</p><time datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(article.publishedAt)}</time><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p>${renderContent(article.content)}<p><a href="/noticias">Ver más Insights de NexOps</a></p></article></main>`;
}

function indexFallback(articles) {
  return `<main data-static-seo="index"><h1>NexOps Insights</h1><p>Guías, actualidad aplicada, criterio y casos sobre automatización, IA, CRM y datos.</p><section>${articles.map((article) => `<article><h2><a href="/noticias/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.excerpt)}</p></article>`).join("")}</section></main>`;
}

async function writePage(relativePath, html) {
  const directory = path.join(DIST, relativePath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, "index.html"), html, "utf8");
}

async function main() {
  const articles = await readArticles();
  const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");

  const indexHtml = injectStaticRoot(
    injectHead(template, {
      title: "NexOps Insights | Automatización, IA, CRM y Data",
      description: "Actualidad, guías y análisis de NexOps para automatizar procesos, aplicar IA, mejorar CRM y convertir datos en decisiones empresariales.",
      canonical: `${SITE_URL}/noticias`,
      image: FALLBACK_IMAGE,
    }),
    indexFallback(articles),
  );
  await writePage("noticias", indexHtml);

  for (const article of articles) {
    const canonical = `${SITE_URL}/noticias/${article.slug}`;
    const html = injectStaticRoot(
      injectHead(template, {
        title: article.seoTitle,
        description: article.metaDescription,
        canonical,
        image: absoluteUrl(article.coverImage),
        article,
      }),
      articleFallback(article),
    );
    await writePage(path.join("noticias", article.slug), html);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    { loc: SITE_URL },
    { loc: `${SITE_URL}/noticias` },
    ...articles.map((article) => ({ loc: `${SITE_URL}/noticias/${article.slug}`, lastmod: article.updatedAt || article.publishedAt })),
  ].map((entry) => `  <url><loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${escapeXml(String(entry.lastmod).slice(0, 10))}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, "utf8");
  console.log(`news:seo OK — ${articles.length} artículo(s) + índice + sitemap + robots`);
}

main().catch((error) => {
  console.error(`news:seo ERROR — ${error.message}`);
  process.exit(1);
});
