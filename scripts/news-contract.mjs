import crypto from "node:crypto";
import {
  CONTENT_TYPES,
  INTERNAL_ROUTES,
  SITE_URL,
  TERRITORIES,
  isKnownInternalRoute,
} from "../src/data/news/contract.js";

const DATE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const TRACKING_PARAMS = ["fbclid", "gclid", "mc_cid", "mc_eid"];

export function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value = "") {
  return normalizeText(value)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeTitle(value = "") {
  return normalizeText(value);
}

export function normalizeSourceUrl(value = "") {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      const normalizedKey = key.toLowerCase();
      if (normalizedKey.startsWith("utm_") || TRACKING_PARAMS.includes(normalizedKey)) {
        url.searchParams.delete(key);
      }
    }
    url.hash = "";
    const rendered = url.toString();
    return rendered.endsWith("/") ? rendered.slice(0, -1) : rendered;
  } catch {
    return String(value || "").trim();
  }
}

function sourceName(source) {
  if (source?.name) return String(source.name).trim();
  try {
    return new URL(source?.url).hostname;
  } catch {
    return "Fuente";
  }
}

function blockText(block) {
  if (!block) return "";
  if (typeof block === "string") return block;
  if (Array.isArray(block)) return block.map(blockText).join(" ");
  if (Array.isArray(block.children)) {
    return block.children.map((child) => child?.text || "").join(" ");
  }
  if (typeof block.text === "string") return block.text;
  return "";
}

export function articlePlainText(article) {
  return [article.title, article.excerpt, ...(article.body || []).map(blockText)]
    .filter(Boolean)
    .join(" ");
}

export function contentHash(article) {
  return crypto
    .createHash("sha256")
    .update(normalizeText(articlePlainText(article)))
    .digest("hex");
}

export function canonicalizeArticle(input = {}) {
  const slug = slugify(input.slug || input.title || "");
  const publishedAt = input.publishedAt || input.generatedAt || new Date().toISOString();
  const sources = Array.isArray(input.sources)
    ? input.sources
        .filter((source) => source?.url)
        .map((source) => ({
          name: sourceName(source),
          url: normalizeSourceUrl(source.url),
          type: source.type === "primary" ? "primary" : "secondary",
        }))
    : [];

  return {
    version: 1,
    slug,
    title: String(input.title || "").trim(),
    excerpt: String(input.excerpt || "").trim(),
    publishedAt,
    updatedAt: input.updatedAt || undefined,
    contentType: input.contentType,
    territory: input.territory,
    category: input.category || undefined,
    primaryKeyword: String(input.primaryKeyword || "").trim(),
    searchIntent: String(input.searchIntent || "informacional").trim(),
    seoTitle: String(input.seoTitle || input.title || "").trim(),
    metaDescription: String(input.metaDescription || input.excerpt || "").trim(),
    canonicalUrl: input.canonicalUrl || `${SITE_URL}/noticias/${slug}`,
    engineScore: Number.isFinite(input.engineScore) ? input.engineScore : null,
    scoreBreakdown: input.scoreBreakdown || undefined,
    engineRunId: input.engineRunId || undefined,
    topicFingerprint: String(input.topicFingerprint || "").trim(),
    originId: String(input.originId || "").trim(),
    generatedByEngine: input.generatedByEngine === true,
    generatedAt: input.generatedAt || publishedAt,
    editorialRationale: input.editorialRationale || undefined,
    sources,
    mainImage: input.mainImage?.src
      ? {
          src: String(input.mainImage.src),
          alt: String(input.mainImage.alt || input.title || ""),
        }
      : undefined,
    body: Array.isArray(input.body) ? input.body : [],
  };
}

function validDate(value) {
  return Boolean(value) && !Number.isNaN(new Date(value).getTime());
}

function validateInternalLinks(article, errors) {
  for (const block of article.body || []) {
    for (const mark of block?.markDefs || []) {
      const href = mark?.href;
      if (href?.startsWith("/") && !isKnownInternalRoute(href)) {
        errors.push(`link interno inexistente o no permitido: ${href}`);
      }
    }
  }
}

