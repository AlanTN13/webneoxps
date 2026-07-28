/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleCheck,
  FormInput,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  RefreshCw,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import logoNexops from "../assets/logo-nexops.svg";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";
import "./HomePageV3.css";

const pillars = [
  {
    id: "captacion",
    number: "01",
    title: "Captación y marketing",
    problem: "Las consultas llegan desde campañas, formularios y mensajes, pero pierden contexto antes de entrar al proceso comercial.",
    action: "NexOps ordena los puntos de entrada y registra origen, datos y motivo de contacto.",
    change: "Ventas recibe oportunidades completas y puede actuar sin reconstruir la historia.",
  },
  {
    id: "ventas",
    number: "02",
    title: "Ventas y CRM",
    problem: "El seguimiento depende de planillas, chats y memoria; nadie sabe con certeza cuál es el próximo paso.",
    action: "NexOps define etapas, responsables y criterios de avance dentro de un CRM que acompaña el proceso real.",
    change: "Cada oportunidad tiene dueño, contexto y una acción pendiente visible.",
  },
  {
    id: "automatizacion",
    number: "03",
    title: "Automatización",
    problem: "El equipo repite validaciones, avisos y carga de información entre herramientas.",
    action: "NexOps conecta eventos y reglas para ejecutar tareas repetitivas con control y trazabilidad.",
    change: "El equipo interviene donde aporta criterio; el sistema sostiene el resto del recorrido.",
  },
  {
    id: "operacion",
    number: "04",
    title: "Operación",
    problem: "Pedidos, incidencias y tareas circulan por canales distintos y se vuelve difícil priorizar.",
    action: "NexOps reúne solicitudes, responsables, estados e información operativa en una vista compartida.",
    change: "La operación gana orden, seguimiento y una base confiable para mejorar.",
  },
];

const connectedExperiences = [
  { label: "Oportunidad seguida", title: "De una consulta a una oportunidad seguida", kind: "opportunity", steps: [["Publicidad / WhatsApp / formulario", Megaphone], ["CRM", LayoutDashboard], ["Responsable", UsersRound], ["Próximo paso", ArrowRight]], note: "Cada consulta entra al mismo recorrido y queda lista para avanzar." },
  { label: "Flujo automatizado", title: "De una tarea manual a un flujo automatizado", kind: "automation", steps: [["Evento", FormInput], ["Validación", Check], ["Automatización", Workflow], ["Resultado", Sparkles], ["Registro", LayoutDashboard]], note: "La lógica valida, ejecuta y deja trazabilidad sin depender de una tarea repetitiva." },
  { label: "Operación ordenada", title: "De pedidos dispersos a una operación ordenada", kind: "support", steps: [["Solicitud", MessageSquare], ["Prioridad", BarChart3], ["Responsable", UsersRound], ["Seguimiento", RefreshCw], ["Resolución", CircleCheck]], note: "Centro de Soporte NexOps reúne el pedido, su estado y la conversación." },
];

function Label({ children }) {
  return <span className="v3-label">{children}</span>;
}

function HeroEditorial() {
  return <figure className="v3-hero-editorial">
    {/* Reserved for a future NexOps-owned team/process photograph. */}
    <div className="v3-editorial-mark"><img src={logoNexops} alt="NexOps" /></div>
    <blockquote>De la fricción diaria a una operación que el equipo puede sostener.</blockquote>
    <figcaption>Marketing · CRM · Automatizaciones · Operación</figcaption>
  </figure>;
}

function PillarsNarrative() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.index));
    }, { rootMargin: "-30% 0px -45%", threshold: [0.2, 0.55, 0.8] });
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <div className="v3-pillar-story">
    <aside className="v3-pillar-sticky" aria-live="polite">
      <span className="v3-story-number">{pillars[active].number}</span>
      <h3>{pillars[active].title}</h3>
      <p>{pillars[active].change}</p>
      <ol aria-label="Progreso por los cuatro pilares">
        {pillars.map((pillar, index) => <li className={active === index ? "is-active" : ""} key={pillar.id}><span>{pillar.number}</span>{pillar.title}</li>)}
      </ol>
    </aside>
    <div className="v3-pillar-steps">
      {pillars.map((pillar, index) => <article className="v3-pillar-step" data-index={index} key={pillar.id} ref={(node) => { stepRefs.current[index] = node; }}>
        <header><span>{pillar.number}</span><h3>{pillar.title}</h3></header>
        <dl>
          <div><dt>Qué problema recibe</dt><dd>{pillar.problem}</dd></div>
          <div><dt>Qué hace NexOps</dt><dd>{pillar.action}</dd></div>
          <div><dt>Qué cambia</dt><dd>{pillar.change}</dd></div>
        </dl>
        {index < pillars.length - 1 && <footer><span>Se conecta con</span><strong>{pillars[index + 1].title}</strong><ArrowRight /></footer>}
      </article>)}
    </div>
  </div>;
}

