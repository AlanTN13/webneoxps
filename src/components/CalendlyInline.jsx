// components/CalendlyInline.jsx
import { useEffect, useRef, useState } from "react";

export default function CalendlyInline({ url = "https://calendly.com/nexopstech-info/30min" }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(980); // desktop por defecto

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setHeight(980);       // xl
      else if (w >= 1024) setHeight(940);  // lg
      else if (w >= 640) setHeight(900);   // sm-md
      else setHeight(860);                 // mobile
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const JS  = "https://assets.calendly.com/assets/external/widget.js";
    const CSS = "https://assets.calendly.com/assets/external/widget.css";
    if (!document.querySelector(`link[href="${CSS}"]`)) {
      const link = document.createElement("link"); link.rel = "stylesheet"; link.href = CSS;
      document.head.appendChild(link);
    }
    const init = () => ref.current && window.Calendly?.initInlineWidget({ url, parentElement: ref.current });
    if (window.Calendly) init();
    else { const s = document.createElement("script"); s.src = JS; s.async = true; s.onload = init; document.body.appendChild(s); }
    return () => { if (ref.current) ref.current.innerHTML = ""; };
  }, [url]);

  return <div ref={ref} style={{ width: "100%", minWidth: 0, height }} />;
}
