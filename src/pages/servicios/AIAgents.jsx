// src/pages/servicios/AIAgents.jsx
import Layout from "../../components/Layout";
import { CALENDLY_LINK } from "../../config/constants";

export default function AIAgents() {
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
              AI Agents
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Diseño e implementación de bots y agentes inteligentes que responden
              consultas, califican leads, generan propuestas y acompañan a los
              equipos en múltiples canales (WhatsApp, web, email).
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Construimos agentes que operan sobre datos reales, reglas de negocio
              y procesos validados, garantizando precisión, control y capacidad de
              escalar sin aumentar el equipo humano.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Bots para CX
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Agentes para ventas
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Integración a CRM / ERP
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                WhatsApp • Web • Email
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
                  Ideal para empresas con alto volumen de consultas, procesos
                  manuales en ventas o soporte, y equipos sobrecargados
                  respondiendo las mismas preguntas todos los días.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Respuestas automáticas conectadas a información real:
                      precios, stock, políticas, estado de órdenes y más.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Calificación automática de leads usando reglas del negocio
                      + IA para priorizar oportunidades.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Generación de cotizaciones, resúmenes y propuestas basadas
                      en catálogos, productos o historial de cliente.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Reducción de carga operativa para equipos de CX, ventas y
                      operaciones, mejorando SLA y productividad.
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
                      1. Mapeo de procesos y preguntas frecuentes
                    </p>
                    <p className="mt-1">
                      Relevamos casos de uso clave, tono de comunicación,
                      reglas de negocio y fuentes de información necesarias.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño del agente y su comportamiento
                    </p>
                    <p className="mt-1">
                      Definimos decisiones, flujos conversacionales, límites
                      operativos y condiciones para la intervención humana.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Integración a sistemas y fuentes de datos
                    </p>
                    <p className="mt-1">
                      Conectamos el agente a CRM, ERP, ecommerce, catálogos,
                      tracking o cualquier sistema relevante.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Entrenamiento, lanzamiento y supervisión
                    </p>
                    <p className="mt-1">
                      Ajustamos prompts, afinamos decisiones, validamos respuestas
                      y entregamos métricas para operación continua.
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
                      CX / Soporte
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Respuestas automáticas, seguimiento de órdenes, devoluciones,
                      cambios y políticas.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Ventas
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Cualificación de leads, cotizaciones, armado de propuestas
                      y acompañamiento en compra.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Operaciones
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Automatización conversacional de consultas operativas
                      internas y flujos administrativos.
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
                        Agente de IA conectado al negocio, procesos y sistemas,
                        operativo en 3–6 semanas según complejidad.
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-100 whitespace-nowrap">
                      Blueprint en 3–6 semanas
                    </span>
                  </div>

                  {/* Métricas */}
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        3–6 semanas
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Primer agente
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Canales
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        WhatsApp
                        <br /> Web
                        <br /> Email
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
                        + 2–3 workshops
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Diseño conversacional y reglas de negocio</li>
                      <li>• Integración con CRM / ERP / ecommerce</li>
                      <li>• Agente entrenado y validado en producción</li>
                      <li>• Dashboard de métricas y mejoras sugeridas</li>
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
                  En una llamada de 30 minutos revisamos tus casos de uso y
                  definimos qué agente de IA generar para maximizar impacto en
                  ventas, CX u operaciones.
                </p>

                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Agendar conversación →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
