import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const STAGES = [
  {
    number: "01",
    kicker: "Señales",
    title: "Todo empieza con una oportunidad.",
    body: "WhatsApp, campaña y web alimentan la misma operación.",
  },
  {
    number: "02",
    kicker: "Volumen",
    title: "Cuando crece el volumen, también puede crecer el desorden.",
    body: "Más señales entran y empiezan a aparecer huecos de seguimiento.",
  },
  {
    number: "03",
    kicker: "Captación",
    title: "Generamos oportunidades. No impresiones.",
    body: "La ruta de entrada se activa y el flujo gana volumen sin cambiar de operación.",
  },
  {
    number: "04",
    kicker: "CRM + orden",
    title: "Cada oportunidad encuentra estado, responsable y próximo paso.",
    body: "Lo que estaba fuera de eje vuelve a alinearse y el siguiente paso queda visible.",
  },
  {
    number: "05",
    kicker: "Agente IA",
    title: "El sistema absorbe lo repetitivo. Tu equipo aporta criterio.",
    body: "Clasificar, responder, recordar y actualizar dejan de consumir trabajo humano.",
  },
  {
    number: "06",
    kicker: "Resultado",
    title: "Más ventas. Más control. Menos trabajo manual.",
    body: "La misma operación termina más limpia, estable y fácil de leer.",
  },
];

const OPPORTUNITIES = [
  {
    source: "WhatsApp",
    label: "Consulta comercial",
    left: "17%",
    drift: -62,
    shift: -16,
    issue: "sin seguimiento",
    meta: "Nuevo · Ana · Hoy 14:30",
    task: "responder",
    taskOffset: -128,
    keepFinal: true,
  },
  {
    source: "Campaña",
    label: "Lead de campaña",
    left: "34%",
    drift: 54,
    shift: 20,
    issue: "sin responsable",
    meta: "Calificado · Leo · Mañana 10:00",
    task: "clasificar",
    taskOffset: 130,
    keepFinal: true,
  },
  {
    source: "Web",
    label: "Solicitud de demo",
    left: "51%",
    drift: -46,
    shift: -12,
    issue: "sin clasificar",
    meta: "Demo · Sofía · Hoy 16:00",
    task: "actualizar",
    taskOffset: -128,
    keepFinal: true,
  },
  {
    source: "WhatsApp",
    label: "Nueva consulta",
    left: "68%",
    drift: 72,
    shift: 16,
    issue: "sin seguimiento",
    meta: "En gestión · Ana · Viernes",
    task: "recordar",
    taskOffset: 132,
    keepFinal: false,
  },
  {
    source: "Campaña",
    label: "Lead remarketing",
    left: "84%",
    drift: -58,
    shift: 12,
    issue: "sin responsable",
    meta: "Excepción · Leo · Revisar",
    task: "excepción → equipo",
    taskOffset: -130,
    keepFinal: false,
    exception: true,
  },
];

const MOBILE_STATES = [
  ["WhatsApp · consulta", "Campaña · lead", "Web · oportunidad"],
  ["WhatsApp · sin seguimiento", "Campaña · sin responsable", "Web · sin clasificar"],
  ["Ruta de captación activa", "Nueva oportunidad", "Nueva oportunidad"],
  ["Consulta · Ana · Hoy 14:30", "Lead · Leo · Mañana 10:00", "Demo · Sofía · Hoy 16:00"],
  ["responder ✓", "clasificar ✓", "actualizar ✓", "excepción → equipo"],
  ["0 oportunidades sin responsable", "seguimiento activo", "tareas repetitivas automatizadas"],
];

function StageCopy({ progress, stage, index }) {
  const starts = [0, 0.14, 0.3, 0.46, 0.63, 0.82];
  const ends = [0.23, 0.39, 0.55, 0.72, 0.9, 1];
  const start = starts[index];
  const end = ends[index];
  const isFirst = index === 0;
  const isLast = index === STAGES.length - 1;
  const fadeIn = start + 0.035;
  const holdEnd = isLast ? 1 : end - 0.055;

  const opacityInput = isFirst
    ? [0, holdEnd, end]
    : isLast
      ? [start, fadeIn, 1]
      : [start, fadeIn, holdEnd, end];
  const opacityOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const yInput = isFirst ? [0, end] : [start, fadeIn, end];
  const yOutput = isFirst ? [0, -14] : [14, 0, isLast ? 0 : -14];

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-0 max-w-[760px]"
    >
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        <span className="mr-3 text-[#7650ff]">{stage.number}</span>
        <span>{stage.kicker}</span>
      </div>
      <h2 className="max-w-[760px] text-[clamp(2rem,3.15vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
        {stage.title}
      </h2>
      <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-slate-600 lg:text-[15px] lg:leading-7">
        {stage.body}
      </p>
    </motion.div>
  );
}

