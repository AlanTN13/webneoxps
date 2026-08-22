import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const STAGES = [
  {
    id: "entry",
    number: "01",
    kicker: "Entrada",
    title: "Todo empieza con una oportunidad.",
    enter: [0, 0.025],
    hold: [0.025, 0.16],
    exit: [0.16, 0.18],
  },
  {
    id: "friction",
    number: "02",
    kicker: "Fricción",
    title: "Cuando crece el volumen, también aparece fricción.",
    enter: [0.2, 0.22],
    hold: [0.22, 0.36],
    exit: [0.36, 0.38],
  },
  {
    id: "order",
    number: "03",
    kicker: "Orden",
    title: "Ahora cada oportunidad sabe qué sigue.",
    enter: [0.4, 0.42],
    hold: [0.42, 0.56],
    exit: [0.56, 0.58],
  },
  {
    id: "automation",
    number: "04",
    kicker: "Automatización",
    title: "Lo repetitivo se resuelve. La excepción llega a una persona.",
    enter: [0.6, 0.62],
    hold: [0.62, 0.78],
    exit: [0.78, 0.8],
  },
  {
    id: "result",
    number: "05",
    kicker: "Resultado",
    title: "Atendida. Trazable. Con próximo paso.",
    enter: [0.82, 0.84],
    hold: [0.84, 0.94],
    exit: [0.94, 0.955],
  },
];

const STAGE_BY_ID = Object.fromEntries(STAGES.map((stage) => [stage.id, stage]));
const CLOSING_WINDOW = [STAGE_BY_ID.result.exit[1] + 0.01, 0.985];

const HOLD_CENTER = (stage) => (stage.hold[0] + stage.hold[1]) / 2;
const RANGE_POINT = (range, ratio) => range[0] + (range[1] - range[0]) * ratio;

const FRAGMENTS = [
  {
    friction: "¿Quién responde?",
    alert: "sin responsable",
    frictionAnchor: "frictionLeft",
    contextAnchor: "contextOwner",
    context: "Responsable · Ana",
    final: "Ana · responsable",
  },
  {
    friction: "Enviar cotización",
    frictionAnchor: "frictionTopRight",
    contextAnchor: "contextNext",
    context: "Próximo paso · Enviar propuesta · 15:00",
    final: "Próximo paso · propuesta enviada",
  },
  {
    friction: "Hacer seguimiento",
    frictionAnchor: "frictionRight",
    contextAnchor: "contextStage",
    context: "Etapa · Calificado",
    final: "Calificado",
  },
  {
    friction: "Recordar mañana",
    frictionAnchor: "frictionBottom",
    contextAnchor: "contextNext",
    context: null,
    final: null,
  },
];

const AUTOMATION_TASKS = [
  { label: "clasificar", anchor: "automationTopLeft" },
  { label: "responder", anchor: "automationBottomLeft" },
  { label: "recordar", anchor: "automationBottomRight" },
  { label: "actualizar", anchor: "automationTopRight" },
];

const MOBILE_FRICTION_TOP = ["¿Quién responde?", "Enviar cotización"];
const MOBILE_FRICTION_BOTTOM = ["Hacer seguimiento", "Recordar mañana"];

