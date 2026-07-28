import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { CONTACT_INFO } from "../config/constants";

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <FloatingWhatsApp phone={CONTACT_INFO.WHATSAPP_NUMBER} />
    </div>
  );
}
