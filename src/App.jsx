// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import Rellax from "rellax";

import "./index.css";
import "./App.css";

import ClientsMarquee from "./components/ClientsMarquee";
import IntegrationsMarquee from "./components/IntegrationsMarquee";
import ServicesOverview from "./components/ServicesOverview";
import HowWeWork from "./components/HowWeWork";
import CTA from "./components/CTA";
import Layout from "./components/Layout";

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

  return (
    <span className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

// 2) Scroll reveal con IntersectionObserver
const useReveal = (selector = "[data-reveal]") => {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-4");
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.remove("opacity-0", "translate-y-4");
            target.classList.add("opacity-100", "translate-y-0");
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
};

/* ============
   Layout bits
   ============ */

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
    {children}
  </span>
);

/* =============
   HERO
   ============= */

const Hero = () => (
  <Section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
    {/* blobs */}
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="rellax will-change-transform absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#4F46E5]/30 blur-2xl"
        data-rellax-speed="-4"
      />
      <div
        className="rellax will-change-transform absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#4F46E5]/25 blur-2xl"
        data-rellax-speed="4"
      />
      <div
        className="rellax will-change-transform absolute left-[10%] top-1/2 h-48 w-[75%] -translate-y-1/2 rotate-6 rounded-3xl bg-gradient-to-r from-[#B6A6FF]/40 to-[#E3DDFD]/40"
        data-rellax-speed="-2"
      />
    </div>

    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
      {/* Izquierda */}
      <div data-reveal>
        <Pill>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
          Listo para implementar
        </Pill>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Reduce costos y <span className="text-[#4F46E5]">libera horas</span> con
          automatización inteligente
        </h1>

        <p className="mt-4 max-w-xl text-slate-600">
          Integramos tus canales, estandarizamos procesos y desplegamos agentes de IA
          que eliminan tareas manuales y escalan tu operación en semanas, no meses.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Quiero%20escalar%20mi%20empresa%20🚀"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-white font-semibold shadow-sm hover:bg-[#4338CA]"
          >
            Quiero automatizar ahora →
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50"
          >
            Ver servicios
          </a>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div data-reveal>
            <MetricCounter
              to={100}
              suffix="+"
              className="text-2xl font-bold text-slate-900"
            />
            <p className="text-xs text-slate-500">automatizaciones</p>
          </div>

          <div data-reveal>
            <div className="flex items-baseline justify-center gap-1">
              <MetricCounter to={3} className="text-2xl font-bold text-slate-900" />
              <span className="text-sm font-semibold text-slate-900">semanas</span>
            </div>
            <p className="text-xs text-slate-500">implementación promedio</p>
          </div>

          <div data-reveal>
            <MetricCounter
              to={20}
              suffix="+"
              className="text-2xl font-bold text-slate-900"
            />
            <p className="text-xs text-slate-500">empresas activas</p>
          </div>
        </div>
      </div>

      {/* Derecha: panel UI nuevo */}
      <div className="relative" data-reveal>
        <div className="absolute -inset-10 bg-gradient-to-br from-[#B6A6FF]/40 via-white to-[#E3DDFD]/35 blur-2xl rounded-[40px]" />

        <div className="relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                Panel de automatización
              </p>
              <p className="text-sm font-semibold text-slate-800">
                Resultados en tiempo real
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operando 24/7
            </span>
          </div>

          {/* KPIs grandes */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-slate-900 text-white px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">
                Tiempo operativo
              </p>
              <p className="mt-1 text-2xl font-bold">-40%</p>
              <p className="mt-1 text-[11px] text-slate-300">Menos tareas manuales</p>
            </div>

            <div className="rounded-xl bg-[#4F46E5]/10 text-slate-900 px-4 py-3 border border-[#4F46E5]/20">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Conversión de leads
              </p>
              <p className="mt-1 text-2xl font-bold">+28%</p>
              <p className="mt-1 text-[11px] text-slate-500">Respuesta más rápida</p>
            </div>
          </div>

          {/* Mini panel dividido: gráfico + estados */}
          <div className="mb-4 rounded-xl bg-slate-50 px-4 py-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* IZQUIERDA: GRÁFICO */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>Automatizaciones por día</span>
                  <span>Promedio 7 días: 132</span>
                </div>

                <svg
                  viewBox="0 0 280 80"
                  className="w-full h-[70px]"
                  preserveAspectRatio="none"
                >
                  {/* línea con picos */}
                  <path
                    d="M0 55 L40 50 L80 62 L120 45 L160 65 L200 48 L240 60 L280 52"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* puntos */}
                  {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => {
                    const ys = [55, 50, 62, 45, 65, 48, 60, 52];
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={ys[i]}
                        r="4"
                        fill="#4F46E5"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* DERECHA: ESTADOS */}
              <div className="flex-1 w-full space-y-3 text-sm md:mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-slate-900">
                      Calificación de leads web
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600">
                    Activo
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <span className="font-medium text-slate-900">
                      Seguimiento WhatsApp
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600">
                    Activo
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="font-medium text-slate-900">
                      Alertas a CRM / equipo
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-amber-500">
                    En prueba
                  </span>
                </div>
              </div>
            </div>
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
      <IntegrationsMarquee />
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 mt-10">
        Equipos que confían en nosotros
      </h2>
      <ClientsMarquee />
    </div>
  </Section>
);

/* =========
   App
   ========= */

export default function App() {
  // Parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!prefersReduced.matches && window.innerWidth >= 640) {
      const r = new Rellax(".rellax", { center: false });
      return () => r.destroy();
    }
  }, []);

  useReveal();

  return (
    <Layout>
      <Hero />
      {/* Lo que hacemos en NexOps */}
      <ServicesOverview />
      {/* Integrado a las mejores herramientas + logos */}
      <Logos />
      {/* Proceso */}
      <HowWeWork />
      {/* CTA final */}
      <CTA />
    </Layout>
  );
}
