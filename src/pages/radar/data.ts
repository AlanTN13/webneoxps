import type {
  ActivityEvent,
  BusinessConfiguration,
  DecisionDimension,
  DecisionReason,
  Opportunity,
  Publication,
  RadarControlCenterData,
} from "./contracts";

type NewsArticle = {
  title: string;
  slug: string;
  contentPurpose?: string;
  territory?: string;
  category?: string;
  publishedAt: string;
  excerpt?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  searchIntent?: string;
  sources?: Array<{ name?: string; url?: string }>;
  sourceName?: string;
  sourceUrl?: string;
  engineRunId?: string;
  engineScore?: number;
  generatedByEngine?: boolean;
  coverImage?: string;
  primaryEntity?: string;
};

type PrivateDecision = {
  id: string;
  runId: string;
  kind: "opportunity" | "validation";
  outcome: "NO_PUBLICATION";
  detectedAt: string;
  title: string;
  topic: string;
  sourceName: string;
  sourceUrl: string;
  score: number;
  scoreBreakdown: Array<{ dimension: DecisionDimension; label: string; score: number }>;
  reason: string;
  category: string;
  territory: string | null;
};

type DecisionsResponse = {
  status: "ready" | "unavailable" | "error";
  generatedAt?: string;
  message?: string;
  decisions?: PrivateDecision[];
};

const newsModules = import.meta.glob("../../data/news/*.json", { eager: true, import: "default" }) as Record<string, NewsArticle>;

export const radarDefaultConfiguration: BusinessConfiguration = {
  goals: [
    { id: "organic-demand", label: "Atraer demanda orgánica", description: "Crear contenido útil para búsquedas con intención de negocio.", priority: "primary" },
    { id: "freshness", label: "Mantener la marca vigente", description: "Participar en conversaciones nuevas cuando realmente importan.", priority: "secondary" },
    { id: "commercial", label: "Abrir conversaciones comerciales", description: "Priorizar problemas vinculados con servicios de NexOps.", priority: "secondary" },
    { id: "authority", label: "Construir autoridad temática", description: "Profundizar en territorios donde NexOps quiere ser referencia.", priority: "off" },
  ],
  topics: [
    { id: "applied-ai", label: "IA aplicada", enabled: true },
    { id: "automation", label: "Automatización", enabled: true },
    { id: "crm", label: "CRM & Ventas", enabled: true },
    { id: "data", label: "Data & Analytics", enabled: true },
    { id: "cybersecurity", label: "Ciberseguridad", enabled: false },
  ],
  selectivity: "balanced",
  autonomy: "automatic",
  sourcePreference: "recognized",
  restrictions: [
    { id: "no-clients", label: "No mencionar clientes", description: "Evita usar nombres o casos de clientes sin autorización.", enabled: true },
    { id: "primary-source", label: "Confirmar con una fuente directa", description: "Exige respaldo oficial antes de avanzar con una publicación.", enabled: true },
    { id: "image-required", label: "Publicar sólo con una imagen adecuada", description: "Detiene la oportunidad si no hay una portada coherente.", enabled: true },
    { id: "blocked-topics", label: "Excluir comparaciones agresivas", description: "Evita contenido que ataque marcas o competidores.", enabled: false },
  ],
  maximumPerWeek: 4,
  enabledDays: ["Lun", "Mar", "Mié", "Jue"],
  avoidSimilarTopics: true,
};

function categoryLabel(article: NewsArticle) {
  return article.category || article.territory?.replaceAll("-", " ") || "Radar NexOps";
}

function articleSource(article: NewsArticle) {
  const source = article.sources?.find((item) => item.name && item.url);
  return {
    name: article.sourceName || source?.name || "NexOps",
    url: article.sourceUrl || source?.url || `/noticias/${article.slug}`,
  };
}

