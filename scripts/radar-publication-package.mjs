import { createHash } from "node:crypto";
import { canonicalRadarJson } from "../src/lib/radar-preview.mjs";

export function verifyRadarPublicationPackage(decision, article, cover) {
  if (decision.packageVersion !== 2) {
    if (decision.publicationMode === "manual_review") throw new Error("La aprobación requiere packageVersion=2; revisá la nota otra vez en el Portal.");
    return; // Standalone hand-authored news CLI retains its separate contract.
  }
  if (decision.coverAsset !== "./cover.png" || !article.coverImage?.endsWith(".png") || article.coverImage !== article.ogImage || cover.length < 24 || cover.toString("hex", 0, 8) !== "89504e470d0a1a0a" || cover.readUInt32BE(16) !== 1600 || cover.readUInt32BE(20) !== 900) throw new Error("El paquete aprobado requiere una portada PNG real 1600 × 900.");
  const coverSha256 = createHash("sha256").update(cover).digest("hex");
  const digest = createHash("sha256").update(canonicalRadarJson({ schemaVersion: 2, article, coverSha256 })).digest("hex");
  if (coverSha256 !== decision.coverSha256 || digest !== decision.approval?.compositionDigest || digest !== decision.portalCallback?.compositionDigest) throw new Error("El artículo, fuentes o portada cambiaron después de la aprobación.");
}
