import React from "react";

const integrations = [
  { src: "/meta.svg", alt: "Meta", className: "h-8 sm:h-9 lg:h-10" },
  { src: "/mercadopago.svg", alt: "Mercado Pago", className: "h-9 sm:h-10 lg:h-11" },
  { src: "/salesforce.svg", alt: "Salesforce", className: "h-9 sm:h-10 lg:h-11" },
  { src: "/mailchimp.svg", alt: "Mailchimp", className: "h-9 sm:h-10 lg:h-11" },
  { src: "/rdstation.svg", alt: "RD Station", className: "h-8 sm:h-9 lg:h-10" },
  { src: "/googlesheets.svg", alt: "Google Sheets", className: "h-9 sm:h-10 lg:h-11" },
];

const clients = [
  { src: "/newsan_logo.svg", alt: "Newsan", className: "h-10 sm:h-11 lg:h-12" },
  { src: "/cencosud_logo.svg", alt: "Cencosud", className: "h-10 sm:h-11 lg:h-12" },
  { src: "/coke_logo.svg", alt: "Coca-Cola", className: "h-11 sm:h-12 lg:h-14" },
  { src: "/colgate_logo.svg", alt: "Colgate", className: "h-10 sm:h-11 lg:h-12" },
  { src: "/globaltrip_logo.svg", alt: "GlobalTrip", className: "h-10 sm:h-11 lg:h-12" },
];

function BrandMark({ src, alt, className }) {
  return (
    <div className="flex min-h-[72px] items-center justify-center sm:min-h-[82px] lg:min-h-[92px]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} max-w-[148px] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:max-w-[170px] lg:max-w-[190px]`}
      />
    </div>
  );
}

function IntegrationsMoment() {
  return (
    <section className="bg-[#f7f8fb] px-5 pb-36 pt-32 sm:px-6 md:pb-44 md:pt-40 lg:px-8 lg:pb-52 lg:pt-48">
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Integraciones
          </div>
          <h2 className="mt-5 text-[clamp(2.6rem,4.6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0c1730]">
            Nos integramos con las herramientas que ya usa tu negocio.
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Conectamos captación, CRM, mensajería, pagos y automatización sin obligarte a empezar de cero.
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:mt-20 sm:gap-x-14 sm:gap-y-9 lg:mt-24 lg:flex-nowrap lg:gap-x-16">
          {integrations.map((brand) => (
            <div key={brand.alt} className="w-[42%] sm:w-[29%] lg:w-auto lg:flex-1">
              <BrandMark {...brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustMoment() {
  return (
    <section className="bg-white px-5 pb-40 pt-36 sm:px-6 md:pb-52 md:pt-48 lg:px-8 lg:pb-60 lg:pt-56">
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Confianza
          </div>
          <h2 className="mt-5 text-[clamp(2.5rem,4vw,4.7rem)] font-semibold leading-[1] tracking-[-0.055em] text-[#0c1730]">
            Equipos que ya trabajaron con NexOps.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Marcas y equipos que ya confiaron en nuestro trabajo para resolver desafíos reales de tecnología y operación.
          </p>
        </div>

        <div className="mx-auto mt-20 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:mt-24 sm:gap-x-16 sm:gap-y-12 lg:mt-28 lg:flex-nowrap lg:justify-between lg:gap-x-20">
          {clients.map((brand) => (
            <div key={brand.alt} className="w-[42%] sm:w-[29%] lg:w-auto lg:flex-1">
              <BrandMark {...brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Logos() {
  return (
    <div>
      <IntegrationsMoment />
      <TrustMoment />
    </div>
  );
}
