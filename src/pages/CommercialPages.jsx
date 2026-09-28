import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import styles from "./CommercialPages.module.css";

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

function Action({ children, href = CALENDLY_LINK }) {
  return <a className={styles.action} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={18} /></a>;
}

function Closing({ eyebrow, title, copy, action }) {
  return <section className={styles.closing}><div className={styles.shell}><div><span className={styles.eyebrow}>{eyebrow}</span><h2>{title}</h2></div><div><p>{copy}</p><Action>{action}</Action></div></div></section>;
}

const ecommerceSignals = [
  ["01", "Vendés en Mercado Libre, pero dependés demasiado de un canal que no es tuyo.", "Miramos qué productos y clientes podrían construir una relación directa con tu marca."],
  ["02", "Tu tienda tiene tráfico, pero el carrito no acompaña.", "Revisamos producto, contenido, confianza, checkout y fricción antes de comprar más visitas."],
  ["03", "Invertís en publicidad sin saber qué campañas venden de verdad.", "Conectamos pauta con pedidos, margen y recurrencia para decidir qué sostener y qué cortar."],
  ["04", "Stock, precios y catálogo cambian en un lugar y quedan viejos en otro.", "Ordenamos la información y las integraciones para que la venta no dependa de correcciones manuales."],
  ["05", "El cliente compra una vez y después desaparece.", "Diseñamos contenido y email para seguir la relación más allá del primer pedido."],
];

const ecommerceMoves = [
  { number: "01 / BASE DEL NEGOCIO", title: "Antes de acelerar, hay que saber qué conviene vender.", copy: "Trabajamos estrategia y producto: surtido, propuesta comercial, precios, márgenes, stock y rol de cada canal. Si la cuenta no cierra, sumar tráfico sólo agranda el problema.", tags: ["Estrategia y producto", "Datos y rentabilidad"] },
  { number: "02 / CANALES QUE CONVIERTEN", title: "Tu tienda y Mercado Libre tienen que jugar a favor del mismo negocio.", copy: "Mejoramos el ecommerce propio, catálogo, fichas y recorrido de compra. En marketplaces ordenamos publicaciones y operación, cuidando la dependencia del canal y la economía de cada venta.", tags: ["Ecommerce propio", "Marketplaces / Mercado Libre"] },
  { number: "03 / DEMANDA Y RECOMPRA", title: "Que te vean no alcanza si después no compran ni vuelven.", copy: "Conectamos paid media con contenido, redes y email marketing. Cada acción tiene que llevar a una compra, una consulta o una relación que valga la pena sostener.", tags: ["Paid Media", "Redes y contenido", "Email marketing"] },
  { number: "04 / OPERACIÓN CONECTADA", title: "Vender más exige que la operación pueda responder.", copy: "Unimos datos de campañas, tienda y canales para leer rentabilidad. Automatizamos o integramos tareas cuando catálogo, stock, pedidos o seguimiento dependen de trabajo manual.", tags: ["Automatización", "Integraciones", "Medición"] },
];

