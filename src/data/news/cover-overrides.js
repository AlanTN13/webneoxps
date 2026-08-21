export const COVER_OVERRIDES = Object.freeze({
  "agente-ia-no-es-empleado-digital-limites": "https://images.unsplash.com/photo-1758873271949-742d6648b6b0?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "agentes-ia-produccion-control-limites": "https://images.unsplash.com/photo-1758873268444-73528cd3ec93?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo": "https://images.unsplash.com/photo-1770048532712-4fde5ef7eb90?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "automatizar-un-proceso-roto-falla-mas-rapido": "https://images.unsplash.com/photo-1758691737568-a1572060ce5a?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "como-armar-pipeline-ventas-crm": "https://images.unsplash.com/photo-1758519288955-1b3b45209c7a?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "como-automatizar-reportes-de-ventas": "https://images.unsplash.com/photo-1758691737083-0e7fdbde0f05?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "como-hacer-dashboard-indicadores-gestion": "https://images.unsplash.com/photo-1781246435700-afec19012b45?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "como-integrar-whatsapp-con-un-crm-para-no-perder-leads": "https://images.unsplash.com/photo-1758873271749-430bcd8b9009?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "ia-necesita-contexto-del-negocio": "https://images.unsplash.com/photo-1642177977596-36c73531208d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "la-burbuja-de-la-ia-no-esta-en-wall-street": "https://images.unsplash.com/photo-1737703638422-2cfa152cdcb7?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "meta-business-agent-whatsapp-leads-ventas": "https://images.unsplash.com/photo-1763038311036-6d18805537e5?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google": "https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "que-procesos-automatizar-primero-pyme": "https://images.unsplash.com/photo-1760872703636-f8d643a2b510?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "solicitud-interna-flujo-automatico-trabajo": "https://images.unsplash.com/photo-1762341122183-378b8b0238e6?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  "whatsapp-crm-circuito-automatico-seguimiento-leads": "https://images.unsplash.com/photo-1758873272345-40f377c21e7f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
});

export function applyCoverOverride(article) {
  if (!article || typeof article !== "object") return article;
  const coverImage = COVER_OVERRIDES[article.slug];
  return coverImage ? { ...article, coverImage } : article;
}
