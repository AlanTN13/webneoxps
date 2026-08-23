import { formatReadingTime, getContentWordCount, getReadingTimeMinutes } from "./reading-time.js";

export const SITE_URL = "https://www.nexopstech.com";
export const FALLBACK_NEWS_IMAGE = "/nexops-sin-aire.png";

export const CONTENT_TYPES = {
  actualidad: { label: "Actualidad" },
  guia: { label: "Guía" },
  analisis: { label: "Análisis" },
  caso: { label: "Caso" },
};

export const CONTENT_PURPOSES = {
  seo: { label: "Guías y problemas", description: "Respuestas prácticas a problemas que una empresa necesita resolver." },
  actualidad: { label: "Actualidad aplicada", description: "Cambios tecnológicos traducidos a decisiones empresariales." },
  criterio: { label: "Criterio NexOps", description: "Ideas y principios que guían cómo diseñamos soluciones." },
  caso: { label: "Casos y aplicaciones", description: "Flujos concretos para visualizar una solución en operación." },
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

export function getContentPurposeLabel(contentPurpose) {
  return CONTENT_PURPOSES[contentPurpose]?.label || "Insight";
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

const modules = import.meta.glob("./*.json", { eager: true, import: "default" });
export const newsPosts = Object.values(modules)
  .sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());
export const getNewsPostBySlug = (slug) => newsPosts.find((post) => post.slug === slug) || null;
export const formatNewsDate = (value) => new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(new Date(value.length === 10 ? `${value}T12:00:00Z` : value));
export const getNewsLabel = (post) => post.territory ? getTerritoryConfig(post.territory).label : post.category || "Insight";
export const getNewsPurposeLabel = (post) => getContentPurposeLabel(post.contentPurpose);
export const getNewsSources = (post) => {
  const items = [];
  if (post.sourceName && post.sourceUrl) items.push({ name: post.sourceName, url: post.sourceUrl });
  for (const source of post.sources || []) if (source?.url && !items.some((item) => item.url === source.url)) items.push(source);
  return items;
};
export const getNewsCta = (post) => {
  if (post.cta?.label && post.cta?.href) return post.cta;
  if (post.territory) {
    const territory = getTerritoryConfig(post.territory);
    return { label: territory.ctaTitle, href: territory.servicePath, copy: territory.ctaCopy };
  }
  return { label: "Conocé cómo trabaja NexOps", href: "/#servicios", copy: "Automatización, integraciones e IA aplicadas a procesos reales de negocio." };
};
export const getRelatedNews = (post, limit = 3) => {
  const explicit = (post.relatedSlugs || []).map(getNewsPostBySlug).filter(Boolean);
  const remaining = newsPosts.filter((item) => item.slug !== post.slug && !explicit.some((candidate) => candidate.slug === item.slug));
  const scored = remaining.map((item) => ({
    item,
    score: (post.territory && item.territory === post.territory ? 4 : 0)
      + (post.contentPurpose && item.contentPurpose && item.contentPurpose !== post.contentPurpose ? 2 : 0)
      + (item.category === post.category ? 1 : 0),
  })).sort((a, b) => b.score - a.score || new Date(b.item.publishedAt) - new Date(a.item.publishedAt));
  return [...explicit, ...scored.map(({ item }) => item)].slice(0, limit);
};
export const absoluteAssetUrl = (value) => {
  if (!value) return `${SITE_URL}${FALLBACK_NEWS_IMAGE}`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export { formatReadingTime, getContentWordCount, getReadingTimeMinutes };
