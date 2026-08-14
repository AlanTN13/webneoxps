import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { addNewsFile } from "../../scripts/news-add.mjs";
import { detectAddAction, validateArticle, validateCollection } from "../../scripts/news-contract.mjs";
import { readNewsFiles } from "../../scripts/news-validate.mjs";
import { getContentWordCount, getReadingTimeMinutes } from "../../src/data/news/reading-time.js";

const validArticle = {
  title: "Cómo automatizar el seguimiento de leads sin perder trazabilidad",
  slug: "automatizar-seguimiento-leads",
  contentType: "guia",
  contentPurpose: "seo",
  territory: "crm-automatizacion-comercial",
  category: "crm",
  publishedAt: "2026-08-13",
  excerpt: "Una guía práctica para ordenar el seguimiento comercial y reducir tareas manuales sin perder control del proceso.",
  seoTitle: "Cómo automatizar el seguimiento de leads en tu empresa",
  metaDescription: "Qué automatizar en el seguimiento de leads, qué señales mirar y cómo mantener trazabilidad comercial sin sumar tareas manuales al equipo.",
  primaryKeyword: "automatizar seguimiento de leads",
  searchIntent: "informacional-comercial",
  content: [{ type: "paragraph", text: "Contenido útil para un decisor de negocio." }],
  topicFingerprint: "crm:seguimiento-leads:automatizacion",
  engineRunId: "run-2026-08-13-001",
  engineScore: 91,
  generatedByEngine: true,
};

test("valida una noticia Git-first sin imponer scoring editorial", () => {
  assert.deepEqual(validateArticle({ ...validArticle, engineScore: 72 }).errors, []);
});

test("actualidad aplicada requiere una fuente y content usa bloques simples", () => {
  const result = validateArticle({
    ...validArticle,
    contentType: "actualidad",
    contentPurpose: "actualidad",
    content: [{ type: "list", items: [] }],
  });
  assert.ok(result.errors.some((error) => error.includes("requiere al menos una fuente")));
  assert.ok(result.errors.some((error) => error.includes("content[0].items")));
});

test("acepta los cuatro propósitos editoriales", () => {
  for (const contentPurpose of ["seo", "actualidad", "criterio", "caso"]) {
    const article = { ...validArticle, contentPurpose };
    if (contentPurpose === "actualidad") Object.assign(article, { sourceName: "Fuente", sourceUrl: "https://example.com/fuente" });
    assert.deepEqual(validateArticle(article).errors, []);
  }
});

test("rechaza un propósito inválido y contenido nuevo sin propósito", () => {
  assert.ok(validateArticle({ ...validArticle, contentPurpose: "promocion" }).errors.some((error) => error.includes("contentPurpose inválido")));
  assert.ok(validateArticle({ ...validArticle, contentPurpose: undefined }).errors.some((error) => error.includes("falta contentPurpose")));
});

test("permite ausencia de propósito únicamente en contenido legacy", () => {
  const { contentPurpose: _ignored, ...withoutPurpose } = validArticle;
  assert.deepEqual(validateArticle({ ...withoutPurpose, legacySanityId: "legacy-1" }).errors, []);
});

test("dedupe rechaza slug, sourceUrl, engineRunId y topicFingerprint", () => {
  const first = {
    ...validArticle,
    sourceName: "Fuente A",
    sourceUrl: "https://example.com/noticia",
  };
  const second = {
    ...validArticle,
    sourceName: "Fuente B",
    sourceUrl: "https://example.com/noticia/",
  };
  const result = validateCollection([first, second]);
  for (const field of ["slug", "sourceUrl", "engineRunId", "topicFingerprint"]) {
    assert.ok(result.errors.some((error) => error.includes(`${field} duplicado`)), `faltó dedupe de ${field}`);
  }
});