const GEOMETRY = {
  wide: {
    hero: { left: "46%", top: "50%" },
    source: { left: "28%", top: "12%" },
    frictionLeft: { left: "16%", top: "50%" },
    frictionTopRight: { left: "68%", top: "22%" },
    frictionRight: { left: "82%", top: "51%" },
    frictionBottom: { left: "42%", top: "82%" },
    contextOwner: { left: "70%", top: "58%" },
    contextStage: { left: "70%", top: "69%" },
    contextNext: { left: "70%", top: "80%" },
    contextBracket: { left: "66%", top: "56%" },
    automationTopLeft: { left: "18%", top: "28%" },
    automationBottomLeft: { left: "18%", top: "74%" },
    automationTopRight: { left: "79%", top: "25%" },
    automationBottomRight: { left: "79%", top: "76%" },
    exceptionStart: { left: "66%", top: "24%" },
    humanEscalation: { left: "84%", top: "20%" },
    secondaryLeft: { left: "34%", top: "64%" },
    secondaryRight: { left: "59%", top: "69%" },
    sourcePath: "M 28 12 C 34 19, 39 32, 45 44",
    escalationPath: "M 67 24 C 73 23, 78 22, 84 20",
  },
  low: {
    hero: { left: "45%", top: "52%" },
    source: { left: "26%", top: "9%" },
    frictionLeft: { left: "14%", top: "49%" },
    frictionTopRight: { left: "66%", top: "20%" },
    frictionRight: { left: "80%", top: "50%" },
    frictionBottom: { left: "40%", top: "81%" },
    contextOwner: { left: "68%", top: "57%" },
    contextStage: { left: "68%", top: "68%" },
    contextNext: { left: "68%", top: "79%" },
    contextBracket: { left: "64%", top: "55%" },
    automationTopLeft: { left: "16%", top: "27%" },
    automationBottomLeft: { left: "16%", top: "73%" },
    automationTopRight: { left: "77%", top: "24%" },
    automationBottomRight: { left: "77%", top: "75%" },
    exceptionStart: { left: "64%", top: "23%" },
    humanEscalation: { left: "81%", top: "18%" },
    secondaryLeft: { left: "35%", top: "63%" },
    secondaryRight: { left: "57%", top: "68%" },
    sourcePath: "M 26 9 C 32 17, 37 31, 44 45",
    escalationPath: "M 65 23 C 71 22, 76 20, 81 18",
  },
  compact: {
    hero: { left: "43%", top: "52%" },
    source: { left: "24%", top: "10%" },
    frictionLeft: { left: "12%", top: "49%" },
    frictionTopRight: { left: "63%", top: "20%" },
    frictionRight: { left: "76%", top: "50%" },
    frictionBottom: { left: "39%", top: "82%" },
    contextOwner: { left: "66%", top: "57%" },
    contextStage: { left: "66%", top: "68%" },
    contextNext: { left: "66%", top: "79%" },
    contextBracket: { left: "62%", top: "55%" },
    automationTopLeft: { left: "14%", top: "27%" },
    automationBottomLeft: { left: "14%", top: "73%" },
    automationTopRight: { left: "74%", top: "24%" },
    automationBottomRight: { left: "74%", top: "75%" },
    exceptionStart: { left: "61%", top: "23%" },
    humanEscalation: { left: "78%", top: "18%" },
    secondaryLeft: { left: "34%", top: "63%" },
    secondaryRight: { left: "54%", top: "68%" },
    sourcePath: "M 24 10 C 30 18, 35 31, 42 45",
    escalationPath: "M 62 23 C 68 22, 73 20, 78 18",
  },
};

const STORY_LAYOUT_CSS = `
  .nexops-story-desktop {
    --copy-zone: 190px;
    --footer-zone: 92px;
    --hero-min-height: 350px;
    --hero-max-width: 1120px;
    --opportunity-width: 480px;
  }
  .nexops-story-grid {
    display: grid;
    grid-template-rows: var(--copy-zone) minmax(var(--hero-min-height), 1fr) var(--footer-zone);
  }
  .nexops-copy-zone,
  .nexops-hero-zone,
  .nexops-footer-zone {
    min-height: 0;
    min-width: 0;
  }
  .nexops-hero-zone {
    position: relative;
    overflow: visible;
  }
  .nexops-scene {
    position: absolute;
    inset: 0;
    width: min(100%, var(--hero-max-width));
    margin-inline: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .nexops-opportunity {
    width: var(--opportunity-width);
  }
  @media (max-width: 1399px) and (min-width: 1200px) {
    .nexops-story-desktop {
      --copy-zone: 180px;
      --footer-zone: 86px;
      --hero-min-height: 335px;
      --hero-max-width: 1060px;
      --opportunity-width: 452px;
    }
  }
  @media (max-height: 800px) and (min-width: 1200px) {
    .nexops-story-desktop {
      --copy-zone: 164px;
      --footer-zone: 78px;
      --hero-min-height: 310px;
      --hero-max-width: 1010px;
      --opportunity-width: 438px;
    }
  }
  @media (max-width: 1199px) and (min-width: 768px) {
    .nexops-story-desktop {
      --copy-zone: 170px;
      --footer-zone: 78px;
      --hero-min-height: 305px;
      --hero-max-width: 920px;
      --opportunity-width: 398px;
    }
  }
  @media (max-height: 800px) and (max-width: 1199px) and (min-width: 768px) {
    .nexops-story-desktop {
      --copy-zone: 158px;
      --footer-zone: 72px;
      --hero-min-height: 292px;
      --hero-max-width: 890px;
      --opportunity-width: 386px;
    }
  }
`;

