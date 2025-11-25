// src/pages/servicios/FrontEndUX.jsx
import Layout from "../../components/Layout";

export default function FrontEndUX() {
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
              Front-End &amp; UX
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              Diseño y optimización de interfaces web y móviles enfocadas en
              velocidad, claridad y experiencia del usuario.
            </p>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Construimos productos digitales que cargan rápido, se entienden en
              segundos y sostienen procesos complejos de negocio sin fricción
              para el usuario.
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Front-end web &amp; mobile
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                UX para productos B2B &amp; operación
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Performance &amp; accesibilidad
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200/70">
                Diseño orientado a métricas
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
                  Ideal para empresas con aplicaciones internas o sitios
                  comerciales que crecieron por partes, tienen deuda de diseño,
                  cargan lento o generan fricción en el día a día de usuarios y
                  equipos.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Reducimos complejidad visual y pasos innecesarios para que
                      las tareas clave se completen más rápido.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Mejoramos performance (tiempos de carga, interacción) para
                      que la experiencia sea fluida incluso con datos pesados.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Unificamos patrones de diseño y componentes para que el
                      producto se sienta consistente en todos los módulos.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-violet-500">●</span>
                    <span>
                      Diseñamos interfaces que reducen errores, tickets de
                      soporte y training requerido.
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
                      1. Entendimiento de usuarios y flujos clave
                    </p>
                    <p className="mt-1">
                      Mapeamos quién usa el producto (clientes, equipos internos,
                      partners) y qué tareas son críticas para cada perfil.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      2. Rediseño de journeys y pantallas
                    </p>
                    <p className="mt-1">
                      Definimos flujos simplificados, jerarquía de información y
                      estructuras de pantalla centradas en completar tareas, no
                      solo en verse bien.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      3. Implementación front-end
                    </p>
                    <p className="mt-1">
                      Construimos o refactorizamos el front-end con buenas
                      prácticas de performance, accesibilidad y mantenibilidad.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      4. Medición y ajustes sobre métricas reales
                    </p>
                    <p className="mt-1">
                      Medimos tiempos de tarea, errores, velocidad, conversión y
                      feedback de usuarios para iterar sobre una base objetiva.
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
                      Portales &amp; sitios B2B
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Onboarding de clientes, carga de pedidos, seguimiento de
                      casos y autogestión.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Herramientas internas
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Dashboards operativos, backoffices y módulos internos que
                      usan todos los días los equipos.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Productos digitales
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Aplicaciones web o mobile donde UX impacta directo en
                      adopción y revenue.
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
                        Ciclo de rediseño e implementación enfocado en 1 flujo
                        crítico o módulo clave, medido con métricas de uso.
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 border border-violet-100 whitespace-nowrap">
                      Blueprint en 4–6 semanas
                    </span>
                  </div>

                  {/* Métricas */}
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Tiempo estimado
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        4–6 semanas
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        1 flujo o módulo clave
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Alcance típico
                      </p>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                        Portal B2B,  
                        backoffice,  
                        producto digital
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/90 border border-slate-200 px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Esfuerzo del cliente
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        1 product owner
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        + 2–3 sesiones con usuarios
                      </p>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Entregables
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Journey y flujos rediseñados</li>
                      <li>• Prototipos y lineamientos de diseño</li>
                      <li>• Front-end implementado o refactorizado</li>
                      <li>• Métricas de uso y recomendaciones de próximos pasos</li>
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
                  En una llamada de 30 minutos revisamos tu producto actual,
                  identificamos fricciones y definimos el primer módulo o flujo
                  a mejorar.
                </p>

                <a
                  href="https://calendly.com/nexopstech-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
                >
                  Revisar UX de tu producto →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
