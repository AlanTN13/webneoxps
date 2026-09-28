import { Link } from "react-router-dom";
import { solutions } from "../data/solutions";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";

export default function Footer({ home = false }) {
  if (home) return (
    <footer className="site-footer site-footer--home">
      <div className="site-shell site-footer--home__grid">
        <div className="site-footer__brand">
          <Link to="/"><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link>
          <p>Tecnología, criterio y ejecución para empresas que quieren crecer y operar mejor.</p>
        </div>
        <div><small>Explorar</small><a href="#nosotros">Nosotros</a><a href="#soluciones">Qué hacemos</a><a href="#casos">Experiencia</a><a href="#como-funciona">Cómo trabajamos</a><Link to="/noticias">Radar</Link></div>
        <div><small>Conversemos</small><a href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación</a><a href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer">Escribir por WhatsApp</a><p>Buenos Aires · Argentina</p></div>
      </div>
      <div className="site-shell site-footer__bottom"><span>© {new Date().getFullYear()} NexOps</span><span>Negocio, procesos y tecnología en una misma conversación.</span></div>
    </footer>
  );
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
