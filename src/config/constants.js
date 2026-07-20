export const CONTACT_INFO = {
  WHATSAPP_NUMBER: "5491132106711",
  WHATSAPP_MESSAGE_HERO: "Hola, quiero conversar sobre un sistema para mi empresa.",
  WHATSAPP_MESSAGE_DEFAULT: "Hola, quiero hacer una consulta a NexOps.",
};

export const SOCIAL_LINKS = {
  WHATSAPP_API: "https://api.whatsapp.com/send",
  WHATSAPP_SHORT: "https://wa.me",
};

export const CALENDLY_LINK = "https://calendly.com/nexopstech-info/30min";
export const CALENDLY_LINK_45MIN = "https://calendly.com/nexopstech-info/45min";

export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Casos", href: "/#casos" },
  { label: "Cómo trabajamos", href: "/#metodo" },
  { label: "NexOps", href: "/#nexops" },
  { label: "Contacto", href: "/#contacto" },
];

export const getWhatsappLink = (phone, message) => {
  const encoded = encodeURIComponent(message);
  return `${SOCIAL_LINKS.WHATSAPP_API}?phone=${phone}&text=${encoded}`;
};
