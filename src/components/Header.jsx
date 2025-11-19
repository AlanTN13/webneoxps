// src/components/Header.jsx
import React, { useState } from "react";
import brandLogo from "../assets/logo-nexops.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={brandLogo} alt="NexOps" className="h-6 w-auto" />
          <span className="font-semibold text-slate-900 text-lg">NexOps</span>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-10 text-slate-600 font-medium">
          <a href="#servicios" className="hover:text-[#4F46E5]">
            Servicios
          </a>
          <a href="#proceso" className="hover:text-[#4F46E5]">
            Proceso
          </a>
          <a href="/noticias" className="hover:text-[#4F46E5]">
            Noticias
          </a>
          <a href="#contacto" className="hover:text-[#4F46E5]">
            Contacto
          </a>
        </nav>

        {/* Botón desktop */}
        <a
          href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Quiero%20automatizar%20mi%20empresa%20🚀"
          className="hidden md:inline-flex rounded-xl bg-[#4F46E5] text-white px-5 py-2 font-semibold shadow-sm"
        >
          Hablemos
        </a>

        {/* Hamburguesa mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <span className="block h-0.5 w-6 bg-slate-900 mb-1" />
          <span className="block h-0.5 w-6 bg-slate-900 mb-1" />
          <span className="block h-0.5 w-6 bg-slate-900" />
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Fondo oscuro (toca afuera para cerrar) */}
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpen(false)}
          />

          {/* Panel blanco: ocupa 3/4 de ancho en mobile */}
          <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col animate-slideIn">
            {/* Top drawer */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <img src={brandLogo} alt="NexOps" className="h-6 w-auto" />
                <span className="font-semibold text-lg text-slate-900">
                  NexOps
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-1"
              >
                <span className="text-3xl leading-none text-slate-700">×</span>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 py-6 gap-5 text-lg font-medium text-slate-800">
              <a href="#servicios" onClick={() => setOpen(false)}>
                Servicios
              </a>
              <a href="#proceso" onClick={() => setOpen(false)}>
                Proceso
              </a>
              <a href="/noticias" onClick={() => setOpen(false)}>
                Noticias
              </a>
              <a href="#contacto" onClick={() => setOpen(false)}>
                Contacto
              </a>
            </nav>

            {/* Footer chiquito dentro del menú */}
            <div className="mt-auto px-6 py-4 text-xs text-slate-500 border-t border-slate-100">
              © {new Date().getFullYear()} NexOps. Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      )}

      {/* Animación slide-in */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
