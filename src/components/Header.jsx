// src/components/Header.jsx
import { useState } from "react";
import brandLogo from "../assets/logo-nexops.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2">
          <img src={brandLogo} alt="NexOps" className="h-7 w-auto" />
          <span className="font-semibold text-slate-800 text-lg">NexOps</span>
        </a>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-slate-600 text-base">
          <a href="#servicios" className="hover:text-[#4F46E5]">Servicios</a>
          <a href="#proceso" className="hover:text-[#4F46E5]">Proceso</a>
          <a href="/noticias" className="hover:text-[#4F46E5]">Noticias</a>
          <a href="#contacto" className="hover:text-[#4F46E5]">Contacto</a>
        </nav>

        {/* CTA DESKTOP */}
        <a
          href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Quiero%20hablar%20con%20NexOps"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center rounded-xl bg-[#4F46E5] text-white px-5 py-2.5 font-semibold hover:bg-[#4338CA]"
        >
          Hablemos
        </a>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden p-2 rounded-lg border border-slate-300 text-slate-700"
          onClick={() => setOpen(!open)}
        >
          {/* Hamburguesa */}
          {!open ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 animate-fadeIn">
          <a href="#servicios" onClick={() => setOpen(false)} className="block text-slate-700 text-lg">Servicios</a>
          <a href="#proceso" onClick={() => setOpen(false)} className="block text-slate-700 text-lg">Proceso</a>
          <a href="/noticias" onClick={() => setOpen(false)} className="block text-slate-700 text-lg">Noticias</a>
          <a href="#contacto" onClick={() => setOpen(false)} className="block text-slate-700 text-lg">Contacto</a>

          <a
            href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Necesito%20hablar%20con%20NexOps"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-xl bg-[#4F46E5] text-white py-3 font-semibold mt-2"
            onClick={() => setOpen(false)}
          >
            Hablemos
          </a>
        </div>
      )}
    </header>
  );
}
