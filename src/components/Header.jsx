import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import brandLogo from "../assets/logo-nexops.svg";
import { CONTACT_INFO, NAV_LINKS, getWhatsappLink } from "../config/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, mounted]);

  const whatsappHref = getWhatsappLink(
    CONTACT_INFO.WHATSAPP_NUMBER,
    CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT
  );

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1500px] items-center px-5 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="NexOps, inicio">
          <img src={brandLogo} className="h-8 w-auto" alt="" />
          <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#0c1730]">NexOps</span>
        </a>

        <div className="ml-auto hidden items-center gap-9 md:flex">
          <nav className="flex items-center gap-8 text-[14px] font-medium text-slate-600" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#0c1730]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-[12px] bg-[#0c1730] px-5 text-sm font-semibold text-white transition duration-200 hover:bg-[#17243e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7650ff] focus-visible:ring-offset-2"
          >
            Hablá con Nexi
            <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="h-px w-5 bg-[#0c1730]" />
          <span className="h-px w-5 bg-[#0c1730]" />
        </button>
      </div>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[9999] flex min-h-[100svh] flex-col bg-white px-5 pb-8 pt-4 md:hidden">
          <div className="flex h-14 items-center">
            <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <img src={brandLogo} className="h-8 w-auto" alt="" />
              <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#0c1730]">NexOps</span>
            </a>
            <button
              type="button"
              className="ml-auto flex h-11 w-11 items-center justify-center text-2xl text-[#0c1730]"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              ×
            </button>
          </div>

          <div className="mt-12 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Navegación
          </div>
          <nav className="mt-5 flex flex-col" aria-label="Navegación mobile">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-slate-200 py-5 text-[clamp(1.8rem,8vw,2.5rem)] font-semibold leading-none tracking-[-0.045em] text-[#0c1730]"
              >
                <span>{link.label}</span>
                <span className="text-sm font-medium text-slate-400">0{index + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-slate-200 pt-6">
            <p className="mb-5 max-w-xs text-sm leading-6 text-slate-500">
              Contanos qué parte de tu operación hoy te está frenando.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 w-full items-center justify-between rounded-[14px] bg-[#0c1730] px-5 text-base font-semibold text-white"
            >
              Hablá con Nexi
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
