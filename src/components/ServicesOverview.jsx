"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Megaphone,
  Settings,
  ArrowRight,
  TrendingUp,
  Workflow,
  Target,
  BarChart3,
  Magnet,
  Globe,
  PieChart,
  Package,
  GitPullRequest,
  Clock,
  MessageSquare,
  Bot,
  Link,
  RefreshCw,
  Zap,
  CheckCircle2,
  Receipt
} from "lucide-react";

import { CONTACT_INFO, getWhatsappLink } from "../config/constants";

const servicesData = [
  {
    id: "marketing",
    title: "Captación & Mkt",
    icon: <Megaphone />,
    color: "from-[#818CF8] to-[#4F46E5]",
    gradId: "grad-marketing",
    gradColors: ["#C7D2FE", "#818CF8"], // More vibrant starting point
    textColor: "text-indigo-600",
    objective: "Atraer clientes potenciales y vincularlos al proceso comercial.",
    description: "Implementamos un sistema de captación donde los clientes potenciales ingresan directamente al CRM, listos para ser trabajados por el equipo comercial.",
    highlightIcon: <Link className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Integración directa",
    highlightText: "Todo lo que se capta queda disponible en Ventas & CRM sin carga manual.",
    features: [
      { label: "Tráfico", icon: <Globe />, x: -5, y: 10 },
      { label: "Conversión", icon: <Magnet />, x: -8, y: 35 },
      { label: "Métricas", icon: <PieChart />, x: 25, y: -5 },
    ],
    nexiImage: "/assets/nexis/nexicap.png",
    nexiCopy: "El Nexi que convierte contactos en oportunidades reales.",
    incluye: [
      "Campañas en Meta o Google configuradas",
      "Sitio o landing conectados al sistema",
      "Formularios y eventos de conversión",
      "Segmentación operativa de leads",
    ],
    entregables: [
      "Canal de adquisición operativo",
      "Métricas de conversión configuradas",
    ],
    number: "1",
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Captación & Mkt",
  },
  {
    id: "ventas",
    title: "Ventas & CRM",
    icon: <ShoppingCart />,
    color: "from-[#4F46E5] to-[#3730A3]",
    gradId: "grad-ventas",
    gradColors: ["#818CF8", "#4F46E5"], // Solid professional indigo
    textColor: "text-indigo-700",
    objective: "Centralizar clientes y oportunidades en un solo sistema.",
    description: "Unificamos clientes potenciales, oportunidades y tareas para que el equipo comercial trabaje con orden, seguimiento y trazabilidad real.",
    highlightIcon: <Settings className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Base del sistema",
    highlightText: "Todo lo que sucede en NexOpsCore parte del CRM.",
    features: [
      { label: "Oportunidades", icon: <Target />, x: 101, y: 12 },
      { label: "Reportes", icon: <BarChart3 />, x: 103, y: 40 },
      { label: "Seguimiento", icon: <Settings />, x: 72, y: 2 },
    ],
    nexiImage: "/assets/nexis/nexisales.png",
    nexiCopy: "El Nexi que pone orden y visibilidad en las ventas.",
    incluye: [
      "Pipeline de ventas con etapas definidas",
      "Leads centralizados (web / WA / email)",
      "Recordatorios y tareas para el equipo",
      "Métricas comerciales en tiempo real",
    ],
    entregables: [
      "CRM configurado a medida",
      "Guía de uso para ventas",
    ],
    number: "2",
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Ventas & CRM",
  },
  {
    id: "automatizacion",
    title: "Automatización",
    icon: <Settings />,
    color: "from-[#6366F1] to-[#4338CA]",
    gradId: "grad-automatizacion",
    gradColors: ["#7C3AED", "#A78BFA"],
    textColor: "text-white",
    objective: "Reducir fricción entre áreas y eliminar tareas manuales.",
    description: "Automatizamos los puntos de conexión entre captación, ventas y operación para que el sistema funcione de punta a punta, con menos intervención manual.",
    highlightIcon: <Zap className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Capa de integración",
    highlightText: "La automatización conecta los módulos y mantiene la información alineada.",
    features: [
      { label: "Flujos", icon: <Workflow />, x: -5, y: 90 },
      { label: "Bots", icon: <Bot />, x: -8, y: 65 },
      { label: "Mensajes", icon: <MessageSquare />, x: 25, y: 105 },
    ],
    nexiImage: "/assets/nexis/nexiauto.png",
    nexiCopy: "El cerebro que conecta y coordina a todos los Nexi.",
    incluye: [
      "Seguimientos automáticos integrados",
      "Notificaciones internas y alertas",
      "Asignación automática de responsables",
      "Flujos operativos con validaciones",
    ],
    entregables: [
      "Automatizaciones críticas activas",
      "Documentación técnica de flujos",
    ],
    number: "3",
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Automatización",
  },
  {
    id: "operacion",
    title: "Operación",
    icon: <TrendingUp />,
    color: "from-[#4F46E5] to-[#312e81]",
    gradId: "grad-operacion",
    gradColors: ["#504BB7", "#7671D6"],
    textColor: "text-indigo-900",
    objective: "Ejecutar lo vendido con control y seguimiento.",
    description: "Conectamos la venta con la operación para que presupuestos, estados y ejecución se mantengan sincronizados entre áreas.",
    highlightIcon: <RefreshCw className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Integración operativa",
    highlightText: "Los cambios en la operación impactan en el estado comercial.",
    features: [
      { label: "Procesos", icon: <GitPullRequest />, x: 101, y: 88 },
      { label: "Facturación", icon: <Receipt />, x: 103, y: 60 },
      { label: "Stock", icon: <Package />, x: 72, y: 98 },
    ],
    nexiImage: "/assets/nexis/nexiops.png",
    nexiCopy: "El Nexi que se asegura de que todo lo vendido se cumpla.",
    incluye: [
      "Estados operativos automatizados",
      "Registro de ejecución y avance",
      "Seguimiento de postventa",
      "Visibilidad total de pendientes",
    ],
    entregables: [
      "Modelo de estados según negocio",
      "Tablero de control operativo",
    ],
    number: "4",
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Operación",
  },
];

