import { useEffect, useState } from "react";
import Detalle from "../noticias/Detalle.jsx";
import { acceptsRadarPreviewMessage, validPreviewOrigin, validateRadarPreviewPackage } from "../../lib/radar-preview.mjs";

export default function RadarPreview() {
  const [post, setPost] = useState(null);
  const [digest, setDigest] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const origin = params.get("origin");
    const nonce = params.get("nonce");
    const opener = window.opener;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex,nofollow,noarchive";
    document.head.appendChild(robots);
    if (!validPreviewOrigin(origin) || !/^[a-f0-9-]{36}$/.test(nonce || "") || !opener) {
      return () => robots.remove();
    }
    let active = true;
    async function receive(event) {
      if (!acceptsRadarPreviewMessage(event, opener, origin, nonce)) return;
      try {
        const article = await validateRadarPreviewPackage(event.data.package);
        if (!active) return;
        setPost(article);
        setDigest(event.data.package.compositionDigest);
        setError(null);
      } catch (caught) { if (active) setError(caught.message); }
    }
    window.addEventListener("message", receive);
    opener.postMessage({ type: "radar.preview.ready", nonce }, origin);
    return () => { active = false; robots.remove(); window.removeEventListener("message", receive); };
  }, []);
  return <>
    <div className="sticky top-0 z-50 border-b border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-950">
      <strong>Vista previa privada · Sin publicar</strong>
      <p>Revisá la nota y su portada. La aprobación se confirma en Portal Radar.</p>
      {post && <button className="mt-3 rounded-lg bg-violet-800 px-4 py-2 font-semibold text-white" onClick={() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const origin = params.get("origin");
        if (validPreviewOrigin(origin)) window.opener?.postMessage({ type: "radar.preview.viewed", compositionDigest: digest, nonce: params.get("nonce") }, origin);
      }}>Revisé esta vista previa</button>}
    </div>
    {error ? <p role="alert" className="p-8">{error}</p> : post ? <Detalle previewPost={post} /> : <p className="p-8">Abrí esta vista previa desde el compositor de Portal Radar.</p>}
  </>;
}
