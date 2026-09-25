import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import { realCases } from "../data/cases";
import styles from "./HomePage.module.css";

const services = [
  {
    number: "01",
    name: "Automatización",
    question: "¿Tu equipo dedica demasiado tiempo a tareas que se repiten?",
    answer: "Ordenamos el proceso y automatizamos los pasos adecuados para reducir carga manual, errores y demoras. El equipo conserva el control y gana tiempo para atender lo que necesita criterio.",
    situation: "Cuando el trabajo pasa por planillas, mensajes y seguimientos manuales.",
  },
  {
    number: "02",
    name: "Inteligencia artificial",
    question: "¿El volumen de trabajo crece más rápido que la capacidad del equipo?",
    answer: "Aplicamos IA a tareas concretas: buscar conocimiento, preparar respuestas, analizar información o asistir decisiones. Definimos límites y revisión humana antes de incorporarla a la operación.",
    situation: "Cuando el contexto existe, pero cuesta encontrarlo y usarlo a tiempo.",
  },
  {
    number: "03",
    name: "CRM",
    question: "¿Las oportunidades dependen de quién recuerda hacer el seguimiento?",
    answer: "Organizamos consultas, responsables y próximas acciones en un proceso comercial visible. Cada conversación tiene contexto y el equipo sabe qué sigue.",
    situation: "Cuando ventas y atención trabajan entre canales, personas y herramientas distintas.",
  },
  {
    number: "04",
    name: "Data & Analytics",
    question: "¿Tenés datos, pero te cuesta ver qué está pasando en el negocio?",
    answer: "Reunimos la información relevante y la convertimos en indicadores útiles. Así podés detectar desvíos, entender resultados y decidir con más claridad.",
    situation: "Cuando los reportes llegan tarde o las decisiones se toman con información fragmentada.",
  },
];

const selectedCases = [
  {
    id: "foreign-trade-web",
    challenge: "Explicar servicios y sostener un canal de contenidos con un circuito de publicación controlado.",
    work: "Desarrollo de un sitio con estructura de servicios y publicación de contenidos.",
    outcome: "Un canal web en producción para presentar la oferta y publicar con control.",
  },
  {
    id: "industry-crm",
    challenge: "Ordenar consultas y seguimiento dentro de una operación comercial B2B.",
    work: "Diseño de pipeline, campos, reglas y automatizaciones de CRM.",
    outcome: "Un proceso comercial estructurado que sigue en evolución.",
  },
  {
    id: "materials-erp",
    challenge: "Reunir información comercial y operativa en un mismo circuito.",
    work: "Desarrollo de un ERP para clientes, productos, pedidos, compras y listas de precios.",
    outcome: "Un sistema comercial integrado en producción.",
  },
];

const method = [
  ["Entender", "Escuchamos cómo funciona tu empresa y dónde está el desafío."],
  ["Diseñar", "Elegimos el mejor punto de partida y definimos qué tiene que mejorar."],
  ["Implementar", "Construimos la solución y la incorporamos al trabajo del equipo."],
  ["Evolucionar", "Revisamos lo que ocurre y ajustamos a medida que el negocio cambia."],
];