export function validateArticle(article) {
  const errors = [];
  const warnings = [];

  if (article.version !== 1) errors.push("version debe ser 1");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug || "")) errors.push("slug inválido");
  if (!article.title || article.title.length > 95) {
    errors.push("title es obligatorio y debe tener hasta 95 caracteres");
  }
  if (!article.excerpt || article.excerpt.length > 220) {
    errors.push("excerpt es obligatorio y debe tener hasta 220 caracteres");
  }
  if (!validDate(article.publishedAt)) errors.push("publishedAt debe ser una fecha válida");
  if (!CONTENT_TYPES[article.contentType]) errors.push(`contentType inválido: ${article.contentType}`);
  if (!TERRITORIES[article.territory]) errors.push(`territory inválido: ${article.territory}`);
  if (!article.primaryKeyword) errors.push("primaryKeyword es obligatorio");
  if (!article.searchIntent) errors.push("searchIntent es obligatorio");
  if (!article.seoTitle || article.seoTitle.length > 70) {
    errors.push("seoTitle es obligatorio y debe tener hasta 70 caracteres");
  }
  if (!article.metaDescription || article.metaDescription.length > 180) {
    errors.push("metaDescription es obligatoria y debe tener hasta 180 caracteres");
  }
  if (!article.originId) errors.push("originId es obligatorio");
  if (!article.topicFingerprint) errors.push("topicFingerprint es obligatorio");
  if (!Array.isArray(article.body) || article.body.length === 0) {
    errors.push("body debe contener contenido");
  }

  try {
    const canonical = new URL(article.canonicalUrl);
    if (!["nexopstech.com", "www.nexopstech.com"].includes(canonical.hostname)) {
      errors.push("canonicalUrl debe apuntar a NexOps");
    }
  } catch {
    errors.push("canonicalUrl inválida");
  }

  if (article.generatedByEngine) {
    if (!Number.isInteger(article.engineScore) || article.engineScore < 85 || article.engineScore > 100) {
      errors.push("contenido automático publicable requiere engineScore entero entre 85 y 100");
    }
    if (!article.engineRunId) errors.push("contenido automático requiere engineRunId");
    if (!validDate(article.generatedAt)) errors.push("contenido automático requiere generatedAt válido");

    const rationale = article.editorialRationale;
    if (!rationale?.audience || !rationale?.outcome || !rationale?.decision) {
      errors.push("contenido automático requiere editorialRationale con audience, outcome y decision");
    }

    if (article.contentType === "actualidad") {
      const uniqueSources = new Set(article.sources.map((source) => normalizeSourceUrl(source.url)));
      const hasPrimary = article.sources.some((source) => source.type === "primary");
      if (!hasPrimary && uniqueSources.size < 2) {
        errors.push("actualidad automática requiere 2 fuentes independientes o 1 fuente primaria");
      }
    }

    if (article.mainImage?.src && /^https?:\/\//i.test(article.mainImage.src)) {
      errors.push("contenido automático no puede reutilizar imágenes remotas; omitir mainImage o usar un asset local");
    }

    if (article.metaDescription.length < 70) {
      warnings.push("metaDescription automática es corta para SEO (<70 caracteres)");
    }
  }

  for (const source of article.sources) {
    try {
      const url = new URL(source.url);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("scheme");
    } catch {
      errors.push(`fuente inválida: ${source.url}`);
    }
  }

  validateInternalLinks(article, errors);
  return { errors, warnings };
}

function duplicateErrors(articles, keyFn, label) {
  const seen = new Map();
  const errors = [];
  for (const article of articles) {
    const key = keyFn(article);
    if (!key) continue;
    if (seen.has(key)) {
      errors.push(`${label} duplicado entre ${seen.get(key)} y ${article.slug}: ${key}`);
    } else {
      seen.set(key, article.slug);
    }
  }
  return errors;
}

