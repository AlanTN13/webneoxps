export const CONTACT_INFO = {
    WHATSAPP_NUMBER: "5491132106711",
    WHATSAPP_MESSAGE_HERO: "Hola Nexi. Quiero contarte qué está frenando mi operación.",
    WHATSAPP_MESSAGE_DEFAULT: "Hola Nexi. Quiero conversar con NexOps.",
};

export const SOCIAL_LINKS = {
    WHATSAPP_API: "https://api.whatsapp.com/send",
    WHATSAPP_SHORT: "https://wa.me",
};

export const CALENDLY_LINK = "https://calendly.com/nexopstech-info/30min";
export const CALENDLY_LINK_45MIN = "https://calendly.com/nexopstech-info/45min";

export const NAV_LINKS = [
    { label: "Qué resolvemos", href: "/#operation-story" },
    { label: "Soluciones", href: "/#servicios" },
    { label: "Cómo trabajamos", href: "/#proceso" },
    { label: "Insights", href: "/noticias" },
];

export const getWhatsappLink = (phone, message) => {
    const encoded = encodeURIComponent(message);
    return `${SOCIAL_LINKS.WHATSAPP_API}?phone=${phone}&text=${encoded}`;
};