test("loader lee una noticia por archivo y conserva el payload", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "nexops-loader-"));
  await fs.writeFile(path.join(directory, `${validArticle.slug}.json`), `${JSON.stringify(validArticle)}\n`);
  const articles = await readNewsFiles(directory);
  assert.equal(articles.length, 1);
  assert.equal(articles[0].slug, validArticle.slug);
  assert.equal(articles[0].contentPurpose, "seo");
  await fs.rm(directory, { recursive: true, force: true });
});

test("news:add no muta el destino cuando el candidato es inválido", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "nexops-add-invalid-"));
  const newsDirectory = path.join(root, "news");
  const candidatePath = path.join(root, "candidate.json");
  await fs.mkdir(newsDirectory);
  await fs.writeFile(candidatePath, JSON.stringify({ ...validArticle, slug: "Slug Inválido" }));
  await assert.rejects(addNewsFile({ source: candidatePath, newsDirectory }));
  assert.deepEqual(await fs.readdir(newsDirectory), []);
  await fs.rm(root, { recursive: true, force: true });
});

test("news:add escribe una vez y rechaza el segundo intento sin sobrescribir", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "nexops-add-idempotent-"));
  const newsDirectory = path.join(root, "news");
  const candidatePath = path.join(root, "candidate.json");
  await fs.mkdir(newsDirectory);
  await fs.writeFile(candidatePath, `${JSON.stringify(validArticle)}\n`);
  const destination = await addNewsFile({ source: candidatePath, newsDirectory });
  const original = await fs.readFile(destination, "utf8");
  await assert.rejects(addNewsFile({ source: candidatePath, newsDirectory }));
  assert.equal(await fs.readFile(destination, "utf8"), original);
  assert.equal((await fs.readdir(newsDirectory)).length, 1);
  await fs.rm(root, { recursive: true, force: true });
});

test("legacy conserva un slug histórico con mayúscula sólo si está marcado", () => {
  const legacy = {
    ...validArticle,
    slug: "la-revolucion-tecnologica-de-enero-2026-en-Argentina",
    legacySanityId: "legacy-1",
  };
  assert.deepEqual(validateArticle(legacy).errors, []);
  assert.ok(validateArticle({ ...legacy, legacySanityId: undefined }).errors.some((error) => error.includes("slug inválido")));
});

test("detectAddAction no convierte duplicados en una segunda publicación", () => {
  assert.equal(detectAddAction([validArticle], validArticle).action, "conflict");
});

test("reading time tiene un mínimo de un minuto", () => {
  assert.equal(getReadingTimeMinutes({ content: [] }), 1);
  assert.equal(getReadingTimeMinutes({}), 1);
});

test("reading time cuenta paragraphs, headings y lists", () => {
  const words = (amount) => Array.from({ length: amount }, (_, index) => `palabra${index}`).join(" ");
  const post = {
    content: [
      { type: "paragraph", text: words(100) },
      { type: "heading", level: 2, text: words(20) },
      { type: "list", items: [words(50), words(50)] },
    ],
  };

  assert.equal(getContentWordCount(post.content), 220);
  assert.equal(getReadingTimeMinutes(post), 1);
});

test("reading time redondea hacia arriba a 220 palabras por minuto", () => {
  const text = Array.from({ length: 221 }, (_, index) => `palabra${index}`).join(" ");
  assert.equal(getReadingTimeMinutes({ content: [{ type: "paragraph", text }] }), 2);
});

test("reading time ignora metadata externa al cuerpo", () => {
  const content = [{ type: "paragraph", text: "uno dos tres" }];
  const minimal = { content };
  const decorated = {
    content,
    title: "Título con muchas palabras que no deben contarse",
    excerpt: "Excerpt que tampoco forma parte del cálculo",
    metaDescription: "Metadata SEO externa",
    topicFingerprint: "fingerprint:externo",
    cta: { label: "CTA externo", href: "/noticias" },
  };

  assert.equal(getReadingTimeMinutes(minimal), getReadingTimeMinutes(decorated));
});

