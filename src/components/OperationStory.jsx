import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const STAGES = [
  { number: "01", kicker: "Entrada", title: "Todo empieza con una oportunidad." },
  { number: "02", kicker: "Fricción", title: "Cuando crece el volumen, también aparece fricción." },
  { number: "03", kicker: "Orden", title: "Ahora cada oportunidad sabe qué sigue." },
  { number: "04", kicker: "Automatización", title: "Lo repetitivo se resuelve. La excepción llega a una persona." },
  { number: "05", kicker: "Resultado", title: "Atendida. Trazable. Con próximo paso." },
];

const STAGE_WINDOWS = [
  [0, 0.04, 0.15, 0.21],
  [0.15, 0.21, 0.34, 0.4],
  [0.35, 0.41, 0.54, 0.6],
  [0.55, 0.61, 0.78, 0.84],
  [0.8, 0.87, 1, 1],
];

const FRAGMENTS = [
  {
    friction: "¿Quién responde?",
    alert: "sin responsable",
    frictionX: -350,
    frictionY: -8,
    spawnX: -24,
    spawnY: 6,
    context: "Responsable · Ana",
    final: "Ana · responsable",
    contextX: 300,
    contextY: 72,
  },
  {
    friction: "Enviar cotización",
    frictionX: 275,
    frictionY: -135,
    spawnX: 18,
    spawnY: -18,
    context: "Próximo paso · Enviar propuesta · 15:00",
    final: "Próximo paso · propuesta enviada",
    contextX: 320,
    contextY: 142,
  },
  {
    friction: "Hacer seguimiento",
    frictionX: 365,
    frictionY: 12,
    spawnX: 22,
    spawnY: 4,
    context: "Etapa · Calificado",
    final: "Calificado",
    contextX: 302,
    contextY: 107,
  },
  {
    friction: "Recordar mañana",
    frictionX: -70,
    frictionY: 158,
    spawnX: -8,
    spawnY: 22,
    context: null,
    final: null,
    contextX: 308,
    contextY: 142,
  },
];

const AUTOMATION_TASKS = [
  { label: "clasificar", x: -315, y: -118 },
  { label: "responder", x: -285, y: 118 },
  { label: "recordar", x: 255, y: 156 },
  { label: "actualizar", x: 310, y: -145 },
];

const MOBILE_FRICTION_TOP = ["¿Quién responde?", "Enviar cotización"];
const MOBILE_FRICTION_BOTTOM = ["Hacer seguimiento", "Recordar mañana"];

function StageCopy({ progress, stage, index }) {
  const [start, fadeIn, holdEnd, end] = STAGE_WINDOWS[index];
  const opacityInput = index === STAGES.length - 1 ? [start, fadeIn, 1] : [start, fadeIn, holdEnd, end];
  const opacityOutput = index === STAGES.length - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const yInput = index === STAGES.length - 1 ? [start, fadeIn, 1] : [start, fadeIn, end];
  const yOutput = index === STAGES.length - 1 ? [10, 0, 0] : [10, 0, -8];
  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  return (
    <motion.div aria-hidden="true" style={{ opacity, y }} className="pointer-events-none absolute left-0 top-0 max-w-[560px]">
      <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
        <span className="text-[#7650ff]">{stage.number}</span>
        <span>{stage.kicker}</span>
      </div>
      <h2 className="text-[clamp(2.35rem,3.7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
        {stage.title}
      </h2>
    </motion.div>
  );
}

