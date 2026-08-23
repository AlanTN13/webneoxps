import fs from "node:fs/promises";
import path from "node:path";

export const VISUAL_TYPES = new Set([
  "architecture-diagram",
  "brand-product",
  "comparison",
  "contextual-photo",
  "data-flow",
  "data-infrastructure",
  "data-visualization",
  "document-visual",
  "editorial-diagram",
  "operations-interface",
  "process-diagram",
  "product-interface",
  "security-diagram",
  "workflow-interface",
]);

export const ASSET_SOURCES = new Set([
  "generated-original",
  "hybrid-editorial",
  "licensed-photo",
  "nexops-original",
  "official-product-reference",
]);

const LOCAL_ASSET = /^\/assets\/insights\/[a-z0-9/_-]+\.(?:jpe?g|png|svg)$/i;
const POSITION = /^(?:100|\d{1,2})(?:\.\d+)?%\s+(?:100|\d{1,2})(?:\.\d+)?%$/;
const text = (value) => typeof value === "string" && value.trim().length > 0;
const integer = (value) => Number.isInteger(value) && value > 0;

export function normalizeCoverImage(value = "") {
  if (String(value).startsWith("/")) return String(value).trim().toLowerCase();
  try {
    const url = new URL(value);
    url.hash = "";
    return `${url.protocol}//${url.host}${url.pathname}`.toLowerCase();
  } catch {
    return String(value || "").trim().toLowerCase();
  }
}

function validateAssetReference(value, label) {
  if (!text(value)) return [`${label} es obligatorio`];
  if (value.startsWith("/")) {
    return LOCAL_ASSET.test(value)
      ? []
      : [`${label} local debe vivir en /assets/insights/ y usar JPG, PNG o SVG`];
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? [] : [`${label} remoto debe usar https`];
  } catch {
    return [`${label} debe ser una ruta local o URL https válida`];
  }
}

export function validateEditorialCover(article, label = article?.slug || "noticia") {
  const errors = [];
  errors.push(...validateAssetReference(article?.coverImage, `${label}: coverImage`));
  errors.push(...validateAssetReference(article?.ogImage, `${label}: ogImage`));

  if (!VISUAL_TYPES.has(article?.visualType)) errors.push(`${label}: visualType inválido`);
  if (!text(article?.primaryEntity)) errors.push(`${label}: primaryEntity es obligatorio`);
  if (!text(article?.visualSubject)) errors.push(`${label}: visualSubject es obligatorio`);
  if (!ASSET_SOURCES.has(article?.assetSource)) errors.push(`${label}: assetSource inválido`);
  if (!text(article?.assetCredit)) errors.push(`${label}: assetCredit es obligatorio`);
  if (!text(article?.coverAlt)) errors.push(`${label}: coverAlt es obligatorio`);
  if (article?.secondaryEntities != null && (
    !Array.isArray(article.secondaryEntities)
    || article.secondaryEntities.some((entity) => !text(entity))
  )) errors.push(`${label}: secondaryEntities debe ser un array de textos`);

  if (!integer(article?.coverWidth) || !integer(article?.coverHeight)) {
    errors.push(`${label}: coverWidth y coverHeight deben ser enteros positivos`);
  } else {
    const ratio = article.coverWidth / article.coverHeight;
    if (article.coverWidth < 1200 || article.coverHeight < 630 || ratio < 1.5 || ratio > 2.1) {
      errors.push(`${label}: la portada debe ser landscape, entre 1.5:1 y 2.1:1, y medir al menos 1200×630`);
    }
  }

  const focus = article?.coverFocus;
  if (!focus || typeof focus !== "object") {
    errors.push(`${label}: coverFocus es obligatorio`);
  } else {
    for (const field of ["mobile", "desktop"]) {
      if (!POSITION.test(focus[field] || "")) errors.push(`${label}: coverFocus.${field} debe usar dos porcentajes`);
    }
  }
  return errors;
}

