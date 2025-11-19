// src/components/Footer.jsx
import brandLogo from "../assets/logo-nexops.svg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={brandLogo}
            alt="NexOps"
            className="h-6 w-auto sm:h-7" // más chico que el header
          />
          <span className="text-slate-700">
            © {new Date().getFullYear()} NexOps. Todos los derechos reservados.
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <a href="/#servicios" className="hover:text-[#4F46E5]">
            Servicios
          </a>
          <a href="/#proceso" className="hover:text-[#4F46E5]">
            Proceso
          </a>
          <a href="/noticias" className="hover:text-[#4F46E5]">
            Noticias
          </a>
          <a href="/#contacto" className="hover:text-[#4F46E5]">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}

