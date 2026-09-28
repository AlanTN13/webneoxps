import { Menu, X } from "lucide-react";
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
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return <>
    <header className="site-header"><div className="site-shell site-header__inner">
      <Link className="site-header__brand" to="/" aria-label="NexOps, inicio"><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link>
      <nav className="site-header__nav" aria-label="Navegación principal">{links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}</nav>
      <a className="site-header__cta" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Conversemos</a>
      <button className="site-header__menu" type="button" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu size={23} /></button>
    </div></header>
    {open && createPortal(<div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal">
      <div className="mobile-menu__head"><Link className="site-header__brand" to="/" onClick={() => setOpen(false)}><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link><button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={25} /></button></div>
      <nav className="mobile-menu__nav" aria-label="Navegación mobile">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}<span>→</span></Link>)}</nav>
      <a className="button button--brand" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Hablar con NexOps</a>
    </div>, document.body)}
  </>;
}