export function EcommercePage() {
  usePageMetadata("Ecommerce que vende y opera mejor", "NexOps ayuda a negocios que venden online a ordenar tienda, Mercado Libre, campañas, contenido, email, datos y operación con foco en conversión y rentabilidad.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.ecommerceHero}`}><div className={styles.shell}><div className={styles.heroGrid}>
      <div><span className={styles.eyebrow}>ECOMMERCE / CRECIMIENTO CON CRITERIO</span><h1>Vendés online. <em>¿Está creciendo el negocio o sólo el trabajo?</em></h1><p>Una tienda con visitas, publicaciones en Mercado Libre y campañas activas no garantizan ventas rentables. Miramos el negocio completo: qué vendés, dónde se pierde la compra y qué necesita la operación para sostenerla.</p><div className={styles.heroActions}><Action>Quiero potenciar mi ecommerce</Action><a href="#senales" className={styles.textLink}>¿Te pasa esto? <ArrowRight size={17} /></a></div></div>
      <div className={styles.heroAside}><span>VENTA ONLINE REAL</span><strong>Canales + demanda + operación</strong><p>Una misma estrategia para que tienda, marketplace, campañas, contenido, datos y stock no empujen en direcciones distintas.</p><div><span>01 / ATRAER</span><span>02 / CONVERTIR</span><span>03 / REPETIR</span></div></div>
    </div></div></section>

    <section className={styles.signalSection} id="senales"><div className={styles.shell}><div className={styles.sectionIntro}><span className={styles.eyebrow}>LO QUE SUELE FRENAR LA VENTA</span><h2>El problema rara vez es <em>una sola herramienta.</em></h2></div><div className={styles.signalList}>{ecommerceSignals.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className={styles.featureSection}><div className={styles.shell}><div className={styles.featureHeading}><span className={styles.eyebrow}>CÓMO ENTRAMOS</span><h2>Unimos las piezas que mueven <em>la venta y el margen.</em></h2><p>El trabajo cambia según el negocio. Estas son las decisiones que conectamos, no un paquete para contratar entero.</p></div><div className={styles.moveGrid}>{ecommerceMoves.map((move) => <article key={move.number}><span>{move.number}</span><h3>{move.title}</h3><p>{move.copy}</p><div>{move.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></article>)}</div></div></section>

    <section className={styles.exampleSection}><div className={styles.shell}><div className={styles.exampleLead}><span className={styles.eyebrow}>EXPERIENCIA APLICADA</span><h2>Ya trabajamos donde estos problemas <em>se cruzan.</em></h2></div><div className={styles.exampleCards}><article><span>SOMMIER MAGNO</span><h3>Mercado Libre y canal propio, paso a paso.</h3><p>El lanzamiento exigía coordinar catálogo, publicaciones, contenido, web y economía del canal. Se trabajó una salida piloto antes de escalar pauta.</p></article><article><span>ONLYSELLERS</span><h3>Contenido y email que no nacen de cero cada semana.</h3><p>La operación de email combina segmentación, calendario y una biblioteca editorial para sostener campañas y aprender de la respuesta de la base.</p></article></div><Link className={styles.textLink} to="/experiencia">Conocer los trabajos reales <ArrowRight size={18} /></Link></div></section>

    <section className={styles.crossSection}><div className={styles.shell}><strong>¿El problema va más allá de vender online?</strong><p>Si lo que se desordenó son los procesos, el equipo comercial o los sistemas de toda la empresa, empecemos por Consultoría.</p><Link to="/consultoria">Conocer Consultoría <ArrowRight size={17} /></Link></div></section>
    <Closing eyebrow="HABLEMOS DE TU VENTA ONLINE" title={<>¿Qué parte de tu ecommerce <em>no está rindiendo?</em></>} copy="Contanos si el cuello está en Mercado Libre, tu tienda, las campañas, el stock o la recompra. En la primera conversación ubicamos el problema y el mejor punto de partida." action="Quiero potenciar mi ecommerce" />
  </div></Layout>;
}

const consultingSignals = [
  ["Ventas recibe consultas, pero nadie sabe cuál es el próximo paso.", "Seguimiento comercial y CRM"],
  ["Crecimos; ahora aprobar, cotizar o entregar requiere demasiadas planillas y mensajes.", "Procesos y operación"],
  ["Tenemos varios sistemas, pero el equipo sigue copiando datos entre ellos.", "Tecnología e integraciones"],
  ["Hay reportes por todos lados y aun así cuesta ver qué está pasando.", "Datos y decisiones"],
  ["Queremos usar IA, pero no sabemos en qué tarea vale la pena ni cómo controlarla.", "Automatización e IA"],
];

const consultingScenarios = [
  { label: "COMERCIAL", title: "Las oportunidades se enfrían entre una consulta y otra.", copy: "Revisamos cómo entran los contactos, quién responde, qué queda registrado y qué seguimiento falta. De ahí puede salir un proceso comercial y un CRM que el equipo sí pueda usar." },
  { label: "OPERACIÓN", title: "Cada venta suma trabajo manual y más excepciones.", copy: "Mapeamos pasos, responsables y sistemas. Elegimos qué simplificar, qué automatizar y qué necesita seguir bajo criterio de una persona." },
  { label: "DIRECCIÓN", title: "Tenés datos y herramientas, pero cuesta decidir dónde invertir.", copy: "Ordenamos indicadores, prioridades y alternativas. La IA entra cuando resuelve una tarea concreta con contexto, permisos y revisión." },
];

export function ConsultingPage() {
  usePageMetadata("Consultoría de negocio, procesos y tecnología", "Consultoría NexOps para empresas con ventas desordenadas, tareas manuales, sistemas desconectados o datos difíciles de usar. Diagnóstico y prioridades antes de elegir tecnología.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.consultingHero}`}><div className={styles.shell}><div className={styles.heroGrid}>
      <div><span className={styles.eyebrow}>CONSULTORÍA / NEGOCIO PRIMERO</span><h1>Tu empresa creció. <em>¿La operación pudo seguirle el ritmo?</em></h1><p>Cuando ventas pierde seguimiento, los procesos dependen de personas clave y los sistemas no se hablan, comprar otra herramienta no alcanza. Entramos al negocio para entender qué se rompió y definir qué conviene cambiar primero.</p><div className={styles.heroActions}><Action>Quiero entender por dónde empezar</Action><a href="#situaciones" className={styles.textLink}>Ver situaciones frecuentes <ArrowRight size={17} /></a></div></div>
      <figure className={styles.heroPhoto}><img src="/assets/nexops-consulting-editorial.webp" alt="Imagen editorial ilustrativa de una conversación de planificación empresarial" /><figcaption>Primero entendemos el negocio y a quienes lo operan.</figcaption><small>Imagen editorial ilustrativa</small></figure>
    </div></div></section>

    <section className={styles.signalSection} id="situaciones"><div className={styles.shell}><div className={styles.sectionIntro}><span className={styles.eyebrow}>CUÁNDO ENTRA CONSULTORÍA</span><h2>No hace falta llegar con <em>la solución definida.</em></h2></div><div className={styles.consultingSignals}>{consultingSignals.map(([situation, area]) => <article key={area}><h3>“{situation}”</h3><span>{area}</span></article>)}</div></div></section>

    <section className={styles.consultingScenarios}><div className={styles.shell}><span className={styles.eyebrow}>DEL SÍNTOMA A UNA DECISIÓN</span><h2>Miramos el problema donde <em>ocurre.</em></h2><div className={styles.scenarioGrid}>{consultingScenarios.map((scenario) => <article key={scenario.label}><span>{scenario.label}</span><h3>{scenario.title}</h3><p>{scenario.copy}</p></article>)}</div></div></section>

    <section className={styles.consultingOutput}><div className={styles.shell}><div><span className={styles.eyebrow}>QUÉ SALE DEL TRABAJO</span><h2>Una prioridad que el equipo <em>puede ejecutar.</em></h2><p>Según el alcance, puede ser un diagnóstico, un proceso comercial definido, un mapa de fricciones, indicadores para dirigir o una hoja de ruta. Cada recomendación explica qué problema resuelve, quién participa y cómo sabremos si mejoró.</p></div><ol><li><span>01</span><strong>Entender</strong><p>Escuchamos a dirección y al equipo; revisamos el recorrido real del trabajo.</p></li><li><span>02</span><strong>Elegir</strong><p>Separamos urgencias de causas y contrastamos impacto, esfuerzo y dependencias.</p></li><li><span>03</span><strong>Avanzar</strong><p>Definimos un primer cambio que se pueda implementar y revisar.</p></li></ol></div></section>

    <section className={styles.crossSection}><div className={styles.shell}><strong>¿Tu principal desafío es vender online?</strong><p>Si la pregunta está en tienda, Mercado Libre, campañas, catálogo o recompra, mirá nuestra puerta de Ecommerce.</p><Link to="/ecommerce">Conocer Ecommerce <ArrowRight size={17} /></Link></div></section>
    <Closing eyebrow="HABLEMOS DE TU OPERACIÓN" title={<>Contanos dónde se está <em>trabando tu empresa.</em></>} copy="No necesitás un brief técnico. Decinos qué se pierde, qué cuesta sostener o qué decisión está pendiente; empezamos por ahí." action="Quiero entender por dónde empezar" />
  </div></Layout>;
}

const stories = [
  { slug: "sommier-magno", client: "Sommier Magno", category: "Ecommerce y marketplace", problem: "El lanzamiento online necesitaba conectar catálogo, publicaciones, contenido, precios y operación antes de ampliar inversión en pauta.", work: "Se organizó una salida piloto de Mercado Libre y web, con trabajo sobre publicaciones, activos de contenido y economía del canal.", change: "El piloto se ordenó por catálogo y validaciones comerciales antes de ampliar la pauta.", status: "Piloto y activación comercial" },
  { slug: "onlysellers", client: "OnlySellers", category: "Email marketing", problem: "Sostener una relación comercial por email requería segmentación y contenido constante, sin improvisar cada campaña.", work: "NexOps participa en estrategia de comunicación, segmentación, calendario, producción y ejecución de emails.", change: "Quedó una operación de email con cadencia y biblioteca editorial reutilizable para planificar y aprender de cada envío.", status: "Operación activa" },
  { slug: "casa-italia", client: "Casa Italia", category: "Operación comercial", problem: "Clientes, productos, pedidos, compras y listas de precios necesitaban un circuito compartido.", work: "Se desarrolló un ERP comercial a medida y se incorporó por circuitos al trabajo cotidiano.", change: "El sistema comercial está en producción y evoluciona con los hallazgos del uso real.", status: "En producción" },
  { slug: "globaltrip", client: "GlobalTrip", category: "Web y contenidos", problem: "Una oferta logística especializada necesitaba explicarse en la web y sostener un canal de contenidos con control.", work: "Se trabajó el sitio corporativo, su estructura de servicios y el circuito de publicación.", change: "La empresa cuenta con un canal web para presentar servicios y publicar contenido bajo un proceso controlado.", status: "Canal web activo" },
];

export function ExperiencePage() {
  usePageMetadata("Experiencia con clientes reales", "Conocé trabajos de NexOps con Sommier Magno, OnlySellers, Casa Italia y GlobalTrip: problemas de ecommerce, email, operación y web, con alcance y estado reales.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.experienceHero}`}><div className={`${styles.shell} ${styles.experienceHeroGrid}`}><div><span className={styles.eyebrow}>EXPERIENCIA / CLIENTES REALES</span><h1>El trabajo se entiende mejor <em>cuando tiene contexto.</em></h1><p>Un marketplace que necesita orden antes de escalar. Una operación comercial que pide un sistema propio. Un canal de email que requiere continuidad. Cada trabajo empieza en una situación distinta.</p><a href="#historias" className={styles.textLink}>Conocer las historias <ArrowRight size={18} /></a></div><div className={styles.experiencePreview} aria-label="Trabajos destacados"><span>DEL PROBLEMA AL TRABAJO</span><div><strong>Sommier Magno</strong><small>Marketplaces y canal propio</small></div><div><strong>OnlySellers</strong><small>Email y relación con clientes</small></div><div><strong>Casa Italia</strong><small>ERP comercial a medida</small></div></div></div></section>

    <section className={styles.experienceClients}><div className={styles.shell}><span>EMPRESAS CON LAS QUE TRABAJAMOS</span><div>{["Sommier Magno", "OnlySellers", "Casa Italia", "GlobalTrip", "Edelvives", "Kenta", "Dexa / Kahuna", "Punky"].map((name) => <strong key={name}>{name}</strong>)}</div></div></section>

    <section className={styles.stories} id="historias"><div className={styles.shell}><div className={styles.storiesIntro}><span className={styles.eyebrow}>PROBLEMA → TRABAJO → CAMBIO</span><h2>Qué hicimos con <em>cada empresa.</em></h2><p>Cuatro situaciones distintas y el trabajo que hicimos en cada una. Al final de cada historia indicamos en qué estado está el proyecto.</p></div><div className={styles.storyList}>{stories.map((story, index) => <article id={story.slug} key={story.client}><div className={styles.storyIdentity}><span>0{index + 1} / {story.category}</span><h3>{story.client}</h3></div><div className={styles.storyNarrative}><div><strong>El problema</strong><p>{story.problem}</p></div><div><strong>Qué hicimos</strong><p>{story.work}</p></div><div><strong>Qué cambió</strong><p>{story.change}</p></div><small>{story.status}</small></div></article>)}</div></div></section>

    <section className={styles.experienceMore}><div className={styles.shell}><span className={styles.eyebrow}>OTROS FRENTES</span><h2>Distintos negocios. <em>La misma forma de entrar.</em></h2><div><p><strong>Edelvives:</strong> proyecto puntual de CRM a medida en desarrollo.</p><p><strong>Kenta:</strong> construcción de marca, contenido y campañas para desarrollar su canal propio.</p><p><strong>Dexa / Kahuna:</strong> operación comercial con CRM, pauta y automatización según el frente.</p></div></div></section>

    <Closing eyebrow="TU NEGOCIO TIENE SU CONTEXTO" title={<>¿Qué historia necesita empezar <em>tu empresa?</em></>} copy="Contanos el problema de venta u operación que hoy te ocupa. Podemos conversar sobre el alcance real antes de hablar de una solución." action="Conversemos sobre tu empresa" />
  </div></Layout>;
}
