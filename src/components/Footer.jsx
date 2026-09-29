import { Link } from "react-router-dom";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";

const explore = [
  { to: "/", label: "Inicio" },
  { to: "/ecommerce", label: "Ecommerce" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/#nosotros", label: "Nosotros" },
  { to: "/noticias", label: "Ideas que impulsan" },
];

function Brand() {
  return <div className="site-footer__brand"><Link to="/"><img src="/nexops-mark.webp" alt="" width="128" height="128" /><span>NexOps</span></Link><p>Tecnología para vender mejor</p></div>;
}

function Contact() {
  return <div><small>Conversemos</small><a href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación</a><a href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer">Escribir por WhatsApp</a><p>Buenos Aires · Argentina</p></div>;
}

export default function Footer({ home = false }) {
  if (home) return <footer className="site-footer site-footer--home"><div className="site-shell site-footer--home__grid"><Brand /><div><small>Explorar</small>{explore.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}</div><Contact /></div><div className="site-shell site-footer__bottom"><span>© {new Date().getFullYear()} NexOps</span><span>Negocio, canales y operación en una misma conversación.</span></div></footer>;
  return <footer className="site-footer"><div className="site-shell site-footer__grid"><Brand /><div><small>Dos formas de ayudarte</small><Link to="/ecommerce">Ecommerce</Link><Link to="/consultoria">Consultoría</Link></div><div><small>Explorar</small><Link to="/experiencia">Experiencia</Link><Link to="/#nosotros">Nosotros</Link><Link to="/noticias">Ideas que impulsan</Link></div><Contact /></div><div className="site-shell site-footer__bottom"><span>© {new Date().getFullYear()} NexOps</span><span>Buenos Aires · Argentina</span></div></footer>;
}