function OpportunityNode({ progress, item, index, reducedMotion }) {
  const opacity = useTransform(
    progress,
    index < 3
      ? [0, 0.05, 0.88, 1]
      : [0, 0.16, 0.25, 0.82, 0.93, 1],
    index < 3
      ? [1, 1, 1, 1]
      : item.keepFinal
        ? [0, 0, 1, 1, 1, 1]
        : [0, 0, 1, 1, 0.24, 0.14]
  );
  const y = useTransform(
    progress,
    [0, 0.14, 0.27, 0.44, 0.58, 1],
    [0, 0, item.drift, item.drift * 0.65, 0, 0]
  );
  const x = useTransform(progress, [0.14, 0.29, 0.46, 0.6], [0, item.shift, item.shift * 0.45, 0]);
  const issueOpacity = useTransform(progress, [0.14, 0.23, 0.45, 0.59], [0, 1, 1, 0]);
  const metaOpacity = useTransform(progress, [0.5, 0.6, 0.88, 1], [0, 1, 1, 1]);
  const markerColor = useTransform(progress, [0.31, 0.42, 0.58, 1], ["#0c1730", "#7650ff", "#7650ff", "#0c1730"]);
  const labelColor = useTransform(progress, [0.31, 0.58, 0.9, 1], ["#334155", "#0c1730", "#0c1730", "#0c1730"]);
  const staticOpacity = item.keepFinal ? 1 : 0.2;

  return (
    <div className="absolute top-1/2 z-20 w-[190px] -translate-x-1/2 -translate-y-1/2 lg:w-[210px]" style={{ left: item.left }}>
      <motion.div
        style={reducedMotion ? { opacity: staticOpacity, x: 0, y: 0 } : { opacity, x, y }}
        className="relative text-center"
      >
        <motion.div
          style={{ backgroundColor: reducedMotion ? "#0c1730" : markerColor }}
          className="mx-auto h-3.5 w-3.5 rounded-full ring-[6px] ring-white"
        />
        <div className="mt-5 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-400 lg:text-[14px]">{item.source}</div>
        <motion.div
          style={{ color: reducedMotion ? "#0c1730" : labelColor }}
          className="mt-1.5 text-[15px] font-semibold leading-5 tracking-[-0.025em] lg:text-[16px]"
        >
          {item.label}
        </motion.div>
        <motion.div
          style={{ opacity: reducedMotion ? 0 : issueOpacity }}
          className="mt-2.5 text-[11px] font-semibold text-[#a23b4a]"
        >
          {item.issue}
        </motion.div>
        <motion.div
          style={{ opacity: reducedMotion ? 1 : metaOpacity }}
          className="mx-auto mt-2 max-w-[190px] text-[11px] font-medium leading-4 text-slate-500"
        >
          {item.meta}
        </motion.div>
      </motion.div>
    </div>
  );
}

function TaskSignal({ progress, item, reducedMotion }) {
  const opacity = useTransform(
    progress,
    item.exception ? [0.61, 0.7, 0.86, 1] : [0.61, 0.7, 0.82, 0.9],
    item.exception ? [0, 1, 1, 0.55] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [0.64, 0.78, 0.9], [10, 0, item.exception ? 0 : -8]);

  if (reducedMotion && !item.exception) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? { opacity: item.exception ? 0.55 : 0, y: 0 } : { opacity, y }}
      className={`relative z-30 -translate-x-1/2 text-[11px] font-semibold tracking-[-0.01em] lg:text-[12px] ${
        item.exception ? "text-[#7650ff]" : "text-slate-500"
      }`}
    >
      <span className="pb-1">{item.task}</span>
    </motion.div>
  );
}

