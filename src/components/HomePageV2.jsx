import { ArrowDown, ArrowRight, BarChart3, Check, CircleCheck, Clock3, Mail, MessageSquare, MousePointer2, MoveRight, RefreshCw, TicketCheck, UserRound } from "lucide-react";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";
import "./HomePageV2.css";

const services = [
  { number: "01", title: "Captación y marketing", result: "Más oportunidades, con contexto desde el primer contacto.", text: "Conectamos campañas, canales y formularios para que cada consulta llegue al equipo comercial con su origen y sus datos completos.", points: ["Campañas y landing pages", "Formularios y canales", "Medición de oportunidades"] },
  { number: "02", title: "Ventas y CRM", result: "Un proceso comercial que muestra qué sigue.", text: "Ordenamos el pipeline, los responsables y el seguimiento para que ninguna oportunidad dependa de una planilla o de la memoria del equipo.", points: ["Pipeline y etapas", "Seguimientos y alertas", "Información centralizada"] },
  { number: "03", title: "Automatización", result: "Menos tareas repetidas. Más tiempo para decidir y avanzar.", text: "Automatizamos pasos concretos entre las herramientas que ya usa tu empresa, con reglas claras y control humano cuando hace falta.", points: ["Integraciones entre sistemas", "Avisos y asignaciones", "Procesamiento de datos con IA"] },
  { number: "04", title: "Operación", result: "Información visible para trabajar y decidir mejor.", text: "Creamos plataformas, tableros, Ticketera y sistemas internos adaptados a la forma real de operar de cada equipo.", points: ["Ticketera y soporte", "Dashboards de gestión", "Sistemas internos"] },
];

const method = [
  ["01", "Entendemos", "El negocio, el equipo y dónde se pierde tiempo o información."],
  ["02", "Diseñamos", "El proceso, las prioridades y la solución más simple que funciona."],
  ["03", "Implementamos", "Configuramos, integramos y acompañamos la adopción del equipo."],
  ["04", "Mejoramos", "Medimos el uso y ajustamos el sistema a medida que el negocio cambia."],
];

function Label({ children, light = false }) { return <p className={`v2-label ${light ? "is-light" : ""}`}>{children}</p>; }

function HeroVisual() {
  return <div className="v2-hero-visual" aria-label="Ejemplo de una consulta que avanza desde un formulario hacia ventas y operación">
    <div className="v2-window-bar"><span><i/><i/><i/></span><small>Flujo de una oportunidad</small></div>
    <div className="v2-journey">
      <div className="v2-journey-card is-source"><span className="v2-icon"><MousePointer2 /></span><div><small>FORMULARIO WEB</small><strong>Nueva consulta</strong></div><CircleCheck /></div>
      <div className="v2-journey-line"><span>datos + origen</span></div>
      <div className="v2-journey-card is-crm"><span className="v2-icon"><UserRound /></span><div><small>VENTAS · CRM</small><strong>Asignada a Lucía</strong></div><span className="v2-status">Contactar hoy</span></div>
      <div className="v2-journey-line"><span>seguimiento</span></div>
      <div className="v2-journey-card is-action"><span className="v2-icon"><Check /></span><div><small>PRÓXIMA ACCIÓN</small><strong>Reunión coordinada</strong></div><span className="v2-time"><Clock3/> 14:30</span></div>
    </div>
    <div className="v2-visual-note">Ejemplo de proceso · Reemplazar por captura validada</div>
  </div>;
}

function ServiceVisual({ index }) {
  if (index === 0) return <div className="v2-service-visual capture-scene"><div className="source-list"><span><MousePointer2/> Sitio web <b>12</b></span><span><MessageSquare/> WhatsApp <b>08</b></span><span><Mail/> Campañas <b>05</b></span></div><MoveRight/><div className="lead-sheet"><small>NUEVA OPORTUNIDAD</small><strong>Consulta de propuesta</strong><p><Check/> Origen identificado</p><p><Check/> Datos completos</p><button>Enviar a ventas</button></div></div>;
  if (index === 1) return <div className="v2-service-visual crm-scene"><div className="crm-head"><span>Pipeline comercial</span><small>Esta semana</small></div><div className="crm-columns"><div><small>NUEVAS · 4</small><span><b>Estudio Sur</b><em>Contactar hoy</em></span><span><b>Grupo Delta</b><em>Sin asignar</em></span></div><div><small>EN CONVERSACIÓN · 3</small><span className="active"><b>Comercial Norte</b><em>Propuesta enviada</em></span></div><div><small>PRÓXIMO PASO · 2</small><span><b>Casa Central</b><em>Reunión · 14:30</em></span></div></div></div>;
  if (index === 2) return <div className="v2-service-visual automation-scene"><div><span><MessageSquare/></span><p>Llega una consulta</p></div><MoveRight/><div><span><RefreshCw/></span><p>Se completa y asigna</p></div><MoveRight/><div><span><CircleCheck/></span><p>El equipo recibe el próximo paso</p></div></div>;
  return <div className="v2-service-visual operation-scene"><div className="ops-top"><span><TicketCheck/> Ticketera NexOps</span><small>Vista de operación</small></div><div className="ops-data"><span><small>SOLICITUDES ABIERTAS</small><strong>En seguimiento</strong><em>Por responsable y prioridad</em></span><div className="ops-chart"><i/><i/><i/><i/><i/><i/></div></div><div className="capture-placeholder">Espacio reservado para captura real validada</div></div>;
}

