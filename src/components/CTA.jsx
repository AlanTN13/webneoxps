import { ArrowUpRight, MessageCircleMore, Sparkles } from "lucide-react";
import { CONTACT_INFO, getWhatsappLink } from "../config/constants";

export default function CTA() {
  const whatsappHref = getWhatsappLink(
    CONTACT_INFO.WHATSAPP_NUMBER,
    CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT,
  );

  return (
    <section id="contacto" className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#11133f] px-6 py-10 text-white shadow-[0_35px_90px_-50px_rgba(17,19,63,.75)] sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[30%] h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-violet-100">
                <Sparkles size={14} />
                Nexi te conecta con NexOps
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Contanos qué parte de tu operación te está frenando.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-indigo-100/75 sm:text-lg">
                No hace falta que sepas qué herramienta necesitás. Arrancamos por el problema y bajamos una solución concreta.
              </p>
            </div>

            <div className="lg:min-w-[260px]">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-5 rounded-[1.35rem] bg-white px-5 py-4 text-[#11133f] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <MessageCircleMore size={20} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-violet-600">WhatsApp</span>
                    <span className="block text-base font-extrabold">Hablá con Nexi</span>
                  </span>
                </span>
                <ArrowUpRight size={19} />
              </a>
              <p className="mt-3 text-center text-xs font-medium text-white/45">Hablás con NexOps. Sin formulario largo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
