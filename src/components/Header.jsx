import React, { useState } from "react";
import brandLogo from "../assets/logo-nexops.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={brandLogo} alt="NexOps" className="h-6 w-auto" />
          <span className="font-semibold text-slate-900 text-lg">NexOps</span>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-10 text-slate-600 font-medium">
          <a href="#servicios" className="hover:text-[#4F46E5]">Servicios</a>
          <a href="#proceso" className="hover:text-[#4F46E5]">Proceso</a>
          <a href="/noticias" className="hover:text-[#4F46E5]">Noticias</a>
          <a href="#contacto" className="hover:text-[#4F46E5]">Contacto</a>
        </nav>

        {/* BOTÓN DESKTOP */}
        <a
          href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Quiero%20automatizar%20mi%20empresa%20🚀"
          className="hidden md:inline-flex rounded-xl bg-[#4F46E5] text-white px-5 py-2 font-semibold shadow-sm"
        >
          Hablemos
        </a>

        {/* ICONO MOBILE */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(true)}
        >
          <span className="text-3xl">☰</span>
        </button>
      </div>

      {/* DRAWER MOBILE */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white animate-fadeIn flex flex-col">
          {/* HEADER DEL DRAWER */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <img src={brandLogo} alt="NexOps" className="h-6" />
              <span className="font-semibold text-lg">NexOps</span>
            </div>

            <button onClick={() => setOpen(false)}>
              <span className="text-3xl">×</span>
            </button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col px-6 py-6 gap-6 text-lg font-medium text-slate-800">
            <a href="#servicios" onClick={() => setOpen(false)}>Servicios</a>
            <a href="#proceso" onClick={() => setOpen(false)}>Proceso</a>
            <a href="/noticias" onClick={() => setOpen(false)}>Noticias</a>
            <a href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
          </div>

          {/* FOOTER DEL DRAWER */}
          <div className="mt-auto px-6 py-6 text-sm text-slate-500">
            © {new Date().getFullYear()} NexOps. Todos los derechos reservados.
          </div>
        </div>
      )}

      {/* ANIMACIÓN */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
