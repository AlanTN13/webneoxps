import React from "react";
import { Search, PenTool, Cpu, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Search />,
    n: "01",
    t: "Auditoría de Fricción",
    d: "Identificamos las tareas manuales y cuellos de botella que hoy frenan tu capacidad de venta.",
    e: "Mapa de Tareas Automatizables",
    color: "from-indigo-500 to-blue-500",
    nexi: "/assets/nexis/nexiops.png"
  },
  {
    icon: <PenTool />,
    n: "02",
    t: "Plan de Libertad",
    d: "Diseñamos el flujo de trabajo ideal para liberar a tu equipo y que se enfoquen solo en cerrar negocios.",
    e: "Roadmap de Optimización Comercial",
    color: "from-blue-500 to-violet-500",
    nexi: "/assets/nexis/nexiauto.png"
  },
  {
    icon: <Cpu />,
    n: "03",
    t: "Activación Digital",
    d: "Activamos tus agentes y automatizaciones críticas para que el sistema trabaje por vos 24/7.",
    e: "Ecosistema en Producción",
    color: "from-violet-500 to-fuchsia-600",
    nexi: "/assets/nexis/nexicap.png"
  },
  {
    icon: <BarChart3 />,
    n: "04",
    t: "Escala & Resultados",
    d: "Medimos el tiempo liberado y el impacto en ingresos para escalar lo que más factura.",
    e: "Reporte de Impacto y ROI",
    color: "from-fuchsia-600 to-indigo-600",
    nexi: "/assets/nexis/nexisales.png"
  },
];

export default function HowWeWork() {
  return (
    <section id="proceso" className="relative py-20 lg:py-56 bg-gradient-to-br from-[#0f0c29] via-[#110e35] to-[#0f0c29] overflow-hidden scroll-mt-20">

      {/* Organic Fluid Divider (The Wave) - Centered and Overflowed */}
      <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-[105%] overflow-hidden leading-[0] pointer-events-none z-30">
        {/* Desktop Complex Wave */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#F4F7FF" className="relative hidden lg:block w-full h-[120px]">
          <path d="M0,0 H1200 V60 C1000,10 800,110 600,60 C400,10 200,110 0,60 Z" />
        </svg>
      </div>

      <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[102%] overflow-hidden leading-[0] pointer-events-none">

        {/* Desktop Complex Wave */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white" className="relative hidden lg:block w-full h-[122px] rotate-180">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V94.37A600.21,600.21,0,0,1,985.66,92.83Z" />
        </svg>
      </div>

      {/* Refined Ambient Glows */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 60, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header Section */}
        <div className="max-w-3xl mb-20 text-left lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Nuestro Método</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            Cómo impulsamos tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-200 to-indigo-300">Transformación</span>
          </motion.h2>
          <p className="mt-6 text-xl text-indigo-100/70 font-medium leading-relaxed">Sprints cortos, resultados medibles y foco total en retorno de inversión.</p>
        </div>

        {/* Steps Grid - Inverted Contrast */}
        <div className="relative mt-16">
          {/* Vertical Line for Mobile - Lighter on Dark */}
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-white/5 lg:hidden" />

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, idx) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative"
              >
                {/* Step Connector - Subtle Node */}
                <div className="absolute left-[20px] top-6 w-6 h-6 rounded-full bg-[#2d1b69] border-4 border-white/10 lg:hidden z-20" />

                <div className="relative flex flex-col h-full bg-white/[0.03] backdrop-blur-xl p-8 rounded-[40px] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">

                  <div className="pl-14 lg:pl-0 flex flex-col h-full">
                    {/* Big Number Label - Dark Mode Subtle */}
                    <div className="absolute top-0 right-0 text-[100px] font-black text-white/5 select-none group-hover:text-white/[0.08] transition-all leading-none lg:block hidden">
                      {s.n}
                    </div>

                    {/* Nexi Mascot - Floating Pop */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 1 }}
                      className="absolute -top-12 -right-4 w-28 h-28 pointer-events-none z-20"
                    >
                      <img
                        src={s.nexi}
                        alt={`Nexi Step ${s.n}`}
                        className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      />
                    </motion.div>

                    <div className={`flex items-center justify-center w-14 h-14 rounded-[22px] bg-gradient-to-br ${s.color} text-white mb-6 shadow-[0_10px_30px_-5px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(s.icon, { size: 24, strokeWidth: 2.5 })}
                    </div>

                    <div className="flex-1">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-2 block">PASO {s.n}</span>
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-indigo-300 transition-colors">
                        {s.t}
                      </h3>
                      <p className="text-indigo-100/60 font-medium leading-relaxed mb-6">
                        {s.d}
                      </p>
                    </div>

                    {/* Deliverable Badge - Modernized for Dark Mode */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-white/[0.08] group-hover:border-indigo-500/30 transition-colors mt-auto min-h-[72px]">
                      <CheckCircle2 size={18} className="text-indigo-400 shrink-0" />
                      <span className="text-[11px] font-bold text-indigo-50 group-hover:text-white leading-tight">
                        <span className="text-indigo-300/40 block uppercase tracking-tighter mb-1">Entregable:</span>
                        {s.e}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Highlight - Unified Dark */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1e1a4f] bg-indigo-500/20" />
              ))}
            </div>
            <p className="text-sm text-indigo-200/50 font-medium">
              <span className="text-white font-bold">+150 empresas</span> ya operan con NexOpsCore.
            </p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500/30">Consistencia • Transparencia • Velocidad</p>
        </div>
      </div>
    </section>
  );
}
