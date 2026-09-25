import { ArrowDown, ArrowRight, ArrowUpRight, Check, Workflow, Sparkles, PanelsTopLeft, ChartNoAxesCombined, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK, CONTACT_INFO, getWhatsappLink } from "../config/constants";
import { realCases } from "../data/cases";
import styles from "./HomePage.module.css";

const pillars = [
  { number: "01", title: "Automatización", outcome: "Más tiempo para lo que mueve tu negocio.", description: "Conectamos sistemas y diseñamos flujos para reducir tareas repetitivas, errores y traspasos manuales. Tu equipo puede concentrarse donde su criterio hace la diferencia.", details: "Procesos · Integraciones · Flujos de trabajo", slug: "automatizacion", icon: <Workflow size={27} strokeWidth={1.5} /> },
  { number: "02", title: "Inteligencia artificial", outcome: "Más capacidad, con el control en tus manos.", description: "Implementamos asistentes y agentes con contexto de tu empresa, responsabilidades claras y revisión humana. IA aplicada a tareas concretas, con límites definidos desde el inicio.", details: "Asistentes · Agentes · Conocimiento", slug: "agentes-ia", icon: <Sparkles size={27} strokeWidth={1.5} /> },
  { number: "03", title: "CRM", outcome: "Cada oportunidad, con un próximo paso.", description: "Ordenamos conversaciones, equipos y seguimiento comercial. Desde la primera consulta hasta el cierre, cada oportunidad tiene responsable, historial y una acción por delante.", details: "Ventas · Atención · Seguimiento", slug: "crm", icon: <PanelsTopLeft size={27} strokeWidth={1.5} /> },
  { number: "04", title: "Data & Analytics", outcome: "Visibilidad para decidir con claridad.", description: "Unificamos información y construimos indicadores que responden preguntas del negocio. Para entender qué funciona, detectar desvíos y decidir dónde intervenir.", details: "Indicadores · Tableros · Información integrada", slug: "data-analytics", icon: <ChartNoAxesCombined size={27} strokeWidth={1.5} /> },
];
const method = [
  ["Entendemos", "Conversamos sobre tu negocio, tus objetivos y la operación real. Identificamos dónde se pierde tiempo, información u oportunidades."],
  ["Priorizamos", "Definimos por dónde empezar según el impacto, el esfuerzo y la capacidad de adopción. Acordamos alcance y criterios de éxito."],
  ["Implementamos", "Construimos e integramos la solución con tu equipo. Probamos el recorrido completo y acompañamos su puesta en marcha."],
  ["Evolucionamos", "Revisamos resultados, documentamos lo aprendido y ajustamos. La siguiente mejora parte de lo que tu negocio necesita."],
];
const clientLogos = [["/newsan_logo.svg", "Newsan"], ["/cencosud_logo.svg", "Cencosud"], ["/coke_logo.svg", "Coca-Cola"], ["/colgate_logo.svg", "Colgate"], ["/globaltrip_logo.svg", "GlobalTrip"]];

function CaseCard({ item }) {
  return <article className={styles.caseCard}>
    <span className={styles.caseSector}>{item.sector}</span>
    <h3>{item.title}</h3><p>{item.summary}</p>
    <footer><span>{item.type}</span><span><span className={styles.statusDot} />{item.status}</span></footer>
  </article>;
}

