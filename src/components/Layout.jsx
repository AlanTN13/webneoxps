// src/components/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { CONTACT_INFO } from "../config/constants";

export default function Layout({ children, showFloatingWhatsApp = true }) {
  return (
    <div className="site-root">
      <Header />
      <main>{children}</main>
      <Footer />
      {showFloatingWhatsApp && <FloatingWhatsApp phone={CONTACT_INFO.WHATSAPP_NUMBER} />}
    </div>
  );
}
