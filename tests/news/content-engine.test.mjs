import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { addNewsFile } from "../../scripts/news-add.mjs";
import { detectAddAction, validateArticle, validateCollection } from "../../scripts/news-contract.mjs";
import { readNewsFiles } from "../../scripts/news-validate.mjs";

const validArticle = {
  title: "Cómo automatizar el seguimiento de leads sin perder trazabilidad",
  slug: "automatizar-seguimiento-leads",
  contentType: "guia",
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

test("actualidad requiere una fuente y content usa bloques simples", () => {
  const result = validateArticle({
    ...validArticle,
    contentType: "actualidad",
    content: [{ type: "list", items: [] }],
  });
  assert.ok(result.errors.some((error) => error.includes("requiere al menos una fuente")));
  assert.ok(result.errors.some((error) => error.includes("content[0].items")));
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
