import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  Megaphone,
  MessageCircle,
  UserRound,
  Zap,
} from "lucide-react";

const OPPORTUNITIES = [
  {
    source: "WhatsApp",
    icon: MessageCircle,
    opportunity: "Consulta por 12 unidades",
    owner: "Martina",
    status: "En gestión",
    next: "Responder 10:30",
    chaosY: -22,
    chaosRotate: -1.8,
  },
  {
    source: "Meta Ads",
    icon: Megaphone,
    opportunity: "Lead campaña mayorista",
    owner: "Pablo",
    status: "Calificado",
    next: "Llamar hoy",
    chaosY: 18,
    chaosRotate: 1.5,
  },
  {
    source: "Web",
    icon: Globe2,
    opportunity: "Pedido de demo",
    owner: "Sofía",
    status: "Nuevo",
    next: "Contactar 11:15",
    chaosY: -10,
    chaosRotate: -0.9,
  },
  {
    source: "Formulario",
    icon: FileText,
    opportunity: "Cotización empresa",
    owner: "Martina",
    status: "Seguimiento",
    next: "Enviar propuesta",
    chaosY: 25,
    chaosRotate: 1.2,
  },
  {
    source: "WhatsApp",
    icon: MessageCircle,
    opportunity: "Consulta fuera de horario",
    owner: "Sofía",
    status: "Excepción",
    next: "Revisar 09:00",
    chaosY: -16,
    chaosRotate: -1.3,
  },
];

const NARRATIVE = [
  {
    kicker: "01 · Volumen",
    text: "Entran leads, mensajes y tareas por todos lados.",
  },
  {
    kicker: "02 · Desorden",
    text: "Sin un sistema, aparecen oportunidades sin responsable ni próximo paso.",
  },
  {
    kicker: "03 · NexOps interviene",
    text: "La operación encuentra estado, dueño y seguimiento dentro del mismo circuito.",
  },
  {
    kicker: "04 · Automatización",
    text: "Lo repetitivo sale del trabajo manual y las excepciones llegan a una persona.",
  },
  {
    kicker: "05 · Control",
    text: "La operación queda visible, trazable y lista para decidir.",
  },
];

function NarrativeLine({ progress, item, index, reducedMotion }) {
  const ranges = [
    [0, 0.12, 0.19, 0.28],
    [0.18, 0.29, 0.36, 0.46],
    [0.36, 0.48, 0.57, 0.67],
    [0.57, 0.69, 0.78, 0.88],
    [0.78, 0.9, 1, 1],
  ];
  const [start, peak, hold, end] = ranges[index];
  const opacity = useTransform(
    progress,
    [start, peak, hold, end],
    index === NARRATIVE.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, peak, end], [12, 0, index === 4 ? 0 : -10]);

  if (reducedMotion && index !== NARRATIVE.length - 1) return null;

  return (
    <motion.div
      style={reducedMotion ? undefined : { opacity, y }}
      className="absolute inset-0 flex items-center gap-3 text-sm md:text-[15px]"
    >
      <span className="font-semibold uppercase tracking-[0.18em] text-[#7650ff]">{item.kicker}</span>
      <span className="hidden h-px w-8 bg-slate-300 md:block" />
      <span className="text-slate-600">{item.text}</span>
    </motion.div>
  );
}

