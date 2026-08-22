import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  Eye,
  FileText,
  Globe2,
  ListChecks,
  Megaphone,
  MessageCircle,
  Send,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";
import brandLogo from "../assets/logo-nexops.svg";

const INPUTS = [
  { label: "Pauta", detail: "Meta · Google", icon: Megaphone },
  { label: "WhatsApp", detail: "Consultas y conversaciones", icon: MessageCircle },
  { label: "Web", detail: "Visitas con intención", icon: Globe2 },
  { label: "Formularios", detail: "Leads calificados", icon: FileText },
  { label: "Campañas", detail: "Email · remarketing", icon: Send },
];

const OUTPUTS = [
  { label: "CRM ordenado", detail: "Cada oportunidad con estado", icon: UsersRound },
  { label: "Seguimientos", detail: "Próximos pasos visibles", icon: ListChecks },
  { label: "Tareas automáticas", detail: "Menos carga manual", icon: Zap },
  { label: "Métricas", detail: "Qué entra, avanza y convierte", icon: BarChart3 },
  { label: "Visibilidad", detail: "Control para decidir", icon: Eye },
];

const INPUT_PATHS = [
  "M 250 112 C 390 112, 410 260, 530 260",
  "M 250 186 C 390 186, 420 260, 530 260",
  "M 250 260 C 390 260, 420 260, 530 260",
  "M 250 334 C 390 334, 420 260, 530 260",
  "M 250 408 C 390 408, 410 260, 530 260",
];

const OUTPUT_PATHS = [
  "M 670 260 C 790 260, 820 112, 950 112",
  "M 670 260 C 790 260, 830 186, 950 186",
  "M 670 260 C 790 260, 830 260, 950 260",
  "M 670 260 C 790 260, 830 334, 950 334",
  "M 670 260 C 790 260, 820 408, 950 408",
];

