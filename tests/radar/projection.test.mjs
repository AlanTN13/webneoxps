import { describe, expect, it } from "vitest";
import { projectRadarHistoryRecord } from "../../server/radar-projection.mjs";

function storedRecord(overrides = {}) {
  return {
    schemaVersion: 1,
    store: "github-private",
    outcome: "NO_PUBLICATION",
    engineRunId: "radar-real-20260824",
    timestamp: "2026-08-24T09:48:00.000Z",
    candidate: {
      title: "Actualización menor en una plataforma CRM",
      topic: "Cambio de interfaz",
      source: { name: "Product changelog", url: "https://vendor.example/product-update" },
    },
    score: {
      total: 61,
      breakdown: [
        { criterion: "relevance", score: 72 },
        { criterion: "novelty", score: 41 },
        { criterion: "editorial-fit", score: 68 },
        { criterion: "internal-weight", score: 99 },
      ],
    },
    rejectionReason: "La novedad no tiene impacto operativo suficiente.",
    editorialMetadata: { category: "CRM", territory: "crm-automatizacion-comercial" },
    ...overrides,
  };
}

describe("proyección segura del historial privado", () => {
  it("traduce sólo dimensiones de negocio allowlisted", () => {
    const projected = projectRadarHistoryRecord(storedRecord());

    expect(projected).toMatchObject({
      id: "radar-real-20260824",
      outcome: "NO_PUBLICATION",
      score: 61,
      kind: "opportunity",
    });
    expect(projected.scoreBreakdown).toEqual([
      { dimension: "business", label: "Relevancia comercial", score: 72 },
      { dimension: "novelty", label: "Novedad", score: 41 },
    ]);
    expect(JSON.stringify(projected)).not.toMatch(/weight|threshold|formula|prompt|fingerprint/i);
  });

  it("separa corridas sintéticas del inventario de oportunidades", () => {
    const projected = projectRadarHistoryRecord(storedRecord({
      candidate: {
        title: "Actualización sintética sin impacto",
        topic: "Validación post-merge",
        source: { name: "Fuente de prueba", url: "https://example.com/radar-test" },
      },
    }));

    expect(projected.kind).toBe("validation");
  });

  it("rechaza registros inválidos o con credenciales", () => {
    expect(projectRadarHistoryRecord(storedRecord({ engineRunId: "bad" }))).toBeNull();
    expect(projectRadarHistoryRecord(storedRecord({ rejectionReason: "token=ghp_abcdefghijklmnopqrstuvwxyz123456" }))).toBeNull();
  });
});
