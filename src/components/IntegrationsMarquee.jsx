export default function IntegrationsMarquee() {
    return (
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 text-center">
            Integrado a las mejores herramientas
          </h2>
  
          <div className="relative mt-10 overflow-hidden">
            {/* (Opcional) Fades laterales – dejé más angostos y muy suaves */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
  
            {/* Pista que se mueve */}
            <div className="marquee-track flex items-center gap-20 md:gap-28 will-change-transform">
              <LogoStrip />
              <LogoStrip aria-hidden />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function LogoStrip(props) {
    return (
      <div className="flex items-center gap-20 md:gap-28 shrink-0" {...props}>
        {/* Sacamos max-h-* bajos y los normalizamos con h-12 md:h-16 */}
        <Logo src="/stripe.svg"          alt="Stripe" />
        <Logo src="/pipedrive.svg"       alt="Pipedrive" />
        <Logo src="/googlesheets.svg"    alt="Google Sheets" />
        <Logo src="/gmail.svg"           alt="Gmail" />
        <Logo src="/slack.svg"           alt="Slack" />
        <Logo src="/meta.svg"            alt="Meta" />
        <Logo src="/mercadopago.svg"     alt="Mercado Pago" />
        <Logo src="/salesforce.svg"      alt="Salesforce" />
        <Logo src="/mailchimp.svg"       alt="Mailchimp" />
        <Logo src="/rdstation.svg"       alt="RD Station" />
        <Logo src="/zapier.svg"          alt="Zapier" />
        <Logo src="/googlecalendar.svg"  alt="Google Calendar" />
      </div>
    );
  }
  
  function Logo({ src, alt }) {
    return (
      <div className="h-12 md:h-16 flex items-center">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }
  