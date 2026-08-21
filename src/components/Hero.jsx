import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Bot, Megaphone, Target, UserRoundCheck } from "lucide-react";
import { CONTACT_INFO, getWhatsappLink } from "../config/constants";

const flow = [
  { label: "Captación", detail: "Pauta", icon: Megaphone },
  { label: "Oportunidades", detail: "Leads", icon: Target },
  { label: "Orden", detail: "CRM", icon: UserRoundCheck },
  { label: "Ejecución", detail: "Agente IA", icon: Bot },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const whatsappHref = getWhatsappLink(
    CONTACT_INFO.WHATSAPP_NUMBER,
    CONTACT_INFO.WHATSAPP_MESSAGE_HERO,
  );

  return (
    <section className="relative overflow-hidden bg-[#fbfbfe] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.055) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-violet-700 shadow-sm">
            Tecnología traducida al negocio
          </div>

          <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-slate-950">
            Más ventas.
            <br />
            Más control.
            <br />
            <span className="text-violet-600">Menos trabajo manual.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Combinamos pauta, CRM y agentes de IA para ordenar y hacer crecer operaciones reales.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#11133f] px-7 py-4 text-base font-bold text-white shadow-[0_22px_48px_-24px_rgba(17,19,63,.75)] transition-transform hover:-translate-y-0.5"
            >
              Hablá con Nexi
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#espejo-operativo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-800 transition-colors hover:border-violet-300 hover:text-violet-700"
            >
              Ver qué resolvemos
              <ArrowDownRight size={18} />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <span>Captación</span>
            <span className="text-slate-300">/</span>
            <span>CRM</span>
            <span className="text-slate-300">/</span>
            <span>Agentes IA</span>
            <span className="text-slate-300">/</span>
            <span>Apps + Data</span>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-violet-300/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_36px_90px_-46px_rgba(30,41,59,.45)] sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600">Operación conectada</p>
                <p className="mt-1 text-lg font-bold tracking-[-0.02em] text-slate-900">De oportunidad a resultado</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                En movimiento
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.42 }}
                    className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-slate-100">
                      <Icon size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs font-medium text-slate-500">{item.detail}</p>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 ring-1 ring-slate-100">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#11133f] p-4 text-white sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-200">Resultado visible</p>
                <p className="mt-2 text-xl font-bold tracking-[-0.03em]">Más oportunidades seguidas. Menos cosas libradas a memoria.</p>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-600">Nexi</p>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-800">Tecnología que trabaja sin esconder lo que está pasando.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
