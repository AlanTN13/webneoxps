import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const STAGES = [
  {
    number: "01",
    kicker: "Cuando crece el volumen",
    title: "Más demanda no siempre significa más ventas.",
    body: "Entran oportunidades, se multiplican los mensajes y el dueño empieza a perder visibilidad.",
  },
  {
    number: "02",
    kicker: "Captación",
    title: "Generamos oportunidades. No impresiones.",
    body: "Las señales correctas entran al circuito comercial con contexto desde el primer contacto.",
  },
  {
    number: "03",
    kicker: "CRM + control",
    title: "Cada oportunidad tiene dueño y próximo paso.",
    body: "Lo disperso se ordena: estado, responsable, seguimiento y visibilidad para decidir.",
  },
  {
    number: "04",
    kicker: "Agente IA",
    title: "Tu equipo deja de hacer lo que una máquina puede absorber.",
    body: "Clasifica, resuelve lo repetitivo, escala excepciones y mantiene el sistema actualizado.",
  },
  {
    number: "05",
    kicker: "Resultado",
    title: "Más ventas. Más control. Menos trabajo manual.",
    body: "La operación queda más limpia y el equipo vuelve a trabajar donde realmente agrega valor.",
  },
];

const LEADS = [
  { x: 150, y: 260, lane: 0, drift: -24 },
  { x: 225, y: 515, lane: 2, drift: 18 },
  { x: 325, y: 185, lane: 1, drift: 8 },
  { x: 410, y: 585, lane: 0, drift: -14 },
  { x: 480, y: 320, lane: 2, drift: 22 },
  { x: 290, y: 395, lane: 1, drift: -8 },
  { x: 535, y: 205, lane: 0, drift: 12 },
  { x: 445, y: 465, lane: 1, drift: -18 },
  { x: 190, y: 620, lane: 2, drift: 10 },
];

function StageCopy({ progress, stage, index }) {
  const starts = [0, 0.17, 0.37, 0.57, 0.78];
  const peaks = [0.035, 0.235, 0.435, 0.635, 0.86];
  const holds = [0.135, 0.335, 0.535, 0.735, 1];
  const ends = [0.235, 0.435, 0.635, 0.835, 1];

  const opacity = useTransform(
    progress,
    index === STAGES.length - 1
      ? [starts[index], peaks[index], holds[index], ends[index]]
      : [starts[index], peaks[index], holds[index], ends[index]],
    index === STAGES.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [starts[index], peaks[index], ends[index]],
    [28, 0, index === STAGES.length - 1 ? 0 : -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-0 max-w-[760px]"
      aria-hidden={index !== 0 ? undefined : false}
    >
      <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        <span className="text-[#6f48ff]">{stage.number}</span>
        <span className="h-px w-10 bg-slate-300" />
        <span>{stage.kicker}</span>
      </div>
      <h2 className="text-[clamp(2.4rem,4.7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0c1730]">
        {stage.title}
      </h2>
      <p className="mt-6 max-w-[620px] text-base leading-7 text-slate-600 md:text-lg md:leading-8">
        {stage.body}
      </p>
    </motion.div>
  );
}

function LeadDot({ progress, lead, index }) {
  const laneY = [308, 428, 548][lead.lane];
  const x = useTransform(
    progress,
    [0, 0.2, 0.42, 0.62, 0.8, 1],
    [lead.x, 305 + index * 8, 505 + (index % 3) * 92, 735 + (index % 3) * 42, 925 + (index % 3) * 52, 1085 + (index % 3) * 42]
  );
  const y = useTransform(
    progress,
    [0, 0.2, 0.42, 0.62, 0.8, 1],
    [lead.y, 430 + lead.drift, laneY, laneY, 390 + lead.lane * 62, 342 + lead.lane * 92]
  );
  const radius = useTransform(progress, [0, 0.62, 0.78, 1], [7, 7, 5, 7]);
  const fill = useTransform(
    progress,
    [0, 0.58, 0.72, 0.86, 1],
    ["#111c34", "#111c34", "#7650ff", "#7650ff", "#111c34"]
  );
  const opacity = useTransform(progress, [0, 0.08, 1], [0.62, 1, 1]);

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={radius}
      fill={fill}
      style={{ opacity }}
      className="drop-shadow-[0_8px_14px_rgba(15,23,42,0.14)]"
    />
  );
}

