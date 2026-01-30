import { CALENDLY_LINK } from "../config/constants";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/50 backdrop-blur-2xl border border-slate-200 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 overflow-hidden shadow-xl">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Sesión 100% Consultiva</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Agendá una llamada <br /> de 30 minutos.
            </h2>

            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Sin compromisos. Revisamos tu operación actual y te llevas un plan de acción concreto para automatizar tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-600" />
                <span>Auditoría express</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-600" />
                <span>Roadmap inicial</span>
              </div>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="relative w-full max-w-md lg:w-auto shrink-0">
            <div className="relative bg-white border border-slate-100 p-2 rounded-[32px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)]">
              <div className="bg-slate-50 rounded-[24px] p-6 sm:p-8 text-center border border-slate-200/50">
                <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
                  <Calendar size={32} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">¿Empezamos?</h3>
                <p className="text-slate-500 text-sm mb-8">Seleccioná un horario en nuestra agenda.</p>

                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white px-6 py-4 text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ver turnos disponibles
                  <ArrowRight size={16} />
                </a>

                <p className="mt-4 text-[10px] uppercase tracking-widest text-indigo-600 font-bold">
                  Sin costo • 30 Minutos
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
