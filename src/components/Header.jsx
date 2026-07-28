import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../assets/logo-nexops.svg";
import { NAV_LINKS } from "../config/constants";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="nx-header">
      <div className="nx-container nx-nav-wrap">
        <a className="nx-brand" href="/#inicio" aria-label="NexOps, inicio">
          <img src={logo} alt="" />
          <span>NexOps</span>
        </a>
        <nav className="nx-desktop-nav" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="nx-support" href="https://soporte.nexopstech.com" target="_blank" rel="noreferrer">
          Soporte <ArrowUpRight size={14} />
        </a>
        <button className="nx-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="nx-mobile-nav">
          <nav aria-label="Navegación móvil">
            {NAV_LINKS.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</a>
            ))}
            <a href="https://soporte.nexopstech.com" target="_blank" rel="noreferrer"><span>↗</span>Soporte</a>
          </nav>
        </div>
      )}
    </header>
  );
}
