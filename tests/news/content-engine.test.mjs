import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalizeArticle,
  detectAddAction,
  validateArticle,
  validateCollection,
} from "../../scripts/news-contract.mjs";

function block(text = "Contenido útil para un decisor de negocio.") {
  return {
    _key: `b-${text.slice(0, 6)}`,
    _type: "block",
    style: "normal",
    children: [{ _key: "s1", _type: "span", marks: [], text }],
    markDefs: [],
  };
}

function article(overrides = {}) {
  return canonicalizeArticle({
    slug: "automatizar-seguimiento-leads",
    title: "Cómo automatizar el seguimiento de leads sin perder contexto",
    excerpt: "Un marco práctico para ordenar el seguimiento comercial y reducir tareas manuales sin perder trazabilidad.",
    publishedAt: "2026-08-13T12:00:00.000Z",
    contentType: "guia",
    territory: "crm-automatizacion-comercial",
    primaryKeyword: "automatizar seguimiento de leads",
    searchIntent: "informacional comercial",
    seoTitle: "Cómo automatizar el seguimiento de leads | NexOps",
    metaDescription: "Cómo ordenar el seguimiento de leads con CRM y automatización para reducir tareas manuales y mejorar trazabilidad comercial.",
    engineScore: 91,
    engineRunId: "run-001",
    topicFingerprint: "crm:seguimiento-leads:v1",
    originId: "engine:run-001:seguimiento-leads",
    generatedByEngine: true,
    generatedAt: "2026-08-13T11:00:00.000Z",
    editorialRationale: {
      audience: "responsable comercial de una PyME",
      outcome: "mejorar seguimiento y trazabilidad",
      decision: "qué automatizar y qué conservar como tarea humana",
    },
    sources: [],
    body: [block()],
    ...overrides,
  });
}

test("score 84 no puede entrar como publicación automática", () => {
  const result = validateArticle(article({ engineScore: 84 }));
  assert.ok(result.errors.some((error) => error.includes("engineScore")));
});

test("actualidad exige dos fuentes o una primaria", () => {
  const oneSecondary = article({
    slug: "cambio-actual",
    title: "Un cambio relevante para automatización empresarial",
    contentType: "actualidad",
    sources: [{ name: "Medio", url: "https://example.com/a", type: "secondary" }],
  });
  assert.ok(validateArticle(oneSecondary).errors.some((error) => error.includes("2 fuentes")));

  const primary = article({
    slug: "cambio-oficial",
    title: "Una fuente oficial confirma un cambio empresarial",
    contentType: "actualidad",
    sources: [{ name: "Organismo", url: "https://example.org/oficial", type: "primary" }],
  });
  assert.equal(validateArticle(primary).errors.length, 0);
});

test("dedupe detecta slug, origen y fingerprint repetidos", () => {
  const first = article();
  const duplicate = article({
    title: "Otra redacción para el mismo tema",
    excerpt: "Una variante superficial que debe quedar bloqueada por identidad temática y de origen para mantener idempotencia.",
    body: [block("Texto diferente")],
  });
  const result = validateCollection([first, duplicate]);
  assert.ok(result.errors.some((error) => error.includes("slug duplicado")));
  assert.ok(result.errors.some((error) => error.includes("originId duplicado")));
  assert.ok(result.errors.some((error) => error.includes("topicFingerprint duplicado")));
});

test("news:add es idempotente cuando el contenido ya existe", () => {
  const first = article();
  const result = detectAddAction([first], first);
  assert.equal(result.action, "noop");
});

test("máximo una publicación automática por engineRunId", () => {
  const first = article();
  const second = article({
    slug: "segundo-articulo",
    title: "Segundo artículo en la misma corrida",
    excerpt: "Otro contenido válido individualmente pero que no debe publicarse dentro de la misma corrida automática del motor.",
    topicFingerprint: "otro-tema",
    originId: "engine:run-001:otro",
    body: [block("Segundo contenido")],
  });
  const result = validateCollection([first, second]);
  assert.ok(result.errors.some((error) => error.includes("engineRunId duplicado")));
});

test("máximo tres publicaciones automáticas en cualquier ventana móvil de siete días", () => {
  const articles = [0, 1, 2, 3].map((offset) =>
    article({
      slug: `post-${offset}`,
      title: `Publicación automática número ${offset}`,
      excerpt: `Contenido automático ${offset} con información suficiente para validar el límite editorial de frecuencia semanal.`,
      publishedAt: `2026-08-${10 + offset}T12:00:00.000Z`,
      generatedAt: `2026-08-${10 + offset}T11:00:00.000Z`,
      engineRunId: `run-${offset}`,
      topicFingerprint: `topic-${offset}`,
      originId: `origin-${offset}`,
      body: [block(`Contenido ${offset}`)],
    })
  );
  const result = validateCollection(articles);
  assert.ok(result.errors.some((error) => error.includes("ventana móvil de 7 días")));
});

test("imagen remota queda bloqueada para contenido automático", () => {
  const result = validateArticle(
    article({ mainImage: { src: "https://medio.example.com/foto.jpg", alt: "Foto" } })
  );
  assert.ok(result.errors.some((error) => error.includes("imágenes remotas")));
});
