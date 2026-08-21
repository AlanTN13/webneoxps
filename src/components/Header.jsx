import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import brandLogo from "../assets/logo-nexops.svg";
import { CONTACT_INFO, NAV_LINKS, getWhatsappLink } from "../config/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const whatsappHref = useMemo(
    () => getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_HERO),
    [],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, mounted]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="NexOps, inicio">
          <img src={brandLogo} className="h-8 w-auto" alt="" />
          <span className="text-xl font-extrabold tracking-[-0.03em] text-slate-950">NexOps</span>
        </a>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7 text-sm font-semibold text-slate-600">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-slate-950">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#11133f] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_35px_-18px_rgba(17,19,63,.75)] transition-transform hover:-translate-y-0.5"
          >
            Hablá con Nexi
            <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
      </div>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[9999] bg-white">
          <div className="flex h-[72px] items-center border-b border-slate-200 px-5">
            <a href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <img src={brandLogo} className="h-8 w-auto" alt="" />
              <span className="text-xl font-extrabold tracking-[-0.03em] text-slate-950">NexOps</span>
            </a>
            <button
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex h-[calc(100%-72px)] flex-col px-5 pb-7 pt-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Navegación</p>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-slate-100 py-5 text-2xl font-semibold tracking-[-0.03em] text-slate-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-between rounded-[1.35rem] bg-[#11133f] px-5 py-5 text-base font-bold text-white"
            >
              Hablá con Nexi
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