function DesktopRail({ progress, reducedMotion }) {
  const routeWidth = useTransform(progress, [0.31, 0.48, 0.78], ["0%", "38%", "84%"]);
  const routeOpacity = useTransform(progress, [0.27, 0.34, 0.92, 1], [0, 1, 1, 0.35]);
  const flowLeft = useTransform(progress, [0.31, 0.78], ["8%", "92%"]);
  const flowOpacity = useTransform(progress, [0.29, 0.36, 0.78, 0.86], [0, 1, 1, 0]);
  const resultsOpacity = useTransform(progress, [0.84, 0.93, 1], [0, 1, 1]);
  const promiseOpacity = useTransform(progress, [0.9, 0.97, 1], [0, 1, 1]);

  return (
    <div className="relative hidden h-full overflow-visible md:block">
      <div className="absolute inset-x-[8%] top-1/2 h-[2px] -translate-y-1/2 bg-slate-300/90" />
      <motion.div
        style={reducedMotion ? { width: "84%", opacity: 0.35 } : { width: routeWidth, opacity: routeOpacity }}
        className="absolute left-[8%] top-1/2 h-[3px] -translate-y-1/2 bg-[#7650ff]"
      />
      <motion.div
        style={reducedMotion ? { opacity: 0 } : { left: flowLeft, opacity: flowOpacity }}
        className="absolute top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7650ff] shadow-[0_0_0_9px_rgba(118,80,255,0.08)]"
      />

      <div className="absolute left-[8%] top-1/2 -translate-y-14 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
        operación comercial
      </div>

      {OPPORTUNITIES.map((item, index) => (
        <OpportunityNode
          key={`${item.source}-${item.label}`}
          progress={progress}
          item={item}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}

      {OPPORTUNITIES.map((item) => (
        <div
          key={`task-${item.label}`}
          className="absolute top-1/2"
          style={{ left: item.left, marginTop: item.taskOffset }}
        >
          <TaskSignal progress={progress} item={item} reducedMotion={reducedMotion} />
        </div>
      ))}

      <motion.div
        style={{ opacity: reducedMotion ? 1 : resultsOpacity }}
        className="absolute bottom-[2%] left-[8%] right-[8%] flex items-end justify-between gap-8"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          <span>0 oportunidades sin responsable</span>
          <span>seguimiento activo</span>
          <span>repetitivo automatizado</span>
        </div>
        <motion.div
          style={{ opacity: reducedMotion ? 1 : promiseOpacity }}
          className="hidden shrink-0 text-right text-[14px] font-semibold tracking-[-0.02em] text-[#0c1730] xl:block"
        >
          Más ventas · Más control · Menos trabajo manual
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileStage({ stage, index, reducedMotion }) {
  const active = index >= 2;
  const result = index === STAGES.length - 1;
  const automation = index === 4;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative min-h-[64svh] pl-14"
    >
      <div className="absolute left-[13px] top-0 bottom-0 w-px bg-slate-200" />
      <div
        className={`absolute left-[8px] top-1.5 h-[11px] w-[11px] rounded-full ring-4 ring-white ${
          active ? "bg-[#7650ff]" : "bg-[#0c1730]"
        }`}
      />

      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {stage.number} · {stage.kicker}
      </div>
      <h2 className="mt-4 text-[clamp(2rem,9vw,3.4rem)] font-semibold leading-[0.99] tracking-[-0.05em] text-[#0c1730]">
        {stage.title}
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-600">{stage.body}</p>

      <div className="mt-9 space-y-7">
        {MOBILE_STATES[index].map((item, itemIndex) => (
          <div key={item} className="relative pl-7">
            <span
              className={`absolute left-0 top-[7px] h-2.5 w-2.5 rounded-full ${
                result || active ? "bg-[#7650ff]" : itemIndex === 2 ? "bg-slate-400" : "bg-[#0c1730]"
              }`}
            />
            <div
              className={`text-[14px] font-semibold leading-5 ${
                index === 1 ? "text-slate-600" : automation && item.includes("excepción") ? "text-[#7650ff]" : "text-[#0c1730]"
              }`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function MobileOperation({ reducedMotion }) {
  return (
    <div className="px-5 pb-24 pt-20 md:hidden">
      <div className="mx-auto max-w-lg">
        <div className="mb-16 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7650ff]">
          Una operación · seis estados
        </div>
        <div className="space-y-16">
          {STAGES.map((stage, index) => (
            <MobileStage key={stage.number} stage={stage} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReducedDesktop({ progress }) {
  return (
    <div className="hidden px-6 py-20 md:block lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 max-w-[760px]">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7650ff]">Resultado</div>
          <h2 className="text-[clamp(2rem,3.15vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
            Más ventas. Más control. Menos trabajo manual.
          </h2>
          <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-slate-600">
            Oportunidades alineadas, responsables visibles, seguimiento activo y trabajo repetitivo automatizado.
          </p>
        </div>
        <div className="h-[430px]">
          <DesktopRail progress={progress} reducedMotion />
        </div>
      </div>
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
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="operation-story"
      ref={sectionRef}
      className={`relative bg-white ${reducedMotion ? "md:h-auto" : "md:h-[620vh]"}`}
    >
      <div className="sr-only">
        {STAGES.map((stage) => (
          <div key={`sr-${stage.number}`}>
            <h2>{stage.title}</h2>
            <p>{stage.body}</p>
          </div>
        ))}
      </div>

      {reducedMotion ? (
        <ReducedDesktop progress={scrollYProgress} />
      ) : (
        <div className="sticky top-[72px] hidden h-[calc(100svh-72px)] overflow-hidden px-6 md:block lg:px-8">
          <div className="relative mx-auto h-full max-w-[1500px]">
            <div className="absolute inset-x-0 top-[5%] z-30 h-[210px]">
              {STAGES.map((stage, index) => (
                <StageCopy key={stage.number} progress={scrollYProgress} stage={stage} index={index} />
              ))}
            </div>

            <div className="absolute inset-x-0 top-[55%] h-[56%] min-h-[360px] -translate-y-1/2">
              <DesktopRail progress={scrollYProgress} reducedMotion={false} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100">
              <motion.div style={{ width: progressWidth }} className="h-full bg-[#7650ff]" />
            </div>
          </div>
        </div>
      )}

      <MobileOperation reducedMotion={Boolean(reducedMotion)} />
    </section>
  );
}