function OpportunitySurface({ progress }) {
  const entryOpacity = useTransform(progress, [0, 0.035, 0.105], [0, 0, 1]);
  const entryX = useTransform(progress, [0, 0.035, 0.105], [-40, -40, 0]);
  const activeHairlineOpacity = useTransform(progress, [0.37, 0.47, 1], [0, 1, 1]);
  const finalStatusOpacity = useTransform(progress, [0.82, 0.91, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ opacity: entryOpacity, x: entryX }}
      className="relative w-[480px] max-w-[46vw] overflow-visible rounded-[28px_28px_28px_10px] border border-slate-200/90 bg-white px-7 py-6"
    >
      <motion.div aria-hidden="true" style={{ opacity: activeHairlineOpacity }} className="absolute bottom-0 left-8 right-8 h-px bg-[#7650ff]/45" />
      <div className="flex items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.19em] text-slate-400">
        <span>WhatsApp · desde campaña</span>
        <span className="font-semibold tracking-[0.08em] text-slate-400">11:42</span>
      </div>
      <div className="mt-4 text-[22px] font-semibold leading-[1.18] tracking-[-0.035em] text-[#10192f] lg:text-[23px]">
        Hola, vi el anuncio. Quiero más información.
      </div>
      <motion.div
        style={{ opacity: finalStatusOpacity }}
        className="absolute -bottom-8 right-0 translate-x-[34%] text-[10px] font-semibold tracking-[-0.01em] text-[#7650ff]"
      >
        Seguimiento activo
      </motion.div>
    </motion.div>
  );
}

function CampaignSource({ progress }) {
  const opacity = useTransform(progress, [0, 0.035, 0.1, 0.17, 0.23], [0, 1, 1, 0.55, 0]);
  const pathLength = useTransform(progress, [0.02, 0.1], [0, 1]);

  return (
    <>
      <motion.div style={{ opacity }} className="absolute left-[22%] top-[15%] flex items-center gap-2 text-[12px] font-semibold tracking-[-0.015em] text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
        Campaña activa
      </motion.div>
      <svg aria-hidden="true" viewBox="0 0 1050 430" className="pointer-events-none absolute inset-0 h-full w-full">
        <motion.path
          d="M 255 95 C 315 110, 350 145, 397 168"
          fill="none"
          stroke="#7650ff"
          strokeOpacity="0.52"
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </>
  );
}