function OperationCanvas({ progress }) {
  const flowOpacity = useTransform(progress, [0.11, 0.22, 1], [0, 0.75, 1]);
  const chaosOpacity = useTransform(progress, [0, 0.14, 0.3], [1, 1, 0]);
  const captureOpacity = useTransform(progress, [0.13, 0.25, 0.43], [0, 1, 0]);
  const crmOpacity = useTransform(progress, [0.34, 0.47, 0.64], [0, 1, 0.92]);
  const aiOpacity = useTransform(progress, [0.56, 0.69, 0.87], [0, 1, 1]);
  const resultOpacity = useTransform(progress, [0.79, 0.9, 1], [0, 1, 1]);
  const pathLength = useTransform(progress, [0.12, 0.9], [0.08, 1]);
  const systemScale = useTransform(progress, [0, 0.2, 0.52, 1], [1.04, 1, 0.985, 0.96]);

  return (
    <motion.div
      style={{ scale: systemScale }}
      className="relative h-full min-h-[520px] w-full overflow-hidden rounded-[38px] bg-[linear-gradient(180deg,#fbfcff_0%,#f3f5fb_100%)]"
    >
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-x-[8%] top-[12%] h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

      <svg
        viewBox="0 0 1280 760"
        role="img"
        aria-label="Una operación comercial que pasa de señales dispersas a un sistema ordenado con CRM y automatización"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="storyFlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#aeb7c8" />
            <stop offset="65%" stopColor="#111c34" />
            <stop offset="100%" stopColor="#7650ff" />
          </linearGradient>
          <filter id="storyGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 175 430 C 300 430, 320 430, 405 430 S 610 430, 690 430 S 865 430, 935 430 S 1070 430, 1140 430"
          fill="none"
          stroke="url(#storyFlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ opacity: flowOpacity, pathLength }}
        />

        <motion.g style={{ opacity: chaosOpacity }}>
          <path d="M145 220 L310 330 L230 490" fill="none" stroke="#d8dde8" strokeWidth="2" />
          <path d="M355 155 L460 295 L365 565" fill="none" stroke="#d8dde8" strokeWidth="2" />
          <path d="M205 585 L465 455 L535 210" fill="none" stroke="#d8dde8" strokeWidth="2" />
          <text x="132" y="176" fill="#667085" fontSize="15" letterSpacing="1.2">MENSAJES</text>
          <text x="382" y="133" fill="#667085" fontSize="15" letterSpacing="1.2">LEADS</text>
          <text x="178" y="660" fill="#a23b4a" fontSize="14" letterSpacing="1.1">SIN SEGUIMIENTO</text>
          <circle cx="510" cy="555" r="34" fill="none" stroke="#e5a6ae" strokeWidth="2" strokeDasharray="4 8" />
          <text x="497" y="561" fill="#a23b4a" fontSize="22" fontWeight="700">?</text>
        </motion.g>

        <motion.g style={{ opacity: captureOpacity }}>
          <circle cx="245" cy="430" r="78" fill="none" stroke="#d9deea" strokeWidth="2" />
          <circle cx="245" cy="430" r="48" fill="none" stroke="#c9d0df" strokeWidth="2" />
          <circle cx="245" cy="430" r="12" fill="#111c34" />
          <text x="183" y="560" fill="#697386" fontSize="14" letterSpacing="1.4">SEÑALES REALES</text>
          <text x="130" y="610" fill="#111c34" fontSize="18" fontWeight="600">Campaña · WhatsApp · Web</text>
        </motion.g>

        <motion.g style={{ opacity: crmOpacity }}>
          {[308, 428, 548].map((y, laneIndex) => (
            <g key={y}>
              <line x1="470" y1={y} x2="745" y2={y} stroke="#d4d9e4" strokeWidth="2" />
              <circle cx="470" cy={y} r="4" fill="#8f98aa" />
              <circle cx="745" cy={y} r="4" fill="#111c34" />
              <text x="475" y={y - 20} fill="#667085" fontSize="13" letterSpacing="1.2">
                {["NUEVO", "EN GESTIÓN", "SEGUIMIENTO"][laneIndex]}
              </text>
            </g>
          ))}
          <text x="510" y="650" fill="#111c34" fontSize="17" fontWeight="600">Estado · Responsable · Próximo paso</text>
        </motion.g>

        <motion.g style={{ opacity: aiOpacity }}>
          <circle cx="835" cy="430" r="62" fill="#7650ff" opacity="0.10" filter="url(#storyGlow)" />
          <circle cx="835" cy="430" r="31" fill="#7650ff" />
          <path d="M823 430 L833 440 L850 418" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="835" y1="368" x2="835" y2="330" stroke="#7650ff" strokeWidth="2" />
          <line x1="835" y1="492" x2="835" y2="530" stroke="#7650ff" strokeWidth="2" />
          <text x="787" y="300" fill="#7650ff" fontSize="14" fontWeight="700" letterSpacing="1.4">AGENTE IA</text>
          <text x="730" y="585" fill="#667085" fontSize="14">clasifica → resuelve → escala excepción</text>
        </motion.g>

        <motion.g style={{ opacity: resultOpacity }}>
          <circle cx="1120" cy="430" r="82" fill="none" stroke="#111c34" strokeWidth="2" />
          <circle cx="1120" cy="430" r="58" fill="#ffffff" stroke="#e0e4ed" strokeWidth="1.5" />
          <circle cx="1120" cy="430" r="10" fill="#7650ff" />
          <text x="1067" y="565" fill="#667085" fontSize="13" letterSpacing="1.4">CONTROL</text>
          <text x="965" y="625" fill="#111c34" fontSize="18" fontWeight="600">La operación vuelve a ser legible.</text>
        </motion.g>

        {LEADS.map((lead, index) => (
          <LeadDot key={`${lead.x}-${lead.y}`} progress={progress} lead={lead} index={index} />
        ))}
      </svg>

      <motion.div
        style={{ opacity: resultOpacity }}
        className="absolute bottom-7 left-8 right-8 flex items-center justify-between border-t border-slate-200/80 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
      >
        <span>Oportunidades visibles</span>
        <span className="text-[#6f48ff]">Intervención NexOps</span>
        <span>Excepciones al equipo</span>
      </motion.div>
    </motion.div>
  );
}

