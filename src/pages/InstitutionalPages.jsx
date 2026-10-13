import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Check, Compass, Layers3, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import { realCases } from "../data/cases";
import styles from "./InstitutionalPages.module.css";

function usePageMetadata(title, description) {
  useEffect(() => {
    document.title = `${title} | NexOps`;
    const existing = document.querySelector('meta[name="description"]');
    const meta = existing ?? document.createElement("meta");
    const previous = meta.getAttribute("content");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", description);
    if (!existing) document.head.appendChild(meta);
    return () => {
      if (!existing) meta.remove();
      else if (previous === null) meta.removeAttribute("content");
      else meta.setAttribute("content", previous);
    };
  }, [title, description]);
}

function SectionIntro({ label, title, copy, light = false }) {
  return <div className={`${styles.sectionIntro} ${light ? styles.sectionIntroLight : ""}`}>
    <div><span className={styles.eyebrow}>{label}</span><h2>{title}</h2></div>
    {copy && <p>{copy}</p>}
  </div>;
}

function ContactBand({ label, title, copy, action = "Conversemos sobre tu empresa" }) {
  return <section className={styles.contactBand}>
    <div className={`${styles.shell} ${styles.contactGrid}`}>
      <div><span className={styles.eyebrow}>{label}</span><h2>{title}</h2></div>
      <div><p>{copy}</p><a className={styles.button} href={CALENDLY_LINK} target="_blank" rel="noreferrer">{action}<ArrowUpRight size={18} /></a><small>Empezamos por entender tu contexto y el objetivo de negocio.</small></div>
    </div>
  </section>;
}

const implementationOffers = [
  { number: "01", name: "Procesos y automatización", question: "Cuando el trabajo depende de pasos manuales", copy: "Relevamos el circuito, definimos responsables y automatizamos los pasos que pueden ganar velocidad y consistencia. Diseñamos excepciones y puntos de control para que el equipo mantenga el criterio." },
  { number: "02", name: "CRM y operación comercial", question: "Cuando cada oportunidad necesita seguimiento", copy: "Ordenamos consultas, etapas, responsables y próximos pasos. Integramos los canales y la información necesaria para que ventas y atención puedan trabajar con contexto compartido." },
  { number: "03", name: "Datos e indicadores", question: "Cuando decidir exige reunir demasiadas fuentes", copy: "Conectamos datos, definimos indicadores útiles y construimos tableros que muestran el estado del negocio. El objetivo es convertir información dispersa en conversaciones y decisiones más claras." },
  { number: "04", name: "IA aplicada al trabajo", question: "Cuando hay conocimiento y tareas que pueden asistirse", copy: "Incorporamos inteligencia artificial en procesos concretos: búsqueda, clasificación, preparación de respuestas o apoyo al análisis. Probamos su utilidad con límites, trazabilidad y revisión humana." },
];

const deliverySteps = [
  ["01", "Entender", "Conocemos el negocio, el proceso actual y a las personas que lo usan."],
  ["02", "Diseñar", "Acordamos alcance, prioridades, integraciones y criterios para saber si funciona."],
  ["03", "Construir", "Desarrollamos e implementamos junto al equipo, con entregas que se pueden revisar."],
  ["04", "Adoptar", "Acompañamos la puesta en marcha y ajustamos desde el uso real."],
];

