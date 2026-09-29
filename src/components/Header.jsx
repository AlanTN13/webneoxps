import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { CALENDLY_LINK } from "../config/constants";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/ecommerce", label: "Ecommerce" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/#nosotros", label: "Nosotros" },
  { to: "/noticias", label: "Ideas que impulsan" },
  { to: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return <>
    <header className="site-header"><div className="site-shell site-header__inner">
      <Link className="site-header__brand" to="/" aria-label="NexOps, inicio"><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link>
      <nav className="site-header__nav" aria-label="Navegación principal">{links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}</nav>
      <a className="site-header__cta" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Conversemos</a>
      <button className="site-header__menu" type="button" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open} aria-controls="mobile-site-menu"><Menu size={22} strokeWidth={2.2} /></button>
    </div></header>
    {open && createPortal(<div className="mobile-menu" id="mobile-site-menu" role="dialog" aria-modal="true" aria-label="Menú principal">
      <div className="mobile-menu__head"><Link className="mobile-menu__brand" to="/" onClick={() => setOpen(false)}><span className="mobile-menu__mark"><img src="/nexops-mark.webp" alt="" width="128" height="128" /></span><span>NexOps</span></Link><button className="mobile-menu__close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" autoFocus><X size={22} /></button></div>
      <div className="mobile-menu__intro"><span>EXPLORÁ NEXOPS</span><p>Tecnología para <em>vender mejor.</em></p></div>
      <nav className="mobile-menu__nav" aria-label="Navegación mobile">{links.map((link, index) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}><span className="mobile-menu__index">0{index + 1}</span><span className="mobile-menu__label">{link.label}</span><ArrowUpRight size={19} aria-hidden="true" /></Link>)}</nav>
      <div className="mobile-menu__footer"><a className="mobile-menu__cta" href={CALENDLY_LINK} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Hablar con NexOps <ArrowUpRight size={20} aria-hidden="true" /></a></div>
    </div>, document.body)}
  </>;
}
