import React from "react";

// ---------------------------------------------
// Nexops – Minimal, polished landing sin framer-motion
// Use in a Vite + Tailwind project como src/App.jsx
// ---------------------------------------------

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md ${className}`}>{children}</div>
);

const Check = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-xl bg-indigo-600" />
    <span className="font-semibold tracking-tight">Nexops</span>
  </div>
);

const NavBar = () => (
  <div className="sticky top-0 z-40 w-full border-b border-slate-100/80 bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
        <a href="#servicios" className="hover:text-slate-900">Servicios</a>
        <a href="#proceso" className="hover:text-slate-900">Proceso</a>
        <a href="#casos" className="hover:text-slate-900">Casos</a>
        <a href="#contacto" className="hover:text-slate-900">Contacto</a>
      </nav>
      <a href="#contacto" className="inline-flex items-center rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Hablemos
      </a>
    </div>
  </div>
);

const Hero = () => (
  <Section className="bg-gradient-to-b from-white to-slate-50">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-16 lg:grid-cols-2">
      <div>
        <Pill>
          <span className="h-2 w-2 rounded-full bg-emerald-500"/> Listo para implementar
        </Pill>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Agentes de IA y automatización que <span className="text-indigo-600">ahorran horas</span> y escalan tu operación
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          En Nexops integramos tus canales, estandarizamos procesos y desplegamos agentes inteligentes para que tu equipo se enfoque en lo importante.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#contacto" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            Agendar una reunión <ArrowRight />
          </a>
          <a href="#servicios" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300">
            Ver servicios
          </a>
        </div>
        <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2"><Star/> 100+ automatizaciones</div>
          <div className="flex items-center gap-2"><Star/> Implementación en semanas</div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-indigo-50 blur-2xl"/>
        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-sm font-semibold text-slate-900">Bots de atención</p>
              <p className="mt-1 text-sm text-slate-600">WhatsApp, IG y Web con handoff a humanos.</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">RPA & Flujos</p>
              <p className="mt-1 text-sm text-slate-600">n8n, Apps Script y webhooks.</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Integraciones</p>
              <p className="mt-1 text-sm text-slate-600">Kommo, Sheets, Power Apps, CRMs.</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Analítica</p>
              <p className="mt-1 text-sm text-slate-600">GA4, dashboards y KPIs en tiempo real.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Logos = () => (
  <Section className="py-10">
    <div className="mx-auto max-w-7xl px-4">
      <p className="text-center text-xs uppercase tracking-wider text-slate-500">Equipos que confían en nosotros</p>
      <div className="mt-6 grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-4 lg:grid-cols-6">
        {["GlobalTrip","Endotec","Carestino","Nexlabs","Kommo","n8n"].map((name) => (
          <div key={name} className="flex items-center justify-center rounded-xl border border-slate-100 bg-white py-3 text-sm font-medium text-slate-500">
            {name}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Servicios = () => (
  <Section id="servicios" className="bg-slate-50/60">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Servicios</h2>
        <p className="mt-3 text-slate-600">Implementamos punta a punta, de la idea al resultado medible.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Agentes de IA",
            points: ["Atención automatizada 24/7","Rutas de intención","Memoria y contexto"],
          },
          {
            title: "Automatización de procesos",
            points: ["n8n / Apps Script","Integraciones via API","Validaciones y aprobaciones"],
          },
          {
            title: "CRM & Omnicanal",
            points: ["Kommo + WhatsApp Business","Embudos y SLA","Reportes por equipo"],
          },
          {
            title: "Data & Analytics",
            points: ["GA4 / Looker Studio","Eventos y conversiones","KPIs en tiempo real"],
          },
          {
            title: "UX & Front ligero",
            points: ["Landings en React","Formularios inteligentes","Componentes reutilizables"],
          },
          {
            title: "Soporte & Escalado",
            points: ["Monitoreo y alertas","Runbooks y playbooks","Capacitación al equipo"],
          },
        ].map(({ title, points }) => (
          <Card key={title}>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2"><Check/><span>{p}</span></li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

const Proceso = () => (
  <Section id="proceso">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cómo trabajamos</h2>
        <p className="mt-3 text-slate-600">Sprints cortos, entregables reales y foco en ROI.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {[
          { step: "01", title: "Descubrimiento", desc: "Relevamos procesos, canales y datos." },
          { step: "02", title: "Diseño", desc: "Arquitectura + backlog priorizado." },
          { step: "03", title: "Implementación", desc: "Agentes, flujos y QA con usuarios." },
          { step: "04", title: "Medición", desc: "KPIs, tuning y escalado continuo." },
        ].map(({ step, title, desc }) => (
          <Card key={step}>
            <div className="flex items-start gap-4">
              <span className="rounded-xl bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{step}</span>
              <div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

const Casos = () => (
  <Section id="casos" className="bg-slate-50/60">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Casos recientes</h2>
        <p className="mt-3 text-slate-600">Resultados concretos en semanas, no meses.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {[
          { name: "GlobalTrip", impact: "-62% tiempo de respuesta", note: "Bot + n8n + Sheets" },
          { name: "Endotec", impact: "+38% leads calificados", note: "Landing + GA4 + CRM" },
          { name: "Retail LATAM", impact: "-45% tareas manuales", note: "RPA + panel de KPIs" },
        ].map(({ name, impact, note }) => (
          <Card key={name}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">{name}</p>
              <span className="text-xs text-emerald-700">{impact}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{note}</p>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

const CTA = () => (
  <Section id="contacto" className="relative">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.08),transparent)]"/>
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-3">
        <div className="sm:col-span-2">
          <h3 className="text-2xl font-semibold text-slate-900">¿Listo para empezar?</h3>
          <p className="mt-1 text-slate-600">Agendá una llamada de 25 minutos para revisar tu caso y armar un plan express.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700">
            Agendar en Calendly
          </a>
          <a href="https://wa.me/" className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300">
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-slate-100 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <div className="h-6 w-6 rounded-lg bg-indigo-600" />
        © {new Date().getFullYear()} Nexops. Todos los derechos reservados.
      </div>
      <nav className="flex items-center gap-4 text-sm text-slate-500">
        <a href="#servicios" className="hover:text-slate-900">Servicios</a>
        <a href="#proceso" className="hover:text-slate-900">Proceso</a>
        <a href="#casos" className="hover:text-slate-900">Casos</a>
        <a href="#contacto" className="hover:text-slate-900">Contacto</a>
      </nav>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <NavBar />
      <Hero />
      <Logos />
      <Servicios />
      <Proceso />
      <Casos />
      <CTA />
      <Footer />
    </div>
  );
}