function OpportunityRow({ item, progress, reducedMotion }) {
  const Icon = item.icon;
  const y = useTransform(progress, [0, 0.3, 0.54], [item.chaosY, item.chaosY * 0.45, 0]);
  const rotate = useTransform(
    progress,
    [0, 0.32, 0.54],
    [item.chaosRotate, item.chaosRotate * 0.4, 0]
  );
  const unresolvedOpacity = useTransform(progress, [0.24, 0.48], [1, 0]);
  const resolvedOpacity = useTransform(progress, [0.42, 0.6], [0, 1]);
  const rowAccent = useTransform(progress, [0.36, 0.52, 0.72], [0, 1, 0.26]);

  const finalStyle = { y: 0, rotate: 0 };

  return (
    <motion.div
      style={reducedMotion ? finalStyle : { y, rotate }}
      className="relative grid min-h-[70px] grid-cols-[1.35fr_0.82fr_0.82fr_1fr] items-center gap-4 border-b border-slate-200/80 bg-white px-5 last:border-b-0 lg:min-h-[74px] lg:px-6"
    >
      <motion.div
        style={reducedMotion ? { opacity: 0.2 } : { opacity: rowAccent }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#7650ff]"
      />

      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
            <Icon className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              {item.source}
            </div>
            <div className="truncate text-[13px] font-semibold tracking-[-0.015em] text-[#111b31] lg:text-[14px]">
              {item.opportunity}
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-9 text-[12px] lg:text-[13px]">
        <motion.span
          style={reducedMotion ? { opacity: 0 } : { opacity: unresolvedOpacity }}
          className="absolute inset-0 flex items-center font-medium text-[#ad4b58]"
        >
          Sin responsable
        </motion.span>
        <motion.span
          style={reducedMotion ? { opacity: 1 } : { opacity: resolvedOpacity }}
          className="absolute inset-0 flex items-center gap-2 font-semibold text-slate-700"
        >
          <UserRound className="h-3.5 w-3.5 text-[#7650ff]" />
          {item.owner}
        </motion.span>
      </div>

      <div className="relative min-h-9 text-[12px] lg:text-[13px]">
        <motion.span
          style={reducedMotion ? { opacity: 0 } : { opacity: unresolvedOpacity }}
          className="absolute inset-0 flex items-center text-slate-400"
        >
          Sin clasificar
        </motion.span>
        <motion.span
          style={reducedMotion ? { opacity: 1 } : { opacity: resolvedOpacity }}
          className="absolute inset-0 flex items-center font-semibold text-[#46516a]"
        >
          {item.status}
        </motion.span>
      </div>

      <div className="relative min-h-9 text-[12px] lg:text-[13px]">
        <motion.span
          style={reducedMotion ? { opacity: 0 } : { opacity: unresolvedOpacity }}
          className="absolute inset-0 flex items-center gap-2 font-medium text-[#ad4b58]"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Sin seguimiento
        </motion.span>
        <motion.span
          style={reducedMotion ? { opacity: 1 } : { opacity: resolvedOpacity }}
          className="absolute inset-0 flex items-center gap-2 font-semibold text-slate-700"
        >
          <Clock3 className="h-3.5 w-3.5 text-[#7650ff]" />
          {item.next}
        </motion.span>
      </div>
    </motion.div>
  );
}

function DesktopOperation({ progress, reducedMotion }) {
  const headersOpacity = useTransform(progress, [0.38, 0.54], [0, 1]);
  const chaosCountOpacity = useTransform(progress, [0.1, 0.42], [1, 0]);
  const finalCountOpacity = useTransform(progress, [0.68, 0.88], [0, 1]);
  const scanLeft = useTransform(progress, [0.32, 0.58], ["0%", "100%"]);
  const scanOpacity = useTransform(progress, [0.28, 0.36, 0.58, 0.66], [0, 1, 1, 0]);
  const automationOpacity = useTransform(progress, [0.58, 0.72], [0, 1]);
  const automationY = useTransform(progress, [0.58, 0.72], [18, 0]);
  const cleanupOpacity = useTransform(progress, [0.76, 0.92], [0, 1]);

  return (
    <div className="relative hidden overflow-hidden rounded-[34px] border border-slate-200/90 bg-[#f7f8fb] shadow-[0_36px_90px_-64px_rgba(15,23,42,0.34)] md:block">
      <div className="flex min-h-[54px] items-center justify-between border-b border-slate-200/80 bg-white px-5 lg:px-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Operación comercial · Hoy
          </div>
          <div className="mt-1 text-[13px] font-semibold text-[#111b31]">Bandeja de oportunidades</div>
        </div>

        <div className="relative min-w-[230px] text-right text-[11px] font-semibold uppercase tracking-[0.14em]">
          <motion.div
            style={reducedMotion ? { opacity: 0 } : { opacity: chaosCountOpacity }}
            className="absolute inset-0 flex items-center justify-end gap-2 text-[#ad4b58]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ad4b58]" />
            3 sin responsable · 4 sin seguimiento
          </motion.div>
          <motion.div
            style={reducedMotion ? { opacity: 1 } : { opacity: finalCountOpacity }}
            className="flex items-center justify-end gap-2 text-[#5e3fd1]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
            18 activas · 0 sin responsable
          </motion.div>
        </div>
      </div>

      <div className="relative bg-white px-4 pb-4 pt-3 lg:px-5 lg:pb-5">
        <motion.div
          style={reducedMotion ? { opacity: 1 } : { opacity: headersOpacity }}
          className="grid grid-cols-[1.35fr_0.82fr_0.82fr_1fr] gap-4 px-5 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400 lg:px-6"
        >
          <span>Oportunidad</span>
          <span>Responsable</span>
          <span>Estado</span>
          <span>Próximo paso</span>
        </motion.div>

        <div className="relative overflow-hidden rounded-[20px] border border-slate-200/90 bg-white">
          <motion.div
            aria-hidden="true"
            style={
              reducedMotion
                ? { left: "100%", opacity: 0 }
                : { left: scanLeft, opacity: scanOpacity }
            }
            className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-[#7650ff] shadow-[0_0_26px_7px_rgba(118,80,255,0.16)]"
          />

          <motion.div
            style={reducedMotion ? { opacity: 0 } : { opacity: scanOpacity }}
            className="pointer-events-none absolute left-5 top-3 z-20 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7650ff]"
          >
            NexOps ordenando circuito
          </motion.div>

          {OPPORTUNITIES.map((item) => (
            <OpportunityRow
              key={`${item.source}-${item.opportunity}`}
              item={item}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <motion.div
          style={
            reducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: automationOpacity, y: automationY }
          }
          className="mt-4 grid grid-cols-[1.1fr_1fr_1fr] border-t border-slate-200/80 pt-4 text-[11px]"
        >
          <div className="pr-5">
            <div className="flex items-center gap-2 font-semibold text-[#111b31]">
              <Bot className="h-4 w-4 text-[#7650ff]" />
              Trabajo repetitivo absorbido
            </div>
            <div className="mt-1 text-slate-500">Clasificación y recordatorios salen del equipo.</div>
          </div>
          <div className="border-l border-slate-200 px-5">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-[#7650ff]" />
              6 tareas resueltas
            </div>
            <div className="mt-1 text-slate-500">Seguimientos y actualizaciones ejecutadas.</div>
          </div>
          <div className="border-l border-slate-200 pl-5">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Zap className="h-4 w-4 text-[#7650ff]" />
              2 excepciones escaladas
            </div>
            <div className="mt-1 text-slate-500">Sólo lo que requiere criterio humano.</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={reducedMotion ? { opacity: 1 } : { opacity: cleanupOpacity }}
        className="flex items-center justify-between border-t border-slate-200/80 bg-white px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 lg:px-6"
      >
        <span>Estados claros</span>
        <span>Responsables visibles</span>
        <span className="text-[#5e3fd1]">Excepciones bajo control</span>
      </motion.div>
    </div>
  );
}

function MobileSnapshot({ step, reducedMotion }) {
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reducedMotion ? 0 : 0.55, ease: [0.2, 0.72, 0.2, 1] },
  };

  if (step === "chaos") {
    return (
      <motion.div {...reveal} className="border-y border-slate-200 bg-white">
        {OPPORTUNITIES.slice(0, 3).map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.opportunity} className="flex items-center gap-3 border-b border-slate-200/80 px-4 py-4 last:border-b-0">
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{item.source}</div>
                <div className="truncate text-[13px] font-semibold text-[#111b31]">{item.opportunity}</div>
              </div>
              <div className="text-right text-[10px] font-semibold leading-4 text-[#ad4b58]">Sin responsable<br />Sin seguimiento</div>
            </div>
          );
        })}
      </motion.div>
    );
  }

  if (step === "intervention") {
    return (
      <motion.div {...reveal} className="border-y border-[#7650ff]/15 bg-[#7650ff]/[0.035] px-4 py-6">
        <div className="flex items-center gap-3 text-[#5e3fd1]">
          <span className="h-2 w-2 rounded-full bg-[#7650ff]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">NexOps interviene</span>
        </div>
        <p className="mt-3 text-[14px] leading-6 text-slate-600">
          La misma oportunidad recibe estado, responsable y próximo paso. Lo repetitivo se deriva al sistema.
        </p>
      </motion.div>
    );
  }

  if (step === "crm") {
    return (
      <motion.div {...reveal} className="overflow-hidden border-y border-slate-200 bg-white">
        {OPPORTUNITIES.slice(0, 3).map((item) => (
          <div key={item.opportunity} className="border-b border-slate-200/80 px-4 py-4 last:border-b-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{item.source}</div>
                <div className="mt-0.5 text-[13px] font-semibold text-[#111b31]">{item.opportunity}</div>
              </div>
              <div className="text-right text-[10px] font-semibold text-[#5e3fd1]">{item.status}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5 text-[#7650ff]" />{item.owner}</span>
              <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#7650ff]" />{item.next}</span>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div {...reveal} className="border-y border-slate-200 bg-white px-4 py-5">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#111b31]">
        <Bot className="h-4 w-4 text-[#7650ff]" />
        6 tareas repetitivas resueltas automáticamente
      </div>
      <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#111b31]">
        <Zap className="h-4 w-4 text-[#7650ff]" />
        2 excepciones escaladas al equipo
      </div>
      <div className="mt-5 border-t border-slate-200 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5e3fd1]">
        0 oportunidades sin responsable
      </div>
    </motion.div>
  );
}

function MobileStory({ reducedMotion }) {
  return (
    <div className="md:hidden">
      <div className="space-y-24">
        <article>
          <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7650ff]">01 · Entra el ruido</div>
          <h3 className="text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0c1730]">Más volumen, menos visibilidad.</h3>
          <p className="mt-4 text-[15px] leading-7 text-slate-600">Los canales crecen antes que la capacidad de seguimiento del equipo.</p>
          <div className="mt-7"><MobileSnapshot step="chaos" reducedMotion={reducedMotion} /></div>
        </article>

        <article>
          <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7650ff]">02 · Intervención</div>
          <h3 className="text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0c1730]">NexOps ordena el circuito, no agrega otra pantalla.</h3>
          <div className="mt-7"><MobileSnapshot step="intervention" reducedMotion={reducedMotion} /></div>
        </article>

        <article>
          <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7650ff]">03 · CRM</div>
          <h3 className="text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0c1730]">Cada oportunidad encuentra dueño y próximo paso.</h3>
          <div className="mt-7"><MobileSnapshot step="crm" reducedMotion={reducedMotion} /></div>
        </article>

        <article>
          <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7650ff]">04 · Automatización</div>
          <h3 className="text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0c1730]">El equipo trabaja las excepciones. El sistema absorbe el resto.</h3>
          <div className="mt-7"><MobileSnapshot step="automation" reducedMotion={reducedMotion} /></div>
        </article>
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

  return (
    <section
      id="operation-story"
      ref={sectionRef}
      className={`relative bg-white ${reducedMotion ? "md:h-auto" : "md:h-[430vh]"}`}
    >
      <div
        className={`px-5 py-24 md:px-6 lg:px-8 ${
          reducedMotion
            ? "md:relative md:py-28"
            : "md:sticky md:top-[72px] md:flex md:h-[calc(100svh-72px)] md:items-center md:py-6"
        }`}
      >
        <div className="mx-auto w-full max-w-[1450px]">
          <div className="mb-10 max-w-[980px] md:mb-6 lg:mb-8">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7650ff]">De operación dispersa a sistema visible</div>
            <h2 className="text-[clamp(2.65rem,4.5vw,5.25rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-[#0c1730]">
              El control no se explica. Se ve.
            </h2>
            <p className="mt-5 max-w-[800px] text-[16px] leading-7 text-slate-600 md:text-[17px] xl:text-[18px] xl:leading-8">
              Mirá cómo la misma operación pasa de mensajes y oportunidades sueltas a un CRM con responsables, seguimiento y automatización real.
            </p>
          </div>

          <div className="relative mb-5 hidden h-7 md:block">
            {NARRATIVE.map((item, index) => (
              <NarrativeLine
                key={item.kicker}
                progress={scrollYProgress}
                item={item}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <DesktopOperation progress={scrollYProgress} reducedMotion={reducedMotion} />
          <MobileStory reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
