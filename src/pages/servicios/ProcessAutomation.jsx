// src/pages/servicios/ProcessAutomation.jsx
import Layout from "../../components/Layout";
import { CALENDLY_LINK_45MIN } from "../../config/constants";

export default function ProcessAutomation() {
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
              Process Automation
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Automatización de tareas de negocio para que las actividades
              críticas se ejecuten de forma automática, programada y sin
              intervención manual, garantizando consistencia y continuidad en la
              operación.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Diseñamos y orquestamos flujos automatizados que conectan sistemas,
              personas y reglas de negocio, reduciendo errores, tiempos muertos
              y dependencia de procesos “artesanales”.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Flujos de negocio automatizados
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                RPA • bots • orquestadores
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Backoffice &amp; operaciones
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Aprobaciones &amp; notificaciones
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
                  Ideal para equipos que dependen de planillas, emails y
                  mensajería interna para coordinar tareas críticas, con alto
                  riesgo de errores, retrabajo y cuellos de botella.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Eliminamos tareas manuales repetitivas en backoffice,
                      operaciones, finanzas y logística.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Reducimos la dependencia de “personas clave” que hoy
                      sostienen procesos a fuerza de Excel y memoria.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Mejoramos tiempos de ciclo, trazabilidad y cumplimiento de
                      políticas internas.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Dejamos un marco claro para seguir sumando automatizaciones
                      sin perder el control.
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
                      1. Identificación y priorización de procesos
                    </p>
                    <p className="mt-1">
                      Relevamos tareas repetitivas, volúmenes, tiempos de ciclo
                      y riesgos para definir un backlog de automatización
                      priorizado por impacto.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño del flujo objetivo
                    </p>
                    <p className="mt-1">
                      Modelamos el proceso target: eventos de inicio, reglas,
                      decisiones, integraciones y puntos de intervención humana.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación de la automatización
                    </p>
                    <p className="mt-1">
                      Configuramos bots, orquestadores, integraciones con
                      sistemas core y canales de comunicación (email, Slack,
                      WhatsApp, etc.).
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Medición, ajuste y escalamiento
                    </p>
                    <p className="mt-1">
                      Medimos ahorros de tiempo, errores evitados y SLA,
                      ajustamos reglas y definimos próximos procesos a
                      automatizar.
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
                      Backoffice &amp; administración
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Carga de comprobantes, conciliaciones, notificaciones de
                      vencimientos y generación de reportes.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Operaciones &amp; logística
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Actualización de estados, coordinación de envíos, avisos
                      a clientes y proveedores.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Aprobaciones &amp; workflow interno
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Circuitos de aprobación de compras, descuentos, créditos,
                      altas de clientes o cambios de condiciones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <aside className="space-y-6">
              {/* Implementación típica */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-sky-400" />

                <div className="p-6 pt-7 flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Implementación típica
                      </p>
                      <p className="mt-2 text-sm text-slate-600 max-w-xs">
                        Automatización de 1–2 procesos críticos, con métricas de
                        impacto claras y base preparada para seguir escalando.
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-100 whitespace-nowrap">
                      Blueprint en 4–8 semanas
                    </span>
                  </div>

                  {/* Métricas */}
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        4–8 semanas
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        1–2 procesos automatizados
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Alcance típico
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        Backoffice,
                        operaciones,
                        finanzas
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Esfuerzo del cliente
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        1 owner
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        + 2–3 sesiones de definición
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Backlog priorizado de procesos a automatizar</li>
                      <li>• 1–2 flujos automatizados en producción</li>
                      <li>• Tablero básico de métricas e incidentes</li>
                      <li>• Lineamientos para seguir escalando automatizaciones</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA final */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Próximo paso
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  En una llamada de 30–45 minutos identificamos tus quick wins
                  de automatización y definimos juntos el primer proceso a
                  implementar.
                </p>

                <a
                  href={CALENDLY_LINK_45MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Identificar procesos a automatizar →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}