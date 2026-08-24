export type OpportunityPotential = "high" | "medium" | "low";
export type OpportunityStatus =
  | "tracking"
  | "ready"
  | "published"
  | "discarded"
  | "review";
export type GoalPriority = "primary" | "secondary" | "off";
export type Selectivity = "selective" | "balanced" | "active";
export type Autonomy = "automatic" | "assisted" | "manual";
export type SourcePreference = "official" | "recognized" | "broad";
export type ActivityTone = "success" | "attention" | "info" | "neutral";
export type DecisionDimension =
  | "seo"
  | "business"
  | "timeliness"
  | "source"
  | "novelty"
  | "editorial-risk";

export interface DecisionReason {
  dimension: DecisionDimension;
  label: string;
  evidence: string;
}

export interface BusinessGoal {
  id: string;
  label: string;
  description: string;
  priority: GoalPriority;
}

export interface BusinessTopic {
  id: string;
  label: string;
  enabled: boolean;
}

export interface BusinessRestriction {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface BusinessConfiguration {
  goals: BusinessGoal[];
  topics: BusinessTopic[];
  selectivity: Selectivity;
  autonomy: Autonomy;
  sourcePreference: SourcePreference;
  restrictions: BusinessRestriction[];
  maximumPerWeek: number;
  enabledDays: string[];
  avoidSimilarTopics: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  topic: string;
  category: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  detectedAt: string;
  potential: OpportunityPotential;
  status: OpportunityStatus;
  explanation: string;
  businessSignal: string;
  decisionReasons: DecisionReason[];
  decisionConclusion: string;
  revisitNote?: string;
  imageUrl: string;
  publicScore: number;
  technicalReference: string;
  publicationId?: string;
}

export interface Publication {
  id: string;
  opportunityId: string;
  title: string;
  category: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  reason: string;
  origin: "automatic" | "manual";
  status: "verified" | "processing";
}

export interface ActivityEvent {
  id: string;
  occurredAt: string;
  title: string;
  detail: string;
  tone: ActivityTone;
  technicalReference?: string;
}

export interface BusinessSummary {
  detectedThisWeek: number;
  publishedThisWeek: number;
  trackingNow: number;
  discardedThisWeek: number;
  attentionRequired: number;
}

export interface RadarControlCenterData {
  generatedAt: string;
  status: {
    state: "working" | "paused" | "attention";
    title: string;
    detail: string;
  };
  summary: BusinessSummary;
  opportunities: Opportunity[];
  publications: Publication[];
  configuration: BusinessConfiguration;
  history: ActivityEvent[];
}