test("reading time soporta cuerpos legacy y actuales sin campos manuales", () => {
  const legacy = { legacySanityId: "legacy-1", content: [{ type: "quote", text: "texto legacy visible" }] };
  const current = { contentPurpose: "seo", content: [{ type: "link", text: "texto actual visible", href: "/noticias" }] };
  assert.equal(getContentWordCount(legacy.content), 3);
  assert.equal(getContentWordCount(current.content), 3);
  assert.equal(getReadingTimeMinutes(legacy), 1);
  assert.equal(getReadingTimeMinutes(current), 1);
});

test("la colección rechaza relacionados inexistentes, repetidos o propios", () => {
  const article = {
    ...validArticle,
    relatedSlugs: [validArticle.slug, "no-existe", "no-existe"],
  };
  const errors = validateCollection([article]).errors;
  assert.ok(errors.some((error) => error.includes("propio artículo")));
  assert.ok(errors.some((error) => error.includes("noticia inexistente")));
  assert.ok(errors.some((error) => error.includes("contiene un duplicado")));
});

test("la colección acepta relatedSlugs que apuntan a artículos activos", () => {
  const related = {
    ...validArticle,
    slug: "segundo-articulo",
    topicFingerprint: "crm:segundo-articulo",
    engineRunId: "run-2026-08-13-002",
  };
  const article = { ...validArticle, relatedSlugs: [related.slug] };
  assert.deepEqual(validateCollection([article, related]).errors, []);
});

test("el corpus saneado conserva artículos con contrato editorial completo", async () => {
  const articles = await readNewsFiles();
  assert.ok(articles.length > 0);
  for (const article of articles) {
    assert.ok(article.contentPurpose, `${article.slug} no tiene contentPurpose`);
    assert.ok(article.contentType, `${article.slug} no tiene contentType`);
    assert.ok(article.territory, `${article.slug} no tiene territory`);
    assert.match(article.coverImage, /^\/assets\/insights\//);
    await fs.access(path.resolve("public", article.coverImage.slice(1)));
  }
});

test("los tres artículos consolidados tienen redirects 308 directos", async () => {
  const configuration = JSON.parse(await fs.readFile(path.resolve("vercel.json"), "utf8"));
  const redirects = new Map(configuration.redirects.map((redirect) => [redirect.source, redirect]));
  const expected = {
    "/noticias/google-reinventa-search-con-ia-y-cambia-el-juego-del-seo": "/noticias/ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo",
    "/noticias/google-y-openai-aceleran-la-era-de-los-agentes-autonomos": "/noticias/agentes-ia-produccion-control-limites",
    "/noticias/meta-acelera-la-carrera-de-ia-contra-openai-y-google": "/noticias/meta-business-agent-whatsapp-leads-ventas",
  };

  assert.equal(configuration.redirects.length, 3);
  for (const [source, destination] of Object.entries(expected)) {
    assert.equal(redirects.get(source)?.destination, destination);
    assert.equal(redirects.get(source)?.statusCode, 308);
    assert.ok(!expected[destination], `redirect encadenado desde ${source}`);
  }
});

test("las seis notas retiradas ya no tienen JSON publicable", async () => {
  const retiredSlugs = [
    "alphabet-despega-frente-a-meta-gracias-al-negocio-de-la-ia",
    "gemini-3-supera-a-chatgpt-y-redefine-el-liderazgo-en-inteligencia-artificial",
    "la-revolucion-tecnologica-de-enero-2026-en-Argentina",
    "milei-impulsa-ia-para-disenar-politicas-publicas-en-argentina",
    "nvidia-ya-destina-usd-90000-millones-al-ecosistema-de-ia",
    "sam-altman-modera-su-discurso-sobre-el-impacto-laboral-de-la-ia",
  ];

  for (const slug of retiredSlugs) {
    await assert.rejects(fs.access(path.resolve("src/data/news", `${slug}.json`)));
  }
});