function getLayoutProfile() {
  if (typeof window === "undefined") return "wide";
  if (window.innerWidth < 1200) return "compact";
  if (window.innerHeight <= 800 || window.innerWidth < 1400) return "low";
  return "wide";
}

function useLayoutProfile() {
  const [profile, setProfile] = useState(getLayoutProfile);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = getLayoutProfile();
        setProfile((current) => (current === next ? current : next));
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return profile;
}

function useStageOpacity(progress, stage) {
  return useTransform(
    progress,
    [stage.enter[0], stage.enter[1], stage.hold[1], stage.exit[1]],
    [0, 1, 1, 0]
  );
}

function StageCopy({ progress, stage }) {
  const opacity = useStageOpacity(progress, stage);
  const y = useTransform(
    progress,
    [stage.enter[0], stage.enter[1], stage.exit[1]],
    [8, 0, -6]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y }}
      className="pointer-events-none absolute left-0 top-0 max-w-[520px]"
    >
      <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
        <span className="text-[#7650ff]">{stage.number}</span>
        <span>{stage.kicker}</span>
      </div>
      <h2 className="text-[clamp(2.25rem,3.7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
        {stage.title}
      </h2>
    </motion.div>
  );
}

function OpportunitySurface({ progress }) {
  const entry = STAGE_BY_ID.entry;
  const order = STAGE_BY_ID.order;
  const result = STAGE_BY_ID.result;
  const opacity = useTransform(progress, [entry.enter[0], entry.enter[1], 1], [0, 1, 1]);
  const x = useTransform(progress, [entry.enter[0], entry.enter[1]], [-40, 0]);
  const activeHairlineOpacity = useTransform(
    progress,
    [order.enter[0], order.enter[1], 1],
    [0, 1, 1]
  );
  const finalStatusOpacity = useTransform(
    progress,
    [result.enter[0], result.enter[1], 1],
    [0, 1, 1]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="nexops-opportunity relative overflow-visible rounded-[28px_28px_28px_10px] border border-slate-200/90 bg-white px-7 py-5"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: activeHairlineOpacity }}
        className="absolute bottom-0 left-8 right-8 h-px bg-[#7650ff]/45"
      />
      <div className="flex items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.19em] text-slate-400">
        <span>WhatsApp · desde campaña</span>
        <span className="font-semibold tracking-[0.08em] text-slate-400">11:42</span>
      </div>
      <div className="mt-3 text-[clamp(20px,1.75vw,23px)] font-semibold leading-[1.18] tracking-[-0.035em] text-[#10192f]">
        Hola, vi el anuncio. Quiero más información.
      </div>
      <div className="mt-3 flex h-4 justify-end">
        <motion.span
          style={{ opacity: finalStatusOpacity }}
          className="text-[10px] font-semibold tracking-[-0.01em] text-[#7650ff]"
        >
          Seguimiento activo
        </motion.span>
      </div>
    </motion.div>
  );
}

function CampaignSource({ progress, geometry }) {
  const opacity = useStageOpacity(progress, STAGE_BY_ID.entry);
  const pathLength = useTransform(
    progress,
    [STAGE_BY_ID.entry.enter[0], STAGE_BY_ID.entry.enter[1]],
    [0, 1]
  );

  return (
    <>
      <motion.div
        style={{ opacity, left: geometry.source.left, top: geometry.source.top }}
        className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-[12px] font-semibold tracking-[-0.015em] text-slate-500"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
        Campaña activa
      </motion.div>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <motion.path
          d={geometry.sourcePath}
          fill="none"
          stroke="#7650ff"
          strokeOpacity="0.52"
          strokeWidth="0.14"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </>
  );
}

