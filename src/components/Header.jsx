// src/components/Header.jsx
import brandLogo from "../assets/logo-nexops.svg";

const Brand = () => (
  <a
    href="/"
    className="flex items-center gap-2 group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-md"
  >
    <img src={brandLogo} alt="NexOps" className="h-10 w-10 -ml-1 shrink-0" />
    <span className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-[#4F46E5]">
      NexOps
    </span>
  </a>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-100 h-[72px]">
      <div className="mx-auto max-w-7xl flex h-full items-center justify-between px-6">
        <Brand />
        <nav className="hidden sm:flex items-center gap-8 text-base text-slate-600">
        <a href="/#servicios" className="hover:text-[#4F46E5]">Servicios</a>
        <a href="/#proceso"   className="hover:text-[#4F46E5]">Proceso</a>
        <a href="/noticias"   className="hover:text-[#4F46E5]">Blog</a>
        <a href="/#contacto"  className="hover:text-[#4F46E5]">Contacto</a>
        </nav>

        <a
          href="https://api.whatsapp.com/send?phone=5491132106711&text=Hola!%20Quiero%20escalar%20mi%20empresa%20🚀"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2 text-white font-semibold shadow-sm hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F46E5]"
        >
          Hablemos
        </a>
      </div>
    </header>
  );
}
