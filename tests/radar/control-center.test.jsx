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
  it("carga /radar desde la frontera de datos", () => {
    const data = structuredClone(radarFixture);
    data.metrics.runsToday = 23;

    const html = renderRoute("/radar", data);

    expect(html).toContain("La operación editorial, en una sola vista.");
    expect(html).toContain(">23<");
    expect(html).toContain("Datos de demostración");
    expect(html).not.toContain("Todos los servicios estables");
    expect(html).not.toContain("Actualizado hace menos de un minuto");
    expect(html).not.toContain("3 en las últimas 2 h");
  });

  it("renderiza los estados principales en Activity", () => {
    const html = renderRoute("/radar/activity");

    expect(html).toContain("Ejecuciones recientes");
    expect(html).toContain("Published");
    expect(html).toContain("Rejected");
    expect(html).toContain("Running");
  });

  it("no expone controles mutables", () => {
    const html = renderRoute(
      "/radar/candidates/candidate-agent-governance",
    );

    expect(html).not.toMatch(/<(?:form|input|textarea|select)\b/i);
    expect(html).not.toMatch(
      /<button\b[^>]*>[^<]*(?:Publicar|Recalcular|Descartar|Editar|Guardar)/i,
    );
    expect(html).toContain("Vista de solo lectura");
  });
});
