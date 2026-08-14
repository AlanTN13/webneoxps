import assert from "node:assert/strict";
import test from "node:test";
import {
  createRadarCoverBuffer,
  inspectPng,
  jaccardSimilarity,
  semanticCollision,
} from "../../scripts/radar-v2-weekday.mjs";

test("Radar cover generator produces production-size 16:9 PNGs", () => {
  for (const territory of [
    "automatizacion-procesos",
    "ia-aplicada-empresas",
    "crm-automatizacion-comercial",
    "data-analytics",
  ]) {
    const buffer = createRadarCoverBuffer({ slug: `radar-${territory}`, territory });
    const info = inspectPng(buffer);
    assert.equal(info.width, 1600);
    assert.equal(info.height, 900);
    assert.ok(info.bytes >= 5_000);
    assert.ok(info.bytes <= 1_500_000);
  }
});

test("Radar semantic overlap catches near-identical editorial intents", () => {
  const existing = [{
    slug: "como-automatizar-reportes-de-ventas",
    title: "Cómo automatizar reportes de ventas",
    primaryKeyword: "automatizar reportes de ventas",
  }];
  const candidate = {
    title: "Cómo automatizar reportes de ventas en una PyME",
    primaryKeyword: "automatizar reportes de ventas",
  };
  const result = semanticCollision(existing, candidate);
  assert.equal(result.conflict, true);
  assert.equal(result.slug, existing[0].slug);
});

test("Radar semantic overlap allows distinct problems", () => {
  assert.ok(jaccardSimilarity(
    "automatizar seguimiento de leads",
    "gobernanza de datos sensibles para IA",
  ) < 0.2);
});