export default function HomePage() {
  useEffect(() => {
    document.title = "NexOps — Tu socio tecnológico para crecer y operar mejor";
    const existingDescription = document.querySelector('meta[name="description"]');
    const description = existingDescription ?? document.createElement("meta");
    const previousContent = description.getAttribute("content");
    description.setAttribute("name", "description");
    description.setAttribute("content", "Conectamos negocio, procesos y tecnología. Consultoría e implementación en automatización, inteligencia artificial, CRM y datos para que tu empresa crezca y opere mejor.");
    if (!existingDescription) document.head.appendChild(description);
    return () => {
      if (!existingDescription) description.remove();
      else if (previousContent === null) description.removeAttribute("content");
      else description.setAttribute("content", previousContent);
    };
  }, []);

  return <Layout><div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.shell}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span className={styles.dot} /> Tu socio tecnológico</span>
            <h1 id="home-title">Tu empresa puede<br />llegar más lejos.<br /><em>Hagamos que pase.</em></h1>
            <p>Conectamos negocio, procesos y tecnología para que tu empresa crezca, opere mejor y tome decisiones con claridad.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Conversemos sobre tu negocio <ArrowUpRight size={18} /></a>
              <a className={styles.textLink} href="#soluciones">Explorar soluciones <ArrowDown size={17} /></a>
            </div>
            <div className={styles.heroNote}>Estrategia, implementación y acompañamiento.</div>
          </div>
          <div className={styles.heroVisual} role="img" aria-label="NexOps conecta el negocio, las personas, los procesos y la tecnología para crecer con una operación preparada.">
            <div className={styles.visualTop}><span>NEXOPS / VISIÓN INTEGRAL</span><ArrowUpRight size={24} /></div>
            <div className={styles.visualOrbit} aria-hidden="true"><div /><div /><div /><img src="/nexops-mark.webp" alt="" width="128" height="128" /></div>
            <div className={styles.visualWords} aria-hidden="true"><span>Negocio</span><span>Personas</span><span>Procesos</span><span>Tecnología</span></div>
            <div className={styles.visualBottom}>Crecer, con una<br /><strong>operación preparada.</strong></div>
          </div>
        </div>
        <div className={styles.heroBottom}><span>Una mirada de negocio. Todas las piezas conectadas.</span><span>Automatización <i /> IA <i /> CRM <i /> Datos</span></div>
      </div>
    </section>

    <section className={styles.proof} aria-label="Experiencia del equipo">
      <div className={`${styles.shell} ${styles.proofInner}`}>
        <p>Experiencia del equipo en<br /><strong>compañías y operaciones reales.</strong></p>
        <div className={styles.logos}>{clientLogos.map(([src, alt]) => <img src={src} alt={alt} key={alt} loading="lazy" width="140" height="48" />)}</div>
      </div>
    </section>

    <section className={styles.section} id="nosotros">
      <div className={`${styles.shell} ${styles.intro}`}>
        <div><span className={styles.eyebrow}>Somos NexOps</span><h2>Entendemos tu negocio.<br /><span className={styles.mutedTitle}>Conectamos lo que<br />necesitás para crecer.</span></h2></div>
        <div className={styles.introCopy}><p className={styles.lead}>Crecer también exige cambiar la forma de trabajar.</p><p>Más consultas, más herramientas y más información pueden traer más complejidad. Te acompañamos a transformar esa complejidad en una operación ordenada, conectada y preparada para dar el siguiente paso.</p><p>Somos una empresa de tecnología y transformación operativa. Combinamos visión comercial, diseño de procesos y capacidad de implementación para construir soluciones que tengan sentido para tu empresa.</p><a className={styles.textLink} href="#como-funciona">Conocé nuestra forma de trabajar <ArrowRight size={18} /></a></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.accompaniment}`} aria-labelledby="accompaniment-title">
      <div className={styles.shell}>
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>De la decisión a la acción</span><h2 id="accompaniment-title">Un socio para pensar.<br />Un equipo para hacerlo realidad.</h2><p>Podemos ayudarte a definir el camino, implementar una solución o acompañar la evolución de tu operación.</p></div>
        <div className={styles.approaches}>
          <article><span className={styles.overline}>01 / CONSULTORÍA</span><h3>Claridad antes de invertir.</h3><p>Revisamos procesos, herramientas y objetivos para encontrar las oportunidades que vale la pena abordar. Definimos prioridades y una hoja de ruta que tu empresa pueda llevar adelante.</p><ul><li><Check size={17} /> Diagnóstico del negocio y la operación</li><li><Check size={17} /> Priorización de oportunidades</li><li><Check size={17} /> Alcance y plan de implementación</li></ul><a className={styles.textLink} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Hablemos de tu desafío <ArrowUpRight size={18} /></a></article>
          <article><span className={styles.overline}>02 / IMPLEMENTACIÓN Y ACOMPAÑAMIENTO</span><h3>Del plan a una solución que se usa.</h3><p>Configuramos, desarrollamos e integramos las piezas que tu negocio necesita. Trabajamos con tu equipo para que la solución se incorpore a la operación y pueda evolucionar con ella.</p><ul><li><Check size={17} /> Tecnología conectada a tus procesos</li><li><Check size={17} /> Puesta en marcha y adopción</li><li><Check size={17} /> Seguimiento y mejora continua</li></ul><a className={styles.textLink} href="#soluciones">Explorá nuestras capacidades <ArrowRight size={18} /></a></article>
        </div>
      </div>
    </section>

    <section className={styles.section} id="soluciones">
      <div className={styles.shell}>
        <div className={styles.splitHeading}><div><span className={styles.eyebrow}>Qué podemos hacer por tu empresa</span><h2>La tecnología correcta.<br />Para el desafío correcto.</h2></div><p>Cuatro pilares que trabajan juntos. Empezamos por lo que tu negocio necesita resolver y conectamos las capacidades que hacen falta.</p></div>
        <div className={styles.pillars}>{pillars.map(({ number, title, outcome, description, details, slug, icon }) => <article className={styles.pillar} key={slug}>
          <div className={styles.pillarTop}><span>{number}</span>{icon}</div>
          <h3>{title}</h3><h4>{outcome}</h4><p>{description}</p><span className={styles.details}>{details}</span>
          <Link to={`/soluciones/${slug}`} className={styles.textLink}>Conocer {title === "CRM" ? "CRM" : title.toLowerCase()} <ArrowUpRight size={18} /></Link>
        </article>)}</div>
        <div className={styles.complement}><div><span className={styles.eyebrow}>Una mirada integral</span><h3>También construimos las piezas que faltan.</h3><p>Sumamos desarrollo e integraciones a medida y captación digital para conectar la experiencia comercial con el resto de la operación.</p></div><div><Link to="/soluciones/desarrollo">Desarrollo e integraciones <ArrowUpRight size={20} /></Link><Link to="/soluciones/captacion">Captación y performance <ArrowUpRight size={20} /></Link></div></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.cases}`} id="casos">
      <div className={styles.shell}>
        <div className={styles.splitHeading}><div><span className={styles.eyebrow}>Experiencia aplicada</span><h2>Problemas concretos.<br />Soluciones en marcha.</h2></div><p>Una selección de implementaciones en distintos tipos de negocio. Cada proyecto tiene su contexto y su etapa de evolución.</p></div>
        <div className={styles.caseGrid}>{realCases.slice(0, 6).map(item => <CaseCard item={item} key={item.id} />)}</div>
        <details className={styles.moreCases}><summary>Ver más implementaciones <Plus size={20} /></summary><div className={styles.caseGrid}>{realCases.slice(6).map(item => <CaseCard item={item} key={item.id} />)}</div></details>
      </div>
    </section>

    <section className={styles.section} id="como-funciona">
      <div className={styles.shell}>
        <div className={styles.splitHeading}><div><span className={styles.eyebrow}>Nuestra forma de trabajar</span><h2>Primero, tu negocio.<br />Después, la solución.</h2></div><p>Una forma de avanzar con prioridades claras, participación de tu equipo y foco en el resultado.</p></div>
        <ol className={styles.method}>{method.map(([title, description], i) => <li key={title}><span className={styles.step}>0{i + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        <div className={styles.principle}><span>El criterio NexOps</span><p>La tecnología tiene sentido cuando<br /><strong>mejora cómo trabaja tu empresa.</strong></p></div>
      </div>
    </section>

    <section className={styles.contact} id="contacto">
      <div className={`${styles.shell} ${styles.contactGrid}`}>
        <div><span className={styles.eyebrow}>El próximo paso empieza con una conversación</span><h2>¿Qué querés que<br />tu empresa pueda<br /><em>hacer mejor?</em></h2></div>
        <div className={styles.contactCopy}><p>Contanos dónde estás y hacia dónde querés ir. En una primera conversación exploramos tu desafío y vemos cómo podemos acompañarte.</p><a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación <ArrowUpRight size={19} /></a><span className={styles.contactNote}>30 minutos para entender tu negocio.</span><a className={styles.textLink} href={getWhatsappLink(CONTACT_INFO.WHATSAPP_NUMBER, CONTACT_INFO.WHATSAPP_MESSAGE_DEFAULT)} target="_blank" rel="noreferrer">También podés escribirnos por WhatsApp <ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  </div></Layout>;
}