function MorphFragment({ progress, item }) {
  const x = useTransform(progress, [0.14, 0.21, 0.36, 0.49], [item.frictionX + item.spawnX, item.frictionX, item.frictionX, item.contextX]);
  const y = useTransform(progress, [0.14, 0.21, 0.36, 0.49], [item.frictionY + item.spawnY, item.frictionY, item.frictionY, item.contextY]);
  const frictionOpacity = useTransform(progress, [0.14, 0.21, 0.36, 0.49], [0, 1, 1, 0]);
  const contextOpacity = useTransform(progress, [0.38, 0.49, 0.82, 0.9], [0, 1, 1, 0]);
  const finalOpacity = useTransform(progress, [0.82, 0.91, 1], [0, 1, 1]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20" style={{ transform: "translate(-50%, -50%)" }}>
      <motion.div style={{ x, y }} className="relative whitespace-nowrap">
        <motion.div style={{ opacity: frictionOpacity }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.018em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{item.friction}</span>
          </div>
          {item.alert ? <div className="mt-1.5 pl-3.5 text-[10px] font-semibold text-[#a85761]">{item.alert}</div> : null}
        </motion.div>

        {item.context ? (
          <>
            <motion.div style={{ opacity: contextOpacity }} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-[#26324a]">
              <span className="h-px w-5 bg-[#7650ff]/65" />
              <span>{item.context}</span>
            </motion.div>
            <motion.div style={{ opacity: finalOpacity }} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-[#26324a]">
              <span className="h-px w-5 bg-[#7650ff]/65" />
              <span>{item.final}</span>
            </motion.div>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}

function ContextBracket({ progress }) {
  const opacity = useTransform(progress, [0.39, 0.49, 0.84, 0.92], [0, 1, 1, 0.75]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, transform: "translate(248px, 50px)" }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[104px] w-[42px] border-b border-l border-[#7650ff]/35"
    />
  );
}

function AutomationTask({ progress, task, index }) {
  const start = 0.57 + index * 0.042;
  const active = start + 0.028;
  const check = start + 0.067;
  const end = start + 0.115;
  const opacity = useTransform(progress, [start, active, check, end], [0, 1, 1, 0]);
  const x = useTransform(progress, [start, check, end], [task.x, task.x, task.x * 0.42]);
  const y = useTransform(progress, [start, check, end], [task.y, task.y, task.y * 0.42]);
  const checkOpacity = useTransform(progress, [active, check, end], [0, 1, 1]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-30" style={{ transform: "translate(-50%, -50%)" }}>
      <motion.div style={{ opacity, x, y }} className="flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold tracking-[-0.015em] text-[#7650ff]">
        <span>{task.label}</span>
        <motion.span style={{ opacity: checkOpacity }} className="text-[12px]">✓</motion.span>
      </motion.div>
    </div>
  );
}

function ExceptionFlow({ progress }) {
  const opacity = useTransform(progress, [0.66, 0.72, 0.8, 0.88], [0, 1, 1, 0]);
  const exceptionX = useTransform(progress, [0.69, 0.8], [145, 215]);
  const exceptionY = useTransform(progress, [0.69, 0.8], [-88, -82]);
  const personOpacity = useTransform(progress, [0.7, 0.77, 0.87], [0, 1, 1]);
  const pathLength = useTransform(progress, [0.71, 0.79], [0, 1]);

  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30" style={{ transform: "translate(-50%, -50%)" }}>
        <motion.div style={{ opacity, x: exceptionX, y: exceptionY }} className="whitespace-nowrap text-[13px] font-semibold tracking-[-0.015em] text-[#7650ff]">
          Excepción · validar condición comercial
        </motion.div>
      </div>
      <motion.div style={{ opacity: personOpacity }} className="pointer-events-none absolute left-[84%] top-[31%] z-30 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7650ff]/25 bg-white text-[11px] font-bold text-[#7650ff]">S</div>
        <div className="text-[12px] font-semibold tracking-[-0.01em] text-slate-600">Sofía · equipo</div>
      </motion.div>
      <svg aria-hidden="true" viewBox="0 0 1050 430" className="pointer-events-none absolute inset-0 z-20 h-full w-full">
        <motion.path
          d="M 655 126 C 720 126, 760 126, 812 126"
          fill="none"
          stroke="#7650ff"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </>
  );
}

function SecondaryOpportunity({ progress, x, y, message }) {
  const opacity = useTransform(progress, [0.8, 0.9, 1], [0, 0.2, 0.2]);
  const scale = useTransform(progress, [0.8, 0.9, 1], [0.7, 0.74, 0.74]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-0" style={{ transform: "translate(-50%, -50%)" }}>
      <motion.div style={{ opacity, scale, x, y }} className="w-[460px] rounded-[26px_26px_26px_9px] border border-slate-200 bg-white px-7 py-5">
        <div className="text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">WhatsApp · desde campaña</div>
        <div className="mt-3 text-[20px] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-500">{message}</div>
      </motion.div>
    </div>
  );
}

function ResultMicrostates({ progress }) {
  const opacity = useTransform(progress, [0.86, 0.93, 1], [0, 1, 1]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-7 whitespace-nowrap text-[11px] font-semibold tracking-[0.01em] text-slate-500">
      <span>0 sin responsable</span>
      <span className="text-[#7650ff]/60">·</span>
      <span>seguimiento activo</span>
      <span className="text-[#7650ff]/60">·</span>
      <span>repetitivo automatizado</span>
    </motion.div>
  );
}

function DesktopVisual({ progress }) {
  return (
    <div className="relative h-full w-full">
      <CampaignSource progress={progress} />
      <SecondaryOpportunity progress={progress} x={-205} y={82} message="Quiero conocer opciones para mi empresa." />
      <SecondaryOpportunity progress={progress} x={218} y={92} message="Necesito una propuesta para este mes." />
      {FRAGMENTS.map((item) => <MorphFragment key={item.friction} progress={progress} item={item} />)}
      <ContextBracket progress={progress} />
      {AUTOMATION_TASKS.map((task, index) => <AutomationTask key={task.label} progress={progress} task={task} index={index} />)}
      <ExceptionFlow progress={progress} />
      <div className="absolute left-1/2 top-1/2 z-20" style={{ transform: "translate(-50%, -50%)" }}>
        <OpportunitySurface progress={progress} />
      </div>
      <ResultMicrostates progress={progress} />
    </div>
  );
}

function DesktopStory({ progress }) {
  const promiseOpacity = useTransform(progress, [0.93, 0.98, 1], [0, 1, 1]);

  return (
    <div className="sticky top-[72px] hidden h-[calc(100svh-72px)] overflow-hidden bg-[#fdfdfc] px-6 md:block lg:px-8">
      <div className="relative mx-auto h-full max-w-[1248px]">
        <div className="absolute left-0 top-10 z-40 h-[150px] w-[560px] max-w-[45vw]">
          {STAGES.map((stage, index) => <StageCopy key={stage.number} progress={progress} stage={stage} index={index} />)}
        </div>
        <div className="absolute left-1/2 top-[52%] h-[430px] w-[82%] max-w-[1050px] -translate-x-1/2 -translate-y-1/2">
          <DesktopVisual progress={progress} />
        </div>
        <motion.div style={{ opacity: promiseOpacity }} className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[clamp(1.45rem,2.3vw,2rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">
          Más ventas. Más control. Menos trabajo manual.
        </motion.div>
      </div>
    </div>
  );
}

function StaticDesktopFrame({ stage, index, progressValue }) {
  const progress = useMotionValue(progressValue);

  return (
    <section className="relative min-h-[78svh] bg-[#fdfdfc] px-6 py-16 lg:px-8">
      <div className="relative mx-auto min-h-[660px] max-w-[1248px]">
        <div className="max-w-[560px]">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"><span className="mr-3 text-[#7650ff]">{stage.number}</span>{stage.kicker}</div>
          <h2 className="text-[clamp(2.35rem,3.7vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">{stage.title}</h2>
        </div>
        <div className="absolute left-1/2 top-[58%] h-[430px] w-[82%] max-w-[1050px] -translate-x-1/2 -translate-y-1/2">
          <DesktopVisual progress={progress} />
        </div>
        {index === STAGES.length - 1 ? <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[clamp(1.45rem,2.3vw,2rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">Más ventas. Más control. Menos trabajo manual.</div> : null}
      </div>
    </section>
  );
}

function ReducedDesktopStory() {
  const progressValues = [0.11, 0.28, 0.5, 0.72, 0.96];
  return <div className="hidden md:block">{STAGES.map((stage, index) => <StaticDesktopFrame key={stage.number} stage={stage} index={index} progressValue={progressValues[index]} />)}</div>;
}

function MobileOpportunity({ final = false }) {
  return (
    <div className="relative mx-auto w-full max-w-[350px] rounded-[24px_24px_24px_9px] border border-slate-200/90 bg-white px-5 py-4">
      <div className="flex items-center justify-between gap-4 text-[8px] font-bold uppercase tracking-[0.17em] text-slate-400"><span>WhatsApp · desde campaña</span><span>11:42</span></div>
      <div className="mt-3 text-[18px] font-semibold leading-[1.2] tracking-[-0.035em] text-[#10192f]">Hola, vi el anuncio. Quiero más información.</div>
      {final ? <div className="absolute -bottom-7 right-1 text-[10px] font-semibold text-[#7650ff]">Seguimiento activo</div> : null}
    </div>
  );
}

function MobileContext({ final = false }) {
  const items = final ? ["Ana · responsable", "Calificado", "Próximo paso · propuesta enviada"] : ["Responsable · Ana", "Etapa · Calificado", "Próximo paso · Enviar propuesta · 15:00"];
  return <div className="mx-auto mt-8 w-full max-w-[350px] space-y-3 pl-4">{items.map((item) => <div key={item} className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.015em] text-slate-600"><span className="h-px w-5 bg-[#7650ff]/55" /><span>{item}</span></div>)}</div>;
}

function MobileSecondary({ children, className }) {
  return <div className={`absolute left-1/2 w-[310px] -translate-x-1/2 rounded-[22px_22px_22px_8px] border border-slate-200 bg-white px-5 py-4 opacity-[0.18] ${className}`}><div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">WhatsApp · desde campaña</div><div className="mt-2 text-[16px] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-500">{children}</div></div>;
}

function MobileFrame({ stage, index, reducedMotion }) {
  const enter = reducedMotion ? false : { opacity: 0, y: 16 };

  return (
    <motion.article initial={enter} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }} className="relative flex min-h-[78svh] flex-col justify-center px-5 py-16">
      <div className="mx-auto w-full max-w-[390px]">
        {index === 0 ? <div className="mb-5 flex items-center justify-center gap-2 text-[12px] font-semibold text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />Campaña activa</div> : null}
        {index === 1 ? <div className="mx-auto mb-7 grid w-full max-w-[350px] grid-cols-2 gap-x-6 gap-y-3 text-[13px] font-medium text-slate-500">{MOBILE_FRICTION_TOP.map((item, itemIndex) => <div key={item} className={itemIndex === 1 ? "text-right" : ""}><span className="mr-1.5 text-slate-400">•</span>{item}{itemIndex === 0 ? <div className="mt-1 text-[9px] font-semibold text-[#a85761]">sin responsable</div> : null}</div>)}</div> : null}

        <div className="relative">
          {index === 4 ? <><MobileSecondary className="top-10 -translate-y-2">Quiero conocer opciones para mi empresa.</MobileSecondary><MobileSecondary className="top-20 translate-y-4">Necesito una propuesta para este mes.</MobileSecondary></> : null}
          <div className="relative z-10"><MobileOpportunity final={index === 4} /></div>
        </div>

        {index === 1 ? <div className="mx-auto mt-7 grid w-full max-w-[350px] grid-cols-2 gap-x-6 gap-y-3 text-[13px] font-medium text-slate-500">{MOBILE_FRICTION_BOTTOM.map((item, itemIndex) => <div key={item} className={itemIndex === 1 ? "text-right" : ""}><span className="mr-1.5 text-slate-400">•</span>{item}</div>)}</div> : null}
        {index === 2 ? <MobileContext /> : null}

        {index === 3 ? <div className="mx-auto mt-8 w-full max-w-[350px]"><MobileContext /><div className="mt-7 space-y-3 pl-4">{AUTOMATION_TASKS.map((task) => <div key={task.label} className="flex items-center gap-2 text-[13px] font-semibold text-[#7650ff]"><span>{task.label}</span><span className="text-[11px]">✓</span></div>)}</div><div className="mt-8 pl-4 text-[12px] font-semibold text-[#7650ff]">Excepción · validar condición comercial</div><div className="ml-auto mt-4 flex w-fit items-center gap-2 pr-2"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7650ff]/25 text-[11px] font-bold text-[#7650ff]">S</div><div className="text-[12px] font-semibold text-slate-600">Sofía · equipo</div></div></div> : null}

        {index === 4 ? <><MobileContext final /><div className="mx-auto mt-10 flex w-full max-w-[350px] flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-500"><span>0 sin responsable</span><span>seguimiento activo</span><span>repetitivo automatizado</span></div></> : null}

        <div className="mt-12"><div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400"><span className="mr-2 text-[#7650ff]">{stage.number}</span>{stage.kicker}</div><h2 className="max-w-[350px] text-[clamp(1.95rem,8vw,2.25rem)] font-semibold leading-[1] tracking-[-0.05em] text-[#0c1730]">{stage.title}</h2></div>
        {index === 4 ? <div className="mt-12 text-[24px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#0c1730]">Más ventas. Más control. Menos trabajo manual.</div> : null}
      </div>
    </motion.article>
  );
}

function MobileStory({ reducedMotion }) {
  return <div className="bg-[#fdfdfc] md:hidden">{STAGES.map((stage, index) => <MobileFrame key={stage.number} stage={stage} index={index} reducedMotion={reducedMotion} />)}</div>;
}

export default function OperationStory() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="operation-story" ref={sectionRef} className={`relative bg-[#fdfdfc] ${reducedMotion ? "md:h-auto" : "md:h-[520vh]"}`}>
      <div className="sr-only">{STAGES.map((stage) => <div key={`sr-${stage.number}`}><h2>{stage.title}</h2></div>)}</div>
      {reducedMotion ? <ReducedDesktopStory /> : <DesktopStory progress={scrollYProgress} />}
      <MobileStory reducedMotion={Boolean(reducedMotion)} />
    </section>
  );
}
