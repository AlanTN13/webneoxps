// src/components/Footer.jsx
import brandLogo from "../assets/logo-nexops.png"; // o .svg, según tengas

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Izquierda: logo + texto */}
        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-500">
        <img
  src={brandLogo}
  alt="NexOps"
  className="h-6 w-auto mr-2"
  style={{ objectFit: "contain" }}
/>
          <span className="font-semibold text-slate-800">NexOps</span>
          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} NexOps. Todos los derechos reservados.
          </span>
        </div>

        {/* Derecha: links */}
        <nav className="flex justify-center md:justify-end gap-6 text-sm text-slate-600">
          <a href="#servicios" className="hover:text-[#4F46E5]">
            Servicios
          </a>
          <a href="#proceso" className="hover:text-[#4F46E5]">
            Proceso
          </a>
          <a href="/noticias" className="hover:text-[#4F46E5]">
            Noticias
          </a>
          <a href="#contacto" className="hover:text-[#4F46E5]">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}

