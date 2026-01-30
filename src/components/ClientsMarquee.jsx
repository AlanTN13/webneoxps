// src/components/ClientsMarquee.jsx
export default function ClientsMarquee() {
  return (
    <div className="relative mt-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F4F7FF] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F4F7FF] to-transparent z-10" />

      <div className="marquee-track flex items-center gap-16 md:gap-24 will-change-transform">
        <LogoStrip />
        <LogoStrip aria-hidden />
      </div>
    </div>
  );
}

function LogoStrip(props) {
  return (
    <div className="flex items-center gap-16 md:gap-24 shrink-0" {...props}>
      {/* Ajusto un ancho aprox por logo para conservar proporciones y ritmo */}
      <ClientLogoMask src="/newsan_logo.svg" alt="Newsan" w="w-28 md:w-32" />
      <ClientLogoMask src="/cencosud_logo.svg" alt="Cencosud" w="w-28 md:w-32" />
      <ClientLogoMask src="/coke_logo.svg" alt="Coca-Cola" w="w-28 md:w-32" />
      <ClientLogoMask src="/colgate_logo.svg" alt="Colgate" w="w-28 md:w-32" />
      <ClientLogoMask src="/globaltrip_logo.svg" alt="GlobalTrip" w="w-28 md:w-32" />
    </div>
  );
}

/* Pinta el logo con color uniforme usando máscara */
function ClientLogoMask({ src, alt, w = "w-28 md:w-32" }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`h-10 md:h-12 ${w} logo-mask`}
      style={{ "--logo": `url(${src})` }}
    />
  );
}
