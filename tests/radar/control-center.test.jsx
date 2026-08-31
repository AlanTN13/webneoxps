import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RadarControlCenter from "../../src/pages/radar/RadarControlCenter";
import { buildRadarData } from "../../src/pages/radar/data";

const radarFixture = buildRadarData([
  {
    id: "radar-real-rejection-20260824",
    runId: "radar-real-rejection-20260824",
    kind: "opportunity",
    outcome: "NO_PUBLICATION",
    detectedAt: "2026-08-24T09:48:00.000Z",
    title: "Actualización menor en una plataforma CRM",
    topic: "Cambio de interfaz",
    category: "CRM & Ventas",
    territory: "crm-automatizacion-comercial",
    sourceName: "Product changelog",
    sourceUrl: "https://example.com/crm-release-notes",
    score: 61,
    scoreBreakdown: [
      { dimension: "novelty", label: "Novedad", score: 41 },
      { dimension: "business", label: "Relevancia comercial", score: 55 },
    ],
    reason: "Radar decidió no publicarla para evitar contenido redundante, con poca novedad y sin una conexión clara con el negocio.",
  },
], { now: new Date("2026-08-24T10:42:00.000Z") });

function renderRoute(pathname, data = radarFixture) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[pathname]}>
      <RadarControlCenter data={data} />
    </MemoryRouter>,
  );
}

describe("Radar Control Center", () => {
  it("presenta resultados de negocio desde la frontera de datos", () => {
    const data = structuredClone(radarFixture);
    data.summary.detectedThisWeek = 23;

    const html = renderRoute("/radar", data);

    expect(html).toContain("Radar encuentra oportunidades");
    expect(html).toContain(">23<");
    expect(html).toContain("Workspace NexOps");
    expect(html).toContain("Datos reales sincronizados");
    expect(html).not.toContain("Runs hoy");
    expect(html).not.toContain("Deployment Gate");
  });

  it.each([
    ["/radar/opportunities", "Ideas que merecen una decisión"],
    ["/radar/published", "Contenido que Radar puso a trabajar"],
    ["/radar/configuration", "Decile a Radar qué querés lograr"],
    ["/radar/history", "Qué hizo Radar y por qué"],
  ])("renderiza la ruta de producto %s", (path, heading) => {
    expect(renderRoute(path)).toContain(heading);
  });

  it("mantiene la configuración como simulación local explícita", () => {
    const html = renderRoute("/radar/configuration");

    expect(html).toContain("estos cambios no se guardan ni afectan al Radar real");
    expect(html).toContain("Así trabajaría Radar");
    expect(html).not.toMatch(/>Guardar</i);
    expect(html).not.toMatch(/<form\b/i);
  });

  it("encapsula el detalle técnico y prioriza la explicación comercial", () => {
    const publishedOpportunity = radarFixture.opportunities.find((item) => item.status === "published");
    const html = renderRoute(`/radar/opportunities/${publishedOpportunity.id}`);

    expect(html).toContain("Por qué Radar recomienda publicarla");
    expect(html).toContain("Relevancia comercial");
    expect(html).toContain("Calidad de fuente");
    expect(html).toContain("Conclusión");
    expect(html).toContain("Detalles adicionales");
    expect(html).not.toContain("Señales del candidato");
    expect(html).not.toContain("fórmulas");
    expect(html).not.toMatch(/volumen de búsquedas|conversiones|tráfico estimado/i);
  });

  it("explica el valor de no publicar y conserva la oportunidad", () => {
    const html = renderRoute("/radar/opportunities/radar-real-rejection-20260824");

    expect(html).toContain("Por qué Radar decidió no publicarla");
    expect(html).toContain("Novedad");
    expect(html).toContain("Relevancia comercial");
    expect(html).toContain("41/100");
    expect(html).toContain("evitar contenido redundante");
    expect(html).toContain("queda guardada");
  });
});