function MorphFragment({ progress, item, geometry }) {
  const friction = STAGE_BY_ID.friction;
  const order = STAGE_BY_ID.order;
  const automation = STAGE_BY_ID.automation;
  const result = STAGE_BY_ID.result;
  const frictionPoint = geometry[item.frictionAnchor];
  const contextPoint = geometry[item.contextAnchor];

  const left = useTransform(
    progress,
    [friction.enter[0], friction.hold[1], order.enter[1], 1],
    [frictionPoint.left, frictionPoint.left, contextPoint.left, contextPoint.left]
  );
  const top = useTransform(
    progress,
    [friction.enter[0], friction.hold[1], order.enter[1], 1],
    [frictionPoint.top, frictionPoint.top, contextPoint.top, contextPoint.top]
  );
  const nudgeY = useTransform(progress, [friction.enter[0], friction.enter[1]], [14, 0]);
  const frictionOpacity = useTransform(
    progress,
    [friction.enter[0], friction.enter[1], friction.hold[1], order.enter[1]],
    [0, 1, 1, 0]
  );
  const contextOpacity = useTransform(
    progress,
    [order.enter[0], order.enter[1], automation.hold[1], result.enter[0]],
    [0, 1, 1, 0]
  );
  const finalOpacity = useTransform(
    progress,
    [result.enter[0], result.enter[1], 1],
    [0, 1, 1]
  );

  return (
    <motion.div
      style={{ left, top, y: nudgeY }}
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
    >
      <motion.div style={{ opacity: frictionOpacity }} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.018em] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>{item.friction}</span>
        </div>
        {item.alert ? (
          <div className="mt-1.5 pl-3.5 text-[10px] font-semibold text-[#a85761]">{item.alert}</div>
        ) : null}
      </motion.div>

      {item.context ? (
        <>
          <motion.div
            style={{ opacity: contextOpacity }}
            className="absolute left-0 top-0 flex -translate-y-1/2 items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-[#26324a]"
          >
            <span className="h-px w-5 shrink-0 bg-[#7650ff]/65" />
            <span>{item.context}</span>
          </motion.div>
          <motion.div
            style={{ opacity: finalOpacity }}
            className="absolute left-0 top-0 flex -translate-y-1/2 items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-[#26324a]"
          >
            <span className="h-px w-5 shrink-0 bg-[#7650ff]/65" />
            <span>{item.final}</span>
          </motion.div>
        </>
      ) : null}
    </motion.div>
  );
}

function ContextBracket({ progress, geometry }) {
  const order = STAGE_BY_ID.order;
  const automation = STAGE_BY_ID.automation;
  const result = STAGE_BY_ID.result;
  const opacity = useTransform(
    progress,
    [order.enter[0], order.enter[1], automation.hold[1], result.enter[0]],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity,
        left: geometry.contextBracket.left,
        top: geometry.contextBracket.top,
      }}
      className="pointer-events-none absolute z-10 h-[112px] w-[30px] border-b border-l border-[#7650ff]/35"
    />
  );
}

function taskWindow(index) {
  const automation = STAGE_BY_ID.automation;
  const sequenceStart = automation.hold[0];
  const sequenceEnd = RANGE_POINT(automation.hold, 0.44);
  const step = (sequenceEnd - sequenceStart) / AUTOMATION_TASKS.length;
  const start = sequenceStart + step * index;
  return [start, start + step * 0.28, start + step * 0.66, start + step * 1.18];
}

function AutomationTask({ progress, task, index, geometry }) {
  const [start, active, check, end] = taskWindow(index);
  const opacity = useTransform(progress, [start, active, check, end], [0, 1, 1, 0]);
  const absorbScale = useTransform(progress, [check, end], [1, 0.88]);
  const point = geometry[task.anchor];

  return (
    <motion.div
      style={{
        opacity,
        scale: absorbScale,
        left: point.left,
        top: point.top,
      }}
      className="pointer-events-none absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap text-[14px] font-semibold tracking-[-0.015em] text-[#7650ff]"
    >
      <span>{task.label}</span>
      <span className="text-[12px]">✓</span>
    </motion.div>
  );
}

