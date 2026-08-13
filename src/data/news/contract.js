export const SITE_URL = "https://www.nexopstech.com";

export const CONTENT_TYPES = {
  actualidad: { label: "Actualidad" },
  guia: { label: "Guías" },
  analisis: { label: "Análisis" },
};

export const TERRITORIES = {
  "automatizacion-procesos": {
    label: "Automatización de procesos",
    servicePath: "/servicios/process-automation",
    ctaTitle: "¿Hay trabajo manual que ya debería estar automatizado?",
    ctaCopy: "Revisamos el proceso, detectamos fricción y priorizamos automatizaciones con impacto operativo real.",
    visualClassName: "from-indigo-600 via-violet-600 to-slate-900",
  },
  "ia-aplicada-empresas": {
    label: "IA aplicada a empresas",
    servicePath: "/servicios/ai-agents",
    ctaTitle: "Llevá la IA a un caso de uso concreto",
    ctaCopy: "Diseñamos agentes y asistentes alrededor de tareas, decisiones y datos reales de tu operación.",
    visualClassName: "from-violet-600 via-indigo-600 to-slate-900",
  },
  "crm-automatizacion-comercial": {
    label: "CRM + automatización comercial",
    servicePath: "/servicios/software-integrations",
    ctaTitle: "Conectá el proceso comercial de punta a punta",
    ctaCopy: "Integramos CRM, canales y sistemas para que el seguimiento no dependa de tareas manuales.",
    visualClassName: "from-sky-600 via-indigo-600 to-slate-900",
  },
  "data-analytics": {
    label: "Data & Analytics",
    servicePath: "/servicios/data-visualization",
    ctaTitle: "Convertí datos dispersos en decisiones accionables",
    ctaCopy: "Ordenamos fuentes, KPIs y reporting para que el equipo vea lo importante sin armar reportes a mano.",
    visualClassName: "from-cyan-600 via-blue-700 to-slate-900",
  },
};

export const INTERNAL_ROUTES = [
  "/",
  "/noticias",
  "/servicios/data-engineering",
  "/servicios/data-visualization",
  "/servicios/ai-infrastructure",
  "/servicios/ai-agents",
  "/servicios/software-integrations",
  "/servicios/process-automation",
  "/servicios/frontend-ux",
];

export function getContentTypeLabel(contentType) {
  return CONTENT_TYPES[contentType]?.label || "Insight";
}

export function getTerritoryConfig(territory) {
  return TERRITORIES[territory] || TERRITORIES["automatizacion-procesos"];
}

export function isKnownInternalRoute(href) {
  if (!href || !href.startsWith("/")) return false;
  if (href.startsWith("/noticias/")) return true;
  const path = href.split("#")[0].split("?")[0];
  return INTERNAL_ROUTES.includes(path);
}
