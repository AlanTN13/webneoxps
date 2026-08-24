import { createElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  ArchiveX,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  ExternalLink,
  FileSearch,
  GitCommitHorizontal,
  LayoutDashboard,
  Menu,
  Radio,
  ScrollText,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { getCandidate, radarFixture } from "./fixtures";
import "./radar-control-center.css";

const navItems = [
  { label: "Overview", path: "/radar", icon: LayoutDashboard },
  { label: "Activity / Runs", path: "/radar/activity", icon: Activity },
  { label: "Rejected", path: "/radar/rejected", icon: ArchiveX },
  { label: "Published", path: "/radar/published", icon: BookOpenCheck },
  { label: "Audit Log", path: "/radar/audit", icon: ScrollText },
];

const outcomeLabels = {
  PUBLISHED: "Published",
  REJECTED: "Rejected",
  FAILED: "Failed",
  RUNNING: "Running",
};

function formatTime(value) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function purposeLabel(value) {
  return {
    actualidad: "Actualidad aplicada",
    seo: "Guía y problema",
    criterio: "Criterio NexOps",
    caso: "Caso y aplicación",
  }[value] || value;
}

function StatusPill({ outcome }) {
  return (
    <span className={`radar-status radar-status--${outcome.toLowerCase()}`}>
      <span className="radar-status__dot" aria-hidden="true" />
      {outcomeLabels[outcome]}
    </span>
  );
}

function MetricCard({ label, value, meta, tone, icon }) {
  return (
    <article className="radar-metric-card">
      <div className={`radar-metric-card__icon radar-metric-card__icon--${tone}`}>
        {createElement(icon, { size: 18, strokeWidth: 1.9 })}
      </div>
      <div>
        <span className="radar-metric-card__label">{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
    </article>
  );
}

function Overview() {
  const { metrics, runs } = radarFixture;

  return (
    <>
      <section className="radar-hero-panel">
        <div>
          <span className="radar-eyebrow"><Sparkles size={14} /> Control Center</span>
          <h1>La operación editorial, en una sola vista.</h1>
          <p>Seguimiento read-only de candidatos, decisiones y publicaciones del Radar.</p>
        </div>
        <div className="radar-live-card">
          <span><Radio size={15} /> Sistema operativo</span>
          <strong>Todos los servicios estables</strong>
          <small>Actualizado hace menos de un minuto</small>
        </div>
      </section>

      <section className="radar-metrics" aria-label="Métricas principales">
        <MetricCard label="Runs hoy" value={metrics.runsToday} meta="3 en las últimas 2 h" tone="violet" icon={Activity} />
        <MetricCard label="Publicados" value={metrics.publishedThisWeek} meta="Esta semana" tone="green" icon={BookOpenCheck} />
        <MetricCard label="Rechazados" value={metrics.rejectedThisWeek} meta="Historial preservado" tone="amber" icon={ArchiveX} />
        <MetricCard label="Runs saludables" value={`${metrics.successRate}%`} meta={`Promedio ${metrics.averageDuration}`} tone="blue" icon={ShieldCheck} />
      </section>

      <section className="radar-panel radar-runs-panel">
        <div className="radar-panel__header">
          <div>
            <span className="radar-panel__kicker">Actividad en vivo</span>
            <h2>Últimas ejecuciones</h2>
          </div>
          <Link to="/radar/activity" className="radar-text-link">Ver toda la actividad <ChevronRight size={16} /></Link>
        </div>
        <div className="radar-run-list">
          {runs.slice(0, 4).map((run) => (
            <Link to={`/radar/candidates/${run.candidateId}`} className="radar-run-row" key={run.id}>
              <div className="radar-run-row__state"><CircleDot size={18} /></div>
              <div className="radar-run-row__main">
                <strong>{run.title}</strong>
                <span>{run.source} · {run.engineRunId}</span>
              </div>
              <div className="radar-run-row__time">
                <Clock3 size={14} /> {formatTime(run.startedAt)}
              </div>
              <StatusPill outcome={run.outcome} />
              <ChevronRight className="radar-run-row__chevron" size={18} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ViewHeader({ eyebrow, title, description, meta }) {
  return (
    <header className="radar-view-header">
      <div>
        <span className="radar-panel__kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {meta && <span className="radar-view-header__meta">{meta}</span>}
    </header>
  );
}

function ActivityView() {
  const { runs, metrics } = radarFixture;
  return (
    <>
      <ViewHeader eyebrow="Activity / Runs" title="Ejecuciones recientes" description="Una línea de tiempo consolidada de las decisiones procesadas por Radar." meta={`${runs.length} runs en la muestra`} />
      <section className="radar-activity-summary" aria-label="Resumen de ejecuciones">
        <div><Activity size={17} /><span>Runs hoy</span><strong>{metrics.runsToday}</strong></div>
        <div><CheckCircle2 size={17} /><span>Salud del sistema</span><strong>{metrics.successRate}%</strong></div>
        <div><Clock3 size={17} /><span>Duración promedio</span><strong>{metrics.averageDuration}</strong></div>
      </section>
      <section className="radar-panel radar-table-panel">
        <div className="radar-table-heading radar-activity-grid" aria-hidden="true">
          <span>Candidato</span><span>Inicio</span><span>Duración</span><span>Score público</span><span>Resultado</span><span />
        </div>
        <div className="radar-table-body">
          {runs.map((run) => (
            <Link to={`/radar/candidates/${run.candidateId}`} className="radar-table-row radar-activity-grid" key={run.id}>
              <div className="radar-table-primary"><span className="radar-table-icon"><GitCommitHorizontal size={17} /></span><div><strong>{run.title}</strong><small>{run.source} · {run.engineRunId}</small></div></div>
              <span data-label="Inicio">{formatDateTime(run.startedAt)}</span>
              <span data-label="Duración">{run.duration}</span>
              <strong className="radar-table-score" data-label="Score público">{run.scoreTotal}</strong>
              <StatusPill outcome={run.outcome} />
              <ChevronRight size={17} className="radar-table-chevron" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function CandidateCollection({ status }) {
  const published = status === "published";
  const candidates = radarFixture.candidates.filter((candidate) => candidate.status === status);

  return (
    <>
      <ViewHeader
        eyebrow={published ? "Published" : "Rejected"}
        title={published ? "Contenido publicado" : "Candidatos rechazados"}
        description={published ? "Piezas que completaron el circuito y llegaron a una URL pública verificada." : "Decisiones conservadas para trazabilidad, sin modificar el corpus público."}
        meta={`${candidates.length} registros en la muestra`}
      />
      <section className="radar-collection-grid">
        {candidates.map((candidate) => (
          <Link to={`/radar/candidates/${candidate.id}`} className="radar-candidate-card" key={candidate.id}>
            <div className="radar-candidate-card__top">
              <StatusPill outcome={published ? "PUBLISHED" : "REJECTED"} />
              <span className="radar-score-badge">{candidate.scoreTotal}<small>/100</small></span>
            </div>
            <div>
              <span className="radar-candidate-card__type">{purposeLabel(candidate.contentPurpose)}</span>
              <h2>{candidate.title}</h2>
              <p>{candidate.summary}</p>
            </div>
            {!published && <div className="radar-decision-note"><ArchiveX size={15} /><span>{candidate.rejectionReason}</span></div>}
            {published && <div className="radar-decision-note radar-decision-note--success"><CheckCircle2 size={15} /><span>Producción verificada</span></div>}
            <footer><span>{candidate.sourceName}</span><span>{formatDateTime(candidate.decisionAt)}</span><ChevronRight size={17} /></footer>
          </Link>
        ))}
      </section>
    </>
  );
}

function ScoreRing({ score }) {
  return (
    <div className="radar-score-ring" style={{ "--radar-score": `${score * 3.6}deg` }} aria-label={`Score público ${score} de 100`}>
      <div><strong>{score}</strong><span>/100</span></div>
    </div>
  );
}

function CandidateDetail({ candidateId }) {
  const candidate = getCandidate(candidateId);
  if (!candidate) return <PlaceholderView title="Candidato no encontrado" description="El fixture solicitado no contiene este identificador." />;

  const outcome = { published: "PUBLISHED", rejected: "REJECTED", reviewing: "RUNNING", failed: "FAILED" }[candidate.status];
  return (
    <>
      <Link to="/radar/activity" className="radar-back-link"><ArrowLeft size={16} /> Volver a Activity</Link>
      <section className="radar-detail-hero">
        <div className="radar-detail-hero__copy">
          <div className="radar-detail-hero__meta"><StatusPill outcome={outcome} /><span>{purposeLabel(candidate.contentPurpose)}</span></div>
          <h1>{candidate.title}</h1>
          <p>{candidate.summary}</p>
          <div className="radar-detail-tags"><span>{candidate.territory}</span><span>{candidate.engineRunId}</span></div>
        </div>
        <ScoreRing score={candidate.scoreTotal} />
      </section>

      <div className="radar-detail-grid">
        <div className="radar-detail-main">
          <section className="radar-panel radar-detail-section">
            <div className="radar-panel__header"><div><span className="radar-panel__kicker">Evaluación pública</span><h2>Señales del candidato</h2></div><span className="radar-section-note">Sin fórmulas ni pesos internos</span></div>
            <div className="radar-signal-list">
              {candidate.publicSignals.map((signal) => (
                <div className="radar-signal" key={signal.key}>
                  <div><span>{signal.label}</span><strong>{signal.score}</strong></div>
                  <div className="radar-signal__track"><span style={{ width: `${signal.score}%` }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section className="radar-panel radar-detail-section">
            <div className="radar-panel__header"><div><span className="radar-panel__kicker">Decisión</span><h2>Resultado editorial</h2></div></div>
            <div className={`radar-result-box radar-result-box--${candidate.status}`}>
              {candidate.status === "published" ? <CheckCircle2 size={21} /> : candidate.status === "rejected" ? <ArchiveX size={21} /> : <Activity size={21} />}
              <div>
                <strong>{candidate.status === "published" ? "Publicado y verificado" : candidate.status === "rejected" ? "No publicado" : "Evaluación en curso"}</strong>
                <p>{candidate.rejectionReason || (candidate.publishedUrl ? "La pieza completó los gates editoriales, técnicos y de producción." : "El run todavía no emitió una decisión final.")}</p>
                {candidate.publishedUrl && <a href={candidate.publishedUrl}>Ver contenido publicado <ArrowUpRight size={15} /></a>}
              </div>
            </div>
          </section>
        </div>

        <aside className="radar-detail-aside">
          <section className="radar-panel radar-detail-section">
            <div className="radar-panel__header"><div><span className="radar-panel__kicker">Candidate</span><h2>Registro</h2></div></div>
            <dl className="radar-facts">
              <div><dt><Database size={14} /> Fuente</dt><dd><a href={candidate.sourceUrl} target="_blank" rel="noreferrer">{candidate.sourceName} <ExternalLink size={12} /></a></dd></div>
              <div><dt><CalendarDays size={14} /> Recibido</dt><dd>{formatDateTime(candidate.submittedAt)}</dd></div>
              {candidate.decisionAt && <div><dt><CheckCircle2 size={14} /> Decisión</dt><dd>{formatDateTime(candidate.decisionAt)}</dd></div>}
              <div><dt><GitCommitHorizontal size={14} /> Run ID</dt><dd>{candidate.engineRunId}</dd></div>
            </dl>
          </section>
          <div className="radar-readonly-note"><ShieldCheck size={17} /><div><strong>Vista de solo lectura</strong><p>Este prototipo no publica, recalcula ni modifica reglas.</p></div></div>
        </aside>
      </div>
    </>
  );
}

function AuditLog() {
  return (
    <>
      <ViewHeader eyebrow="Audit Log" title="Trazabilidad del sistema" description="Eventos relevantes del ciclo editorial, ordenados desde el más reciente." meta="Fixtures read-only" />
      <section className="radar-panel radar-audit-panel">
        {radarFixture.audit.map((entry) => (
          <article className="radar-audit-entry" key={entry.id}>
            <div className={`radar-audit-entry__marker radar-audit-entry__marker--${entry.tone}`}><span /></div>
            <div className="radar-audit-entry__time"><strong>{formatTime(entry.occurredAt)}</strong><span>{formatDateTime(entry.occurredAt).split(",")[0]}</span></div>
            <div className="radar-audit-entry__body"><strong>{entry.event}</strong><p>{entry.detail}</p><small>{entry.actor}</small></div>
            <code>{entry.reference}</code>
          </article>
        ))}
      </section>
    </>
  );
}

function PlaceholderView({ title = "Vista no disponible", description = "Esta ruta no forma parte del prototipo actual." }) {
  return (
    <section className="radar-panel radar-placeholder">
      <FileSearch size={28} />
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

function CurrentView({ pathname }) {
  if (pathname === "/radar" || pathname === "/radar/") return <Overview />;
  if (pathname === "/radar/activity") return <ActivityView />;
  if (pathname === "/radar/rejected") return <CandidateCollection status="rejected" />;
  if (pathname === "/radar/published") return <CandidateCollection status="published" />;
  if (pathname === "/radar/audit") return <AuditLog />;
  if (pathname.startsWith("/radar/candidates/")) return <CandidateDetail candidateId={pathname.split("/").pop()} />;
  return <PlaceholderView />;
}

function currentPageName(pathname) {
  if (pathname.startsWith("/radar/candidates/")) return "Candidate detail";
  if (pathname === "/radar/") return "Overview";
  return navItems.find((item) => item.path === pathname)?.label || "Control Center";
}

export default function RadarControlCenter() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOverview = location.pathname === "/radar" || location.pathname === "/radar/";

  useEffect(() => {
    document.title = `${currentPageName(location.pathname)} · Radar Control Center`;
  }, [location.pathname]);

  return (
    <div className="radar-app">
      <aside className={`radar-sidebar ${mobileOpen ? "radar-sidebar--open" : ""}`}>
        <div className="radar-brand">
          <span className="radar-brand__mark">N</span>
          <div><strong>Radar</strong><small>Control Center</small></div>
          <button type="button" className="radar-icon-button radar-sidebar__close" onClick={() => setMobileOpen(false)} aria-label="Cerrar navegación"><X size={20} /></button>
        </div>
        <nav className="radar-nav" aria-label="Control Center">
          <span className="radar-nav__label">Workspace</span>
          {navItems.map(({ label, path, icon }) => {
            const active = path === "/radar" ? isOverview : location.pathname.startsWith(path);
            return (
              <Link key={path} to={path} className={`radar-nav__item ${active ? "radar-nav__item--active" : ""}`} onClick={() => setMobileOpen(false)}>
                {createElement(icon, { size: 18, strokeWidth: 1.8 })} {label}
              </Link>
            );
          })}
        </nav>
        <div className="radar-sidebar__footer">
          <div className="radar-readonly"><ShieldCheck size={16} /><div><strong>Read-only</strong><small>Datos de demostración</small></div></div>
        </div>
      </aside>
      {mobileOpen && <button className="radar-scrim" type="button" aria-label="Cerrar navegación" onClick={() => setMobileOpen(false)} />}

      <main className="radar-main">
        <header className="radar-topbar">
          <button type="button" className="radar-icon-button radar-menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir navegación"><Menu size={21} /></button>
          <div><span>Radar workspace</span><strong>{currentPageName(location.pathname)}</strong></div>
          <div className="radar-topbar__meta"><span className="radar-environment"><span /> Preview data</span><div className="radar-avatar">AF</div></div>
        </header>
        <div className="radar-content"><CurrentView pathname={location.pathname} /></div>
      </main>
    </div>
  );
}
