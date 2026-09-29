// src/components/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { CONTACT_INFO } from "../config/constants";

export default function Layout({ children, showFloatingWhatsApp = true, home = false }) {
  return (
    <div className={home ? "site-root site-root--home" : "site-root"}>
      <Header home={home} />
      <main>{children}</main>
      <Footer home={home} />
      {showFloatingWhatsApp && <FloatingWhatsApp phone={CONTACT_INFO.WHATSAPP_NUMBER} />}
    </div>
  );
}
