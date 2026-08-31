import { Link } from "react-router-dom";
import { solutions } from "../data/solutions";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/"><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link>
          <p>Tecnología y transformación operativa para que las empresas vendan y trabajen mejor.</p>
        </div>
        <div>
          <small>Soluciones</small>
          {solutions.map((solution) => <Link key={solution.slug} to={`/soluciones/${solution.slug}`}>{solution.navLabel}</Link>)}
        </div>
        <div>
          <small>Explorar</small>
          <Link to="/#como-funciona">Cómo funciona</Link>
          <Link to="/#casos">Casos</Link>
          <Link to="/noticias">Novedades</Link>
        </div>
        <div>
          <small>Contacto</small>
          <a href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar conversación</a>
          <a href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
        </div>
      </div>
      <div className="site-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} NexOps</span>
        <span>Buenos Aires · Argentina</span>
      </div>
    </footer>
  );
}
