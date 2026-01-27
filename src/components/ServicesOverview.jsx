"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Megaphone,
  Settings,
  CheckCircle2,
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
  Zap
} from "lucide-react";

import { CONTACT_INFO } from "../config/constants";

const servicesData = [
  {
    id: "marketing",
    title: "Captación & Mkt",
    icon: <Megaphone />,
    color: "from-violet-500 to-violet-600",
    gradId: "grad-marketing",
    gradColors: ["#a78bfa", "#7c3aed"],
    bgColor: "bg-violet-600",
    textColor: "text-violet-600",
    objective: "Atraer clientes potenciales y vincularlos al proceso comercial.",
    description: "Implementamos un sistema de captación donde los clientes potenciales ingresan directamente al CRM, listos para ser trabajados por el equipo comercial.",
    highlightIcon: <Link className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Integración directa",
    highlightText: "Todo lo que se capta queda disponible en Ventas & CRM sin carga manual.",
    features: [
      { label: "Tráfico", icon: Globe, x: 25, y: 15 },
      { label: "Conversión", icon: Magnet, x: 10, y: 35 },
      { label: "Métricas", icon: PieChart, x: 15, y: 60 },
    ],
    incluye: [
      "Campañas en Meta o Google configuradas",
      "Sitio o landing conectados al sistema",
      "Formularios y eventos de conversión",
      "Segmentación operativa de clientes potenciales",
    ],
    entregables: [
      "Canal de adquisición en funcionamiento",
      "Métricas de conversión configuradas",
    ],
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Captación & Mkt",
  },
  {
    id: "ventas",
    title: "Ventas & CRM",
    icon: <ShoppingCart />,
    color: "from-indigo-500 to-indigo-600",
    gradId: "grad-ventas",
    gradColors: ["#818cf8", "#4f46e5"],
    bgColor: "bg-indigo-600",
    textColor: "text-indigo-600",
    objective: "Centralizar clientes y oportunidades en un solo sistema.",
    description: "Unificamos clientes potenciales, oportunidades y tareas para que el equipo comercial trabaje con orden, seguimiento y trazabilidad real.",
    highlightIcon: <Settings className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Base del sistema",
    highlightText: "Todo lo que sucede en NexOpsCore parte del CRM.",
    features: [
      { label: "Oportunidades", icon: Target, x: 35, y: 15 },
      { label: "Reportes", icon: BarChart3, x: 70, y: 30 },
      { label: "Seguimiento", icon: Settings, x: 15, y: 45 },
    ],
    incluye: [
      "Pipeline de ventas con etapas definidas",
      "Clientes potenciales integrados desde distintos canales",
      "Tareas y recordatorios de seguimiento",
      "Métricas comerciales para control y mejora",
    ],
    entregables: [
      "CRM configurado según el proceso comercial",
      "Guía de uso para el equipo de ventas",
    ],
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Ventas & CRM",
  },
  {
    id: "operacion",
    title: "Operación & Postventa",
    icon: <TrendingUp />,
    color: "from-indigo-600 to-violet-700",
    gradId: "grad-operacion",
    gradColors: ["#6366f1", "#6d28d9"],
    bgColor: "bg-indigo-700",
    textColor: "text-indigo-700",
    objective: "Ejecutar lo vendido con control y seguimiento.",
    description: "Conectamos la venta con la operación para que presupuestos, estados y ejecución se mantengan sincronizados entre áreas.",
    highlightIcon: <RefreshCw className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Integración operativa",
    highlightText: "Los cambios en la operación impactan en el estado comercial.",
    features: [
      { label: "Procesos", icon: GitPullRequest, x: 25, y: 70 },
      { label: "Tiempos", icon: Clock, x: 60, y: 85 },
      { label: "Cumplimiento", icon: Package, x: 0, y: 45 },
    ],
    incluye: [
      "Estados operativos definidos según el negocio",
      "Registro de ejecución y avance",
      "Seguimiento de postventa",
      "Visibilidad de pendientes y bloqueos",
    ],
    entregables: [
      "Modelo de estados operativos",
      "Tablero de seguimiento",
    ],
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Operación & Postventa",
  },
  {
    id: "automatizacion",
    title: "Automatización",
    icon: <Settings />,
    color: "from-violet-600 to-indigo-800",
    gradId: "grad-automatizacion",
    gradColors: ["#7c3aed", "#3730a3"],
    bgColor: "bg-violet-700",
    textColor: "text-violet-700",
    objective: "Reducir fricción entre áreas y eliminar tareas manuales.",
    description: "Automatizamos los puntos de conexión entre captación, ventas y operación para que el sistema funcione de punta a punta, con menos intervención manual.",
    highlightIcon: <Zap className="w-5 h-5 text-indigo-500" />,
    highlightLabel: "Capa de integración",
    highlightText: "La automatización conecta los módulos y mantiene la información alineada.",
    features: [
      { label: "Flujos", icon: Workflow, x: 75, y: 45 },
      { label: "Bots", icon: Bot, x: 85, y: 70 },
      { label: "Mensajes", icon: MessageSquare, x: 50, y: 85 },
    ],
    incluye: [
      "Seguimientos automáticos integrados al proceso comercial",
      "Notificaciones internas",
      "Asignación automática de responsables",
      "Flujos operativos con validaciones",
    ],
    entregables: [
      "Automatizaciones activas",
      "Documentación de los flujos",
    ],
    whatsappMessage: "¡Hola! Me gustaría solicitar información sobre Automatización",
  },
];