export function validateCoverCollection(articles = []) {
  const errors = [];
  const owners = new Map();
  for (const article of articles) {
    const label = article?.slug || "<sin-slug>";
    errors.push(...validateEditorialCover(article, label));
    if (!text(article?.coverImage)) continue;
    const key = normalizeCoverImage(article.coverImage);
    if (owners.has(key)) errors.push(`coverImage duplicada entre ${owners.get(key)} y ${label}`);
    else owners.set(key, label);
  }
  return errors;
}

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("hex", 0, 8) !== "89504e470d0a1a0a") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    if (!length) break;
    offset += length + 2;
  }
  return null;
}

function svgDimensions(buffer) {
  const source = buffer.toString("utf8", 0, Math.min(buffer.length, 8192));
  if (!/<svg\b/i.test(source)) return null;
  const viewBox = source.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  const width = source.match(/\bwidth=["']([\d.]+)(?:px)?["']/i);
  const height = source.match(/\bheight=["']([\d.]+)(?:px)?["']/i);
  return width && height ? { width: Number(width[1]), height: Number(height[1]) } : null;
}

function imageDimensions(buffer) {
  return pngDimensions(buffer) || jpegDimensions(buffer) || svgDimensions(buffer);
}

export async function validateCoverAssetFile(filePath, article, label = article?.slug || "noticia") {
  try {
    const dimensions = imageDimensions(await fs.readFile(filePath));
    if (!dimensions) return [`${label}: no se pudieron verificar dimensiones del asset`];
    const ratio = dimensions.width / dimensions.height;
    const errors = [];
    if (dimensions.width < 1200 || dimensions.height < 630 || ratio < 1.5 || ratio > 2.1) {
      errors.push(`${label}: el asset real no es landscape válido (${dimensions.width}×${dimensions.height})`);
    }
    if (dimensions.width !== article?.coverWidth || dimensions.height !== article?.coverHeight) {
      errors.push(`${label}: coverWidth/coverHeight no coinciden con el asset real (${dimensions.width}×${dimensions.height})`);
    }
    return errors;
  } catch {
    return [`${label}: el asset no existe (${filePath})`];
  }
}

function localAssetPath(value, publicDirectory) {
  const publicRoot = path.resolve(publicDirectory);
  const fullPath = path.resolve(publicRoot, value.replace(/^\/+/, ""));
  if (fullPath !== publicRoot && !fullPath.startsWith(`${publicRoot}${path.sep}`)) return null;
  return fullPath;
}

export async function validateCoverAssets(articles = [], publicDirectory = path.resolve("public")) {
  const errors = [];
  const inspected = new Map();
  for (const article of articles) {
    const label = article?.slug || "<sin-slug>";
    for (const field of ["coverImage", "ogImage"]) {
      const value = article?.[field];
      if (!text(value) || !value.startsWith("/")) continue;
      const fullPath = localAssetPath(value, publicDirectory);
      if (!fullPath) {
        errors.push(`${label}: ${field} sale del directorio public`);
        continue;
      }
      let dimensions = inspected.get(fullPath);
      if (!dimensions) {
        try {
          dimensions = imageDimensions(await fs.readFile(fullPath));
          inspected.set(fullPath, dimensions || false);
        } catch {
          errors.push(`${label}: ${field} no existe (${value})`);
          continue;
        }
      }
      if (!dimensions) {
        errors.push(`${label}: no se pudieron verificar dimensiones de ${field}`);
        continue;
      }
      const ratio = dimensions.width / dimensions.height;
      if (dimensions.width < 1200 || dimensions.height < 630 || ratio < 1.5 || ratio > 2.1) {
        errors.push(`${label}: ${field} real no es landscape válido (${dimensions.width}×${dimensions.height})`);
      }
      if (field === "coverImage" && (
        dimensions.width !== article.coverWidth || dimensions.height !== article.coverHeight
      )) errors.push(`${label}: coverWidth/coverHeight no coinciden con el asset real (${dimensions.width}×${dimensions.height})`);
    }
  }
  return errors;
}

export function isApprovedCoverImage(article) {
  return validateEditorialCover(article, article?.slug || "cover").length === 0;
}
