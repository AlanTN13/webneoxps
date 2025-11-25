// src/pages/servicios/SoftwareIntegrations.jsx
import Layout from "../../components/Layout";

export default function SoftwareIntegrations() {
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
              Software Integrations
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Integración de ERP, CRM, e-commerce, logística y sistemas contables
              para que la información fluya automáticamente y en tiempo real.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Conectamos tus sistemas para eliminar carga manual, duplicidad de
              datos y errores operativos, construyendo flujos confiables entre
              plataformas clave del negocio.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                ERP, CRM, e-commerce, WMS
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Integraciones contables &amp; financieras
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                APIs &amp; conectores a medida
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Eventos en tiempo casi real
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
                  Ideal para empresas donde cada área usa un sistema distinto,
                  la información se reconcilia en Excel y las integraciones
                  actuales son frágiles, manuales o dependen de una sola persona.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Eliminamos la doble carga de datos entre ERP, CRM,
                      e-commerce, logística y contabilidad.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Reducimos errores por planillas intermedias y procesos
                      “manuales” entre sistemas.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Aseguramos que ventas, stock, facturación y envíos se
                      actualicen de forma consistente y trazable.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Dejamos integraciones documentadas, monitoreadas y fáciles
                      de mantener, sin “magia negra”.
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
                      1. Mapeo de sistemas y flujos críticos
                    </p>
                    <p className="mt-1">
                      Relevamos qué sistemas intervienen (ERP, CRM, ecommerce,
                      WMS, contable), qué datos se mueven y dónde se rompen los
                      procesos hoy.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño de arquitectura de integraciones
                    </p>
                    <p className="mt-1">
                      Definimos qué se integra con qué, por qué canal (APIs,
                      colas, archivos, webhooks) y con qué frecuencia.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación, pruebas y monitoreo
                    </p>
                    <p className="mt-1">
                      Construimos integraciones, validamos datos de punta a
                      punta y dejamos alertas para detectar fallas antes de que
                      impacten al negocio.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Documentación y handover al equipo
                    </p>
                    <p className="mt-1">
                      Entregamos documentación técnica y funcional, manuales de
                      operación y criterios para evolucionar las integraciones.
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
                      ERP &amp; Ecommerce
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Sincronización de pedidos, stock, precios y clientes entre
                      tienda online y sistema de gestión.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      CRM &amp; Operaciones
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Integración de oportunidades, contratos y tickets con
                      facturación, proyectos y soporte.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Logística &amp; Contabilidad
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Flujo de información de envíos, costos, cobranzas y
                      asientos contables de forma automática.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <aside className="space-y-6">
              {/* Implementación típica */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                {/* Barra superior */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-sky-400" />

                <div className="p-6 pt-7 flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Implementación típica
                      </p>
                      <p className="mt-2 text-sm text-slate-600 max-w-xs">
                        Integración robusta entre sistemas core del negocio,
                        diseñada para escalar y mantenerse en el tiempo.
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
                        1–2 integraciones core
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Sistemas típicos
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        ERP, CRM,  
                        ecommerce, WMS,  
                        contable
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
                        + 2–3 sesiones funcionales
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Mapa de sistemas y flujos de integración</li>
                      <li>• Integraciones implementadas y testeadas end-to-end</li>
                      <li>• Monitoreo básico y alertas configuradas</li>
                      <li>• Documentación funcional y técnica</li>
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
                  En una llamada de 30 minutos revisamos tu ecosistema de
                  sistemas y definimos qué integraciones priorizar para liberar
                  más tiempo de tu equipo y reducir errores.
                </p>

                <a
                  href="https://calendly.com/nexopstech-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Revisar integraciones actuales →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}