const SEGMENTS = {
  // TR
  ventas: "M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z",
  // TL
  marketing: "M 200 200 L 20 200 A 180 180 0 0 1 200 20 Z",
  // BL
  operacion: "M 200 200 L 200 380 A 180 180 0 0 1 20 200 Z",
  // BR
  automatizacion: "M 200 200 L 380 200 A 180 180 0 0 1 200 380 Z",
};

export default function ServicesOverview() {
  const [activeTab, setActiveTab] = useState("ventas");

  const activeService = useMemo(
    () => servicesData.find((s) => s.id === activeTab),
    [activeTab]
  );

  return (
    <section
      id="servicios"
      className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            NexOps<span className="text-indigo-600">Core</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl font-medium text-slate-500"
          >
            El sistema operativo de tu negocio
          </motion.p>
        </div>

        {/* Mobile Selector - "Pro Dashboard" Grid style */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-12">
          {servicesData.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <motion.button
                key={s.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab(s.id)}
                className={`group relative overflow-hidden p-6 rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all duration-500 border ${isActive
                  ? `bg-gradient-to-br ${s.color} border-transparent text-white shadow-xl shadow-indigo-200/50`
                  : "bg-white border-slate-100 text-slate-500 shadow-sm hover:border-slate-200"
                  }`}
              >
                {/* Background Icon Watermark */}
                <div className={`absolute -right-2 -bottom-2 transition-transform duration-700 ${isActive ? 'scale-110 opacity-20 rotate-12' : 'scale-100 opacity-[0.03] -rotate-12'}`}>
                  {React.cloneElement(s.icon, { className: "w-20 h-20" })}
                </div>

                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-500 ${isActive
                  ? 'bg-white/20 backdrop-blur-md shadow-inner'
                  : 'bg-slate-50 text-slate-400'
                  }`}>
                  {React.cloneElement(s.icon, {
                    className: `w-7 h-7 ${isActive ? 'text-white' : ''}`,
                    strokeWidth: 2
                  })}
                </div>

                <div className="text-center">
                  <span className={`block text-[14px] font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {s.title}
                  </span>
                </div>

                {/* Active Indicator splotch for extra WOW */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
                )}
              </motion.button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: Interactive Wheel - Hidden on Mobile for better UX */}
          <div className="hidden lg:flex relative justify-center items-center select-none">
            <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px]">
              {/* Center Hub */}
              <div className="absolute inset-0 m-auto w-32 h-32 sm:w-48 sm:h-48 z-40 bg-white rounded-full flex flex-col items-center justify-center p-4 border-2 border-slate-200/50"
                style={{
                  boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.1), 0 20px 60px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)'
                }}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                    NexOps<span className="text-indigo-600">Core</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-center leading-tight">
                    Sistema Operativo
                  </span>
                  <span className="text-[8px] text-slate-300 font-bold tracking-widest mt-2 uppercase">
                    CRM • Datos • Auto
                  </span>
                </div>
              </div>

              {/* Wheel SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                <defs>
                  {/* Enhanced Gradients */}
                  {servicesData.map((s) => (
                    <React.Fragment key={s.gradId}>
                      <linearGradient
                        id={s.gradId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={s.gradColors[0]} />
                        <stop offset="100%" stopColor={s.gradColors[1]} />
                      </linearGradient>
                      {/* Inner glow for active state */}
                      <radialGradient id={`${s.gradId}-glow`}>
                        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                    </React.Fragment>
                  ))}
                </defs>

                {/* Segments with enhanced states */}
                <g className="cursor-pointer">
                  {servicesData.map((s) => {
                    const isActive = activeTab === s.id;
                    return (
                      <React.Fragment key={s.id}>
                        <path
                          d={SEGMENTS[s.id]}
                          fill={`url(#${s.gradId})`}
                          className="transition-all duration-500 stroke-white stroke-[3px]"
                          onClick={() => setActiveTab(s.id)}
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "center",
                            transform: isActive ? "scale(1.02)" : "scale(1)",
                            opacity: isActive ? 1 : 0.75,
                            filter: isActive
                              ? 'brightness(1.05) drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'
                              : 'brightness(0.92) saturate(0.9)',
                          }}
                        />
                        {/* Inner glow overlay for active */}
                        {isActive && (
                          <path
                            d={SEGMENTS[s.id]}
                            fill={`url(#${s.gradId}-glow)`}
                            className="pointer-events-none"
                            style={{ mixBlendMode: 'overlay' }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </g>

                {/* Outer rings - more defined */}
                <circle
                  cx="200"
                  cy="200"
                  r="179"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  opacity="0.95"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="182"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="8"
                  opacity="0.8"
                  style={{ filter: 'blur(2px)' }}
                />

              </svg>

              {/* Category Labels & Icons Overlay - Enterprise Style */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Ventas & CRM - Top Right (Now moved here) */}
                <div className="absolute" style={{ left: "75%", top: "32%", transform: "translate(-50%, -50%)" }}>
                  <div
                    className="px-5 py-2.5 rounded-full pointer-events-auto cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("ventas")}
                    style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <span className="text-slate-900 font-bold text-sm whitespace-nowrap tracking-tight">Ventas & CRM</span>
                  </div>
                </div>

                {/* Ventas Icons */}
                {activeTab === 'ventas' && (
                  <AnimatePresence>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.div
                        className="absolute" style={{ left: "58%", top: "15%" }}
                        animate={{ x: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("ventas")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(8deg)',
                          }}
                        >
                          <Settings className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "70%", top: "18%" }}
                        animate={{ x: [0, 2, -2, 2, -2, 0] }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("ventas")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-4deg)',
                          }}
                        >
                          <Target className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "70%", top: "38%" }}
                        animate={{ y: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("ventas")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(2deg)',
                          }}
                        >
                          <BarChart3 className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Marketing - Top Left (Now moved here) */}
                <div className="absolute" style={{ left: "25%", top: "32%", transform: "translate(-50%, -50%)" }}>
                  <div
                    className="px-5 py-2.5 rounded-full pointer-events-auto cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("marketing")}
                    style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <span className="text-slate-900 font-bold text-sm whitespace-nowrap tracking-tight">Captación & Mkt</span>
                  </div>
                </div>

                {/* Marketing Icons */}
                {activeTab === 'marketing' && (
                  <AnimatePresence>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.div
                        className="absolute" style={{ left: "18%", top: "19%" }}
                        animate={{ x: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("marketing")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-8deg)',
                          }}
                        >
                          <Magnet className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "32%", top: "18%" }}
                        animate={{ x: [0, 2, -2, 2, -2, 0] }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("marketing")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(4deg)',
                          }}
                        >
                          <Globe className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "22%", top: "40%" }}
                        animate={{ y: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("marketing")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-2deg)',
                          }}
                        >
                          <PieChart className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Operación - Bottom Left */}
                <div className="absolute" style={{ left: "28%", top: "70%", transform: "translate(-50%, -50%)" }}>
                  <div
                    className="px-5 py-2.5 rounded-full pointer-events-auto cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("operacion")}
                    style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <span className="text-slate-900 font-bold text-sm whitespace-nowrap tracking-tight">Operación & Postventa</span>
                  </div>
                </div>

                {/* Operación Icons */}
                {activeTab === 'operacion' && (
                  <AnimatePresence>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.div
                        className="absolute" style={{ left: "15%", top: "56%" }}
                        animate={{ x: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("operacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-8deg)',
                          }}
                        >
                          <Package className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "36%", top: "80%" }}
                        animate={{ x: [0, 2, -2, 2, -2, 0] }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("operacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(4deg)',
                          }}
                        >
                          <Clock className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "26%", top: "78%" }}
                        animate={{ y: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("operacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-8deg)',
                          }}
                        >
                          <GitPullRequest className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Automatización - Bottom Right */}
                <div className="absolute" style={{ left: "69%", top: "70%", transform: "translate(-50%, -50%)" }}>
                  <div
                    className="px-5 py-2.5 rounded-full pointer-events-auto cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("automatizacion")}
                    style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <span className="text-slate-900 font-bold text-sm whitespace-nowrap tracking-tight">Automatización</span>
                  </div>
                </div>

                {/* Automatización Icons */}
                {activeTab === 'automatizacion' && (
                  <AnimatePresence>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.div
                        className="absolute" style={{ left: "70%", top: "56%" }}
                        animate={{ x: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("automatizacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(8deg)',
                          }}
                        >
                          <Workflow className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "56%", top: "78%" }}
                        animate={{ x: [0, 2, -2, 2, -2, 0] }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("automatizacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(-4deg)',
                          }}
                        >
                          <MessageSquare className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute" style={{ left: "70%", top: "78%" }}
                        animate={{ y: [0, -2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
                          onClick={() => setActiveTab("automatizacion")}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'rotate(2deg)',
                          }}
                        >
                          <Bot className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

            </div>
          </div>

          {/* Right: Detail */}
          <div className="min-h-[520px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100/50 overflow-hidden"
              >
                {/* Header Card */}
                <div
                  className={`relative h-32 flex items-center px-8 overflow-hidden bg-gradient-to-r ${activeService.color}`}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                      {React.cloneElement(activeService.icon, {
                        className: "w-8 h-8 text-white",
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-white/90 text-sm font-medium mt-1">
                        Solución Integral
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                      Objetivo
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">
                      {activeService.objective}
                    </h4>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      {activeService.description}
                    </p>

                    {activeService.highlightText && (
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          {activeService.highlightIcon}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                            {activeService.highlightLabel}
                          </p>
                          <p className="text-sm text-slate-700 font-semibold leading-snug">
                            {activeService.highlightText}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        Incluye
                      </h5>
                      <ul className="space-y-3">
                        {activeService.incluye.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-600 group">
                            <CheckCircle2 className={`w-4 h-4 mr-2.5 mt-0.5 shrink-0 ${activeService.textColor}`} />
                            <span className="group-hover:text-slate-900 transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                          <Workflow className="w-4 h-4" />
                        </div>
                        Entregables
                      </h5>
                      <ul className="space-y-3">
                        {activeService.entregables.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-600 group">
                            <span className={`w-1.5 h-1.5 rounded-full mr-2.5 mt-2 shrink-0 ${activeService.bgColor}`} />
                            <span className="group-hover:text-slate-900 transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <a
                      href={`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encodeURIComponent(activeService.whatsappMessage || CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-8 py-3.5 rounded-2xl text-white font-bold transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0 shadow-lg ${activeService.bgColor}`}
                    >
                      Solicitar información
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
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