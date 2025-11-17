// src/components/Footer.jsx
import brandLogo from "../assets/logo-nexops.svg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center text-sm text-slate-500">
          <img src={brandLogo} alt="NexOps" className="h-5 w-5 shrink-0 mr-1" />
          <span className="font-semibold text-slate-800 mr-2">NexOps</span>
          <span className="text-slate-500">
            © {new Date().getFullYear()} NexOps. Todos los derechos reservados.
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-base text-slate-600">
        <a href="/#servicios" className="hover:text-[#4F46E5]">Servicios</a>
        <a href="/#proceso" className="hover:text-slate-900">Proceso</a>
        <a href="/#contacto"  className="hover:text-[#4F46E5]">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}