export function FutureCaseStudies({ items = [] }) {
  if (!items.length) return null;
  return <div className="v3-future-cases" hidden>{items.map((item) => <article key={item.id}>{item.title}</article>)}</div>;
}

function ConnectedSystemsExperience() {
  const [selected, setSelected] = useState(0);
  const experience = connectedExperiences[selected];
  return <div className="v3-experience">
    <div className="v3-experience-tabs" role="tablist" aria-label="Experiencias de un sistema conectado">
      {connectedExperiences.map((item, index) => <button key={item.kind} role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}</button>)}
    </div>
    <div className={`v3-experience-stage ${experience.kind}`} role="tabpanel">
      <header><span>SISTEMA EN FUNCIONAMIENTO</span><b>{experience.title}</b></header>
      <div className="v3-experience-flow">{experience.steps.map(([label, Icon], index) => <div className="v3-flow-part" key={label}><article><span><Icon /></span><b>{label}</b>{experience.kind === "support" && index === 0 && <small>Centro de Soporte NexOps</small>}{experience.kind === "automation" && index === 2 && <small>regla activa</small>}{experience.kind === "opportunity" && index === 1 && <small>entrada registrada</small>}</article>{index < experience.steps.length - 1 && <i><b /></i>}</div>)}</div>
      <footer><span><i /> CONECTADO</span><p>{experience.note}</p></footer>
    </div>
  </div>;
}

export default function HomePageV3() {
  return <div className="homepage-v3">
    <section className="v3-hero" id="inicio">
      <div className="nx-container v3-hero-grid">
        <div className="v3-hero-copy">
          <Label>NEXOPS · TECNOLOGÍA APLICADA AL NEGOCIO</Label>
          <h1>Ordenamos ventas, procesos y operación para que tu empresa pueda crecer sin sumar caos.</h1>
          <p>Trabajamos junto a tu equipo para conectar marketing, CRM, automatizaciones y sistemas en una operación más clara, medible y fácil de sostener.</p>
          <div className="v3-hero-actions">
            <a className="v3-btn primary" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Contanos qué está trabando tu empresa <ArrowRight /></a>
            <a className="v3-btn secondary" href="#casos">Ver casos reales <ArrowRight /></a>
          </div>
        </div>
        <HeroEditorial />
      </div>
      <div className="nx-container v3-promise"><span>Más claridad.</span><span>Menos tareas sueltas.</span><span>Una operación sostenible.</span></div>
    </section>

    <section className="v3-pillars" id="soluciones">
      <div className="nx-container">
        <header className="v3-heading light"><div><Label>CUATRO PILARES · UN MISMO RECORRIDO</Label><h2>El crecimiento se ordena de punta a punta.</h2></div><p>Cada etapa recibe un problema concreto, lo conecta con la siguiente y deja información útil para operar mejor.</p></header>
        <PillarsNarrative />
      </div>
    </section>

    <section className="v3-cases" id="casos"><div className="nx-container"><header className="v3-heading"><div><Label>SISTEMAS EN MOVIMIENTO</Label><h2>Así se ve un sistema conectado</h2></div><p>No se trata de sumar herramientas. Se trata de que cada entrada tenga seguimiento, cada tarea tenga una lógica y cada proceso deje información útil.</p></header><ConnectedSystemsExperience /></div></section>

    <section className="v3-method" id="como-trabajamos"><div className="nx-container"><header><Label>CÓMO TRABAJAMOS</Label><h2>Del problema al sistema en cuatro movimientos.</h2></header><div>{[["01", "Entendemos"], ["02", "Diseñamos"], ["03", "Implementamos"], ["04", "Mejoramos"]].map(([n, t], i) => <article className={`stage-${i + 1}`} key={n}><span>{n}</span><i><b /></i><strong>{t}</strong><small>{["Detectamos la fricción", "Ordenamos el recorrido", "Conectamos y activamos", "Medimos y evolucionamos"][i]}</small></article>)}</div></div></section>

    <section className="v3-cta" id="contacto"><div className="nx-container"><div><Label>EMPECEMOS POR EL CUELLO DE BOTELLA</Label><h2>Contanos dónde se está frenando tu empresa.</h2></div><div><p>Revisamos el proceso y definimos un próximo paso concreto, sin empezar por una herramienta.</p><a href={CALENDLY_LINK} target="_blank" rel="noreferrer">Coordinar una conversación <ArrowRight /></a><a className="v3-whatsapp" href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer"><MessageSquare /> WhatsApp</a></div></div></section>
  </div>;
}
