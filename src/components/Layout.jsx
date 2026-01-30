// src/components/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { CONTACT_INFO } from "../config/constants";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F3FF] text-slate-900 antialiased flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />

      {/* WhatsApp flotante para todo el sitio (landing + blog) */}
      <FloatingWhatsApp phone={CONTACT_INFO.WHATSAPP_NUMBER} />
    </div>
  );
}
