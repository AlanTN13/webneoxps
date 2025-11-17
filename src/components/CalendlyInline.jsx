// components/CalendlyInline.jsx
import React from "react";

export default function CalendlyInline({
  url = "https://calendly.com/nexopstech-info/30min",
  height = 820,
}) {
  // Evitamos romper en build si no existe window
  const embedDomain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  const src = `${url}?embed_domain=${embedDomain}&embed_type=Inline&hide_gdpr_banner=1`;

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 18px 45px rgba(15,23,42,0.16)",
        background: "white",
      }}
    >
      <iframe
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        title="Agenda NexOps"
        style={{ border: "0" }}
        loading="lazy"
      />
    </div>
  );
}
