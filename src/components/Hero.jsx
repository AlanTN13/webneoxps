import React from "react";
import Section from "./ui/Section";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <Section className="relative pt-12 lg:pt-20 pb-20 bg-[#F5F3FF] overflow-hidden">
            {/* Main Background Glows - Deep Violet Influence */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-indigo-200/30 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-300/40 blur-[140px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 relative z-10">
                {/* 
                  Main Hero Card
                */}
                <div className="relative bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.12)] border border-white overflow-hidden flex flex-col lg:flex-row min-h-[600px]">

                    {/* Background "Glow/Cloud" - Enhanced Violet */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#ede9fe] via-[#f5f3ff] to-transparent opacity-90 pointer-events-none" />

                    {/* Left Side: Content */}
                    <div className="relative flex-1 p-10 md:p-16 lg:p-20 flex flex-col justify-center">

                        {/* Decorative Connection Lines - Animated and Fluid */}
                        <svg className="absolute bottom-[22%] left-[-5%] w-[110%] h-[25%] pointer-events-none" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 0.4,
                                    y: [0, -8, 0]
                                }}
                                transition={{
                                    pathLength: { duration: 2.5, ease: "easeInOut" },
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                }}
                                d="M0 80 Q150 30 320 60"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2"
                            />
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 0.25,
                                    y: [0, 8, 0]
                                }}
                                transition={{
                                    pathLength: { duration: 3, ease: "easeInOut", delay: 0.3 },
                                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                d="M0 100 Q180 20 380 50"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="1.5"
                            />

                            {/* The specific connection node - Pulsing with Glow */}
                            <motion.g
                                animate={{
                                    y: [0, -8, 0],
                                    x: [0, 3, 0]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <motion.circle
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.2, duration: 0.6 }}
                                    cx="320"
                                    cy="60"
                                    r="6"
                                    fill="white"
                                    stroke="#6366f1"
                                    strokeWidth="3"
                                    style={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.8))' }}
                                />
                                <motion.circle
                                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    cx="320"
                                    cy="60"
                                    r="10"
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="1"
                                />
                            </motion.g>
                        </svg>

                        <div className="relative z-10 text-left">
                            <h1 className="text-[34px] md:text-[48px] lg:text-[52px] font-black text-slate-900 leading-[1.1] tracking-tight">
                                <span className="block mb-2">Que tu operación fluya,</span>
                                <span className="text-[#6366f1]">aunque no estés mirando.</span>
                            </h1>

                            <p className="mt-8 text-base md:text-lg text-slate-500 max-w-[440px] leading-relaxed font-semibold opacity-70">
                                Automatizamos procesos críticos para que tu negocio funcione sin fricción.
                            </p>

                            <div className="mt-12">
                                <a
                                    href="#servicios"
                                    className="inline-flex items-center justify-center rounded-full bg-[#6366f1] px-12 py-5 text-white font-bold text-lg shadow-[0_20px_50px_-10px_rgba(99,102,241,0.5)] hover:bg-[#4F46E5] transition-all hover:scale-105 active:scale-95 group"
                                >
                                    <span>Diseñar mi sistema</span>
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="ml-2"
                                    >
                                        →
                                    </motion.span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Static Visual Experience */}
                    <div className="relative w-full lg:w-[48%] bg-white p-4 lg:p-6 overflow-hidden">
                        <div className="relative h-full w-full rounded-[35px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                            <img
                                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200"
                                alt="NexOpsCore Interactive System"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
