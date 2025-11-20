// src/components/Header.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import brandLogo from "../assets/logo-nexops.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // para poder usar createPortal sin romper nada
  useEffect(() => {
    setMounted(true);
  }, []);

  // bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (!mounted) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, mounted]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center">
        {/* Logo + nombre */}
        <a href="/" className="flex items-center gap-2">
          <img src={brandLogo} className="h-6 w-auto" alt="NexOps" />
          <span className="font-semibold text-slate-900 text-lg">NexOps</span>
        </a>

        {/* Wrapper derecha: nav + CTA (desktop) */}
        <div className="ml-auto hidden sm:flex items-center gap-8">
          {/* Navegación desktop */}
          <nav className="flex items-center gap-8 text-base text-slate-600">
            <a href="/#servicios" className="hover:text-slate-900">
              Servicios
            </a>
            <a href="/#proceso" className="hover:text-slate-900">
              Proceso
            </a>
            <a href="/noticias" className="hover:text-slate-900">
              Noticias
            </a>
            <a href="/#contacto" className="hover:text-slate-900">
              Contacto
            </a>
          </nav>

          {/* CTA desktop */}
          <a
            href="https://calendly.com/nexopstech-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-2.5 text-white font-semibold shadow-sm hover:bg-[#4338CA]"
          >
            Hablemos
          </a>
        </div>

        {/* Botón menú mobile */}
        <button
          className="sm:hidden ml-auto text-slate-700 text-3xl"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* OVERLAY MOBILE en PORTAL */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <img src={brandLogo} className="h-6 w-auto" alt="NexOps" />
                <span className="font-semibold text-slate-900 text-lg">
                  NexOps
                </span>
              </div>
              <button
                className="text-3xl text-slate-700"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            {/* Banda título */}
            <div className="px-6 py-3 border-b border-slate-200/80 text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase">
              NexOps Menu
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col px-6 py-4 text-lg text-slate-800 gap-1">
              <a
                href="/#servicios"
                onClick={closeMenu}
                className="py-3 border-b border-slate-200/60"
              >
                Servicios
              </a>
              <a
                href="/#proceso"
                onClick={closeMenu}
                className="py-3 border-b border-slate-200/60"
              >
                Proceso
              </a>
              <a
                href="/noticias"
                onClick={closeMenu}
                className="py-3 border-b border-slate-200/60"
              >
                Noticias
              </a>
              <a
                href="/#contacto"
                onClick={closeMenu}
                className="py-3 border-b border-slate-200/60"
              >
                Contacto
              </a>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}

