const REAL_PHOTO_HOSTS = new Set([
  "images.unsplash.com",
  "images.pexels.com",
]);

const FORBIDDEN_HINT = /(?:generated|generada|ai[-_ ]?image|illustration|ilustracion|render|mockup|abstract|logo|placeholder|default|generic)/i;
const COVER_KINDS = new Set(["brand", "operation", "analysis"]);
const OBJECT_POSITION = /^(?:100|\d{1,2})(?:\.\d+)?%\s+(?:100|\d{1,2})(?:\.\d+)?%$/;

const text = (value) => typeof value === "string" && value.trim().length > 0;

export function normalizeCoverImage(value = "") {
  try {
    const url = new URL(value);
    url.hash = "";
    return `${url.protocol}//${url.host}${url.pathname}`.toLowerCase();
  } catch {
    return String(value || "").trim().toLowerCase();
  }
}

export function validateRealPhotoCover(article, label = article?.slug || "noticia") {
  const errors = [];
  const value = article?.coverImage;
  if (!text(value)) return [`${label}: coverImage es obligatorio`];

  let url;
  try {
    url = new URL(value);
  } catch {
    return [`${label}: coverImage debe ser una URL https de fotografía real`];
  }

  if (url.protocol !== "https:") errors.push(`${label}: coverImage debe usar https`);
  if (!REAL_PHOTO_HOSTS.has(url.hostname.toLowerCase())) {
    errors.push(`${label}: coverImage debe provenir de una fuente fotográfica aprobada (Unsplash/Pexels)`);
  }
  if (FORBIDDEN_HINT.test(value)) errors.push(`${label}: coverImage parece generada, ilustrada o genérica`);
  return errors;
}

export function validateEditorialCover(article, label = article?.slug || "noticia") {
  const errors = [];
  const editorial = article?.coverEditorial;
  if (!editorial || typeof editorial !== "object") return [`${label}: coverEditorial es obligatorio`];

  if (!COVER_KINDS.has(editorial.kind)) errors.push(`${label}: coverEditorial.kind inválido`);
  if (!text(editorial.label)) errors.push(`${label}: coverEditorial.label es obligatorio`);
  if (!text(editorial.alt)) errors.push(`${label}: coverEditorial.alt es obligatorio`);
  if (!/^#[0-9a-f]{6}$/i.test(editorial.accent || "")) errors.push(`${label}: coverEditorial.accent debe ser hexadecimal`);

  for (const field of ["objectPositionMobile", "objectPositionDesktop"]) {
    if (!OBJECT_POSITION.test(editorial[field] || "")) errors.push(`${label}: coverEditorial.${field} debe usar dos porcentajes`);
  }

  try {
    const url = new URL(article.coverImage);
    const width = Number(url.searchParams.get("w"));
    const height = Number(url.searchParams.get("h"));
    if (width < 1200 || height < 675 || width / height < 1.5) {
      errors.push(`${label}: coverImage debe entregar un asset landscape de al menos 1200×675`);
    }
  } catch {
    // validateRealPhotoCover informa la URL inválida.
  }

  return errors;
}

export function validateCoverCollection(articles = []) {
  const errors = [];
  const owners = new Map();
  for (const article of articles) {
    const label = article?.slug || "<sin-slug>";
    errors.push(...validateRealPhotoCover(article, label));
    errors.push(...validateEditorialCover(article, label));
    if (!text(article?.coverImage)) continue;
    const key = normalizeCoverImage(article.coverImage);
    if (owners.has(key)) {
      errors.push(`coverImage duplicada entre ${owners.get(key)} y ${label}`);
    } else {
      owners.set(key, label);
    }
  }
  return errors;
}

export function isApprovedRealPhotoUrl(value) {
  return validateRealPhotoCover({ slug: "cover", coverImage: value }, "cover").length === 0;
}
