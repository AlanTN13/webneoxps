import { useMemo } from "react";
import whatsappLogo from "../assets/whatsapp.svg";
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
      aria-label="Abrir chat de WhatsApp"
      title="Escribir por WhatsApp"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 9999,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 24px rgba(0,0,0,.18)",
        cursor: "pointer",
        transition: "transform .15s ease, box-shadow .15s ease",
        pointerEvents: "auto",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06)";
        e.currentTarget.style.boxShadow = "0 16px 28px rgba(0,0,0,.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,.18)";
      }}
    >
      {/* 👇 Punto 2: reemplazamos el svg por la imagen importada */}
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        width="28"
        height="28"
        style={{ pointerEvents: "none" }}
      />
    </a>
  );
}