function ExceptionFlow({ progress, geometry }) {
  const automation = STAGE_BY_ID.automation;
  const enterStart = RANGE_POINT(automation.hold, 0.43);
  const enterEnd = RANGE_POINT(automation.hold, 0.49);
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, automation.hold[1], automation.exit[1]],
    [0, 1, 1, 0]
  );
  const pathLength = useTransform(progress, [enterStart, enterEnd], [0, 1]);

  return (
    <>
      <motion.div
        style={{
          opacity,
          left: geometry.exceptionStart.left,
          top: geometry.exceptionStart.top,
        }}
        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[13px] font-semibold tracking-[-0.015em] text-[#7650ff]"
      >
        Excepción · validar condición comercial
      </motion.div>
      <motion.div
        style={{
          opacity,
          left: geometry.humanEscalation.left,
          top: geometry.humanEscalation.top,
        }}
        className="pointer-events-none absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7650ff]/25 bg-white text-[11px] font-bold text-[#7650ff]">
          S
        </div>
        <div className="text-[12px] font-semibold tracking-[-0.01em] text-slate-600">Sofía · equipo</div>
      </motion.div>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      >
        <motion.path
          d={geometry.escalationPath}
          fill="none"
          stroke="#7650ff"
          strokeOpacity="0.55"
          strokeWidth="0.14"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </>
  );
}

function SecondaryOpportunity({ progress, point, message }) {
  const result = STAGE_BY_ID.result;
  const opacity = useTransform(progress, [result.enter[0], result.enter[1], 1], [0, 0.15, 0.15]);
  const scale = useTransform(progress, [result.enter[0], result.enter[1], 1], [0.72, 0.76, 0.76]);

  return (
    <motion.div
      style={{ opacity, scale, left: point.left, top: point.top }}
      className="pointer-events-none absolute z-0 w-[min(420px,42vw)] -translate-x-1/2 -translate-y-1/2 rounded-[26px_26px_26px_9px] border border-slate-200 bg-white px-7 py-5"
    >
      <div className="text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">WhatsApp · desde campaña</div>
      <div className="mt-3 text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-500">{message}</div>
    </motion.div>
  );
}

function ResultMicrostates({ progress }) {
  const result = STAGE_BY_ID.result;
  const opacity = useTransform(progress, [result.enter[0], result.enter[1], 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] font-semibold tracking-[0.01em] text-slate-500"
    >
      <span>0 sin responsable</span>
      <span className="text-[#7650ff]/60">·</span>
      <span>seguimiento activo</span>
      <span className="text-[#7650ff]/60">·</span>
      <span>repetitivo automatizado</span>
    </motion.div>
  );
}

function DesktopVisual({ progress }) {
  const profile = useLayoutProfile();
  const geometry = GEOMETRY[profile];

  return (
    <div className="nexops-scene h-full">
      <CampaignSource progress={progress} geometry={geometry} />
      <SecondaryOpportunity
        progress={progress}
        point={geometry.secondaryLeft}
        message="Quiero conocer opciones para mi empresa."
      />
      <SecondaryOpportunity
        progress={progress}
        point={geometry.secondaryRight}
        message="Necesito una propuesta para este mes."
      />
      {FRAGMENTS.map((item) => (
        <MorphFragment key={item.friction} progress={progress} item={item} geometry={geometry} />
      ))}
      <ContextBracket progress={progress} geometry={geometry} />
      {AUTOMATION_TASKS.map((task, index) => (
        <AutomationTask
          key={task.label}
          progress={progress}
          task={task}
          index={index}
          geometry={geometry}
        />
      ))}
      <ExceptionFlow progress={progress} geometry={geometry} />
      <div
        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: geometry.hero.left, top: geometry.hero.top }}
      >
        <OpportunitySurface progress={progress} />
      </div>
    </div>
  );
}

