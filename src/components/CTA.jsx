// components/CTA.jsx
import CalendlyInline from "./CalendlyInline";

export default function CTA() {
  return (
    <section id="contacto" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.08),transparent)]" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-slate-900">
            ¿Listo para empezar?
          </h3>
          <p className="mt-1 text-slate-600">
            Agendá una llamada de 30 minutos para revisar tu caso y armar un
            plan express.
          </p>
        </div>

        <CalendlyInline url="https://calendly.com/nexopstech-info/30min" />
      </div>
    </section>
  );
}
