import React, { useEffect, useRef, useState } from "react";
import Rellax from "rellax";
import brandLogo from "./assets/logo-nexops.svg";

import "./index.css";
import "./App.css";

import IntegrationsMarquee from "./components/IntegrationsMarquee";
import FloatingWhatsApp from "./components/FloatingWhatsApp";


/* =========================
   Helpers WOW (sin librerías)
   ========================= */

// 1) Counter para KPIs
const MetricCounter = ({ to = 100, suffix = "", duration = 1400, className = "" }) => {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const step = (t) => {
      if (!startRef.current) startRef.current = t;
      const p = Math.min((t - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <span className={className}>{val.toLocaleString()}{suffix}</span>;
};

// 2) Scroll reveal con IntersectionObserver
const useReveal = (selector = "[data-reveal]") => {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-4");
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.remove("opacity-0", "translate-y-4");
          target.classList.add("opacity-100", "translate-y-0");
          io.unobserve(target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
};

/* ============
   Layout bits
   ============ */

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    data-reveal
    className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition will-change-transform
                hover:shadow-xl hover:-translate-y-0.5 hover:border-slate-300 ${className}`}
  >
    {children}
  </div>
);

const Check = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =========
   Branding
   ========= */

const Brand = () => (
  <a href="/" className="flex items-center gap-2 group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md">
    <img src={brandLogo} alt="NexOps" className="h-10 w-10 -ml-1 shrink-0" />
    <span className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-indigo-700">NexOps</span>
  </a>
);

/* =======
   NavBar
   ======= */
const NavBar = () => (
  <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-100 h-[72px]">
    <div className="mx-auto max-w-7xl flex h-full items-center justify-between px-6">
      <Brand />
      <nav className="hidden sm:flex items-center gap-8 text-base text-slate-600">
        <a href="#servicios" className="hover:text-indigo-600">Servicios</a>
        <a href="#proceso"   className="hover:text-indigo-600">Proceso</a>
        <a href="#casos"     className="hover:text-indigo-600">Casos</a>
        <a href="#contacto"  className="hover:text-indigo-600">Contacto</a>
      </nav>
      <a
        href="#contacto"
        className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Hablemos
      </a>
    </div>
  </header>
);

/* =============
   HERO
   ============= */
const Hero = () => (
  <Section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
    <style>{`
      @keyframes glow {
        0% { transform: translateY(0px) translateX(0px) scale(1); opacity:.55;}
        50% { transform: translateY(-10px) translateX(6px) scale(1.03); opacity:.75;}
        100% { transform: translateY(0px) translateX(0px) scale(1); opacity:.55;}
      }
    `}</style>

    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="rellax will-change-transform absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/40 blur-2xl" data-rellax-speed="-4" />
      <div className="rellax will-change-transform absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-purple-400/40 blur-2xl" data-rellax-speed="4" />
      <div className="rellax will-change-transform absolute left-[10%] top-1/2 h-48 w-[75%] -translate-y-1/2 rotate-6 rounded-3xl bg-gradient-to-r from-indigo-300/40 to-purple-300/40" data-rellax-speed="-2" />
    </div>

    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-16 lg:grid-cols-2">
      <div data-reveal>
        <Pill><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Listo para implementar</Pill>

        <h1 className="mt-1 text-2xl sm:mt-2 sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Reduce costos y <span className="text-indigo-600">libera horas</span> con automatización inteligente
        </h1>

        <p className="mt-4 max-w-xl text-slate-600">
          Integramos tus canales, estandarizamos procesos y desplegamos agentes de IA que eliminan tareas manuales y escalan tu operación en semanas, no meses.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#contacto" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700">
            Quiero automatizar ahora <ArrowRight />
          </a>
          <a href="#servicios" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300">
            Ver servicios
          </a>
        </div>

        {/* KPIs con contador */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div data-reveal>
            <MetricCounter to={100} suffix="+" className="text-2xl font-bold text-slate-900"/>
            <p className="text-xs text-slate-500">automatizaciones</p>
          </div>
          <div data-reveal>
            <MetricCounter to={3} suffix=" semanas" className="text-2xl font-bold text-slate-900"/>
            <p className="text-xs text-slate-500">implementación promedio</p>
          </div>
          <div data-reveal>
            <MetricCounter to={20} suffix="+" className="text-2xl font-bold text-slate-900"/>
            <p className="text-xs text-slate-500">empresas activas</p>
          </div>
        </div>
      </div>

      {/* Tarjetas del hero */}
      <div className="relative" data-reveal>
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-indigo-50 blur-2xl" />
        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-sky-100 text-sky-600" />
                <p className="text-sm font-semibold text-slate-900">Bots de atención</p>
              </div>
              <p className="text-sm text-slate-600">WhatsApp, IG y Web 24/7 con handoff a humanos.</p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-100 text-indigo-600" />
                <p className="text-sm font-semibold text-slate-900">Automatización (RPA)</p>
              </div>
              <p className="text-sm text-slate-600">n8n, Make, Apps Script y webhooks.</p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-900">Integraciones</p>
              </div>
              <p className="text-sm text-slate-600">Microsoft 365, Google Workspace, Kommo, Power Apps, Sheets, CRMs, Odoo y propios.</p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-amber-100 text-amber-600" />
                <p className="text-sm font-semibold text-slate-900">Analítica</p>
              </div>
              <p className="text-sm text-slate-600">GA4, Looker Studio, Power BI, Tableau y KPIs en tiempo real.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

/* =========
   Logos
   ========= */
const Logos = () => (
  <Section className="py-12 bg-white">
    <div className="mx-auto max-w-7xl px-4">
      {/* 👉 Carrusel de integraciones va ANTES del título */}
      <IntegrationsMarquee />

      <p className="text-center text-xs uppercase tracking-wider text-slate-500 mt-10">
        Equipos que confían en nosotros
      </p>
      <div className="mt-6 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {["GlobalTrip","Endotec","Carestino","Nexlabs","Kommo","n8n"].map((name) => (
          <div
            key={name}
            data-reveal
            className="flex items-center justify-center rounded-xl border border-slate-100 bg-white py-3 text-sm font-medium text-slate-500 transition hover:shadow-md hover:text-slate-700"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* =======================
   Servicios (ecosistema)
   ======================= */
const Servicios = () => (
  <Section id="servicios" className="bg-slate-50/60">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Servicios</h2>
        <p className="mt-3 text-slate-600">Implementamos punta a punta, de la idea al resultado medible.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Agentes de IA",
            points: [
              "Atención automatizada 24/7",
              "Rutas de intención y memoria",
              "Handoff eficiente al equipo"
            ],
          },
          {
            title: "Automatización de procesos (RPA)",
            points: [
              "n8n / Make / Apps Script",
              "Integraciones vía API y webhooks",
              "Validaciones, aprobaciones y SLAs"
            ],
          },
          {
            title: "Integraciones & Ecosistema",
            points: [
              "Microsoft 365 y Google Workspace",
              "Kommo, Power Apps, Sheets, CRMs",
              "Odoo y sistemas custom / legacy"
            ],
          },
          {
            title: "Data & Analytics",
            points: [
              "GA4 / Looker Studio / Power BI / Tableau",
              "Eventos, conversiones y trazabilidad",
              "KPIs y dashboards en tiempo real"
            ],
          },
          {
            title: "UX & Front ligero",
            points: [
              "Landings en React",
              "Formularios inteligentes",
              "Componentes reutilizables"
            ],
          },
          {
            title: "Soporte & Escalado",
            points: [
              "Monitoreo y alertas",
              "Runbooks y playbooks",
              "Capacitación al equipo"
            ],
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

/* ========
   Proceso
   ======== */
const Proceso = () => (
  <Section id="proceso">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
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

/* =====
   Casos
   ===== */
const Casos = () => (
  <Section id="casos" className="bg-slate-50/60">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
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

/* ===
   CTA
   === */
const CTA = () => (
  <Section id="contacto" className="relative">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.08),transparent)]" />
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-3">
        <div className="sm:col-span-2" data-reveal>
          <h3 className="text-2xl font-semibold text-slate-900">¿Listo para empezar?</h3>
          <p className="mt-1 text-slate-600">Agendá una llamada de 25 minutos para revisar tu caso y armar un plan express.</p>
        </div>
        <div className="flex items-center gap-3" data-reveal>
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

/* ======
   Footer
   ====== */
const Footer = () => (
  <footer className="border-t border-slate-100 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
      <div className="flex items-center text-sm text-slate-500">
        <img src={brandLogo} alt="NexOps" className="h-5 w-5 shrink-0 mr-1" />
        <span className="font-semibold text-slate-800 mr-2">NexOps</span>
        <span className="text-slate-500">© {new Date().getFullYear()} NexOps. Todos los derechos reservados.</span>
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

/* =========
   App
   ========= */

   export default function App() {
    useEffect(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!prefersReduced.matches && window.innerWidth >= 640) {
        const r = new Rellax(".rellax", { center: false });
        return () => r.destroy();
      }
    }, []);
  
    useReveal();
  
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
  
        {/* 👇 WhatsApp flotante al final */}
        <FloatingWhatsApp phone="5491132106711" />
      </div>
    );
  }
  

