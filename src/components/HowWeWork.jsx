import React from "react";
import { Search, PenTool, Cpu, BarChart3, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: <Search />,
    n: "01",
    t: "Auditoría de Fricción",
    d: "Identificamos las tareas manuales y cuellos de botella que hoy frenan tu capacidad de venta.",
    e: "Mapa de Tareas Automatizables",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <PenTool />,
    n: "02",
    t: "Diseño de Solución",
    d: "Diseñamos el flujo óptimo y definimos cómo la tecnología se integra a tu operación actual.",
    e: "Blueprint de Automatización",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Cpu />,
    n: "03",
    t: "Implementación Ágil",
    d: "Construimos e integramos la solución con foco en impacto rápido y adopción simple por el equipo.",
    e: "Automatización Operativa",
    color: "from-cyan-500 to-emerald-500",
  },
  {
    icon: <BarChart3 />,
    n: "04",
    t: "Medición y Optimización",
    d: "Medimos resultados, detectamos nuevas oportunidades y mejoramos el circuito de forma continua.",
    e: "Métricas + Próximas Mejoras",
    color: "from-emerald-500 to-indigo-500",
  },
];

export default function HowWeWork() {
  return (
    <section id="como-trabajamos" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Cómo trabajamos
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            De la fricción operativa a una solución que funciona
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
            Un proceso simple para detectar impacto, construir rápido y dejar una operación más ordenada, medible y escalable.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article key={step.n} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${step.color}`} />
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-indigo-200 [&_svg]:h-5 [&_svg]:w-5">
                  {step.icon}
                </div>
                <span className="text-sm font-semibold text-slate-500">{step.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.t}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.d}</p>
              <div className="mt-5 flex items-start gap-2 rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-3 text-xs font-medium text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{step.e}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
