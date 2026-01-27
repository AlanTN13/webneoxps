export const CONTACT_INFO = {
    WHATSAPP_NUMBER: "5491132106711",
    WHATSAPP_MESSAGE_HERO: "Hola! Quiero escalar mi empresa 🚀",
    WHATSAPP_MESSAGE_DEFAULT: "¡Hola! Quiero hacer una consulta 🚀",
};

export const SOCIAL_LINKS = {
    WHATSAPP_API: "https://api.whatsapp.com/send",
    WHATSAPP_SHORT: "https://wa.me",
};

export const CALENDLY_LINK = "https://calendly.com/nexopstech-info/30min";
export const CALENDLY_LINK_45MIN = "https://calendly.com/nexopstech-info/45min";

export const NAV_LINKS = [
    { label: "Servicios", href: "/#servicios" },
    { label: "Proceso", href: "/#proceso" },
    { label: "Noticias", href: "/noticias" },
    { label: "Contacto", href: "/#contacto" },
];

export const getWhatsappLink = (phone, message) => {
    const encoded = encodeURIComponent(message);
    return `${SOCIAL_LINKS.WHATSAPP_API}?phone=${phone}&text=${encoded}`;
};
