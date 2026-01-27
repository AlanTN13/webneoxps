// src/pages/servicios/DataEngineering.jsx
import Layout from "../../components/Layout";
import { CALENDLY_LINK } from "../../config/constants";

export default function DataEngineering() {
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
              Data Engineering & Architecture
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Unificamos tus datos dispersos en una arquitectura moderna
              (warehouse, lake, modelos y pipelines) para que reportes, automatices
              y apliques IA sobre una base confiable.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Hoy los datos viven en ERP, ecommerce, CRM, spreadsheets y herramientas
              de soporte. Diseñamos una capa de datos única, gobernada y documentada,
              que soporta reporting, analítica y automatizaciones sin depender de
              héroes individuales.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Arquitectura de datos moderna
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Pipelines automatizados
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Data Warehouse / Lakehouse
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Base lista para BI & IA
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
                  Ideal para equipos que crecieron rápido y hoy tienen reportes
                  manuales, métricas inconsistentes y decisiones tomadas con
                  datos incompletos o desactualizados.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Consolidamos información de ERP, ecommerce, CRM, logística,
                      finanzas y soporte en un modelo único y versionado.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Definimos métricas maestras (ventas, margen, ticket,
                      NPS, tiempos) para que toda la compañía hable el mismo idioma.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Automatizamos cargas y transformaciones para eliminar reportes
                      manuales y liberar horas del equipo.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Diseñamos una base sólida para proyectos de IA, bots y reglas
                      automáticas sin tener que rehacer todo después.
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
                      1. Descubrimiento de fuentes y métricas clave
                    </p>
                    <p className="mt-1">
                      Mapear sistemas actuales, definiciones de negocio y brechas
                      entre cómo se mide hoy y cómo debería medirse.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Diseño de modelo y arquitectura objetivo
                    </p>
                    <p className="mt-1">
                      Definimos modelo de datos, tecnologías sugeridas y criterios
                      de calidad y gobernanza.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación de pipelines y cargas iniciales
                    </p>
                    <p className="mt-1">
                      Configuramos procesos de ingestión, transformación y
                      orquestación con monitoreo básico.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Activación para BI y analítica
                    </p>
                    <p className="mt-1">
                      Dejamos lista la conexión con tus herramientas de BI y
                      documentamos el uso por equipo.
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
                      Ecommerce & Retail
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Ventas online + tiendas físicas, stock y márgenes en una
                      misma vista para entender qué realmente funciona.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Operaciones & Logística
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Tiempos de entrega, SLAs, costos por operador y puntos de
                      falla identificados con datos diarios.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      CX, Soporte & Bots
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Tickets, WhatsApp, NPS y automatizaciones integrados para
                      medir experiencia real e impacto de los bots.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Columna derecha: panel de implementación + CTA */}
            <aside className="space-y-6">
              {/* Panel implementación – estilo KPI SaaS */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] overflow-hidden">
                {/* Barra de acento */}
                <div className="h-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#0EA5E9]" />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Implementación típica
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        De datos dispersos a arquitectura lista para BI e IA.
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700">
                      Blueprint en 3–6 semanas
                    </span>
                  </div>

                  {/* KPIs */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {/* Tiempo */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        3–6 semanas
                      </p>
                      <p className="text-[11px] text-slate-500">Primer caso de uso</p>
                    </div>

                    {/* Orígenes */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Orígenes de datos
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        4–6 sistemas
                      </p>
                      <p className="text-[11px] text-slate-500">
                        ERP, ecommerce, CRM, hojas, soporte
                      </p>
                    </div>

                    {/* Esfuerzo cliente */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Esfuerzo del cliente
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        1 owner
                      </p>
                      <p className="text-[11px] text-slate-500">+ 2–3 workshops clave</p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Modelo de datos documentado y versionado</li>
                      <li>• Pipelines automatizados con monitoreo básico</li>
                      <li>• Conexión lista para BI / dashboards e IA</li>
                      <li>• Roadmap sugerido de próximos casos de uso</li>
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
                  En una llamada de 30 minutos revisamos tus fuentes de datos,
                  definimos el primer caso de uso y te llevás un esquema de
                  arquitectura recomendado para tu contexto.
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
