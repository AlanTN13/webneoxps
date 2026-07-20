import { ArrowDown, ArrowRight, Check, Database, Gauge, Layers3, Route, Sparkles } from "lucide-react";
import { CALENDLY_LINK } from "../config/constants";

const stages = ["Captación", "Ventas y CRM", "Automatización", "Operación"];
const method = [
  ["01", "Entendemos", "Relevamos el negocio, los puntos de fricción y la información que hoy queda dispersa."],
  ["02", "Diseñamos", "Definimos el sistema, las prioridades y una arquitectura que el equipo pueda usar."],
  ["03", "Implementamos", "Construimos, integramos y ponemos cada flujo a trabajar sobre la operación real."],
  ["04", "Mejoramos", "Medimos el uso, ajustamos el sistema y acompañamos su evolución."],
];

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span>●</span>{children}</p>;
}

function FlowMap() {
  return (
    <div className="flow-map" aria-label="Flujo conectado desde captación hasta operación">
      {stages.map((stage, index) => (
        <div className="flow-stage" key={stage}>
          <span className="flow-number">0{index + 1}</span>
          <div className="flow-dot"><span /></div>
          <strong>{stage}</strong>
          <small>{["Oportunidades calificadas", "Seguimiento comercial", "Procesos orquestados", "Información y control"][index]}</small>
        </div>
      ))}
    </div>
  );
}

