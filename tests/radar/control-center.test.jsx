import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RadarControlCenter from "../../src/pages/radar/RadarControlCenter";
import { radarFixture } from "../../src/pages/radar/fixtures";

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
    expect(html).toContain("Entorno de demostración");
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
    const html = renderRoute("/radar/opportunities/agent-governance");

    expect(html).toContain("Una oportunidad explicada en lenguaje de negocio");
    expect(html).toContain("Detalles adicionales");
    expect(html).not.toContain("Señales del candidato");
    expect(html).not.toContain("fórmulas");
  });
});
