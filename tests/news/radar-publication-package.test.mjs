import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createHash, webcrypto } from "node:crypto";
import { verifyRadarPublicationPackage } from "../../scripts/radar-publication-package.mjs";
import { acceptsRadarPreviewMessage, canonicalRadarJson, validPreviewOrigin, validateRadarPreviewPackage } from "../../src/lib/radar-preview.mjs";

const cover = await readFile(new URL("../../public/assets/insights/editorial/como-hacer-dashboard-indicadores-gestion.png", import.meta.url));
const article = {
  title: "Gobernanza verificable de agentes operativos",
  excerpt: "Una nota con fuentes completas y evidencia para revisión.",
  sources: [{ name: "Official", url: "https://example.org/source", evidence: "Source evidence" }, { name: "Context", url: "https://example.com/context" }],
  content: [{ type: "paragraph", text: "Una explicación operativa." }],
  coverImage: "/assets/insights/editorial/agentes.png", ogImage: "/assets/insights/editorial/agentes.png",
  coverWidth: 1600, coverHeight: 900, coverAlt: "Controles operativos de agentes",
};
const coverSha256 = createHash("sha256").update(cover).digest("hex");
const compositionDigest = createHash("sha256").update(canonicalRadarJson({ schemaVersion: 2, article, coverSha256 })).digest("hex");
const decision = { packageVersion: 2, coverAsset: "./cover.png", coverSha256, approval: { compositionDigest }, portalCallback: { compositionDigest } };
const preview = { article, cover: { pngBase64: cover.toString("base64"), sha256: coverSha256 }, compositionDigest };

test("publicador verifica el paquete exacto y rechaza cambios de artículo, fuentes o PNG", () => {
  assert.doesNotThrow(() => verifyRadarPublicationPackage(decision, article, cover));
  assert.throws(() => verifyRadarPublicationPackage({ ...decision, packageVersion: undefined, publicationMode: "manual_review" }, article, cover), /packageVersion/);
  assert.throws(() => verifyRadarPublicationPackage(decision, { ...article, title: "Changed" }, cover), /cambiaron/);
  assert.throws(() => verifyRadarPublicationPackage(decision, { ...article, sources: article.sources.slice(0, 1) }, cover), /cambiaron/);
  assert.throws(() => verifyRadarPublicationPackage(decision, article, Buffer.from('<svg width="1600" height="900"/>')), /PNG real/);
  const changed = Buffer.from(cover); changed[changed.length - 1] ^= 1;
  assert.throws(() => verifyRadarPublicationPackage(decision, article, changed), /cambiaron/);
});

test("preview muestra el PNG exacto y todas las fuentes, sin aceptar contenido activo", async () => {
  const post = await validateRadarPreviewPackage(preview, webcrypto);
  assert.deepEqual(post.sources, article.sources);
  assert.match(post.coverImage, /^data:image\/png;base64,/);
  await assert.rejects(validateRadarPreviewPackage({ ...preview, article: { ...article, sources: [{ name: "Bad", url: "javascript:alert(1)" }] } }, webcrypto), /Fuente/);
  await assert.rejects(validateRadarPreviewPackage({ ...preview, article: { ...article, content: [{ type: "image", src: "https://evil.test/track" }] } }, webcrypto), /Contenido/);
  await assert.rejects(validateRadarPreviewPackage({ ...preview, compositionDigest: "a".repeat(64) }, webcrypto), /cambió/);
});

test("preview exige opener, origen exacto y nonce; rechaza mensajes cruzados", () => {
  const opener = {};
  const event = { source: opener, origin: "https://portal.example.com", data: { type: "radar.preview.package", nonce: "nonce" } };
  assert.equal(acceptsRadarPreviewMessage(event, opener, event.origin, "nonce"), true);
  assert.equal(acceptsRadarPreviewMessage({ ...event, source: {} }, opener, event.origin, "nonce"), false);
  assert.equal(acceptsRadarPreviewMessage(event, opener, "https://portal.example.com.evil.test", "nonce"), false);
  assert.equal(acceptsRadarPreviewMessage(event, opener, event.origin, "other"), false);
  assert.equal(acceptsRadarPreviewMessage(event, null, event.origin, "nonce"), false);
  assert.equal(validPreviewOrigin("https://portal.example.com"), true);
  assert.equal(validPreviewOrigin("https://portal.example.com/path"), false);
  assert.equal(validPreviewOrigin("http://public.example.com"), false);
});
