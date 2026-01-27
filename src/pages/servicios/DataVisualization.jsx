// src/pages/servicios/DataVisualization.jsx
import Layout from "../../components/Layout";
import { CALENDLY_LINK } from "../../config/constants";

export default function DataVisualization() {
  return (
    <Layout>
      <main className="bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          {/* Encabezado */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Servicio
            </span>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Data Visualization Solutions
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Desarrollo de dashboards interactivos en Power BI, Tableau o
              Looker Studio con indicadores de ventas, flujo de caja,
              marketing y logística en tiempo real.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Transformamos reportes manuales y planillas eternas en tableros
              claros, accionables y alineados con cómo realmente se gestiona
              el negocio.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Power BI, Tableau, Looker Studio
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Dashboards ejecutivos
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Indicadores comerciales &amp; operativos
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Datos casi en tiempo real
              </span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr,1fr]">
            {/* Columna izquierda */}
            <div className="space-y-6">
              {/* Qué problema resolvemos */}
              <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Qué problema resolvemos
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Ideal para equipos que hoy toman decisiones con reportes
                  manuales, planillas desactualizadas o dashboards que nadie
                  mira porque no responden las preguntas correctas.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Convertimos KPIs dispersos en un set ordenado de
                      indicadores por área: Dirección, Comercial, Finanzas,
                      Operaciones, Marketing y CX.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Diseñamos dashboards que parten de las preguntas de
                      negocio, no de la herramienta o del dataset.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Reducimos el uso de planillas manuales y reportes
                      estáticos, reemplazándolos por vistas dinámicas con
                      filtros, drill-down y segmentaciones.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Alineamos la mirada entre dirección y equipos: todos
                      ven los mismos números, al mismo tiempo y en el mismo
                      lugar.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cómo lo abordamos */}
              <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Cómo lo abordamos
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-800">
                      1. Workshop de KPIs y decisiones
                    </p>
                    <p className="mt-1">
                      Relevamos qué decisiones se toman hoy, qué KPIs existen,
                      cuáles faltan y qué stakeholders van a usar los
                      dashboards.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño funcional de dashboards
                    </p>
                    <p className="mt-1">
                      Definimos maquetas de vistas (ejecutiva, comercial,
                      operaciones, finanzas, marketing) con estructura clara
                      por nivel de detalle.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación en la herramienta elegida
                    </p>
                    <p className="mt-1">
                      Configuramos modelos, métricas, filtros, relaciones y
                      visualizaciones en Power BI, Tableau o Looker Studio.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Ajustes finos y handover al equipo
                    </p>
                    <p className="mt-1">
                      Iteramos con usuarios clave, documentamos el uso y
                      dejamos checklist para evolutivos futuros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Casos típicos */}
              <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Casos típicos
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Dirección &amp; Board
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Tablero ejecutivo con revenue, margen, cash flow y
                      principales alertas en una sola vista.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Comercial &amp; Marketing
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Ventas por canal, cohortes de clientes, ROAS, funnel y
                      performance de campañas.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Operaciones &amp; Logística
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Niveles de servicio, tiempos de entrega, capacidad,
                      quiebres de stock y costos por tramo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <aside className="space-y-6">
              {/* Panel implementación estilo Data Engineering para Data Visualization */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                {/* Barra superior con gradiente */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-sky-400" />

                <div className="p-6 pt-7 flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Implementación típica
                      </p>
                      <p className="mt-2 text-sm text-slate-600 max-w-xs">
                        Ciclo corto para validar un primer dashboard y sentar las bases
                        para escalar al resto del negocio.
                      </p>
                    </div>

                    {/* Pill tipo blueprint */}
                    <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-100 whitespace-nowrap">
                      Blueprint en 2–4 semanas
                    </span>
                  </div>

                  {/* Métricas en 3 columnas, estilo boxes */}
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3 flex flex-col justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        2–4 semanas
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Primer tablero
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3 flex flex-col justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Áreas típicas
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        Dirección, Comercial,
                        <br />
                        Finanzas, Operaciones,
                        <br />
                        Marketing
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3 flex flex-col justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Esfuerzo del cliente
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        1 sponsor
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        + 2–3 sesiones de trabajo
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Diseño funcional de KPIs y vistas</li>
                      <li>• Dashboard implementado en Power BI / Tableau / Looker</li>
                      <li>• Guía de uso para equipos de negocio</li>
                      <li>• Lista de evolutivos sugeridos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tarjeta de próximo paso */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Próximo paso
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  En una llamada de 30 minutos revisamos cómo estás midiendo hoy,
                  definimos el primer tablero a construir y te proponemos un
                  enfoque concreto para implementarlo.
                </p>

                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Agendar una conversación →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
