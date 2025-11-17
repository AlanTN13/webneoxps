// src/components/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />

      {/* WhatsApp flotante para todo el sitio (landing + blog) */}
      <FloatingWhatsApp phone="5491132106711" />
    </div>
  );
}
