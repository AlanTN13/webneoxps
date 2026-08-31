import { createElement, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Compass,
  ExternalLink,
  FileSearch,
  Gauge,
  History,
  Home,
  Lightbulb,
  Menu,
  Minus,
  Plus,
  Radar,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { initialRadarData, loadRadarData } from "./data";
import "./radar-control-center.css";

const navItems = [
  { label: "Inicio", path: "/radar", icon: Home },
  { label: "Oportunidades", path: "/radar/opportunities", icon: Lightbulb },
  { label: "Publicadas", path: "/radar/published", icon: BookOpenCheck },
  { label: "Configuración", path: "/radar/configuration", icon: Settings2 },
  { label: "Historial", path: "/radar/history", icon: History },
];

const potentialLabels = { high: "Alto potencial", medium: "Potencial medio", low: "Bajo potencial" };
const statusLabels = {
  tracking: "En observación",
  ready: "Lista para avanzar",
  published: "Publicada",
  discarded: "Descartada",
  review: "Necesita atención",
};
const priorityLabels = { primary: "Principal", secondary: "Secundario", off: "Sin priorizar" };

function decisionHeading(status) {
  if (status === "discarded") return "Por qué Radar decidió no publicarla";
  if (status === "tracking") return "Por qué Radar sigue observándola";
  if (status === "review") return "Por qué Radar pide una revisión";
  return "Por qué Radar recomienda publicarla";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function ViewHeader({ eyebrow, title, description, meta }) {
  return (
    <header className="radar-view-header">
      <div>
        <span className="radar-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {meta && <span className="radar-view-header__meta">{meta}</span>}
    </header>
  );
}

function PotentialPill({ potential }) {
  return <span className={`radar-pill radar-pill--${potential}`}>{potentialLabels[potential]}</span>;
}

function StatusPill({ status }) {
  return <span className={`radar-state radar-state--${status}`}><span />{statusLabels[status]}</span>;
}

function MetricCard({ icon, label, value, detail, tone }) {
  return (
    <article className="radar-metric">
      <span className={`radar-metric__icon radar-metric__icon--${tone}`}>{createElement(icon, { size: 19 })}</span>
      <div><small>{label}</small><strong>{value}</strong><span>{detail}</span></div>
    </article>
  );
}

function EmptyState({ title, detail }) {
  return <div className="radar-empty-state"><FileSearch size={24} /><strong>{title}</strong><p>{detail}</p></div>;
}

function ConnectionNotice({ connection }) {
  if (connection.state === "live") return null;
  return (
    <div className={`radar-connection-notice radar-connection-notice--${connection.state}`} role="status">
      <CircleAlert size={18} />
      <div><strong>{connection.state === "loading" ? "Actualizando datos reales" : "Historial parcialmente disponible"}</strong><span>{connection.message}</span></div>
    </div>
  );
}

function OpportunityCard({ opportunity, featured = false }) {
  return (
    <Link className={`radar-opportunity-card ${featured ? "radar-opportunity-card--featured" : ""}`} to={`/radar/opportunities/${opportunity.id}`}>
      <div className="radar-opportunity-card__image">
        {opportunity.imageUrl ? <img src={opportunity.imageUrl} alt="" /> : <span className="radar-opportunity-card__fallback"><Radar size={28} /></span>}
        <PotentialPill potential={opportunity.potential} />
      </div>
      <div className="radar-opportunity-card__body">
        <div className="radar-opportunity-card__meta"><span>{opportunity.category}</span><StatusPill status={opportunity.status} /></div>
        <h3>{opportunity.title}</h3>
        <p>{opportunity.explanation}</p>
        {!featured && (
          <div className={`radar-card-decision radar-card-decision--${opportunity.status}`}>
            <strong>{decisionHeading(opportunity.status)}</strong>
            <p>{opportunity.decisionConclusion}</p>
          </div>
        )}
        <footer><span>{opportunity.sourceName}</span><span>Ver oportunidad <ChevronRight size={15} /></span></footer>
      </div>
    </Link>
  );
}

function HomeView({ data }) {
  const featured = data.opportunities.filter((item) => item.potential === "high").slice(0, 3);
  const attention = data.opportunities.find((item) => item.status === "review");

  return (
    <>
      <section className="radar-hero">
        <div className="radar-hero__copy">
          <span className="radar-eyebrow"><Sparkles size={14} /> Inteligencia editorial autónoma</span>
          <h1>Radar encuentra oportunidades y las convierte en contenido con criterio.</h1>
          <p>Definí qué querés lograr. Radar observa el mercado, protege el foco de tu marca y avanza sólo cuando una oportunidad lo merece.</p>
          <Link className="radar-primary-link" to="/radar/configuration">Definir cómo debe trabajar <ArrowUpRight size={16} /></Link>
        </div>
        <div className="radar-working-card">
          <div className="radar-working-card__pulse"><Radar size={24} /><span /></div>
          <span className="radar-kicker">Trabajando ahora</span>
          <strong>{data.status.title}</strong>
          <p>{data.status.detail}</p>
          <small>Última actualización · {formatDateTime(data.generatedAt)}</small>
        </div>
      </section>

      <section className="radar-metrics" aria-label="Resultados de esta semana">
        <MetricCard icon={Compass} label="Detectadas esta semana" value={data.summary.detectedThisWeek} detail="Oportunidades relevantes" tone="violet" />
        <MetricCard icon={BookOpenCheck} label="Publicadas" value={data.summary.publishedThisWeek} detail="Contenido puesto a trabajar" tone="green" />
        <MetricCard icon={Activity} label="En observación" value={data.summary.trackingNow} detail="Radar sigue buscando señales" tone="blue" />
        <MetricCard icon={ShieldCheck} label="Descartadas" value={data.summary.discardedThisWeek} detail="Ruido que no llegó a tu marca" tone="amber" />
      </section>

      {attention && (
        <Link className="radar-attention" to={`/radar/opportunities/${attention.id}`}>
          <span className="radar-attention__icon"><CircleAlert size={19} /></span>
          <div><strong>Hay una oportunidad que necesita tu atención</strong><p>{attention.title} tiene potencial, pero requiere confirmar el enfoque.</p></div>
          <span>Revisar <ChevronRight size={16} /></span>
        </Link>
      )}

      <section className="radar-section-heading">
        <div><span className="radar-kicker">Lo más prometedor</span><h2>Oportunidades con impacto para el negocio</h2></div>
        <Link to="/radar/opportunities">Ver todas <ChevronRight size={16} /></Link>
      </section>
      <section className="radar-opportunity-grid radar-opportunity-grid--home">
        {featured.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} featured />)}
      </section>
      {featured.length === 0 && <EmptyState title="Todavía no hay oportunidades publicables" detail="Radar mostrará acá las próximas decisiones reales cuando aparezcan." />}
    </>
  );
}