function DesktopStory({ progress }) {
  const promiseOpacity = useTransform(progress, CLOSING_WINDOW, [0, 1]);

  return (
    <div className="nexops-story-desktop sticky top-[72px] hidden h-[calc(100svh-72px)] overflow-hidden bg-[#fdfdfc] px-6 md:block lg:px-8">
      <div className="nexops-story-grid mx-auto h-full max-w-[1248px]">
        <div className="nexops-copy-zone relative z-40 pt-6">
          {STAGES.map((stage) => (
            <StageCopy key={stage.id} progress={progress} stage={stage} />
          ))}
        </div>
        <div className="nexops-hero-zone">
          <DesktopVisual progress={progress} />
        </div>
        <div className="nexops-footer-zone relative flex flex-col items-center justify-center gap-3">
          <ResultMicrostates progress={progress} />
          <motion.div
            style={{ opacity: promiseOpacity }}
            className="text-center text-[clamp(1.35rem,2.2vw,2rem)] font-semibold tracking-[-0.045em] text-[#0c1730]"
          >
            Más ventas. Más control. Menos trabajo manual.
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StaticDesktopFrame({ stage, index }) {
  const progress = useMotionValue(HOLD_CENTER(stage));

  return (
    <section className="nexops-story-desktop bg-[#fdfdfc] px-6 py-12 lg:px-8">
      <div className="nexops-story-grid mx-auto min-h-[720px] max-w-[1248px]">
        <div className="nexops-copy-zone relative pt-3">
          <div className="max-w-[520px]">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="mr-3 text-[#7650ff]">{stage.number}</span>
              {stage.kicker}
            </div>
            <h2 className="text-[clamp(2.25rem,3.7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
              {stage.title}
            </h2>
          </div>
        </div>
        <div className="nexops-hero-zone">
          <DesktopVisual progress={progress} />
        </div>
        <div className="nexops-footer-zone flex flex-col items-center justify-center gap-3">
          {index === STAGES.length - 1 ? (
            <>
              <ResultMicrostates progress={progress} />
              <div className="text-center text-[clamp(1.35rem,2.2vw,2rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">
                Más ventas. Más control. Menos trabajo manual.
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ReducedDesktopStory() {
  return (
    <div className="hidden md:block">
      {STAGES.map((stage, index) => (
        <StaticDesktopFrame key={stage.id} stage={stage} index={index} />
      ))}
    </div>
  );
}

function MobileOpportunity({ final = false }) {
  return (
    <div className="relative mx-auto w-full max-w-[350px] rounded-[24px_24px_24px_9px] border border-slate-200/90 bg-white px-5 py-4">
      <div className="flex items-center justify-between gap-4 text-[8px] font-bold uppercase tracking-[0.17em] text-slate-400">
        <span>WhatsApp · desde campaña</span>
        <span>11:42</span>
      </div>
      <div className="mt-3 text-[18px] font-semibold leading-[1.2] tracking-[-0.035em] text-[#10192f]">
        Hola, vi el anuncio. Quiero más información.
      </div>
      <div className="mt-3 flex h-4 justify-end">
        {final ? <span className="text-[10px] font-semibold text-[#7650ff]">Seguimiento activo</span> : null}
      </div>
    </div>
  );
}

function MobileContext({ final = false, className = "" }) {
  const items = final
    ? ["Ana · responsable", "Calificado", "Próximo paso · propuesta enviada"]
    : ["Responsable · Ana", "Etapa · Calificado", "Próximo paso · Enviar propuesta · 15:00"];

  return (
    <div className={`mx-auto w-full max-w-[350px] space-y-3 pl-3 ${className}`}>
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.015em] text-slate-600">
          <span className="h-px w-5 shrink-0 bg-[#7650ff]/55" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function MobileSecondary({ children, top }) {
  return (
    <div
      className="absolute left-1/2 z-0 w-[310px] max-w-[88%] -translate-x-1/2 rounded-[22px_22px_22px_8px] border border-slate-200 bg-white px-5 py-4 opacity-[0.16]"
      style={{ top }}
    >
      <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">WhatsApp · desde campaña</div>
      <div className="mt-2 text-[16px] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-500">{children}</div>
    </div>
  );
}

function MobileResultStack() {
  return (
    <div className="relative mx-auto min-h-[190px] w-full max-w-[350px]">
      <MobileSecondary top={34}>Quiero conocer opciones para mi empresa.</MobileSecondary>
      <MobileSecondary top={72}>Necesito una propuesta para este mes.</MobileSecondary>
      <div className="relative z-10">
        <MobileOpportunity final />
      </div>
    </div>
  );
}

function MobileFrame({ stage, index, reducedMotion }) {
  const initial = reducedMotion ? false : { opacity: 0, y: 14 };
  const isAutomation = stage.id === "automation";

  return (
    <motion.article
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.26 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      className={`relative flex min-h-[72svh] flex-col justify-center px-5 py-14 sm:py-16 ${isAutomation ? "min-h-[82svh]" : ""}`}
    >
      <div className="mx-auto w-full max-w-[390px]">
        {index === 0 ? (
          <div className="mb-6 flex items-center justify-center gap-2 text-[12px] font-semibold text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
            Campaña activa
          </div>
        ) : null}

        {index === 1 ? (
          <div className="mx-auto mb-7 grid w-full max-w-[350px] grid-cols-2 gap-x-7 gap-y-3 text-[13px] font-medium text-slate-500">
            {MOBILE_FRICTION_TOP.map((item, itemIndex) => (
              <div key={item} className={itemIndex === 1 ? "text-right" : ""}>
                <span className="mr-1.5 text-slate-400">•</span>
                {item}
                {itemIndex === 0 ? <div className="mt-1 text-[9px] font-semibold text-[#a85761]">sin responsable</div> : null}
              </div>
            ))}
          </div>
        ) : null}

        {index === 4 ? <MobileResultStack /> : <MobileOpportunity />}

        {index === 1 ? (
          <div className="mx-auto mt-7 grid w-full max-w-[350px] grid-cols-2 gap-x-7 gap-y-3 text-[13px] font-medium text-slate-500">
            {MOBILE_FRICTION_BOTTOM.map((item, itemIndex) => (
              <div key={item} className={itemIndex === 1 ? "text-right" : ""}>
                <span className="mr-1.5 text-slate-400">•</span>
                {item}
              </div>
            ))}
          </div>
        ) : null}

        {index === 2 ? <MobileContext className="mt-8" /> : null}

        {index === 3 ? (
          <div className="mx-auto mt-8 w-full max-w-[350px]">
            <MobileContext />
            <div className="mt-7 space-y-3 pl-3">
              {AUTOMATION_TASKS.map((task) => (
                <div key={task.label} className="flex items-center gap-2 text-[13px] font-semibold text-[#7650ff]">
                  <span>{task.label}</span>
                  <span className="text-[11px]">✓</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pl-3 text-[12px] font-semibold text-[#7650ff]">Excepción · validar condición comercial</div>
            <div className="ml-auto mt-5 flex w-fit items-center gap-2 pr-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7650ff]/25 text-[11px] font-bold text-[#7650ff]">S</div>
              <div className="text-[12px] font-semibold text-slate-600">Sofía · equipo</div>
            </div>
          </div>
        ) : null}

        {index === 4 ? (
          <>
            <MobileContext final className="mt-8" />
            <div className="mx-auto mt-8 flex w-full max-w-[350px] flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-500">
              <span>0 sin responsable</span>
              <span>seguimiento activo</span>
              <span>repetitivo automatizado</span>
            </div>
          </>
        ) : null}

        <div className="mt-10">
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span className="mr-2 text-[#7650ff]">{stage.number}</span>
            {stage.kicker}
          </div>
          <h2 className="max-w-[350px] text-[clamp(1.95rem,8vw,2.25rem)] font-semibold leading-[1] tracking-[-0.05em] text-[#0c1730]">
            {stage.title}
          </h2>
        </div>

        {index === 4 ? (
          <div className="mt-10 text-[24px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#0c1730]">
            Más ventas. Más control. Menos trabajo manual.
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function MobileStory({ reducedMotion }) {
  return (
    <div className="bg-[#fdfdfc] md:hidden">
      {STAGES.map((stage, index) => (
        <MobileFrame key={stage.id} stage={stage} index={index} reducedMotion={reducedMotion} />
      ))}
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
    <section
      id="operation-story"
      ref={sectionRef}
      className={`relative bg-[#fdfdfc] ${reducedMotion ? "md:h-auto" : "md:h-[520vh]"}`}
    >
      <style>{STORY_LAYOUT_CSS}</style>
      <div className="sr-only">
        {STAGES.map((stage) => (
          <div key={`sr-${stage.id}`}>
            <h2>{stage.title}</h2>
          </div>
        ))}
      </div>
      {reducedMotion ? <ReducedDesktopStory /> : <DesktopStory progress={scrollYProgress} />}
      <MobileStory reducedMotion={Boolean(reducedMotion)} />
    </section>
  );
}