function CaseStudy({ caseInfo, index }) {
  const source = realCases.find(({ id }) => id === caseInfo.id);
  return (
    <article className={styles.caseStudy}>
      <div className={styles.caseIdentity}>
        <span className={styles.caseNumber}>0{index + 1} / EXPERIENCIA REAL</span>
        <span className={styles.caseSector}>{source.sector}</span>
        <h3>{source.title}</h3>
        <span className={styles.caseStatus}><span />{source.status}</span>
      </div>
      <div className={styles.caseNarrative}>
        <div><span>El desafío</span><p>{caseInfo.challenge}</p></div>
        <div><span>Qué hicimos</span><p>{caseInfo.work}</p></div>
        <div><span>Qué quedó</span><p>{caseInfo.outcome}</p></div>
      </div>
    </article>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title = "NexOps — Tecnología y consultoría para crecer y operar mejor";
    const existingDescription = document.querySelector('meta[name="description"]');
    const description = existingDescription ?? document.createElement("meta");
    const previousContent = description.getAttribute("content");
    description.setAttribute("name", "description");
    description.setAttribute("content", "NexOps acompaña a empresas a crecer y operar mejor. Consultoría e implementación en procesos, automatización, inteligencia artificial, CRM y datos.");
    if (!existingDescription) document.head.appendChild(description);
    return () => {
      if (!existingDescription) description.remove();
      else if (previousContent === null) description.removeAttribute("content");
      else description.setAttribute("content", previousContent);
    };
  }, []);

  return (
    <Layout showFloatingWhatsApp={false}>
      <div className={styles.home}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.shell}>
            <div className={styles.heroTopline}><span>NEXOPS / CONSULTORÍA E IMPLEMENTACIÓN TECNOLÓGICA</span><span>NEGOCIO · PROCESOS · PERSONAS</span></div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 id="home-title">Ayudamos a empresas a <em>crecer y operar mejor.</em></h1>
                <p>Entendemos tu negocio, ordenamos procesos e implementamos tecnología para mejorar ventas, eficiencia y decisiones. Te acompañamos desde el diagnóstico hasta el trabajo cotidiano.</p>
                <div className={styles.heroActions}>
                  <a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Conversemos sobre tu empresa <ArrowUpRight size={18} /></a>
                  <a className={styles.quietLink} href="#nosotros">Conocé NexOps <ArrowDown size={16} /></a>
                </div>
              </div>
              <div className={styles.heroPanel} aria-label="Resultados que buscamos junto a cada empresa">
                <span className={styles.panelKicker}>CUANDO TODO TRABAJA MEJOR</span>
                <div><span>01</span><strong>Más oportunidades bien atendidas.</strong></div>
                <div><span>02</span><strong>Menos fricción en la operación.</strong></div>
                <div><span>03</span><strong>Decisiones con información clara.</strong></div>
                <span className={styles.panelSignature}>NEXOPS <span>↗</span></span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.identity} id="nosotros">
          <div className={`${styles.shell} ${styles.identityGrid}`}>
            <div>
              <span className={styles.eyebrow}>Somos NexOps</span>
              <h2>Una empresa que entiende <em>empresas.</em></h2>
            </div>
            <div className={styles.identityCopy}>
              <p className={styles.lead}>Somos una empresa de tecnología y transformación operativa. Trabajamos junto a quienes lideran negocios que necesitan crecer sin perder claridad ni control.</p>
              <p>Miramos la estrategia, las personas y los procesos antes de elegir herramientas. Después diseñamos e implementamos soluciones que se integran a la forma real de trabajar de cada organización.</p>
              <div className={styles.peopleLine}><span>AL FRENTE DE NEXOPS</span><strong>Alan Fernández y Joaquín</strong><p>Socios que conducen el trabajo con visión de negocio y capacidad de ejecución.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.trust} aria-labelledby="trust-title">
          <div className={`${styles.shell} ${styles.trustGrid}`}>
            <div><span className={styles.eyebrow}>Experiencia real</span><h2 id="trust-title">Desafíos distintos.<br />El mismo foco: que funcione.</h2></div>
            <div><p>Trabajamos en proyectos para operaciones de comercio exterior, industria B2B, distribución y educación. Desde ordenar una venta hasta conectar información y trabajo de toda una empresa.</p><a className={styles.inlineLink} href="#casos">Ver implementaciones <ArrowRight size={18} /></a></div>
          </div>
        </section>

        <section className={styles.services} id="soluciones">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><span className={styles.eyebrow}>En qué podemos ayudarte</span><h2>Empezamos por lo que hoy <em>frena a tu empresa.</em></h2><p>Podemos entrar por un problema puntual o acompañar una transformación más amplia. Estas son cuatro formas de crear capacidad donde más se necesita.</p></div>
            <div className={styles.serviceList}>
              {services.map((service) => (
                <article className={styles.service} key={service.number}>
                  <div className={styles.serviceLabel}><span>{service.number}</span><strong>{service.name}</strong></div>
                  <div className={styles.serviceBody}><h3>{service.question}</h3><p>{service.answer}</p><span className={styles.situation}>{service.situation}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.breadth} aria-labelledby="breadth-title">
          <div className={`${styles.shell} ${styles.breadthGrid}`}>
            <div><span className={styles.eyebrow}>Una capacidad más amplia</span><h2 id="breadth-title">El problema de tu negocio no tiene que caber en una categoría.</h2></div>
            <div><p>Cuando hace falta, sumamos desarrollo de sistemas, integraciones, arquitectura tecnológica, optimización operativa, gestión del conocimiento y crecimiento digital. Elegimos y conectamos esas capacidades alrededor de un objetivo, sin obligarte a contratar piezas aisladas.</p></div>
          </div>
        </section>

        <section className={styles.work} id="acompanamiento">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><span className={styles.eyebrow}>Dos formas de acompañarte</span><h2>Pensamos con vos.<br /><em>Y hacemos que suceda.</em></h2></div>
            <div className={styles.workGrid}>
              <article><span className={styles.workNumber}>01 / CONSULTORÍA</span><h3>Claridad para elegir el siguiente paso.</h3><p>Analizamos el negocio y su operación, identificamos oportunidades y definimos prioridades. Una buena decisión empieza por entender el problema y el impacto que vale la pena buscar.</p><div className={styles.workEvidence}><Check size={18} /> Diagnóstico, criterio y hoja de ruta</div></article>
              <article><span className={styles.workNumber}>02 / IMPLEMENTACIÓN</span><h3>Capacidad para llevarlo a la práctica.</h3><p>Diseñamos, desarrollamos e integramos la solución con tu equipo. La puesta en marcha es parte del trabajo: acompañamos su adopción y seguimos mejorando lo que ya funciona.</p><div className={styles.workEvidence}><Check size={18} /> Ejecución, adopción y evolución</div></article>
            </div>
          </div>
        </section>

        <section className={styles.cases} id="casos">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><span className={styles.eyebrow}>Implementaciones</span><h2>Trabajo concreto en <em>operaciones reales.</em></h2><p>Estos ejemplos están anonimizados y describen lo implementado y su estado. Cada empresa tiene su propio punto de partida.</p></div>
            <div className={styles.caseList}>{selectedCases.map((caseInfo, index) => <CaseStudy caseInfo={caseInfo} index={index} key={caseInfo.id} />)}</div>
          </div>
        </section>

        <section className={styles.methodSection} id="como-funciona">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><span className={styles.eyebrow}>Cómo trabajamos</span><h2>Un camino claro,<br /><em>sin complicar lo simple.</em></h2><p>Primero entendemos el negocio. Después elegimos qué hacer, lo implementamos y aprendemos de la operación real.</p></div>
            <ol className={styles.method}>{method.map(([title, description], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
          </div>
        </section>

        <section className={styles.knowledge} aria-labelledby="knowledge-title">
          <div className={`${styles.shell} ${styles.knowledgeGrid}`}>
            <div><span className={styles.eyebrow}>Radar NexOps</span><h2 id="knowledge-title">Compartimos lo que aprendemos al mirar el negocio y la tecnología.</h2></div>
            <div><p>Analizamos cambios, herramientas e ideas con una pregunta en mente: qué significa esto para una empresa que necesita decidir y actuar.</p><Link className={styles.inlineLink} to="/noticias">Explorar nuestras publicaciones <ArrowUpRight size={18} /></Link></div>
          </div>
        </section>

        <section className={styles.contact} id="contacto">
          <div className={`${styles.shell} ${styles.contactGrid}`}>
            <div><span className={styles.eyebrow}>Hablemos de tu empresa</span><h2>Contanos qué querés <em>mejorar.</em></h2></div>
            <div><p>No hace falta que llegues con la solución definida. En una primera conversación entendemos tu contexto, tus objetivos y dónde podríamos aportar más valor.</p><a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación <ArrowUpRight size={19} /></a><small>Primero entendemos el negocio. Después hablamos de propuestas.</small></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