function OpportunitiesView({ data }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? data.opportunities : data.opportunities.filter((item) => item.status === filter);
  return (
    <>
      <ViewHeader eyebrow="Oportunidades" title="Ideas que merecen una decisión" description="Radar ordena lo que encuentra por valor para el negocio y explica por qué conviene avanzar, esperar o descartar." meta={`${data.opportunities.length} oportunidades`} />
      <div className="radar-filters" aria-label="Filtrar oportunidades">
        {[
          ["all", "Todas"], ["ready", "Listas"], ["tracking", "En observación"], ["review", "Con atención"], ["discarded", "Descartadas"],
        ].map(([value, label]) => <button key={value} type="button" className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>)}
      </div>
      <section className="radar-opportunity-grid">
        {filtered.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}
      </section>
      {filtered.length === 0 && <EmptyState title="No hay oportunidades en este estado" detail="La vista se actualizará cuando Radar registre una decisión real." />}
    </>
  );
}

function PublishedView({ data }) {
  return (
    <>
      <ViewHeader eyebrow="Publicadas" title="Contenido que Radar puso a trabajar" description="Cada pieza nace de una oportunidad concreta y queda vinculada con el motivo de negocio que justificó publicarla." meta={`${data.publications.length} publicaciones`} />
      <section className="radar-publication-list">
        {data.publications.map((publication) => (
          <article className="radar-publication" key={publication.id}>
            <img src={publication.imageUrl} alt="" />
            <div className="radar-publication__body">
              <div className="radar-publication__meta"><span>{publication.category}</span><span><Check size={13} /> Disponible</span></div>
              <h2>{publication.title}</h2>
              <p>{publication.reason}</p>
              <footer>
                <span><CalendarDays size={14} /> {formatDate(publication.publishedAt)}</span>
                <span><Sparkles size={14} /> Publicación automática</span>
                <a href={publication.url}>Ver publicación <ArrowUpRight size={15} /></a>
              </footer>
            </div>
          </article>
        ))}
      </section>
      {data.publications.length === 0 && <EmptyState title="Todavía no hay publicaciones de Radar" detail="Las publicaciones autónomas aparecerán acá después de quedar verificadas." />}
    </>
  );
}