function HeroSystem() {
  return (
    <div className="hero-system" aria-hidden="true">
      <div className="system-top"><span>NX / SISTEMA COMERCIAL</span><span className="live"><i /> EN LÍNEA</span></div>
      <div className="system-body">
        <div className="system-sidebar"><i /><i /><i /><i /></div>
        <div className="system-main">
          <div className="system-heading"><div><small>PIPELINE ACTIVO</small><strong>Oportunidades</strong></div><span>+18,4%</span></div>
          <div className="system-metric"><strong>24</strong><span>procesos activos</span><div className="metric-line"><i /><i /><i /><i /><i /><i /></div></div>
          <div className="mini-flow"><span>Formulario</span><b>→</b><span>CRM</span><b>→</b><span>Operación</span></div>
        </div>
      </div>
      <div className="floating-card card-a"><Sparkles size={14} /><span>Nuevo lead asignado</span><Check size={14} /></div>
      <div className="floating-card card-b"><Route size={14} /><span>Flujo completado</span><strong>08:42</strong></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="nx-hero" id="inicio">
        <div className="nx-container hero-grid">
          <div className="hero-copy">
            <Eyebrow light>PRECISIÓN TECNOLÓGICA APLICADA AL NEGOCIO</Eyebrow>
            <h1>Convertimos procesos desordenados en sistemas que hacen <em>crecer</em> tu empresa.</h1>
            <p>Integramos captación, ventas, automatización y operación para que tu negocio tenga más oportunidades, mejores procesos y control real.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Contanos qué necesitás <ArrowRight size={18} /></a>
              <a className="button button-ghost" href="#metodo">Ver cómo trabajamos <ArrowDown size={18} /></a>
            </div>
          </div>
          <HeroSystem />
        </div>
        <div className="nx-container hero-index"><span>01</span><span>ESTRATEGIA · SISTEMAS · EJECUCIÓN</span></div>
      </section>

      <section className="problem-section" id="nexops">
        <div className="nx-container problem-grid">
          <div><Eyebrow>EL PROBLEMA NO ES LA FALTA DE HERRAMIENTAS</Eyebrow><span className="section-index">02 / 08</span></div>
          <div className="problem-copy">
            <h2>Tu empresa no necesita otra herramienta aislada.</h2>
            <p>Necesita que marketing, ventas, datos y operación funcionen como un mismo sistema. Cuando cada área trabaja por separado, las oportunidades se pierden, las tareas se duplican y decidir cuesta más.</p>
            <p className="problem-accent">Diseñamos la conexión entre las partes para que la tecnología acompañe al negocio, no para que el negocio se adapte a ella.</p>
          </div>
        </div>
      </section>

      <section className="connected-section">
        <div className="nx-container">
          <div className="section-heading"><div><Eyebrow light>UN SISTEMA, CUATRO MOVIMIENTOS</Eyebrow><h2>De la primera señal al control de la operación.</h2></div><p>Cada etapa recibe información de la anterior y genera una acción clara para la siguiente.</p></div>
          <FlowMap />
        </div>
      </section>

      <section className="pillars-section" id="soluciones">
        <div className="nx-container">
          <div className="section-heading dark-text"><div><Eyebrow>SOLUCIONES CONECTADAS</Eyebrow><h2>Cuatro pilares.<br />Un solo sistema.</h2></div><p>Empezamos por el resultado de negocio. Después elegimos y conectamos la tecnología necesaria para alcanzarlo.</p></div>
          <div className="pillar pillar-capture">
            <div className="pillar-copy"><span className="pillar-number">01</span><div><h3>Captación y marketing</h3><p>Unimos campañas, canales, formularios y medición para convertir interés en oportunidades que el equipo pueda trabajar.</p><ul><li>Campañas y canales</li><li>Formularios conectados</li><li>Medición de origen</li></ul></div></div>
            <div className="capture-visual"><div className="channel-stack"><span>BUSCADOR <b>42%</b></span><span>CAMPAÑAS <b>31%</b></span><span>REFERIDOS <b>27%</b></span></div><div className="capture-card"><small>NUEVA OPORTUNIDAD</small><strong>Consulta comercial</strong><div><i /> Datos completos</div><div><i /> Origen identificado</div><button>Enviar al CRM →</button></div></div>
          </div>
          <div className="pillar pillar-sales">
            <div className="pipeline-visual"><div className="pipe-column"><span>NUEVOS · 08</span><i /><i /><i /></div><div className="pipe-column active"><span>EN PROCESO · 05</span><i /><i /></div><div className="pipe-column"><span>PROPUESTA · 03</span><i /><i /></div></div>
            <div className="pillar-copy"><span className="pillar-number">02</span><div><h3>Ventas y CRM</h3><p>Ordenamos pipeline, responsables y seguimiento para que cada oportunidad tenga un próximo paso visible.</p><ul><li>Pipeline comercial</li><li>Responsables y alertas</li><li>Seguimiento centralizado</li></ul></div></div>
          </div>
          <div className="pillar-split">
            <article className="pillar pillar-automation"><div className="pillar-copy"><span className="pillar-number">03</span><div><h3>Automatización</h3><p>Conectamos aplicaciones y eliminamos tareas manuales repetitivas sin perder control.</p></div></div><div className="node-visual"><span><Database /> Datos</span><i /><strong><Route /></strong><i /><span><Check /> Acción</span></div></article>
            <article className="pillar pillar-operation"><div className="pillar-copy"><span className="pillar-number">04</span><div><h3>Operación</h3><p>Creamos plataformas, dashboards, Ticketera y sistemas internos para ejecutar y decidir mejor.</p></div></div><div className="ops-metrics"><span><small>EFICIENCIA</small><strong>92%</strong></span><span><small>ESTADO</small><strong>Estable</strong></span><div><i style={{height:"42%"}}/><i style={{height:"58%"}}/><i style={{height:"47%"}}/><i style={{height:"76%"}}/><i style={{height:"90%"}}/></div></div></article>
          </div>
        </div>
      </section>

      <section className="cases-section" id="casos">
        <div className="nx-container">
          <div className="section-heading"><div><Eyebrow light>CASOS Y PRODUCTOS</Eyebrow><h2>Sistemas aplicados<br />a operaciones reales.</h2></div><p>Una selección de proyectos confirmados. Los detalles de cada caso se incorporarán cuando el material esté validado.</p></div>
          <div className="case-grid">
            {["GlobalTrip", "DEXA", "Ticketera NexOps", "Casa Italia"].map((name, index) => <article className="case-card" key={name}><div className={`case-art case-art-${index}`}><span>{name === "Ticketera NexOps" ? "NX / TICKETERA" : name.toUpperCase()}</span><div><Gauge /><Layers3 /><Database /></div></div><div className="case-meta"><span>0{index + 1}</span><h3>{name}</h3><small>CASO EN PREPARACIÓN</small></div></article>)}
          </div>
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="nx-container">
          <div className="section-heading dark-text"><div><Eyebrow>CÓMO TRABAJAMOS</Eyebrow><h2>Del problema al sistema.<br />Sin saltarnos la operación.</h2></div><p>Un método claro para avanzar con foco, implementar con criterio y mejorar sobre evidencia.</p></div>
          <div className="method-list">{method.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><i /></article>)}</div>
        </div>
      </section>

      <section className="difference-section">
        <div className="nx-container difference-grid"><div><Eyebrow light>NUESTRO DIFERENCIAL</Eyebrow><span className="section-index">07 / 08</span></div><blockquote>“No terminamos cuando la herramienta está instalada. <em>Terminamos cuando forma parte de la operación.</em>”</blockquote></div>
      </section>

      <section className="final-cta" id="contacto">
        <div className="nx-container cta-inner"><div><Eyebrow light>HABLEMOS DE TU OPERACIÓN</Eyebrow><h2>Contanos dónde se está frenando tu empresa.</h2><p>En una primera conversación entendemos el contexto y definimos si NexOps puede ayudarte a ordenar el próximo paso.</p></div><a className="cta-circle" href={CALENDLY_LINK} target="_blank" rel="noreferrer"><span>Coordinar<br />una charla</span><ArrowRight /></a></div>
      </section>
    </>
  );
}
