const sortValue = (value) => Array.isArray(value) ? value.map(sortValue) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, sortValue(item)])) : value;
export const canonicalRadarJson = (value) => JSON.stringify(sortValue(value));
export function validPreviewOrigin(value) {
  try {
    const url = new URL(value);
    return url.origin === value && !url.username && !url.password && (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname)));
  } catch { return false; }
}
export function acceptsRadarPreviewMessage(event, opener, origin, nonce) {
  return Boolean(opener && event.source === opener && event.origin === origin && event.data?.type === "radar.preview.package" && event.data?.nonce === nonce);
}
export async function validateRadarPreviewPackage(value, cryptoProvider = globalThis.crypto) {
  if (!value || !/^[a-f0-9]{64}$/.test(value.compositionDigest || "") || !/^[a-f0-9]{64}$/.test(value.cover?.sha256 || "")) throw new Error("Paquete de vista previa inválido.");
  const article = value.article;
  if (!article || typeof article.title !== "string" || typeof article.excerpt !== "string" || typeof article.coverAlt !== "string" || !Array.isArray(article.sources) || !article.sources.length || article.sources.length > 100 || !Array.isArray(article.content) || article.content.length > 1000) throw new Error("Nota de vista previa inválida.");
  if (article.sources.some((source) => { try { const url = new URL(source.url); return typeof source.name !== "string" || url.protocol !== "https:" || Boolean(url.username || url.password); } catch { return true; } })) throw new Error("Fuente de vista previa inválida.");
  if (article.content.some((block) => !["paragraph", "heading", "list"].includes(block.type) || (block.type === "list" ? !Array.isArray(block.items) || block.items.some((item) => typeof item !== "string") : typeof block.text !== "string"))) throw new Error("Contenido de vista previa inválido.");
  const base64 = value.cover.pngBase64;
  if (typeof base64 !== "string" || base64.length > 2_000_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) throw new Error("Portada inválida.");
  const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  if (bytes.length < 24 || Array.from(bytes.slice(0, 8)).join(",") !== "137,80,78,71,13,10,26,10" || view.getUint32(16) !== 1600 || view.getUint32(20) !== 900 || article.coverWidth !== 1600 || article.coverHeight !== 900) throw new Error("La portada debe ser PNG 1600 × 900.");
  const hash = async (data) => Array.from(new Uint8Array(await cryptoProvider.subtle.digest("SHA-256", data))).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const coverSha256 = await hash(bytes);
  const digest = await hash(new TextEncoder().encode(canonicalRadarJson({ schemaVersion: 2, article, coverSha256 })));
  if (coverSha256 !== value.cover.sha256 || digest !== value.compositionDigest) throw new Error("El paquete cambió después de prepararse.");
  return { ...article, coverImage: `data:image/png;base64,${base64}` };
}