const selectivityOptions = [
  { value: "selective", label: "Muy selectivo", detail: "Menos publicaciones, sólo con señales excepcionales." },
  { value: "balanced", label: "Equilibrado", detail: "Prioriza calidad con una cadencia constante." },
  { value: "active", label: "Más activo", detail: "Explora más oportunidades y acepta señales tempranas." },
];
const autonomyOptions = [
  { value: "automatic", label: "Automático", detail: "Avanza solo cuando se cumplen todos tus límites." },
  { value: "assisted", label: "Con confirmación", detail: "Pide aprobación antes de cada publicación." },
  { value: "manual", label: "Sólo sugerencias", detail: "Detecta oportunidades, sin avanzar por su cuenta." },
];
const sourceOptions = [
  { value: "official", label: "Sólo oficiales", detail: "Máxima autoridad, universo más acotado." },
  { value: "recognized", label: "Oficiales y reconocidas", detail: "Buen equilibrio entre confianza y variedad." },
  { value: "broad", label: "Exploración amplia", detail: "Suma fuentes emergentes que luego deben confirmarse." },
];

function ChoiceGroup({ label, description, options, value, onChange }) {
  return (
    <fieldset className="radar-choice-group">
      <legend>{label}</legend><p>{description}</p>
      <div className="radar-choice-grid">
        {options.map((option) => (
          <button key={option.value} type="button" className={value === option.value ? "is-selected" : ""} onClick={() => onChange(option.value)}>
            <span className="radar-radio">{value === option.value && <span />}</span>
            <strong>{option.label}</strong><small>{option.detail}</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="radar-toggle-row" onClick={() => onChange(!checked)}>
      <span><strong>{label}</strong><small>{description}</small></span>
      <span className={`radar-switch ${checked ? "is-on" : ""}`}><span /></span>
    </button>
  );
}

function ConfigurationView({ initialConfiguration }) {
  const [configuration, setConfiguration] = useState(() => structuredClone(initialConfiguration));
  const update = (key, value) => setConfiguration((current) => ({ ...current, [key]: value }));
  const activeTopics = configuration.topics.filter((topic) => topic.enabled).map((topic) => topic.label);
  const primaryGoal = configuration.goals.find((goal) => goal.priority === "primary")?.label || "un objetivo principal";

  function cycleGoal(goalId) {
    const order = ["primary", "secondary", "off"];
    update("goals", configuration.goals.map((goal) => goal.id === goalId ? { ...goal, priority: order[(order.indexOf(goal.priority) + 1) % order.length] } : goal));
  }

  function toggleTopic(topicId) {
    update("topics", configuration.topics.map((topic) => topic.id === topicId ? { ...topic, enabled: !topic.enabled } : topic));
  }

  function toggleRestriction(restrictionId) {
    update("restrictions", configuration.restrictions.map((item) => item.id === restrictionId ? { ...item, enabled: !item.enabled } : item));
  }

  function toggleDay(day) {
    const enabledDays = configuration.enabledDays.includes(day)
      ? configuration.enabledDays.filter((item) => item !== day)
      : [...configuration.enabledDays, day];
    update("enabledDays", enabledDays);
  }

  return (
    <>
      <ViewHeader eyebrow="Configuración" title="Decile a Radar qué querés lograr" description="Estas decisiones traducen tus objetivos de negocio en una forma de trabajar clara, selectiva y protegida." />
      <div className="radar-demo-banner"><ShieldCheck size={18} /><div><strong>Simulación local</strong><span>Podés explorar libremente: estos cambios no se guardan ni afectan al Radar real.</span></div></div>

      <div className="radar-config-layout">
        <div className="radar-config-main">
          <section className="radar-config-section">
            <div className="radar-config-section__heading"><span>1</span><div><h2>Objetivos de negocio</h2><p>Marcá qué resultados debe priorizar Radar. Tocá cada opción para cambiar su peso.</p></div></div>
            <div className="radar-goal-grid">
              {configuration.goals.map((goal) => (
                <button type="button" key={goal.id} className={`radar-goal-card radar-goal-card--${goal.priority}`} onClick={() => cycleGoal(goal.id)}>
                  <span className="radar-goal-card__icon"><Target size={18} /></span>
                  <strong>{goal.label}</strong><p>{goal.description}</p><small>{priorityLabels[goal.priority]}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="radar-config-section">
            <div className="radar-config-section__heading"><span>2</span><div><h2>Territorios que importan</h2><p>Radar concentrará su atención en los temas activos.</p></div></div>
            <div className="radar-topic-list">
              {configuration.topics.map((topic) => <button type="button" key={topic.id} className={topic.enabled ? "is-selected" : ""} onClick={() => toggleTopic(topic.id)}>{topic.enabled && <Check size={15} />}{topic.label}</button>)}
            </div>
          </section>

          <section className="radar-config-section">
            <div className="radar-config-section__heading"><span>3</span><div><h2>Criterio y autonomía</h2><p>Elegí cuánto debe filtrar y hasta dónde puede avanzar solo.</p></div></div>
            <ChoiceGroup label="Nivel de selectividad" description="Define cuánta evidencia necesita una oportunidad para avanzar." options={selectivityOptions} value={configuration.selectivity} onChange={(value) => update("selectivity", value)} />
            <ChoiceGroup label="Nivel de autonomía" description="Define cuándo Radar debe involucrarte en una decisión." options={autonomyOptions} value={configuration.autonomy} onChange={(value) => update("autonomy", value)} />
            <ChoiceGroup label="Preferencia de fuentes" description="Define dónde puede buscar señales inicialmente." options={sourceOptions} value={configuration.sourcePreference} onChange={(value) => update("sourcePreference", value)} />
          </section>

          <section className="radar-config-section">
            <div className="radar-config-section__heading"><span>4</span><div><h2>Límites de marca</h2><p>Condiciones que Radar debe respetar siempre.</p></div></div>
            <div className="radar-toggle-list">
              {configuration.restrictions.map((item) => <Toggle key={item.id} checked={item.enabled} onChange={() => toggleRestriction(item.id)} label={item.label} description={item.description} />)}
            </div>
          </section>

          <section className="radar-config-section">
            <div className="radar-config-section__heading"><span>5</span><div><h2>Ritmo de publicación</h2><p>Marcá una cadencia sostenible para tu marca.</p></div></div>
            <div className="radar-rhythm-grid">
              <div className="radar-stepper"><span><strong>Máximo por semana</strong><small>Radar nunca superará este límite.</small></span><div><button type="button" aria-label="Reducir máximo semanal" onClick={() => update("maximumPerWeek", Math.max(1, configuration.maximumPerWeek - 1))}><Minus size={16} /></button><strong>{configuration.maximumPerWeek}</strong><button type="button" aria-label="Aumentar máximo semanal" onClick={() => update("maximumPerWeek", Math.min(7, configuration.maximumPerWeek + 1))}><Plus size={16} /></button></div></div>
              <div className="radar-days"><strong>Días habilitados</strong><div>{["Lun", "Mar", "Mié", "Jue", "Vie"].map((day) => <button key={day} type="button" className={configuration.enabledDays.includes(day) ? "is-selected" : ""} onClick={() => toggleDay(day)}>{day}</button>)}</div></div>
              <Toggle checked={configuration.avoidSimilarTopics} onChange={(value) => update("avoidSimilarTopics", value)} label="Evitar temas parecidos seguidos" description="Ayuda a mantener una agenda editorial variada." />
            </div>
          </section>
        </div>

        <aside className="radar-config-summary">
          <div className="radar-config-summary__icon"><Gauge size={22} /></div>
          <span className="radar-kicker">Así trabajaría Radar</span>
          <h2>Una operación autónoma, con límites visibles.</h2>
          <p>Buscaría principalmente <strong>{activeTopics.slice(0, 3).join(", ") || "los temas que actives"}</strong> para <strong>{primaryGoal.toLowerCase()}</strong>.</p>
          <ul>
            <li><Check size={15} /> Publicaría hasta {configuration.maximumPerWeek} veces por semana.</li>
            <li><Check size={15} /> Trabajaría en modo {autonomyOptions.find((item) => item.value === configuration.autonomy)?.label.toLowerCase()}.</li>
            <li><Check size={15} /> Aplicaría {configuration.restrictions.filter((item) => item.enabled).length} límites de marca.</li>
          </ul>
          <div className="radar-config-summary__note">Esta vista explica el comportamiento esperado. No expone ni modifica la inteligencia propietaria de NexOps.</div>
        </aside>
      </div>
    </>
  );
}

function HistoryView({ data }) {
  return (
    <>
      <ViewHeader eyebrow="Historial" title="Qué hizo Radar y por qué" description="Una línea de tiempo comprensible de oportunidades descartadas y publicaciones verificadas." meta="Actividad real" />
      <section className="radar-history">
        {data.history.map((event) => (
          <article className="radar-history__event" key={event.id}>
            <span className={`radar-history__marker radar-history__marker--${event.tone}`} />
            <time>{formatDateTime(event.occurredAt)}</time>
            <div><strong>{event.title}</strong><p>{event.detail}</p>{event.technicalReference && <details><summary>Ver referencia técnica</summary><code>{event.technicalReference}</code></details>}</div>
          </article>
        ))}
      </section>
      {data.history.length === 0 && <EmptyState title="Todavía no hay actividad" detail="La primera decisión real de Radar aparecerá en este historial." />}
    </>
  );
}

function OpportunityDetail({ opportunityId, data }) {
  const opportunity = data.opportunities.find((item) => item.id === opportunityId);
  if (!opportunity) return <PlaceholderView />;
  const publication = data.publications.find((item) => item.opportunityId === opportunity.id);
  return (
    <>
      <Link to="/radar/opportunities" className="radar-back-link"><ArrowLeft size={16} /> Volver a oportunidades</Link>
      <section className="radar-detail-hero">
        {opportunity.imageUrl ? <img src={opportunity.imageUrl} alt="" /> : <span className="radar-detail-hero__fallback"><Radar size={34} /></span>}
        <div>
          <div className="radar-detail-hero__meta"><PotentialPill potential={opportunity.potential} /><StatusPill status={opportunity.status} /></div>
          <span className="radar-kicker">{opportunity.category}</span>
          <h1>{opportunity.title}</h1><p>{opportunity.summary}</p>
        </div>
      </section>
      <div className="radar-detail-layout">
        <div>
          <section className={`radar-panel radar-decision-panel radar-decision-panel--${opportunity.status}`}>
            <span className="radar-kicker">Criterio de Radar</span>
            <h2>{decisionHeading(opportunity.status)}</h2>
            <p>{opportunity.explanation}</p>
            <div className="radar-reason-list">
              {opportunity.decisionReasons.map((reason) => (
                <article className={`radar-reason radar-reason--${reason.dimension}`} key={reason.dimension}>
                  <span className="radar-reason__marker"><Check size={13} /></span>
                  <div><strong>{reason.label}{Number.isFinite(reason.score) && <span className="radar-reason__score">{reason.score}/100</span>}</strong><p>{reason.evidence}</p></div>
                </article>
              ))}
            </div>
            <div className="radar-decision-conclusion">
              <Lightbulb size={18} />
              <div><strong>Conclusión</strong><p>{opportunity.decisionConclusion}</p></div>
            </div>
            {opportunity.revisitNote && <div className="radar-revisit-note"><History size={15} /><span>{opportunity.revisitNote}</span></div>}
          </section>
          <section className="radar-panel"><span className="radar-kicker">Qué sucede ahora</span><h2>{statusLabels[opportunity.status]}</h2><p>{opportunity.status === "discarded" ? "Radar protege el foco editorial y conserva la señal por si el contexto cambia." : opportunity.status === "tracking" ? "Radar seguirá observando el tema hasta encontrar evidencia más firme." : opportunity.status === "review" ? "El potencial es alto, pero conviene confirmar el enfoque antes de avanzar." : "La oportunidad ya alcanzó un nivel suficiente para aportar valor."}</p><div className="radar-business-signal"><TrendingUp size={18} /><span>{opportunity.businessSignal}</span></div>{publication && <a className="radar-primary-link radar-primary-link--light" href={publication.url}>Ver contenido publicado <ArrowUpRight size={15} /></a>}</section>
        </div>
        <aside className="radar-panel radar-opportunity-facts">
          <span className="radar-kicker">Contexto</span><h2>De dónde surge</h2>
          <dl><div><dt>Fuente</dt><dd><a href={opportunity.sourceUrl} target="_blank" rel="noreferrer">{opportunity.sourceName} <ExternalLink size={12} /></a></dd></div><div><dt>Detectada</dt><dd>{formatDateTime(opportunity.detectedAt)}</dd></div><div><dt>Tema</dt><dd>{opportunity.topic}</dd></div></dl>
          <details className="radar-technical-details"><summary>Detalles adicionales</summary><p>Indicador público: {opportunity.publicScore}/100</p><code>{opportunity.technicalReference}</code></details>
        </aside>
      </div>
    </>
  );
}

function PlaceholderView() {
  return <section className="radar-panel radar-placeholder"><FileSearch size={28} /><h2>Oportunidad no encontrada</h2><p>El registro solicitado no está disponible en las fuentes actuales de Radar.</p></section>;
}

function CurrentView({ data, pathname }) {
  if (pathname === "/radar" || pathname === "/radar/") return <HomeView data={data} />;
  if (pathname === "/radar/opportunities" || pathname === "/radar/rejected") return <OpportunitiesView data={data} />;
  if (pathname === "/radar/published") return <PublishedView data={data} />;
  if (pathname === "/radar/configuration") return <ConfigurationView initialConfiguration={data.configuration} />;
  if (["/radar/history", "/radar/activity", "/radar/audit"].includes(pathname)) return <HistoryView data={data} />;
  if (pathname.startsWith("/radar/opportunities/") || pathname.startsWith("/radar/candidates/")) return <OpportunityDetail opportunityId={pathname.split("/").pop()} data={data} />;
  return <PlaceholderView />;
}

function currentPageName(pathname) {
  if (pathname.startsWith("/radar/opportunities/") || pathname.startsWith("/radar/candidates/")) return "Detalle de oportunidad";
  if (pathname === "/radar/" || pathname === "/radar") return "Inicio";
  if (["/radar/activity", "/radar/audit"].includes(pathname)) return "Historial";
  return navItems.find((item) => item.path === pathname)?.label || "Radar";
}

function useRadarData(overrideData) {
  const [liveData, setLiveData] = useState(() => overrideData || initialRadarData);
  useEffect(() => {
    if (overrideData) {
      setLiveData(overrideData);
      return undefined;
    }
    const controller = new AbortController();
    loadRadarData(controller.signal).then(setLiveData).catch(() => undefined);
    return () => controller.abort();
  }, [overrideData]);
  return liveData;
}

export default function RadarControlCenter({ data: overrideData }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageName = useMemo(() => currentPageName(location.pathname), [location.pathname]);
  const data = useRadarData(overrideData);

  useEffect(() => { document.title = `${pageName} · Radar Control Center`; }, [pageName]);

  return (
    <div className="radar-app">
      <aside className={`radar-sidebar ${mobileOpen ? "radar-sidebar--open" : ""}`}>
        <div className="radar-brand"><span className="radar-brand__mark">N</span><div><strong>Radar</strong><small>by NexOps</small></div><button type="button" className="radar-icon-button radar-sidebar__close" onClick={() => setMobileOpen(false)} aria-label="Cerrar navegación"><X size={20} /></button></div>
        <nav className="radar-nav" aria-label="Navegación de Radar"><span className="radar-nav__label">Control Center</span>{navItems.map(({ label, path, icon }) => { const active = path === "/radar" ? location.pathname === "/radar" || location.pathname === "/radar/" : location.pathname.startsWith(path); return <Link key={path} to={path} className={active ? "is-active" : ""} onClick={() => setMobileOpen(false)}>{createElement(icon, { size: 18 })}<span>{label}</span></Link>; })}</nav>
        <div className="radar-sidebar__footer"><ShieldCheck size={17} /><div><strong>Workspace NexOps</strong><small>{data.connection.state === "live" ? "Datos reales sincronizados" : "Estado parcial"}</small></div></div>
      </aside>
      {mobileOpen && <button type="button" className="radar-scrim" aria-label="Cerrar navegación" onClick={() => setMobileOpen(false)} />}
      <main className="radar-main">
        <header className="radar-topbar"><button type="button" className="radar-icon-button radar-menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir navegación"><Menu size={21} /></button><div><span>Radar Control Center</span><strong>{pageName}</strong></div><div className="radar-topbar__meta"><span className={`radar-preview-badge radar-preview-badge--${data.connection.state}`}><span /> {data.connection.state === "live" ? "Datos reales" : data.connection.state === "loading" ? "Actualizando" : "Atención"}</span><span className="radar-avatar">AF</span></div></header>
        <div className="radar-content"><ConnectionNotice connection={data.connection} /><CurrentView data={data} pathname={location.pathname} /></div>
      </main>
    </div>
  );
}
