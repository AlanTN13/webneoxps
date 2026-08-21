import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT_INFO, getWhatsappLink } from "../config/constants";

const SIGNALS = [
  { label: "Pauta", x: 110, y: 78, delay: 0.15 },
  { label: "WhatsApp", x: 110, y: 150, delay: 0.3 },
  { label: "Web", x: 110, y: 222, delay: 0.45 },
];

function HeroSystem() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto mt-14 h-[280px] w-full max-w-[1120px] overflow-hidden sm:mt-16 sm:h-[330px] lg:mt-20 lg:h-[360px]">
      <div className="absolute left-1/2 top-1/2 h-[230px] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#7650ff]/[0.055] blur-3xl" />

      <svg
        viewBox="0 0 1120 340"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Señales de captación que entran a un sistema NexOps y terminan en una operación con control"
      >
        <defs>
          <linearGradient id="heroTrack" x1="0" x2="1">
            <stop offset="0%" stopColor="#cbd2df" />
            <stop offset="55%" stopColor="#111c34" />
            <stop offset="100%" stopColor="#7650ff" />
          </linearGradient>
          <filter id="heroVioletGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {SIGNALS.map((signal) => (
          <g key={signal.label}>
            <text x={signal.x} y={signal.y - 18} fill="#7a8496" fontSize="13" fontWeight="600" letterSpacing="1.1">
              {signal.label.toUpperCase()}
            </text>
            <motion.circle
              cx={signal.x + 10}
              cy={signal.y}
              r="6"
              fill="#111c34"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: signal.delay }}
            />
            <motion.path
              d={`M ${signal.x + 18} ${signal.y} C 265 ${signal.y}, 305 170, 430 170`}
              fill="none"
              stroke="#d5dbe6"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.05, delay: signal.delay, ease: [0.2, 0.75, 0.25, 1] }}
            />
          </g>
        ))}

        <motion.path
          d="M 430 170 C 515 170, 545 170, 610 170 S 730 170, 790 170 S 900 170, 980 170"
          fill="none"
          stroke="url(#heroTrack)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.45, delay: reducedMotion ? 0 : 0.55, ease: [0.2, 0.75, 0.25, 1] }}
        />

        <motion.g
          initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: reducedMotion ? 0 : 1.05 }}
          style={{ transformOrigin: "610px 170px" }}
        >
          <circle cx="610" cy="170" r="64" fill="#7650ff" opacity="0.08" filter="url(#heroVioletGlow)" />
          <circle cx="610" cy="170" r="30" fill="#7650ff" />
          <path d="M598 170 L608 180 L624 158" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="610" y="225" textAnchor="middle" fill="#7650ff" fontSize="12" fontWeight="700" letterSpacing="1.5">
            NEXOPS
          </text>
        </motion.g>

        <g>
          <circle cx="980" cy="170" r="44" fill="#ffffff" stroke="#111c34" strokeWidth="2" />
          <circle cx="980" cy="170" r="7" fill="#111c34" />
          <text x="980" y="238" textAnchor="middle" fill="#677185" fontSize="12" fontWeight="700" letterSpacing="1.3">
            CONTROL
          </text>
        </g>

        <motion.circle
          cx="430"
          cy="170"
          r="7"
          fill="#111c34"
          animate={reducedMotion ? undefined : { r: [6, 9, 6], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 sm:text-[11px]">
        Captar · ordenar · automatizar · controlar
      </div>
    </div>
  );
}

export default function Hero() {
  const whatsappHref = getWhatsappLink(
    CONTACT_INFO.WHATSAPP_NUMBER,
    CONTACT_INFO.WHATSAPP_MESSAGE_HERO
  );

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="mx-auto flex min-h-[calc(100svh-112px)] max-w-[1500px] flex-col items-center text-center">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 sm:mb-8">
            Tecnología aplicada a operaciones reales
          </p>
          <h1 className="text-[clamp(3.35rem,8vw,7.5rem)] font-semibold leading-[0.89] tracking-[-0.075em] text-[#0c1730]">
            Más ventas.
            <br />
            Más control.
            <br />
            <span className="text-[#7650ff]">Menos trabajo manual.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[720px] text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Combinamos captación, CRM y agentes de IA para ordenar y hacer crecer operaciones sin agregar más complejidad al equipo.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[#0c1730] px-7 py-3.5 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#16233f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7650ff] focus-visible:ring-offset-2"
            >
              Hablá con Nexi
              <span aria-hidden="true" className="ml-3 text-lg">↗</span>
            </a>
            <a
              href="#operation-story"
              className="inline-flex items-center py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0c1730]"
            >
              Ver cómo cambia una operación
              <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>
        </div>

        <div className="mt-auto w-full">
          <HeroSystem />
        </div>
      </div>
    </section>
  );
}