function publicationReasons(article: NewsArticle): DecisionReason[] {
  const source = articleSource(article);
  const reasons: DecisionReason[] = [
    {
      dimension: "business",
      label: "Relevancia comercial",
      evidence: article.excerpt || "La oportunidad fue convertida en una pieza útil para la audiencia de NexOps.",
      score: null,
    },
    {
      dimension: "source",
      label: "Calidad de fuente",
      evidence: `La publicación conserva trazabilidad hacia ${source.name}.`,
      score: null,
    },
  ];
  if (article.primaryKeyword || article.searchIntent) {
    reasons.push({
      dimension: "seo",
      label: "Valor SEO",
      evidence: article.primaryKeyword
        ? `Responde a una búsqueda concreta: ${article.primaryKeyword}.`
        : `Responde a una intención ${article.searchIntent?.replaceAll("-", " ")}.`,
      score: null,
    });
  }
  reasons.push({
    dimension: "novelty",
    label: "Novedad",
    evidence: article.primaryEntity
      ? `Radar encontró un ángulo publicable alrededor de ${article.primaryEntity}.`
      : "Radar validó que el enfoque aportara una idea editorial diferenciada.",
    score: null,
  });
  return reasons;
}

function articleToOpportunity(article: NewsArticle): Opportunity {
  const source = articleSource(article);
  const score = article.engineScore || 0;
  return {
    id: article.engineRunId || article.slug,
    title: article.title,
    topic: article.primaryEntity || article.primaryKeyword || categoryLabel(article),
    category: categoryLabel(article),
    summary: article.excerpt || article.metaDescription || "Publicación generada por Radar.",
    sourceName: source.name,
    sourceUrl: source.url,
    detectedAt: new Date(article.publishedAt).toISOString(),
    potential: score >= 90 ? "high" : score >= 75 ? "medium" : "low",
    status: "published",
    explanation: article.excerpt || "Radar encontró evidencia suficiente para convertir la oportunidad en contenido.",
    businessSignal: "La oportunidad superó los controles editoriales y ya trabaja como contenido público.",
    decisionReasons: publicationReasons(article),
    decisionConclusion: "Radar decidió publicarla y la publicación está disponible en producción.",
    imageUrl: article.coverImage || "",
    publicScore: score,
    technicalReference: article.engineRunId || article.slug,
    publicationId: `publication-${article.slug}`,
  };
}

function articleToPublication(article: NewsArticle): Publication {
  return {
    id: `publication-${article.slug}`,
    opportunityId: article.engineRunId || article.slug,
    title: article.title,
    category: categoryLabel(article),
    publishedAt: new Date(article.publishedAt).toISOString(),
    url: `/noticias/${article.slug}`,
    imageUrl: article.coverImage || "",
    reason: article.excerpt || "Radar validó la oportunidad y la convirtió en contenido público.",
    origin: "automatic",
    status: "verified",
  };
}

function decisionToOpportunity(decision: PrivateDecision): Opportunity {
  return {
    id: decision.id,
    title: decision.title,
    topic: decision.topic,
    category: decision.category,
    summary: decision.reason,
    sourceName: decision.sourceName,
    sourceUrl: decision.sourceUrl,
    detectedAt: decision.detectedAt,
    potential: decision.score >= 85 ? "high" : decision.score >= 65 ? "medium" : "low",
    status: "discarded",
    explanation: decision.reason,
    businessSignal: "No publicarla protegió el foco editorial de NexOps.",
    decisionReasons: decision.scoreBreakdown.map((reason) => ({
      ...reason,
      evidence: `${reason.label}: ${reason.score} de 100.`,
    })),
    decisionConclusion: decision.reason,
    revisitNote: "La decisión queda guardada y puede reevaluarse si aparece nueva evidencia.",
    imageUrl: "",
    publicScore: decision.score,
    technicalReference: decision.runId,
  };
}

function isWithinDays(value: string, days: number, now: Date) {
  const date = new Date(value);
  const age = now.getTime() - date.getTime();
  return !Number.isNaN(date.getTime()) && age >= 0 && age <= days * 86_400_000;
}

