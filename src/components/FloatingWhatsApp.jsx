import { useMemo } from "react";
import { MessageCircleMore } from "lucide-react";
import { CONTACT_INFO } from "../config/constants";

export default function FloatingWhatsApp({
  phone,
  message = CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT,
}) {
  const href = useMemo(() => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  }, [phone, message]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Nexi por WhatsApp"
      title="Hablá con Nexi"
      className="fixed bottom-5 right-5 z-[9999] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#11133f] py-2.5 pl-2.5 pr-4 text-sm font-bold text-white shadow-[0_18px_45px_-18px_rgba(17,19,63,.8)] transition-transform hover:-translate-y-0.5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-white shadow-inner">
        <MessageCircleMore size={17} />
      </span>
      <span className="hidden sm:inline">Nexi</span>
    </a>
  );
}
