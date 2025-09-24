// src/components/HowWeWork.jsx
import { Search, PenTool, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6 text-violet-600" />,
    n: "01",
    t: "Descubrimiento",
    d: "Relevamos procesos, sistemas y datos actuales.",
    e: "Entregable: diagnóstico + mapa de oportunidades",
  },
  {
    icon: <PenTool className="w-6 h-6 text-violet-600" />,
    n: "02",
    t: "Diseño",
    d: "Definimos la arquitectura y priorizamos backlog de alto impacto.",
    e: "Entregable: blueprint técnico + roadmap",
  },
  {
    icon: <Cpu className="w-6 h-6 text-violet-600" />,
    n: "03",
    t: "Implementación",
    d: "Ponemos en marcha agentes, automatizaciones e integraciones.",
    e: "Entregable: casos de uso en producción",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-violet-600" />,
    n: "04",
    t: "Medición",
    d: "Monitoreamos KPIs y optimizamos para asegurar ROI y escalabilidad.",
    e: "Entregable: tablero de métricas + playbook",
  },
];

export default function HowWeWork() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Cómo trabajamos
        </h2>
        <p className="mt-4 text-center text-slate-600">
          Sprints cortos, entregables reales y foco en ROI.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.t}</h3>
              <p className="mt-1 text-slate-600">{s.d}</p>
              <p className="mt-3 text-sm text-slate-500">{s.e}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