function SystemRow({ item, tone = "input" }) {
  const Icon = item.icon;
  const isOutput = tone === "output";

  return (
    <div className="flex min-h-[62px] items-center gap-3 border-b border-slate-200/75 py-3.5 last:border-b-0">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
          isOutput
            ? "border-[#7650ff]/15 bg-[#7650ff]/[0.06] text-[#6744df]"
            : "border-slate-200 bg-slate-50 text-slate-600"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-semibold tracking-[-0.015em] text-[#101a31]">{item.label}</div>
        <div className="mt-0.5 text-[12px] leading-5 text-slate-500">{item.detail}</div>
      </div>
    </div>
  );
}

function NexOpsCore({ active = true, reducedMotion = false }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        aria-hidden="true"
        className="absolute h-[250px] w-[250px] rounded-[72px] border border-[#7650ff]/10"
        animate={
          active && !reducedMotion
            ? { scale: [0.98, 1.04, 0.98], opacity: [0.42, 0.18, 0.42] }
            : { scale: 1, opacity: 0.26 }
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute h-[218px] w-[218px] rounded-[60px] bg-[#7650ff]/[0.035] blur-[1px]" />

      <div className="relative flex h-[190px] w-[190px] flex-col items-center justify-center rounded-[48px] border border-[#7650ff]/20 bg-white px-5 text-center shadow-[0_28px_70px_-34px_rgba(54,35,112,0.38)]">
        <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#7650ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
          Núcleo activo
        </div>
        <img src={brandLogo} alt="" className="h-9 w-auto" />
        <div className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#0c1730]">NexOps</div>
        <div className="mt-3 text-[11px] font-medium leading-[1.55] text-slate-500">
          Centraliza · Ordena
          <br />
          Automatiza
        </div>
      </div>
    </div>
  );
}

function DesktopSystem({ progress, reducedMotion }) {
  const inputOpacity = useTransform(progress, [0, 0.08, 0.18], [0, 0.45, 1]);
  const inputX = useTransform(progress, [0, 0.18], [-24, 0]);
  const inputLineLength = useTransform(progress, [0.1, 0.38], [0, 1]);
  const inputLineOpacity = useTransform(progress, [0.08, 0.18, 0.38], [0, 0.48, 0.9]);
  const coreOpacity = useTransform(progress, [0.3, 0.44], [0.2, 1]);
  const coreScale = useTransform(progress, [0.3, 0.44], [0.92, 1]);
  const outputLineLength = useTransform(progress, [0.44, 0.7], [0, 1]);
  const outputLineOpacity = useTransform(progress, [0.42, 0.52, 0.72], [0, 0.4, 0.9]);
  const outputOpacity = useTransform(progress, [0.58, 0.76], [0, 1]);
  const outputX = useTransform(progress, [0.58, 0.76], [24, 0]);
  const footerOpacity = useTransform(progress, [0.74, 0.9], [0, 1]);

  return (
    <div className="relative hidden min-h-[560px] overflow-hidden rounded-[36px] border border-slate-200/90 bg-[linear-gradient(105deg,#ffffff_0%,#fbfbfe_43%,#f7f5ff_55%,#fbfcff_100%)] shadow-[0_36px_90px_-62px_rgba(15,23,42,0.32)] md:block">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-slate-200/80 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span>Sistema comercial + operativo</span>
        <span className="flex items-center gap-2 text-[#6744df]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
          Información conectada
        </span>
      </div>

      <svg
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[40px] h-[470px] w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="inputFlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#cbd3df" />
            <stop offset="100%" stopColor="#7650ff" />
          </linearGradient>
          <linearGradient id="outputFlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#7650ff" />
            <stop offset="100%" stopColor="#a7b2c6" />
          </linearGradient>
          <marker id="flowArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#7650ff" opacity="0.8" />
          </marker>
          <marker id="flowArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa6ba" opacity="0.85" />
          </marker>
        </defs>

        {INPUT_PATHS.map((path) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#inputFlow)"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#flowArrowIn)"
            style={{ pathLength: inputLineLength, opacity: inputLineOpacity }}
          />
        ))}
        {OUTPUT_PATHS.map((path) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#outputFlow)"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#flowArrowOut)"
            style={{ pathLength: outputLineLength, opacity: outputLineOpacity }}
          />
        ))}
      </svg>

      <div className="relative z-10 grid min-h-[560px] grid-cols-[minmax(230px,0.95fr)_280px_minmax(250px,1.05fr)] items-center gap-14 px-8 pb-14 pt-20 lg:gap-20 lg:px-12">
        <motion.div style={{ opacity: inputOpacity, x: inputX }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">01 · Entradas</span>
            <span className="text-[10px] text-slate-400">Canales dispersos</span>
          </div>
          <div className="bg-white/90 px-1">
            {INPUTS.map((item) => (
              <SystemRow key={item.label} item={item} />
            ))}
          </div>
        </motion.div>

        <motion.div style={{ opacity: coreOpacity, scale: coreScale }}>
          <div className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7650ff]">02 · Núcleo NexOps</div>
          <NexOpsCore active reducedMotion={reducedMotion} />
          <div className="mx-auto mt-7 flex max-w-[240px] items-center justify-center gap-2 text-center text-[10px] font-medium leading-4 text-slate-500">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#7650ff]" />
            Reglas, contexto y automatización en el mismo circuito
          </div>
        </motion.div>

        <motion.div style={{ opacity: outputOpacity, x: outputX }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6744df]">03 · Control</span>
            <span className="text-[10px] text-slate-400">Operación visible</span>
          </div>
          <div className="bg-white/90 px-1">
            {OUTPUTS.map((item) => (
              <SystemRow key={item.label} item={item} tone="output" />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: footerOpacity }}
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 border-t border-slate-200/80 bg-white/80 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 backdrop-blur-sm"
      >
        <span>Captar</span>
        <span className="text-[#7650ff]">·</span>
        <span>Ordenar</span>
        <span className="text-[#7650ff]">·</span>
        <span>Automatizar</span>
        <span className="text-[#7650ff]">·</span>
        <span>Controlar</span>
      </motion.div>
    </div>
  );
}

function MobileSystem({ reducedMotion }) {
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay, ease: [0.2, 0.7, 0.2, 1] },
  });

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#faf9ff_52%,#ffffff_100%)] md:hidden">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <span>Sistema NexOps</span>
        <span className="flex items-center gap-2 text-[#6744df]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
          Conectado
        </span>
      </div>

      <div className="px-5 pb-6 pt-7">
        <motion.div {...reveal(0)}>
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.19em] text-slate-500">01 · Canales de entrada</div>
          <div className="rounded-2xl border border-slate-200/80 bg-white px-4">
            {INPUTS.map((item) => (
              <SystemRow key={item.label} item={item} />
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="mx-auto flex h-14 w-10 items-center justify-center">
          <div className="relative h-10 w-px bg-gradient-to-b from-slate-300 to-[#7650ff]">
            <span className="absolute -bottom-0.5 -left-[3px] h-2 w-2 rotate-45 border-b border-r border-[#7650ff]" />
          </div>
        </motion.div>

        <motion.div {...reveal(0.16)}>
          <div className="mb-4 text-center text-[9px] font-bold uppercase tracking-[0.19em] text-[#7650ff]">02 · Núcleo NexOps</div>
          <NexOpsCore active reducedMotion={reducedMotion} />
          <p className="mx-auto mt-6 max-w-[270px] text-center text-[12px] leading-5 text-slate-500">
            Centraliza información, aplica reglas y automatiza el seguimiento sin perder contexto.
          </p>
        </motion.div>

        <motion.div {...reveal(0.24)} className="mx-auto flex h-14 w-10 items-center justify-center">
          <div className="relative h-10 w-px bg-gradient-to-b from-[#7650ff] to-slate-300">
            <span className="absolute -bottom-0.5 -left-[3px] h-2 w-2 rotate-45 border-b border-r border-slate-400" />
          </div>
        </motion.div>

        <motion.div {...reveal(0.3)}>
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.19em] text-[#6744df]">03 · Operación bajo control</div>
          <div className="rounded-2xl border border-[#7650ff]/10 bg-white px-4">
            {OUTPUTS.map((item) => (
              <SystemRow key={item.label} item={item} tone="output" />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        {...reveal(0.36)}
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-slate-200/80 bg-white/80 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500"
      >
        <span>Captar</span><span className="text-[#7650ff]">·</span>
        <span>Ordenar</span><span className="text-[#7650ff]">·</span>
        <span>Automatizar</span><span className="text-[#7650ff]">·</span>
        <span>Controlar</span>
      </motion.div>
    </div>
  );
}

export default function OperationStory() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="operation-story" ref={sectionRef} className="relative bg-white md:h-[300vh]">
      <div className="px-5 py-24 md:sticky md:top-[72px] md:flex md:h-[calc(100svh-72px)] md:items-center md:px-6 md:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1450px]">
          <div className="mb-10 max-w-[940px] md:mb-8 lg:mb-10">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7650ff]">Del ruido al control</div>
            <h2 className="text-[clamp(2.6rem,5.2vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0c1730]">
              Todo lo que pasa en tu operación, en un solo sistema
            </h2>
            <p className="mt-6 max-w-[780px] text-[16px] leading-7 text-slate-600 md:text-[18px] md:leading-8">
              Centralizamos tus canales, ordenamos el seguimiento y automatizamos tareas para que vendas con más control y menos fricción.
            </p>
          </div>

          <DesktopSystem progress={scrollYProgress} reducedMotion={reducedMotion} />
          <MobileSystem reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
