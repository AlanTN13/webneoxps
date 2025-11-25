// src/pages/servicios/AIInfrastructure.jsx
import Layout from "../../components/Layout";

export default function AIInfrastructure() {
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
              AI Infrastructure &amp; Enablement
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Preparación integral para convertir la empresa en AI-powered:
              limpieza y organización de datos, rediseño de procesos y lógicas
              de negocio, selección de infraestructura tecnológica y
              configuración de software.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Implementamos agentes de IA coordinados para ventas, soporte y
              operaciones sobre una base sólida de datos, procesos y
              herramientas, evitando pruebas aisladas que no escalan.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Estrategia AI-powered
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Infraestructura cloud &amp; datos
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Agentes de IA para negocio
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Gobierno &amp; seguridad
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
                  Ideal para empresas que quieren aprovechar IA generativa y
                  agentes inteligentes, pero hoy tienen datos desordenados,
                  procesos manuales y un stack tecnológico que no fue pensado
                  para IA.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Limpieza, normalización y gobierno de datos para que los
                      modelos trabajen sobre información confiable y no sobre
                      planillas aisladas.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Rediseño de procesos clave (ventas, soporte, operaciones)
                      para incorporar IA sin romper el día a día del equipo.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Selección y orquestación de herramientas: data platform,
                      vectores, LLMs, integraciones con CRM, ERP y canales
                      digitales.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Diseño de agentes de IA coordinados, con límites claros,
                      métricas de desempeño y mecanismos de supervisión humana.
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
                      1. Assessment de madurez AI &amp; datos
                    </p>
                    <p className="mt-1">
                      Relevamos datos disponibles, procesos críticos,
                      herramientas actuales y casos de uso prioritarios para
                      ventas, CX y operaciones.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño de arquitectura y procesos target
                    </p>
                    <p className="mt-1">
                      Definimos cómo deberían fluir los datos, qué componentes
                      tecnológicos usar y cómo se integran los agentes de IA al
                      día a día del negocio.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación de la infraestructura AI
                    </p>
                    <p className="mt-1">
                      Configuramos pipelines, almacenes de datos, conectores con
                      sistemas core, repositorios de conocimiento y pasarelas de
                      acceso seguro a LLMs.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Agentes de IA y handover al equipo
                    </p>
                    <p className="mt-1">
                      Implementamos agentes de IA para casos de uso
                      específicos, medimos impacto, ajustamos prompts y flujos,
                      y dejamos guías de operación y gobierno.
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
                      Ventas &amp; Marketing
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Agentes de IA para calificar leads, asistir a SDRs y
                      generar propuestas sobre datos de CRM y pipeline.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Customer Experience
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Bots de soporte conectados a base de conocimiento,
                      historial de tickets y políticas comerciales.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Operaciones &amp; backoffice
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Automatización de tareas repetitivas: conciliaciones,
                      generación de reportes, documentación y flujos internos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <aside className="space-y-6">
              {/* Panel implementación típica */}
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
                        De pruebas aisladas de IA a una infraestructura
                        preparada para escalar agentes y casos de uso en toda la
                        organización.
                      </p>
                    </div>

                    {/* Pill tipo blueprint */}
                    <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-100 whitespace-nowrap">
                      Blueprint en 6–10 semanas
                    </span>
                  </div>

                  {/* Métricas en 3 columnas */}
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3 flex flex-col justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        6–10 semanas
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Infraestructura base + primeros agentes
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3 flex flex-col justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Alcance típico
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        3–5 procesos core
                        <br />
                        + 2–3 canales
                        <br />
                        (web, WhatsApp, email)
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
                        + equipo cross (IT, negocio, CX)
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Assessment de madurez AI &amp; datos</li>
                      <li>
                        • Blueprint de arquitectura de datos, infraestructura y
                        agentes
                      </li>
                      <li>
                        • Infraestructura AI básica implementada e integrada con
                        sistemas core
                      </li>
                      <li>
                        • 1–2 agentes de IA operativos con métricas y tablero de
                        seguimiento
                      </li>
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
                  En una llamada de 45 minutos revisamos tu estado actual,
                  priorizamos casos de uso de IA y te proponemos un roadmap
                  concreto para preparar la infraestructura y lanzar los
                  primeros agentes.
                </p>

                <a
                  href="https://calendly.com/nexopstech-info/45min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Conversar sobre AI Infrastructure →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