const SEGMENTS = {
  marketing: "M 200 200 L 20 200 A 180 180 0 0 1 200 20 Z",
  ventas: "M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z",
  automatizacion: "M 200 200 L 200 380 A 180 180 0 0 1 20 200 Z",
  operacion: "M 200 200 L 380 200 A 180 180 0 0 1 200 380 Z",
};

export default function ServicesOverview() {
  const [activeTab, setActiveTab] = useState("marketing");
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasPlayedIntro(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeService = useMemo(
    () => servicesData.find((s) => s.id === activeTab),
    [activeTab]
  );

  return (
    <section id="servicios" className="relative z-20 -mt-[30px] lg:-mt-[120px] pt-[60px] lg:pt-[240px] pb-8 lg:pb-16 overflow-hidden will-change-contents scroll-mt-20">

      {/* Main Background - Starts after top wave */}
      <div className="absolute inset-x-0 bottom-0 top-[28px] lg:top-[118px] bg-gradient-to-br from-[#0f0c29] via-[#110e35] to-[#0f0c29] -z-10" />

      {/* Wave Transition - Top (Dark overlaying Hero) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-30 pointer-events-none">
        {/* Mobile Simple Curve */}
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="relative block lg:hidden w-full h-[30px]" fill="#0f0c29">
          <path d="M0,30 Q600,90 1200,30 V60 H0 Z" />
        </svg>
        {/* Desktop Complex Wave */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative hidden lg:block w-full h-[120px] rotate-180" fill="#0f0c29">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V94.37A600.21,600.21,0,0,1,985.66,92.83Z" />
        </svg>
      </div>

      {/* Wave Transition - Bottom (White matching CTA) */}
      <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[105%] overflow-hidden leading-[0] pointer-events-none z-30">
        {/* Mobile Simple Curve */}
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="relative block lg:hidden w-full h-[30px]" fill="#F4F7FF">
          <path d="M0,0 Q600,60 1200,0 V60 H0 Z" transform="rotate(180 600 30)" />
        </svg>
        {/* Desktop Complex Wave */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#F4F7FF" className="relative hidden lg:block w-full h-[125px] rotate-180">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V94.37A600.21,600.21,0,0,1,985.66,92.83Z" />
        </svg>
      </div>

      {/* Dynamic Ambient Glows */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-indigo-500/20 blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1.3, 1, 1.3] }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-0 w-[700px] h-[700px] bg-fuchsia-500/15 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Header - Optimized for Dark Transition & Nexi Presence */}
        <div className="text-center mb-12 max-w-4xl mx-auto relative -mt-6">



          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#C4B5FD] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Arquitectura NexOps</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Impacto <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-200 to-indigo-300 italic">Modular</span>
          </h2>
          <p className="mt-6 text-indigo-100/60 font-medium text-lg lg:text-xl max-w-2xl mx-auto">El sistema operativo que escala tu negocio sin fricción.</p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-center">

          {/* MOBILE ONLY: Premium Selector Grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
            {servicesData.map((s) => {
              const isActive = activeTab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`
                    relative group overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300
                    ${isActive
                      ? `bg-gradient-to-br ${s.color} shadow-lg shadow-indigo-500/25 scale-[1.02]`
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                    }
                  `}
                >
                  {/* Subtle active glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white/10 opacity-50 blur-xl" />
                  )}

                  <div className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-white/20 text-white shadow-inner' : 'bg-white/5 text-slate-400 group-hover:text-indigo-300 group-hover:bg-white/10'}
                  `}>
                    {React.cloneElement(s.icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
                  </div>

                  <span className={`
                    relative text-xs font-bold uppercase tracking-widest text-center transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-200'}
                  `}>
                    {s.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Left: Tactical Interactive Wheel (DESKTOP ONLY) */}
          <div className="hidden lg:flex relative justify-center items-center select-none">

            {/* Nexi Agent - Positioned Left of Wheel */}
            <div className="absolute -top-24 lg:-top-32 -left-6 lg:-left-16 w-32 h-32 lg:w-44 lg:h-44 z-20 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`nexi-wheel-${activeTab}`}
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 14 }}
                  className="relative"
                >
                  <motion.img
                    src={activeService.nexiImage}
                    alt="Nexi Agent"
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(99,102,241,0.4)]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px]">

              {/* Wheel SVG with Dark Background optimization */}
              <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                <defs>
                  {servicesData.map((s) => (
                    <linearGradient key={s.id} id={`grad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={s.gradColors[0]} />
                      <stop offset="100%" stopColor={s.gradColors[1]} />
                    </linearGradient>
                  ))}
                </defs>

                <g className="cursor-pointer">
                  {servicesData.map((s) => {
                    const isActive = activeTab === s.id;
                    return (
                      <motion.path
                        key={s.id}
                        d={SEGMENTS[s.id]}
                        fill={`url(#grad-${s.id})`}
                        stroke="#0f0c29"
                        strokeWidth="3"
                        onClick={() => setActiveTab(s.id)}
                        animate={{
                          filter: isActive ? 'brightness(1.2) saturate(1.2)' : 'brightness(0.6) saturate(0.9)',
                          opacity: isActive ? 1 : 0.5,
                          scale: isActive ? 1.03 : 0.98,
                        }}
                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                      />
                    );
                  })}
                </g>

                {/* Category Labels inside Wheel */}
                <g className="pointer-events-none">
                  {servicesData.map((s, idx) => {
                    const isActive = activeTab === s.id;
                    const coords = [
                      { cx: 65, cy: 115, tx: 85, ty: 120, anchor: "start" }, // 1
                      { cx: 235, cy: 115, tx: 255, ty: 120, anchor: "start" }, // 2
                      { cx: 65, cy: 285, tx: 85, ty: 290, anchor: "start" }, // 3
                      { cx: 235, cy: 285, tx: 255, ty: 290, anchor: "start" }, // 4
                    ][idx];

                    return (
                      <motion.g
                        key={`label-${s.id}`}
                        animate={{
                          opacity: isActive ? 1 : 0.3,
                          scale: isActive ? 1.05 : 0.95,
                        }}
                      >
                        <circle cx={coords.cx} cy={coords.cy} r="16" fill="white" className="shadow-lg" />
                        <g className="text-indigo-600">
                          {React.cloneElement(s.icon, {
                            x: coords.cx - 8,
                            y: coords.cy - 8,
                            size: 16,
                            strokeWidth: 2.5
                          })}
                        </g>
                        <text
                          x={coords.tx}
                          y={coords.ty}
                          textAnchor={coords.anchor}
                          className="fill-white font-black text-[12px] tracking-tight"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                        >
                          {s.number}. {s.title}
                        </text>
                      </motion.g>
                    )
                  })}
                </g>
              </svg>

              {/* Floating Features (Nodes) */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div key={`features-${activeTab}`} className="absolute inset-0">
                    {activeService.features.map((feat, idx) => (
                      <motion.div
                        key={`${activeTab}-feat-${idx}`}
                        initial={{ scale: 0, opacity: 0, left: "50%", top: "50%" }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          left: `${feat.x}%`,
                          top: `${feat.y}%`,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: idx * 0.15
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                      >
                        <motion.div
                          animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                          transition={{
                            duration: 4 + idx,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center gap-1 min-w-[95px] hover:bg-white/20 transition-all cursor-default"
                        >
                          <div className="text-indigo-300">
                            {React.cloneElement(feat.icon, { size: 20, strokeWidth: 2.5 })}
                          </div>
                          <span className="text-[9px] font-black text-white uppercase tracking-wider">
                            {feat.label}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Hub */}
              <div className="absolute inset-0 m-auto w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] z-[40] bg-white rounded-full flex flex-col items-center justify-center p-4 shadow-[0_0_60px_rgba(99,102,241,0.3)] border border-indigo-100">
                <div className="text-center group cursor-default">
                  <span className="text-xl sm:text-[22px] font-black text-slate-800 tracking-tighter block">
                    NexOps<span className="text-indigo-600">Core</span>
                  </span>
                  <div className="h-[2px] w-6 mx-auto bg-gradient-to-r from-transparent via-indigo-600 to-transparent my-2" />
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] leading-tight block">
                    Sistema Operativo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Card - Enhanced Glassmorphism */}
          <div className="relative min-h-[440px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative bg-white/[0.07] backdrop-blur-3xl rounded-[40px] p-6 lg:p-8 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
              >
                {/* Visual Number background */}
                <div className="absolute top-6 right-8 text-[100px] font-black text-white/[0.05] leading-none select-none">
                  0{activeService.number}
                </div>

                <div className="relative z-10">

                  {/* Module Pill */}
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-br ${activeService.color} text-white mb-6 shadow-lg shadow-indigo-500/20`}>
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                      {React.cloneElement(activeService.icon, { size: 18, strokeWidth: 2.5 })}
                    </div>
                    <span className="font-extrabold text-base tracking-tight uppercase">{activeService.title}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 !leading-[1.1] tracking-tight">
                    {activeService.objective}
                  </h3>

                  <p className="text-lg text-indigo-50 font-medium leading-relaxed mb-8 max-w-lg opacity-90">
                    {activeService.description}
                  </p>

                  {/* Features Highlight Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {activeService.incluye.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.05] rounded-[20px] border border-white/5 hover:bg-white/[0.08] transition-all group">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                          <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                        <span className="text-indigo-50 font-bold text-xs sm:text-sm leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Call */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <a
                      href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, activeService.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-[#5E51D5] text-white font-black text-base shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] hover:bg-[#4D42B5] transition-all hover:scale-105"
                    >
                      Consúltanos ahora
                      <ArrowRight size={18} />
                    </a>
                    <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/20">Implementación Pro</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}