export function ImplementationPage() {
  usePageMetadata("Implementación tecnológica", "NexOps diseña e implementa automatización, CRM, datos e inteligencia artificial para mejorar la operación y el crecimiento de empresas.");
  return <Layout home showFloatingWhatsApp={false}>
    <div className={styles.page}>
      <section className={`${styles.hero} ${styles.heroImplementation}`}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>IMPLEMENTACIÓN / HACER QUE SUCEDA</span>
            <h1>La tecnología vale cuando <em>funciona en tu empresa.</em></h1>
            <p>Convertimos desafíos de negocio en soluciones que el equipo puede usar. Diseñamos, integramos y acompañamos la puesta en marcha para mejorar cómo se vende, se opera y se decide.</p>
            <div className={styles.heroActions}><a className={styles.button} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Hablemos de tu desafío <ArrowUpRight size={18} /></a><a className={styles.textLink} href="#capacidades">Explorar capacidades <ArrowRight size={17} /></a></div>
          </div>
          <figure className={styles.heroImage}><img src="/assets/nexops-implementation-editorial.webp" alt="Imagen editorial de un equipo analizando un proceso de trabajo" /><figcaption><span>IDEA → OPERACIÓN</span><strong>Una solución tiene que encajar en el trabajo real.</strong></figcaption><small>Imagen editorial ilustrativa</small></figure>
        </div>
        <div className={`${styles.shell} ${styles.heroIndex}`}><span>01 / DEFINIR EL PROBLEMA</span><span>02 / CONSTRUIR LA SOLUCIÓN</span><span>03 / LLEVARLA A LA OPERACIÓN</span></div>
      </section>

      <section className={styles.statement}><div className={`${styles.shell} ${styles.statementGrid}`}><span className={styles.eyebrow}>NUESTRO PUNTO DE PARTIDA</span><p>No empezamos por una herramienta. Empezamos por la oportunidad, el proceso y lo que tiene que cambiar para el negocio.</p></div></section>

      <section className={styles.section} id="capacidades"><div className={styles.shell}>
        <SectionIntro label="ÁREAS DE IMPLEMENTACIÓN" title={<>Capacidades que se conectan <em>alrededor de un objetivo.</em></>} copy="Podemos resolver un problema puntual o trabajar varias capas de la operación. Cada proyecto se define según el contexto, no por un paquete cerrado." />
        <div className={styles.offerList}>{implementationOffers.map((offer) => <article className={styles.offer} key={offer.number}><div><span>{offer.number} / CAPACIDAD</span><h3>{offer.name}</h3></div><div><strong>{offer.question}</strong><p>{offer.copy}</p></div><MoveUpRight size={22} aria-hidden="true" /></article>)}</div>
      </div></section>

      <section className={`${styles.section} ${styles.soft}`}><div className={styles.shell}>
        <SectionIntro label="MÁS ALLÁ DE UNA CATEGORÍA" title={<>Si el desafío es más amplio, <em>la solución también.</em></>} copy="Integramos las piezas necesarias para que la experiencia y la operación funcionen como un sistema." />
        <div className={styles.capabilityGrid}><div><Layers3 size={24} /><h3>Software e integraciones</h3><p>Sistemas a medida, portales y conexiones entre herramientas para reducir cortes en el flujo de trabajo.</p></div><div><Compass size={24} /><h3>Arquitectura y experiencia</h3><p>Diseño de plataformas y recorridos digitales que hacen simple una operación compleja.</p></div><div><Check size={24} /><h3>Adopción y mejora</h3><p>Documentación, acompañamiento y ajustes para que la nueva capacidad quede incorporada al equipo.</p></div></div>
      </div></section>

      <section className={`${styles.section} ${styles.dark}`}><div className={styles.shell}>
        <SectionIntro light label="DE LA IDEA A LA OPERACIÓN" title={<>Trabajamos con un recorrido claro, <em>sin perder flexibilidad.</em></>} copy="El alcance cambia según cada proyecto, pero siempre hacemos visible qué problema resolvemos, qué se entrega y cómo se incorpora." />
        <ol className={styles.steps}>{deliverySteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      </div></section>

      <section className={styles.crossLink}><div className={`${styles.shell} ${styles.crossGrid}`}><div><span className={styles.eyebrow}>ANTES DE IMPLEMENTAR</span><h2>¿Todavía estás definiendo <em>por dónde empezar?</em></h2></div><div><p>La consultoría nos permite diagnosticar el negocio, ordenar prioridades y construir una hoja de ruta antes de invertir en una solución.</p><Link className={styles.textLink} to="/consultoria">Conocer Consultoría <ArrowRight size={18} /></Link></div></div></section>
      <ContactBand label="CONSTRUYAMOS ALGO ÚTIL" title={<>Tu próximo avance empieza por <em>entender el problema.</em></>} copy="Contanos qué está frenando a tu equipo o qué oportunidad querés aprovechar. Juntos elegimos el primer paso con más sentido." />
    </div>
  </Layout>;
}

const consultingAreas = [
  ["Negocio y oportunidades", "Identificamos qué objetivo importa, dónde se pierde valor y qué cambios podrían tener impacto."],
  ["Procesos y operación", "Entendemos cómo circula hoy el trabajo, dónde aparecen esperas, errores y tareas repetidas."],
  ["Comercial y relación con clientes", "Revisamos el recorrido desde una consulta hasta el seguimiento y la atención posterior."],
  ["Datos para decidir", "Evaluamos fuentes, indicadores y hábitos de lectura para que la información sirva a decisiones concretas."],
  ["Tecnología e integraciones", "Analizamos el ecosistema actual, sus dependencias y las opciones viables de evolución."],
  ["IA con criterio", "Exploramos casos de uso realistas, condiciones de adopción, riesgos y controles necesarios."],
];

export function ConsultingPage() {
  usePageMetadata("Consultoría de negocio y tecnología", "Consultoría NexOps: diagnóstico de negocio, procesos y tecnología; prioridades y hoja de ruta para crecer y operar mejor.");
  return <Layout home showFloatingWhatsApp={false}>
    <div className={styles.page}>
      <section className={`${styles.hero} ${styles.heroConsulting}`}><div className={`${styles.shell} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>CONSULTORÍA / CLARIDAD PARA DECIDIR</span><h1>Antes de elegir tecnología, <em>entendamos tu negocio.</em></h1><p>Te ayudamos a leer el problema completo, encontrar oportunidades y decidir dónde conviene actuar. La consultoría transforma dudas dispersas en prioridades y un camino de trabajo posible.</p><div className={styles.heroActions}><a className={styles.button} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Conversemos sobre tu empresa <ArrowUpRight size={18} /></a><a className={styles.textLink} href="#enfoque">Ver el enfoque <ArrowRight size={17} /></a></div></div>
        <figure className={styles.heroImage}><img src="/assets/nexops-consulting-editorial.webp" alt="Imagen editorial de una conversación de planificación empresarial" /><figcaption><span>PRIMERO, EL CONTEXTO</span><strong>Buenas decisiones antes de grandes inversiones.</strong></figcaption><small>Imagen editorial ilustrativa</small></figure>
      </div><div className={`${styles.shell} ${styles.heroIndex}`}><span>DIAGNÓSTICO</span><span>PRIORIDADES</span><span>HOJA DE RUTA</span></div></section>

      <section className={styles.statement}><div className={`${styles.shell} ${styles.statementGrid}`}><span className={styles.eyebrow}>LA PREGUNTA CORRECTA</span><p>La herramienta puede esperar. Primero hay que saber qué necesita cambiar, por qué y con qué resultado esperado.</p></div></section>

      <section className={styles.section} id="enfoque"><div className={styles.shell}>
        <SectionIntro label="CONSULTORÍA NEXOPS" title={<>Miramos el negocio como un sistema. <em>Encontramos el punto de partida.</em></>} copy="Combinamos visión comercial, operación y criterio tecnológico. No se trata de recomendar todo: se trata de distinguir lo urgente, lo valioso y lo viable." />
        <div className={styles.consultingGrid}>{consultingAreas.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>

      <section className={`${styles.section} ${styles.soft}`}><div className={styles.shell}>
        <SectionIntro label="CÓMO TRABAJAMOS" title={<>Una conversación estratégica que termina <em>en decisiones concretas.</em></>} />
        <div className={styles.consultingFlow}><div><span>01 / ENTENDER</span><h3>Escuchamos y relevamos.</h3><p>Hablamos con quienes conocen la operación, revisamos el proceso y acordamos el problema a resolver.</p></div><div><span>02 / ORDENAR</span><h3>Contrastamos opciones.</h3><p>Separamos síntomas de causas, evaluamos impacto, dependencias y capacidad real del equipo.</p></div><div><span>03 / DECIDIR</span><h3>Definimos próximos pasos.</h3><p>Proponemos prioridades, una hoja de ruta y criterios para medir si el cambio aporta valor.</p></div></div>
      </div></section>

      <section className={`${styles.section} ${styles.dark}`}><div className={`${styles.shell} ${styles.deliverableGrid}`}><div><span className={styles.eyebrow}>QUÉ TE LLEVÁS</span><h2>Más claridad para invertir tiempo, esfuerzo y presupuesto <em>donde tiene sentido.</em></h2></div><div><p>Según el alcance acordado, el trabajo puede traducirse en un diagnóstico, un mapa de procesos, oportunidades priorizadas, alternativas evaluadas y una hoja de ruta de implementación.</p><p>Si avanzamos con la ejecución, el mismo criterio acompaña el desarrollo. Si tu equipo ejecuta, tendrá una dirección más clara para hacerlo.</p><Link className={styles.lightLink} to="/implementacion">Ver cómo implementamos <ArrowRight size={18} /></Link></div></div></section>

      <section className={styles.crossLink}><div className={`${styles.shell} ${styles.crossGrid}`}><div><span className={styles.eyebrow}>EXPERIENCIA APLICADA</span><h2>Decidir mejor importa. <em>Ejecutar también.</em></h2></div><div><p>Conocé trabajos ya realizados en operaciones comerciales, sistemas internos y canales digitales. Cada caso se presenta con su alcance y estado real.</p><Link className={styles.textLink} to="/experiencia">Explorar experiencia <ArrowRight size={18} /></Link></div></div></section>
      <ContactBand label="HABLEMOS DEL CONTEXTO" title={<>Podemos ayudarte a encontrar <em>el siguiente paso.</em></>} copy="No necesitás llegar con una solución definida. Empecemos por lo que hoy te preocupa y lo que querés lograr." />
    </div>
  </Layout>;
}

const detailedCases = [
  { id: "foreign-trade-web", challenge: "Presentar una oferta especializada y sostener un canal de contenidos con control de publicación.", intervention: "Desarrollo del sitio, estructura de servicios y circuito de contenidos.", result: "Un canal web en producción para mostrar servicios y publicar contenido." },
  { id: "industry-crm", challenge: "Ordenar consultas y seguimiento en una operación comercial B2B.", intervention: "Diseño de pipelines, campos, reglas y automatizaciones en el CRM.", result: "Un proceso comercial más estructurado, todavía en evolución." },
  { id: "materials-erp", challenge: "Reunir información comercial y operativa que estaba repartida en varios pasos.", intervention: "Desarrollo de un ERP para clientes, productos, pedidos, compras y listas de precios.", result: "Un sistema comercial integrado en producción." },
];

export function ExperiencePage() {
  usePageMetadata("Experiencia", "Conocé casos reales de NexOps en desarrollo web, CRM, ERP, automatización y sistemas internos. Alcances y estados de implementación documentados.");
  const featuredIds = new Set(detailedCases.map(({ id }) => id));
  return <Layout home showFloatingWhatsApp={false}>
    <div className={styles.page}>
      <section className={`${styles.hero} ${styles.heroExperience}`}><div className={styles.shell}><div className={styles.experienceOpening}><span className={styles.eyebrow}>EXPERIENCIA / TRABAJO REAL</span><h1>Las ideas importan.<br /><em>Lo que queda funcionando, más.</em></h1><p>Estos proyectos muestran distintas formas de acompañar una empresa: entender un desafío, construir una solución y llevarla al trabajo cotidiano. Presentamos cada caso sin atribuciones ni resultados que no podamos sostener.</p><a className={styles.textLink} href="#casos">Conocer los proyectos <ArrowRight size={18} /></a></div><div className={styles.experienceRibbon}><span>PROCESOS</span><span>SISTEMAS</span><span>COMERCIAL</span><span>DATOS</span></div></div></section>

      <section className={styles.section} id="casos"><div className={styles.shell}>
        <SectionIntro label="CASOS SELECCIONADOS" title={<>Contextos distintos. <em>Un mismo compromiso con la ejecución.</em></>} copy="Los casos están anonimizados para cuidar la información de cada organización. Indicamos el alcance y el estado del trabajo; no atribuimos resultados comerciales sin validación." />
        <div className={styles.featuredCases}>{detailedCases.map((item, index) => { const source = realCases.find(({ id }) => id === item.id); return <article key={item.id} className={styles.featuredCase}><div className={styles.caseHeading}><span>0{index + 1} / {source.sector}</span><h3>{source.title}</h3><small>{source.status}</small></div><div className={styles.caseStory}><div><span>EL DESAFÍO</span><p>{item.challenge}</p></div><div><span>EL TRABAJO</span><p>{item.intervention}</p></div><div><span>LO QUE QUEDÓ</span><p>{item.result}</p></div></div></article>; })}</div>
      </div></section>

      <section className={`${styles.section} ${styles.soft}`}><div className={styles.shell}>
        <SectionIntro label="MÁS EXPERIENCIA" title={<>Otras formas de resolver <em>problemas concretos.</em></>} copy="Cada proyecto tiene un momento distinto: algunos están en producción, otros continúan en evolución o piloto." />
        <div className={styles.moreCases}>{realCases.filter(({ id }) => !featuredIds.has(id)).map((item) => <article key={item.id}><div><span>{item.sector} · {item.type}</span><h3>{item.title}</h3><p>{item.summary}</p></div><small>{item.status}</small></article>)}</div>
      </div></section>

      <section className={styles.crossLink}><div className={`${styles.shell} ${styles.crossGrid}`}><div><span className={styles.eyebrow}>TU CONTEXTO ES PROPIO</span><h2>El próximo proyecto no empieza por copiar <em>una solución anterior.</em></h2></div><div><p>Empezamos por entender tu negocio y elegimos el camino más útil: consultoría para decidir, implementación para llevarlo a la práctica o ambas.</p><div className={styles.inlineLinks}><Link className={styles.textLink} to="/consultoria">Consultoría <ArrowRight size={17} /></Link><Link className={styles.textLink} to="/implementacion">Implementación <ArrowRight size={17} /></Link></div></div></div></section>
      <ContactBand label="HABLEMOS DE TU EMPRESA" title={<>¿Qué podríamos ayudar a <em>hacer realidad?</em></>} copy="Contanos dónde está el desafío. La primera conversación sirve para entender si y cómo podemos aportar." />
    </div>
  </Layout>;
}

export function FormationPage() {
  usePageMetadata("Formación en desarrollo", "NexOps está desarrollando una propuesta de formación para conectar tecnología, procesos y decisiones de negocio. Todavía no hay cursos ni inscripciones disponibles.");
  return <Layout home showFloatingWhatsApp={false}>
    <div className={styles.page}>
      <section className={`${styles.hero} ${styles.heroFormation}`}><div className={`${styles.shell} ${styles.formationOpening}`}><span className={styles.eyebrow}>FORMACIÓN / EN DESARROLLO</span><h1>La capacidad de un equipo crece cuando <em>el conocimiento se vuelve práctica.</em></h1><p>Estamos diseñando una propuesta de formación para empresas y equipos que quieren comprender mejor sus procesos, tomar decisiones tecnológicas con criterio y usar nuevas herramientas en su trabajo cotidiano.</p><div className={styles.statusNote}><span className={styles.statusDot} /><strong>Propuesta en desarrollo</strong><span>Todavía no hay cursos, fechas ni inscripciones disponibles.</span></div></div></section>

      <section className={styles.section}><div className={styles.shell}>
        <SectionIntro label="LA DIRECCIÓN QUE ESTAMOS TRABAJANDO" title={<>Aprender con el negocio <em>como punto de partida.</em></>} copy="Queremos que la formación sirva para resolver preguntas reales, conectar conceptos con el trabajo y aumentar la autonomía de los equipos." />
        <div className={styles.formationPrinciples}><article><span>01</span><h3>Contexto antes que herramientas</h3><p>Entender qué necesita la empresa y dónde el conocimiento puede mejorar una decisión o un proceso.</p></article><article><span>02</span><h3>Aplicación al trabajo real</h3><p>Traducir ideas en criterios, ejemplos y prácticas que el equipo pueda llevar a su operación.</p></article><article><span>03</span><h3>Capacidad que permanece</h3><p>Ayudar a las personas a usar mejor la tecnología y adaptarse a medida que el negocio evoluciona.</p></article></div>
      </div></section>

      <section className={`${styles.section} ${styles.soft}`}><div className={`${styles.shell} ${styles.formationNext}`}><div><span className={styles.eyebrow}>MIENTRAS TANTO</span><h2>Ya podemos trabajar juntos <em>en un desafío concreto.</em></h2></div><div><p>Si tu empresa necesita ordenar prioridades o implementar una solución, podemos empezar ahora desde Consultoría e Implementación. La formación pública se anunciará cuando su propuesta esté definida.</p><div className={styles.inlineLinks}><Link className={styles.textLink} to="/consultoria">Conocer Consultoría <ArrowRight size={18} /></Link><Link className={styles.textLink} to="/implementacion">Conocer Implementación <ArrowRight size={18} /></Link></div></div></div></section>
      <ContactBand label="CONVERSEMOS" title={<>¿Tu equipo necesita avanzar <em>hoy?</em></>} copy="Contanos qué necesita aprender o resolver tu organización. Podemos conversar sobre el desafío sin presentar una oferta de cursos todavía." action="Contarnos el desafío" />
    </div>
  </Layout>;
}