function MobileScene({ stage }) {
  const states = [
    {
      labels: ["Mensaje", "Lead", "Tarea", "?"],
      points: [[50, 48], [280, 65], [92, 188], [260, 195]],
      lines: ["M50 48 L150 110 L92 188", "M280 65 L195 120 L260 195"],
    },
    {
      labels: ["Campaña", "WhatsApp", "Web", "Oportunidad"],
      points: [[52, 62], [52, 122], [52, 182], [286, 122]],
      lines: ["M64 62 C145 62 170 122 274 122", "M64 122 L274 122", "M64 182 C145 182 170 122 274 122"],
    },
    {
      labels: ["Nuevo", "En gestión", "Seguimiento"],
      points: [[68, 68], [180, 122], [286, 178]],
      lines: ["M68 68 L286 68", "M68 122 L286 122", "M68 178 L286 178"],
    },
    {
      labels: ["Entra", "IA", "Resuelve", "Escala"],
      points: [[42, 122], [156, 122], [280, 82], [280, 170]],
      lines: ["M54 122 L144 122", "M168 122 L268 82", "M168 122 L268 170"],
    },
    {
      labels: ["Ventas", "Control", "Manual ↓"],
      points: [[62, 122], [180, 122], [294, 122]],
      lines: ["M74 122 L168 122", "M192 122 L282 122"],
    },
  ];

  const state = states[stage];

  return (
    <div className="mt-8 overflow-hidden rounded-[28px] bg-[#f4f6fb] p-3">
      <svg viewBox="0 0 340 240" className="h-auto w-full" aria-hidden="true">
        {state.lines.map((path) => (
          <path key={path} d={path} fill="none" stroke="#c7cedc" strokeWidth="2" strokeLinecap="round" />
        ))}
        {state.points.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={stage === 3 && index === 1 ? 18 : 8} fill={stage === 3 && index === 1 ? "#7650ff" : "#111c34"} />
            <text x={x} y={y + 32} textAnchor="middle" fill="#697386" fontSize="10" fontWeight="600" letterSpacing="0.7">
              {state.labels[index]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MobileStory() {
  return (
    <section id="operation-story" className="bg-white px-5 pb-28 pt-20 md:hidden">
      <div className="mx-auto max-w-lg">
        <div className="mb-16 border-b border-slate-200 pb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Una operación. Cinco estados.
        </div>
        <div className="space-y-28">
          {STAGES.map((stage, index) => (
            <article key={stage.number} className="min-h-[72svh]">
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span className="text-[#6f48ff]">{stage.number}</span>
                <span className="h-px w-8 bg-slate-300" />
                <span>{stage.kicker}</span>
              </div>
              <h2 className="mt-5 text-[clamp(2.3rem,11vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
                {stage.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">{stage.body}</p>
              <MobileScene stage={index} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReducedStory() {
  return (
    <section id="operation-story" className="hidden bg-white px-6 py-28 md:block">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-xl text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          La operación, explicada sin animación
        </div>
        <div className="space-y-20">
          {STAGES.map((stage, index) => (
            <article key={stage.number} className="grid gap-8 border-t border-slate-200 pt-10 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f48ff]">{stage.number} · {stage.kicker}</div>
                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#0c1730]">{stage.title}</h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">{stage.body}</p>
              </div>
              <MobileScene stage={index} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function OperationStory() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reducedMotion) {
    return (
      <>
        <MobileStory />
        <ReducedStory />
      </>
    );
  }

  return (
    <>
      <section
        id="operation-story"
        ref={sectionRef}
        className="relative hidden h-[560vh] bg-white md:block"
      >
        <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden px-6 lg:px-8">
          <div className="mx-auto flex h-full max-w-[1500px] flex-col py-10 lg:py-12">
            <div className="relative z-20 min-h-[300px] lg:min-h-[330px]">
              {STAGES.map((stage, index) => (
                <StageCopy key={stage.number} progress={scrollYProgress} stage={stage} index={index} />
              ))}
            </div>

            <div className="relative z-10 min-h-0 flex-1 pb-8">
              <OperationCanvas progress={scrollYProgress} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-100">
              <motion.div style={{ width: progressWidth }} className="h-full bg-[#6f48ff]" />
            </div>
          </div>
        </div>
      </section>
      <MobileStory />
    </>
  );
}