export default function HomePageV2() {
  return <div className="homepage-v2">
    <section className="v2-hero" id="inicio">
      <div className="nx-container v2-hero-grid">
        <div className="v2-hero-copy"><Label light>NEXOPS · SISTEMAS PARA EMPRESAS</Label><h1>Convertimos procesos desordenados en sistemas que hacen <em>crecer</em> tu empresa.</h1><p>Integramos captación, ventas, automatización y operación para que tu negocio tenga más oportunidades, mejores procesos y control real.</p><div className="v2-actions"><a className="v2-button is-primary" href={CALENDLY_LINK} target="_blank" rel="noreferrer">Contanos qué necesitás <ArrowRight/></a><a className="v2-button is-secondary" href="#como-trabajamos">Ver cómo trabajamos <ArrowDown/></a></div></div>
        <HeroVisual />
      </div>
      <div className="nx-container v2-hero-foot"><span>CAPTACIÓN Y MARKETING</span><i/><span>VENTAS Y CRM</span><i/><span>AUTOMATIZACIÓN</span><i/><span>OPERACIÓN</span></div>
    </section>

    <section className="v2-problem" id="nexops"><div className="nx-container v2-problem-grid"><Label>EL PUNTO DE PARTIDA</Label><div><h2>Más herramientas no resuelven un proceso que está desconectado.</h2><p>Cuando marketing genera consultas que ventas no puede seguir, la información vive en distintas planillas y la operación depende de tareas manuales, el negocio pierde oportunidades y capacidad de respuesta.</p><strong>NexOps ordena ese recorrido de punta a punta.</strong></div></div></section>

    <section className="v2-services" id="soluciones"><div className="nx-container"><header className="v2-section-head"><div><Label>QUÉ HACEMOS</Label><h2>Cuatro pilares para que el negocio funcione como un sistema.</h2></div><p>La inteligencia artificial y los datos acompañan cada solución cuando ayudan a obtener un resultado concreto. No son el punto de partida.</p></header>
      <div className="v2-services-list">{services.map((service,index)=><article className={`v2-service-row row-${index}`} key={service.number}><div className="v2-service-copy"><span>{service.number}</span><h3>{service.title}</h3><strong>{service.result}</strong><p>{service.text}</p><ul>{service.points.map(point=><li key={point}><Check/>{point}</li>)}</ul></div><ServiceVisual index={index}/></article>)}</div>
    </div></section>

    <section className="v2-cases" id="casos"><div className="nx-container"><header className="v2-section-head is-dark"><div><Label light>CASOS Y PRODUCTOS CONFIRMADOS</Label><h2>Trabajo aplicado a operaciones reales.</h2></div><p>Mostramos únicamente nombres confirmados en el repositorio. Las capturas y resultados se incorporarán cuando estén validados.</p></header><div className="v2-case-list">{["GlobalTrip","DEXA","Ticketera NexOps","Casa Italia"].map((name,index)=><article key={name}><span>0{index+1}</span><h3>{name}</h3><p>{index===2?"Producto para centralizar solicitudes, responsables y seguimiento operativo.":"Caso confirmado · Contenido en preparación"}</p><small>{index===2?"OPERACIÓN":"PRÓXIMAMENTE"}</small></article>)}</div></div></section>

    <section className="v2-method" id="como-trabajamos"><div className="nx-container"><header className="v2-section-head"><div><Label>CÓMO TRABAJAMOS</Label><h2>Primero entendemos el negocio. Después implementamos la tecnología.</h2></div><p>No entregamos una herramienta aislada. Trabajamos hasta que el proceso queda claro, el equipo lo usa y la solución forma parte de la operación.</p></header><div className="v2-method-grid">{method.map(([n,t,p])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></div></section>

    <section className="v2-results"><div className="nx-container v2-results-grid"><Label light>QUÉ BUSCAMOS MEJORAR</Label><div><h2>Más oportunidades.<br/>Mejores procesos.<br/>Control real.</h2><p>El resultado no es tener más software. Es que cada persona sepa qué hacer, la información llegue a tiempo y la empresa pueda decidir con una visión completa.</p></div></div></section>

    <section className="v2-contact" id="contacto"><div className="nx-container v2-contact-inner"><div><Label>HABLEMOS</Label><h2>Contanos dónde se está frenando tu empresa.</h2></div><div><p>Revisamos el proceso actual, identificamos el principal cuello de botella y definimos un próximo paso concreto.</p><a href={CALENDLY_LINK} target="_blank" rel="noreferrer">Coordinar una conversación <ArrowRight/></a><a className="v2-whatsapp-link" href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer">O escribinos por WhatsApp <MessageSquare/></a></div></div></section>
  </div>;
}