function validateRollingWindow(articles) {
  const generated = articles
    .filter((article) => article.generatedByEngine && validDate(article.publishedAt))
    .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  const errors = [];

  for (let i = 0; i < generated.length; i += 1) {
    const end = new Date(generated[i].publishedAt).getTime();
    const start = end - DATE_WINDOW_MS;
    const inWindow = generated.filter((article) => {
      const value = new Date(article.publishedAt).getTime();
      return value >= start && value <= end;
    });
    if (inWindow.length > 3) {
      errors.push(
        `límite excedido: ${inWindow.length} publicaciones automáticas en ventana móvil de 7 días terminada ${generated[i].publishedAt}`
      );
      break;
    }
  }

  return errors;
}

function validateNewsLinks(articles) {
  const slugs = new Set(articles.map((article) => article.slug));
  const errors = [];
  for (const article of articles) {
    for (const block of article.body || []) {
      for (const mark of block?.markDefs || []) {
        const href = mark?.href;
        if (!href?.startsWith("/noticias/")) continue;
        const slug = href.replace(/^\/noticias\//, "").split(/[?#]/)[0];
        if (slug && !slugs.has(slug)) {
          errors.push(`link a insight inexistente en ${article.slug}: ${href}`);
        }
      }
    }
  }
  return errors;
}

export function validateCollection(articles) {
  const errors = [];
  const warnings = [];

  for (const article of articles) {
    const result = validateArticle(article);
    errors.push(...result.errors.map((error) => `${article.slug || "<sin-slug>"}: ${error}`));
    warnings.push(...result.warnings.map((warning) => `${article.slug || "<sin-slug>"}: ${warning}`));
  }

  errors.push(...duplicateErrors(articles, (article) => article.slug, "slug"));
  errors.push(...duplicateErrors(articles, (article) => normalizeTitle(article.title), "título normalizado"));
  errors.push(...duplicateErrors(articles, (article) => article.originId, "originId"));
  errors.push(...duplicateErrors(articles, (article) => article.topicFingerprint, "topicFingerprint"));
  errors.push(
    ...duplicateErrors(
      articles.filter((article) => article.generatedByEngine),
      (article) => article.engineRunId,
      "engineRunId"
    )
  );
  errors.push(...duplicateErrors(articles, (article) => contentHash(article), "contenido"));
  errors.push(
    ...duplicateErrors(
      articles,
      (article) => {
        const primary = article.sources.find((source) => source.type === "primary") || article.sources[0];
        return primary?.url ? normalizeSourceUrl(primary.url) : "";
      },
      "fuente principal"
    )
  );
  errors.push(...validateRollingWindow(articles));
  errors.push(...validateNewsLinks(articles));

  return { errors, warnings };
}

export function detectAddAction(existingArticles, candidate) {
  const normalized = canonicalizeArticle(candidate);
  const articleValidation = validateArticle(normalized);
  if (articleValidation.errors.length > 0) {
    return {
      action: "conflict",
      article: normalized,
      errors: articleValidation.errors,
      warnings: articleValidation.warnings,
    };
  }

  const exact = existingArticles.find(
    (article) =>
      article.slug === normalized.slug ||
      article.originId === normalized.originId ||
      article.topicFingerprint === normalized.topicFingerprint
  );

  if (exact) {
    if (contentHash(exact) === contentHash(normalized)) {
      return {
        action: "noop",
        article: normalized,
        existing: exact,
        errors: [],
        warnings: articleValidation.warnings,
      };
    }
    return {
      action: "conflict",
      article: normalized,
      existing: exact,
      errors: [
        `colisión de dedupe con ${exact.slug}: misma identidad temática/origen pero contenido distinto`,
      ],
      warnings: articleValidation.warnings,
    };
  }

  const collectionValidation = validateCollection([...existingArticles, normalized]);
  if (collectionValidation.errors.length > 0) {
    return {
      action: "conflict",
      article: normalized,
      errors: collectionValidation.errors,
      warnings: collectionValidation.warnings,
    };
  }

  return {
    action: "add",
    article: normalized,
    errors: [],
    warnings: collectionValidation.warnings,
  };
}

export function contractSummary() {
  return {
    siteUrl: SITE_URL,
    contentTypes: Object.keys(CONTENT_TYPES),
    territories: Object.keys(TERRITORIES),
    internalRoutes: INTERNAL_ROUTES,
  };
}
