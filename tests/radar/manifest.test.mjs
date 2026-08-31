import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { generateRadarManifest, projectRadarPublication } from "../../scripts/generate-radar-manifest.mjs";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => fs.rm(directory, { recursive: true, force: true })));
});

function article(overrides = {}) {
  return {
    title: "Automatización operativa con trazabilidad",
    slug: "automatizacion-operativa-trazabilidad",
    category: "Automatización",
    publishedAt: "2026-08-31T12:00:00.000Z",
    excerpt: "Una guía práctica para automatizar sin perder control.",
    sourceName: "Fuente oficial",
    sourceUrl: "https://example.org/source",
    engineRunId: "radar-organic-20260831",
    engineScore: 91,
    generatedByEngine: true,
    coverImage: "/assets/insights/editorial/automation.png",
    ...overrides,
  };
}

describe("manifest público de Radar para el Portal", () => {
  it("proyecta únicamente publicaciones reales del motor", () => {
    expect(projectRadarPublication(article())).toMatchObject({
      runId: "radar-organic-20260831",
      outcome: "PUBLICATION",
      status: "verified",
      score: 91,
      url: "https://www.nexopstech.com/noticias/automatizacion-operativa-trazabilidad",
    });
    expect(projectRadarPublication(article({ generatedByEngine: false }))).toBeNull();
  });

  it("genera un archivo sin prompts, fórmulas ni configuración privada", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "radar-manifest-"));
    temporaryDirectories.push(directory);
    const newsDirectory = path.join(directory, "news");
    const outputFile = path.join(directory, "public", "radar-publications.json");
    await fs.mkdir(newsDirectory, { recursive: true });
    await fs.writeFile(path.join(newsDirectory, "published.json"), JSON.stringify(article({ prompt: "privado", threshold: 85 })));
    await fs.writeFile(path.join(newsDirectory, "manual.json"), JSON.stringify(article({ slug: "manual", generatedByEngine: false })));

    const manifest = await generateRadarManifest({ newsDirectory, outputFile, generatedAt: "2026-08-31T13:00:00.000Z" });
    const serialized = await fs.readFile(outputFile, "utf8");

    expect(manifest.publications).toHaveLength(1);
    expect(serialized).not.toMatch(/prompt|threshold|formula|secret/i);
  });
});
