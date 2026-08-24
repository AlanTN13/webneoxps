export type RunOutcome = "PUBLISHED" | "REJECTED" | "FAILED" | "RUNNING";
export type CandidateStatus = "published" | "rejected" | "reviewing" | "failed";
export type AuditTone = "success" | "warning" | "danger" | "info" | "neutral";

export interface PublicSignal {
  key: "relevance" | "novelty" | "editorial-fit";
  label: string;
  score: number;
}

export interface CandidateRecord {
  id: string;
  engineRunId: string;
  title: string;
  topic: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  contentPurpose: "actualidad" | "seo" | "criterio" | "caso";
  territory: string;
  status: CandidateStatus;
  scoreTotal: number;
  publicSignals: PublicSignal[];
  submittedAt: string;
  decisionAt?: string;
  rejectionReason?: string;
  publishedUrl?: string;
}

export interface RunRecord {
  id: string;
  candidateId: string;
  engineRunId: string;
  outcome: RunOutcome;
  startedAt: string;
  finishedAt?: string;
  duration: string;
  source: string;
  title: string;
  scoreTotal: number;
}

export interface AuditEntry {
  id: string;
  occurredAt: string;
  event: string;
  detail: string;
  actor: "Radar Engine" | "Content Pipeline" | "Deployment Gate";
  reference: string;
  tone: AuditTone;
}

export interface DashboardMetrics {
  runsToday: number;
  publishedThisWeek: number;
  rejectedThisWeek: number;
  successRate: number;
  averageDuration: string;
}

export interface RadarControlCenterData {
  generatedAt: string;
  metrics: DashboardMetrics;
  runs: RunRecord[];
  candidates: CandidateRecord[];
  audit: AuditEntry[];
}
