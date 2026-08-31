import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CALENDLY_LINK } from "../config/constants";
import { solutions } from "../data/solutions";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="NexOps, inicio">
          <img src="/nexops-mark.webp" alt="" width="128" height="128" />
          <span>NexOps</span>
        </Link>

        <nav className="site-header__nav" aria-label="Navegación principal">
          <div className="site-header__solutions">
            <button type="button">Soluciones <ChevronDown size={15} /></button>
            <div className="site-header__dropdown">
              <div className="site-header__dropdown-intro">
                <small>Sistema NexOps</small>
                <strong>Capacidades que trabajan juntas.</strong>
              </div>
              <div className="site-header__dropdown-links">
                {solutions.map((solution) => (
                  <Link key={solution.slug} to={`/soluciones/${solution.slug}`}>
                    <span>{solution.navLabel}</span>
                    <small>{solution.eyebrow}</small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/#casos">Casos</Link>
          <Link to="/#nosotros">Nosotros</Link>
          <Link to="/noticias">Insights</Link>
          <Link to="/#contacto">Contacto</Link>
        </nav>

        <a className="site-header__cta" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
          Hablar con NexOps
        </a>

        <button className="site-header__menu" type="button" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <Menu size={23} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu__head">
            <Link className="site-header__brand" to="/" onClick={() => setOpen(false)}>
              <img src="/nexops-mark.webp" alt="" width="128" height="128" />
              <span>NexOps</span>
            </Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={25} /></button>
          </div>
          <nav className="mobile-menu__nav" aria-label="Navegación mobile">
            <small>Soluciones</small>
            {solutions.map((solution) => (
              <Link key={solution.slug} to={`/soluciones/${solution.slug}`} onClick={() => setOpen(false)}>
                {solution.navLabel}<span>→</span>
              </Link>
            ))}
            <div className="mobile-menu__secondary">
              <Link to="/#casos" onClick={() => setOpen(false)}>Casos</Link>
              <Link to="/#nosotros" onClick={() => setOpen(false)}>Nosotros</Link>
              <Link to="/noticias" onClick={() => setOpen(false)}>Insights</Link>
              <Link to="/#contacto" onClick={() => setOpen(false)}>Contacto</Link>
            </div>
          </nav>
          <a className="button button--lime" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
            Hablar con NexOps
          </a>
        </div>
      )}
    </header>
  );
}