function publicArticles() {
  return Object.values(newsModules)
    .filter((article) => article.generatedByEngine === true && article.engineRunId && Number.isFinite(article.engineScore))
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

export function buildRadarData(decisions: PrivateDecision[] = [], options: { connectionState?: "live" | "degraded" | "loading"; message?: string; now?: Date } = {}): RadarControlCenterData {
  const now = options.now || new Date();
  const articles = publicArticles();
  const rejected = decisions.filter((decision) => decision.kind === "opportunity");
  const validations = decisions.filter((decision) => decision.kind === "validation");
  const publishedOpportunities = articles.map(articleToOpportunity);
  const rejectedOpportunities = rejected.map(decisionToOpportunity);
  const publications = articles.map(articleToPublication);
  const history: ActivityEvent[] = [
    ...publications.map((publication) => ({
      id: `history-${publication.id}`,
      occurredAt: publication.publishedAt,
      title: "Publicación verificada correctamente",
      detail: `${publication.title} está disponible en producción.`,
      tone: "success" as const,
      technicalReference: publishedOpportunities.find((item) => item.publicationId === publication.id)?.technicalReference,
    })),
    ...rejected.map((decision) => ({
      id: `history-${decision.id}`,
      occurredAt: decision.detectedAt,
      title: "Radar decidió no publicar una oportunidad",
      detail: `${decision.title}: ${decision.reason}`,
      tone: "neutral" as const,
      technicalReference: decision.runId,
    })),
    ...validations.map((decision) => ({
      id: `history-${decision.id}`,
      occurredAt: decision.detectedAt,
      title: "Validación operativa completada",
      detail: "Radar verificó la persistencia de una decisión sin convertirla en oportunidad de negocio.",
      tone: "info" as const,
      technicalReference: decision.runId,
    })),
  ].sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));

  const opportunities = [...publishedOpportunities, ...rejectedOpportunities]
    .sort((left, right) => right.detectedAt.localeCompare(left.detectedAt));
  const connectionState = options.connectionState || "live";

  return {
    generatedAt: now.toISOString(),
    connection: {
      state: connectionState,
      message: options.message || "Publicaciones y decisiones sincronizadas con las fuentes reales de Radar.",
      lastUpdatedAt: now.toISOString(),
    },
    status: connectionState === "live"
      ? { state: "working", title: "Radar opera con datos reales", detail: "Las publicaciones y decisiones visibles provienen de las fuentes canónicas de NexOps." }
      : { state: "attention", title: "El historial necesita atención", detail: options.message || "Las publicaciones están disponibles, pero el historial privado no pudo actualizarse." },
    summary: {
      detectedThisWeek: opportunities.filter((item) => isWithinDays(item.detectedAt, 7, now)).length,
      publishedThisWeek: publications.filter((item) => isWithinDays(item.publishedAt, 7, now)).length,
      trackingNow: 0,
      discardedThisWeek: rejected.filter((item) => isWithinDays(item.detectedAt, 7, now)).length,
      attentionRequired: connectionState === "live" ? 0 : 1,
    },
    opportunities,
    publications,
    configuration: radarDefaultConfiguration,
    history,
  };
}

export const initialRadarData = buildRadarData([], {
  connectionState: "loading",
  message: "Radar está actualizando el historial de decisiones.",
});

export async function loadRadarData(signal?: AbortSignal): Promise<RadarControlCenterData> {
  try {
    const response = await fetch("/api/radar-decisions", { headers: { accept: "application/json" }, signal });
    const body = await response.json().catch(() => null) as DecisionsResponse | null;
    if (!response.ok || body?.status !== "ready") {
      return buildRadarData([], {
        connectionState: "degraded",
        message: body?.message || "Las publicaciones están disponibles, pero el historial privado no pudo actualizarse.",
      });
    }
    return buildRadarData(body.decisions || [], { connectionState: "live" });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return buildRadarData([], {
      connectionState: "degraded",
      message: "Las publicaciones están disponibles, pero el historial privado no pudo actualizarse.",
    });
  }
}
