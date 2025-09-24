export default function ServicesStacked() {
    const services = [
      {
        title: "Data Engineering / Architecture",
        icon: <IconDatabase />,
        desc:
          "Diseño de pipelines de datos, modelos unificados y almacenamiento centralizado para concentrar toda la información en un repositorio confiable y accesible.",
      },
      {
        title: "Data Visualization Solutions",
        icon: <IconBarChart />,
        desc:
          "Desarrollo de dashboards interactivos en Power BI, Tableau o Looker Studio con indicadores de ventas, flujo de caja, marketing y logística en tiempo real.",
      },
      {
        title: "AI Infrastructure",
        icon: <IconCpu />,
        desc:
          "Preparación integral para convertir la empresa en AI-powered: limpieza y organización de datos, rediseño de procesos y lógicas de negocio, selección de infraestructura tecnológica y configuración de software. Implementación de agentes de IA coordinados para ventas, soporte y operaciones.",
      },
      {
        title: "AI Agents",
        icon: <IconBot />,
        desc:
          "Diseño e implementación de bots y agentes inteligentes que responden consultas, califican leads, generan propuestas y acompañan a los equipos en múltiples canales (WhatsApp, web, email).",
      },
      {
        title: "Software Integrations",
        icon: <IconCable />,
        desc:
          "Integración de ERP, CRM, e-commerce, logística y sistemas contables para que la información fluya automáticamente y en tiempo real.",
      },
      {
        title: "Process Automation",
        icon: <IconWorkflow />,
        desc:
          "Automatización de tareas de negocio para que las actividades críticas se ejecuten de forma automática, programada y sin intervención manual, garantizando consistencia y continuidad en la operación.",
      },
      {
        title: "Front-End & UX",
        icon: <IconMonitor />,
        desc:
          "Diseño y optimización de interfaces web y móviles enfocadas en velocidad, claridad y experiencia del usuario.",
      },
    ];
  
    return (
      <section id="servicios" className="bg-gradient-to-b from-white to-slate-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          {/* Headline como imagen 1 */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Lo que hacemos en <span className="text-indigo-600">NexOps</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Transformamos tu negocio con soluciones de IA personalizadas que escalan automáticamente.
            </p>
          </div>
  
          {/* Lista vertical de cards */}
          <div className="space-y-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 sm:p-6
                           shadow-md shadow-slate-200 hover:shadow-xl hover:shadow-slate-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    {s.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
  
          {/* CTA violeta centrado, estilo imagen 1 */}
          <div className="mt-8 flex justify-center">
            <a
              href="#contacto"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white
                         shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Descubre cómo podemos ayudarte
              <svg viewBox="0 0 24 24" className="ml-2 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
  }
  
  /* ==== Íconos inline (sin librerías) ==== */
  function IconDatabase() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  }
  function IconBarChart() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="10" width="3" height="8" rx="1" />
        <rect x="9" y="6" width="3" height="12" rx="1" />
        <rect x="15" y="12" width="3" height="6" rx="1" />
      </svg>
    );
  }
  function IconCpu() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    );
  }
  function IconBot() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="8" width="14" height="10" rx="3" />
        <circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" />
        <path d="M12 8V5M10 5h4" />
      </svg>
    );
  }
  function IconCable() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 8v4a4 4 0 0 0 4 4h8" />
        <path d="M20 16V8a4 4 0 0 0-4-4H8" />
        <path d="M7 8h2M15 16h2" />
      </svg>
    );
  }
  function IconWorkflow() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 7.5l3 6 4-6" />
      </svg>
    );
  }
  function IconMonitor() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    );
  }
  