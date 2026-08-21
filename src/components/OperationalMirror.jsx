import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Database,
  EyeOff,
  Megaphone,
  MessageSquareMore,
  Repeat2,
  Target,
  Unplug,
  UsersRound,
} from "lucide-react";
import { CONTACT_INFO, getWhatsappLink } from "../config/constants";

const problems = [
  {
    id: "ventas",
    label: "No estamos vendiendo suficiente",
    icon: Megaphone,
    before: ["Campañas aisladas", "Leads sin contexto", "Poca trazabilidad"],
    after: ["Captación", "CRM", "Seguimiento"],
    result: "Más oportunidades trabajadas con un circuito comercial visible.",
  },
  {
    id: "leads",
    label: "Entran leads pero se pierden",
    icon: Target,
    before: ["WhatsApp", "Planillas", "Memoria del vendedor"],
    after: ["Ingreso centralizado", "Responsable", "Seguimiento automático"],
    result: "Más trazabilidad. Menos oportunidades olvidadas.",
  },
  {
    id: "equipo",
    label: "No sé qué está haciendo mi equipo",
    icon: EyeOff,
    before: ["Conversaciones dispersas", "Estados distintos", "Sin visión del dueño"],
    after: ["Pipeline", "Actividad", "Indicadores"],
    result: "El dueño recupera visibilidad sin perseguir actualizaciones.",
  },
  {
    id: "mensajes",
    label: "Tenemos demasiados mensajes",
    icon: MessageSquareMore,
    before: ["Consultas repetidas", "Equipo saturado", "Respuestas tardías"],
    after: ["Agente clasifica", "Resuelve repetitivo", "Deriva excepciones"],
    result: "El sistema absorbe lo repetitivo. El equipo atiende lo importante.",
  },
  {
    id: "manual",
    label: "Mi equipo pierde tiempo en tareas repetitivas",
    icon: Repeat2,
    before: ["Copiar", "Controlar", "Actualizar"],
    after: ["Reglas", "Automatización", "Alertas"],
    result: "Menos carga operativa y menos puntos de error manual.",
  },
  {
    id: "sistemas",
    label: "Tengo sistemas o datos desconectados",
    icon: Unplug,
    before: ["Herramientas aisladas", "Datos duplicados", "Reportes lentos"],
    after: ["Integraciones", "Datos conectados", "Indicadores"],
    result: "Una operación más conectada y decisiones con mejor información.",
  },
];

const beforeIcons = [UsersRound, Database, BarChart3];
const afterIcons = [Target, Bot, BarChart3];

function FlowColumn({ title, items, variant }) {
  return (
    <div className={`rounded-[1.5rem] border p-4 sm:p-5 ${variant === "after" ? "border-violet-200 bg-violet-50/70" : "border-slate-200 bg-white"}`}>
      <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${variant === "after" ? "text-violet-700" : "text-slate-400"}`}>
        {title}
      </p>
      <div className="mt-4 space-y-2.5">
        {items.map((item, index) => {
          const Icon = variant === "after" ? afterIcons[index % afterIcons.length] : beforeIcons[index % beforeIcons.length];
          return (
            <div key={item} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-100">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${variant === "after" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"}`}>
                <Icon size={15} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OperationalMirror() {
  const [activeId, setActiveId] = useState("leads");
  const reduceMotion = useReducedMotion();
  const active = useMemo(() => problems.find((problem) => problem.id === activeId) || problems[0], [activeId]);
  const whatsappHref = getWhatsappLink(
    CONTACT_INFO.WHATSAPP_NUMBER,
    `Hola Nexi. Este problema me pasa: ${active.label}. Quiero hablar con NexOps.`,
  );

  return (
    <section id="espejo-operativo" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-700">Empezá por tu problema</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
              ¿Qué te está frenando hoy?
            </h2>
            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-500 sm:text-lg">
              No necesitás saber qué tecnología pedir. Elegí el problema que más se parece a tu operación.
            </p>

            <div className="mt-8 grid gap-2.5">
              {problems.map((problem) => {
                const Icon = problem.icon;
                const isActive = problem.id === activeId;
                return (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => setActiveId(problem.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                      isActive
                        ? "border-violet-300 bg-violet-50 text-slate-950 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isActive ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                      <Icon size={17} />
                    </div>
                    <span className="text-sm font-bold sm:text-[15px]">{problem.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:pt-2">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfbfe] p-4 shadow-[0_30px_80px_-50px_rgba(30,41,59,.4)] sm:p-6 lg:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Espejo operativo</p>
                  <p className="mt-1 text-lg font-bold tracking-[-0.02em] text-slate-900">Así cambia el circuito</p>
                </div>
                <div className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-[11px] font-bold text-violet-700">NexOps interviene</div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
                    <FlowColumn title="Hoy" items={active.before} variant="before" />
                    <div className="flex items-center justify-center py-1 text-violet-600 md:px-1 md:py-0">
                      <ArrowRight className="hidden md:block" size={22} />
                      <ArrowRight className="rotate-90 md:hidden" size={22} />
                    </div>
                    <FlowColumn title="Con NexOps" items={active.after} variant="after" />
                  </div>

                  <div className="mt-5 rounded-[1.5rem] bg-[#11133f] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-200">Resultado</p>
                      <p className="mt-2 max-w-2xl text-lg font-bold leading-6 tracking-[-0.02em] sm:text-xl">{active.result}</p>
                    </div>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#11133f] sm:mt-0"
                    >
                      Esto me pasa
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
