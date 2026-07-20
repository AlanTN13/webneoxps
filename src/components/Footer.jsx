import { ArrowUpRight } from "lucide-react";
import logo from "../assets/logo-nexops.svg";
import { NAV_LINKS } from "../config/constants";

export default function Footer() {
  return (
    <footer className="nx-footer">
      <div className="nx-container footer-grid">
        <div>
          <a className="nx-brand footer-brand" href="/#inicio"><img src={logo} alt="" /><span>NexOps</span></a>
          <p>Sistemas comerciales y operativos diseñados para crecer con control.</p>
        </div>
        <nav aria-label="Navegación del pie">
          {NAV_LINKS.slice(1).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="/noticias">Noticias</a>
        </nav>
        <a className="footer-support" href="https://soporte.nexopstech.com" target="_blank" rel="noreferrer">Centro de soporte <ArrowUpRight size={16} /></a>
      </div>
      <div className="nx-container footer-bottom"><span>© {new Date().getFullYear()} NexOps</span><span>Buenos Aires · Argentina</span></div>
    </footer>
  );
}
