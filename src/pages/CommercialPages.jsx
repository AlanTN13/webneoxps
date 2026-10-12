import { ArrowDown, ArrowRight, ArrowUpRight, ChartNoAxesCombined, Database, Megaphone, MessageSquare, PackageCheck, ShoppingBag, Store, Workflow } from "lucide-react";
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
  ["01", "Mercado Libre vende, pero dependés demasiado de un canal que no es tuyo.", "Revisamos surtido, margen y clientes por canal para decidir qué venta conviene llevar a tu tienda."],
  ["02", "Tu tienda recibe visitas, pero no convierte.", "Revisamos fichas de producto, confianza, recorrido de compra y checkout antes de comprar más tráfico."],
  ["03", "Pagás publicidad sin saber qué campañas dejan margen.", "Cruzamos inversión, pedidos y rentabilidad para decidir qué campañas sostener, corregir o frenar."],
  ["04", "Stock, catálogo y precios exigen correcciones manuales todos los días.", "Ordenamos la información de producto y conectamos los sistemas que hoy obligan a cargar lo mismo varias veces."],
  ["05", "Tus clientes compran una vez y no vuelven.", "Segmentamos la base y trabajamos contenido y email para activar recompra y aprender de cada envío."],
];

const ecommerceMoves = [
  { number: "01 / BASE DEL NEGOCIO", title: "Antes de acelerar, hay que saber qué conviene vender.", copy: "Trabajamos estrategia y producto: surtido, propuesta comercial, precios, márgenes, stock y rol de cada canal. Si la cuenta no cierra, sumar tráfico sólo agranda el problema.", tags: ["Estrategia y producto", "Datos y rentabilidad"] },
  { number: "02 / CANALES QUE CONVIERTEN", title: "Tu tienda y Mercado Libre tienen que jugar a favor del mismo negocio.", copy: "Mejoramos el ecommerce propio, catálogo, fichas y recorrido de compra. En marketplaces ordenamos publicaciones y operación, cuidando la dependencia del canal y la economía de cada venta.", tags: ["Ecommerce propio", "Marketplaces / Mercado Libre"] },
  { number: "03 / DEMANDA Y RECOMPRA", title: "Que te vean no alcanza si después no compran ni vuelven.", copy: "Conectamos paid media con contenido, redes y email marketing. Cada acción tiene que llevar a una compra, una consulta o una relación que valga la pena sostener.", tags: ["Paid Media", "Redes y contenido", "Email marketing"] },
  { number: "04 / OPERACIÓN CONECTADA", title: "Vender más exige que la operación pueda responder.", copy: "Unimos datos de campañas, tienda y canales para leer rentabilidad. Automatizamos o integramos tareas cuando catálogo, stock, pedidos o seguimiento dependen de trabajo manual.", tags: ["Automatización", "Integraciones", "Medición"] },
];

function EcommerceDiagram() {
  return <figure className={styles.ecommerceDiagram} role="img" aria-label="Diagrama de campañas y marketplaces conectados con una tienda online, pedidos, stock y margen">
    <div className={styles.diagramSources} aria-hidden="true"><span><Megaphone size={18} /> Campañas</span><span><Store size={18} /> Marketplaces</span></div>
    <ArrowDown className={styles.diagramArrow} size={21} aria-hidden="true" />
    <div className={styles.diagramStore} aria-hidden="true">
      <div className={styles.diagramStoreHeader}><div><i /><i /><i /></div><strong>Tu tienda online</strong><ShoppingBag size={20} /></div>
      <div className={styles.diagramStoreBody}><div className={styles.diagramFeaturedProduct}><span /><strong>Producto destacado</strong><small>Ver producto ↗</small></div><div className={styles.diagramProductList}><span /><span /><span /></div></div>
    </div>
    <ArrowDown className={styles.diagramArrow} size={21} aria-hidden="true" />
    <div className={styles.diagramOutcomes} aria-hidden="true"><span><ShoppingBag size={17} /> Pedidos</span><span><PackageCheck size={17} /> Stock</span><span><ChartNoAxesCombined size={17} /> Margen</span></div>
  </figure>;
}

export function EcommercePage() {
  usePageMetadata("Ecommerce que vende y opera mejor", "NexOps ayuda a negocios que venden online a ordenar tienda, Mercado Libre, campañas, contenido, email, datos y operación con foco en conversión y rentabilidad.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.ecommerceHero}`}><div className={styles.shell}><div className={styles.heroGrid}>
      <div><h1>Vende más y de manera <em>rentable con NexOps.</em></h1><p>Una tienda con visitas, publicaciones en Mercado Libre y campañas activas no garantizan ventas rentables. Miramos el negocio completo: qué vendés, dónde se pierde la compra y qué necesita la operación para sostenerla.</p><div className={styles.heroActions}><Action>Quiero potenciar mi negocio</Action><a href="#senales" className={styles.textLink}>¿Es para mí? <ArrowRight size={17} /></a></div></div>
      <EcommerceDiagram />
    </div></div></section>

    <section className={styles.signalSection} id="senales"><div className={styles.shell}><div className={styles.sectionIntro}><h2>Señales de que tu negocio necesita un <em>plan estratégico de trabajo.</em></h2></div><div className={styles.signalList}>{ecommerceSignals.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p><strong>Qué hacemos:</strong> {copy}</p></div></article>)}</div></div></section>

    <section className={styles.featureSection}><div className={styles.shell}><div className={styles.featureHeading}><span className={styles.eyebrow}>CÓMO ENTRAMOS</span><h2>Tienda, anuncios, marketplaces y operación <em>no pueden trabajar cada uno por su lado.</em></h2><p>Elegimos el cuello de botella real y conectamos solo el trabajo que el negocio necesita: producto, canales, demanda y operación.</p></div><div className={styles.moveGrid}>{ecommerceMoves.map((move) => <article key={move.number}><span>{move.number}</span><h3>{move.title}</h3><p>{move.copy}</p><div>{move.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></article>)}</div></div></section>

    <section className={styles.crossSection}><div className={styles.shell}><strong>¿El problema va más allá de vender online?</strong><p>Si lo que se desordenó son los procesos, el equipo comercial o los sistemas de toda la empresa, empecemos por Consultoría.</p><Link to="/consultoria">Conocer Consultoría <ArrowRight size={17} /></Link></div></section>
    <Closing eyebrow="HABLEMOS DE TU VENTA ONLINE" title={<>¿Qué parte de tu ecommerce <em>no está rindiendo?</em></>} copy="Contanos si el cuello está en Mercado Libre, tu tienda, las campañas, el stock o la recompra. En la primera conversación ubicamos el problema y el mejor punto de partida." action="Quiero potenciar mi negocio" />
  </div></Layout>;
}

const consultingSignals = [
  ["Tu equipo comercial recibe consultas, pero algunas oportunidades quedan sin respuesta.", "Seguimiento comercial", "Revisamos entrada de contactos, responsables, próximos pasos y registro en CRM."],
  ["Dos personas clave tienen que aprobar o destrabar casi todo.", "Dependencia operativa", "Mapeamos decisiones, responsables y excepciones para que el trabajo no dependa de su memoria."],
  ["Los sistemas muestran datos distintos y el equipo copia información entre ellos.", "Sistemas e integraciones", "Trazamos de dónde sale cada dato y dónde se corta el flujo entre herramientas."],
  ["Nadie confía del todo en los números de ventas o margen.", "Datos y decisiones", "Acordamos indicadores útiles y contrastamos las fuentes antes de armar otro tablero."],
  ["Querés usar IA, pero no sabés en qué tarea aportaría valor.", "IA aplicada", "Elegimos un caso de uso concreto y definimos contexto, permisos y revisión humana."],
  ["Cada pedido exige copiar datos, perseguir mensajes y corregir planillas.", "Trabajo manual", "Identificamos tareas repetidas y decidimos qué simplificar, integrar o automatizar."],
];

function ConsultingDiagram() {
  return <figure className={styles.consultingDiagram} role="img" aria-label="Diagrama de Consultoría: ventas, procesos y datos se revisan para definir una prioridad, responsables y cómo medir el cambio">
    <div className={styles.consultingDiagramInputs} aria-hidden="true"><span><MessageSquare size={18} /> Ventas</span><span><Workflow size={18} /> Procesos</span><span><Database size={18} /> Datos</span></div>
    <div className={styles.consultingDiagramConnector} aria-hidden="true"><i /><ArrowDown size={20} /></div>
    <div className={styles.consultingDiagramBoard} aria-hidden="true"><div className={styles.consultingDiagramBoardTop}><span>DIAGNÓSTICO DEL NEGOCIO</span><span>01 — 03</span></div><div className={styles.consultingDiagramBoardBody}><div><b>01</b><strong>Entender el circuito real</strong><small>Qué se pierde y dónde se traba</small></div><div><b>02</b><strong>Elegir una prioridad</strong><small>Impacto, esfuerzo y dependencias</small></div><div><b>03</b><strong>Definir cómo avanzar</strong><small>Responsables y próximos pasos</small></div></div></div>
    <div className={styles.consultingDiagramResult} aria-hidden="true"><span>UN PLAN DE TRABAJO CONCRETO</span><strong>Qué cambiar primero <ArrowUpRight size={23} /></strong></div>
  </figure>;
}

export function ConsultingPage() {
  usePageMetadata("Consultoría de negocio, procesos y tecnología", "Consultoría NexOps para empresas con ventas desordenadas, tareas manuales, sistemas desconectados o datos difíciles de usar. Diagnóstico y prioridades antes de elegir tecnología.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.consultingHero}`}><div className={styles.shell}><div className={styles.heroGrid}>
      <div><h1>Ordená tu operación para <em>crecer con más control.</em></h1><p>Si las consultas se pierden, el trabajo depende de personas clave o los sistemas muestran datos distintos, no necesitás empezar por otra herramienta. Revisamos cómo funciona hoy el negocio, encontramos el cuello de botella y priorizamos el cambio que conviene hacer primero.</p><div className={styles.heroActions}><Action>Quiero ordenar mi operación</Action><a href="#situaciones" className={styles.textLink}>¿Es para mí? <ArrowRight size={17} /></a></div></div>
      <ConsultingDiagram />
    </div></div></section>

    <section className={styles.signalSection} id="situaciones"><div className={styles.shell}><div className={styles.sectionIntro}><h2>Señales de que tu empresa necesita <em>ordenar cómo trabaja.</em></h2></div><div className={styles.signalList}>{consultingSignals.map(([situation, area, response], index) => <article key={area}><span>0{index + 1}</span><div><h3>{situation}</h3><p><strong>Qué revisamos:</strong> {response}</p></div></article>)}</div></div></section>

    <section className={styles.consultingOutput}><div className={styles.shell}><div><span className={styles.eyebrow}>CÓMO TRABAJAMOS</span><h2>Del problema a un plan que tu equipo <em>puede poner en marcha.</em></h2><p>Trabajamos con dirección y el equipo para reconstruir el circuito real, elegir el cuello de botella y definir un primer cambio. Según el alcance, queda un diagnóstico, un proceso comercial, un mapa de fricciones, indicadores o una hoja de ruta. Cada recomendación indica responsables y cómo medir si funcionó.</p></div><ol><li><span>01</span><strong>Entender</strong><p>Escuchamos a dirección y al equipo; revisamos el recorrido real del trabajo.</p></li><li><span>02</span><strong>Priorizar</strong><p>Separamos urgencias de causas y contrastamos impacto, esfuerzo y dependencias.</p></li><li><span>03</span><strong>Avanzar</strong><p>Definimos un primer cambio que se pueda implementar y revisar.</p></li></ol></div></section>

    <section className={styles.crossSection}><div className={styles.shell}><strong>¿Tu principal desafío es vender online?</strong><p>Si la pregunta está en tienda, Mercado Libre, campañas, catálogo o recompra, mirá nuestra puerta de Ecommerce.</p><Link to="/ecommerce">Conocer Ecommerce <ArrowRight size={17} /></Link></div></section>
    <Closing eyebrow="HABLEMOS DE TU OPERACIÓN" title={<>Contanos qué está <em>trabando tu operación.</em></>} copy="No necesitás un brief técnico. Decinos qué se pierde, qué cuesta sostener o qué decisión está pendiente; empezamos por ahí." action="Quiero ordenar mi operación" />
  </div></Layout>;
}

const stories = [
  { slug: "sommier-magno", client: "Sommier Magno", category: "Ecommerce y marketplace", problem: "El lanzamiento online necesitaba conectar catálogo, publicaciones, contenido, precios y operación antes de ampliar inversión en pauta.", work: "Se organizó una salida piloto de Mercado Libre y web, con trabajo sobre publicaciones, activos de contenido y economía del canal.", change: "Quedó un piloto de catálogo y publicaciones con validaciones comerciales para decidir cuándo ampliar la pauta.", outcomeLabel: "Qué quedó en marcha", status: "Piloto y activación comercial" },
  { slug: "onlysellers", client: "OnlySellers", category: "Email marketing", problem: "Sostener una relación comercial por email requería segmentación y contenido constante, sin improvisar cada campaña.", work: "NexOps participa en estrategia de comunicación, segmentación, calendario, producción y ejecución de emails.", change: "Quedó una operación de email con cadencia y biblioteca editorial reutilizable para planificar y aprender de cada envío.", outcomeLabel: "Qué quedó funcionando", status: "Operación activa" },
  { slug: "casa-italia", client: "Casa Italia", category: "Operación comercial", problem: "Clientes, productos, pedidos, compras y listas de precios necesitaban un circuito compartido.", work: "Se desarrolló un ERP comercial a medida y se incorporó por circuitos al trabajo cotidiano.", change: "El ERP comercial está en producción y evoluciona con los hallazgos del uso real.", outcomeLabel: "Qué quedó funcionando", status: "En producción" },
  { slug: "globaltrip", client: "GlobalTrip", category: "Web y contenidos", problem: "Una oferta logística especializada necesitaba explicarse en la web y sostener un canal de contenidos con control.", work: "Se trabajó el sitio corporativo, su estructura de servicios y el circuito de publicación.", change: "La empresa cuenta con un canal web para presentar servicios y publicar contenido bajo un proceso controlado.", outcomeLabel: "Qué quedó funcionando", status: "Canal web activo" },
];

export function ExperiencePage() {
  usePageMetadata("Experiencia con clientes reales", "Conocé trabajos de NexOps con Sommier Magno, OnlySellers, Casa Italia y GlobalTrip: problemas de ecommerce, email, operación y web, con alcance y estado reales.");
  return <Layout home showFloatingWhatsApp={false}><div className={styles.page}>
    <section className={`${styles.hero} ${styles.experienceHero}`}><div className={`${styles.shell} ${styles.experienceHeroGrid}`}><div><span className={styles.eyebrow}>EXPERIENCIA / CLIENTES REALES</span><h1>Del marketplace al ERP: <em>trabajo que ya pusimos en marcha.</em></h1><p>Sommier Magno necesitaba ordenar un lanzamiento online; OnlySellers, sostener su canal de email; Casa Italia, usar un sistema comercial propio. Mostramos qué problema había, qué hicimos y qué quedó en uso o en marcha.</p><a href="#historias" className={styles.textLink}>Ver los casos <ArrowRight size={18} /></a></div><div className={styles.experiencePreview} aria-label="Trabajos destacados"><span>TRABAJOS CON NOMBRE Y ALCANCE</span><div><strong>Sommier Magno</strong><small>Piloto de catálogo, web y Mercado Libre</small></div><div><strong>OnlySellers</strong><small>Operación de email con calendario</small></div><div><strong>Casa Italia</strong><small>ERP comercial en producción</small></div></div></div></section>

    <section className={styles.experienceClients}><div className={styles.shell}><span>EMPRESAS CON LAS QUE TRABAJAMOS</span><div><img src="/globaltrip_logo.svg" alt="GlobalTrip" loading="lazy" />{["Sommier Magno", "OnlySellers", "Casa Italia", "Edelvives", "Kenta", "Dexa / Kahuna", "Punky"].map((name) => <strong key={name}>{name}</strong>)}</div></div></section>

    <section className={styles.stories} id="historias"><div className={styles.shell}><div className={styles.storiesIntro}><span className={styles.eyebrow}>CLIENTE → PROBLEMA → TRABAJO → QUÉ QUEDÓ</span><h2>Qué necesitaba cada cliente <em>y qué quedó hecho.</em></h2><p>Un piloto de venta online, una operación de email, un ERP en producción y un canal web activo: cada trabajo tiene un alcance distinto.</p></div><div className={styles.storyList}>{stories.map((story, index) => <article id={story.slug} key={story.client}><div className={styles.storyIdentity}><span>0{index + 1} / {story.category}</span><h3>{story.client}</h3></div><div className={styles.storyNarrative}><div><strong>El problema</strong><p>{story.problem}</p></div><div><strong>Qué hicimos</strong><p>{story.work}</p></div><div><strong>{story.outcomeLabel}</strong><p>{story.change}</p></div>{story.metric && <div className={styles.storyMetric}><strong>{story.metric.value}</strong><span>{story.metric.label}</span></div>}<small>{story.status}</small></div></article>)}</div></div></section>

    <section className={styles.experienceMore}><div className={styles.shell}><span className={styles.eyebrow}>OTROS FRENTES</span><h2>De CRM a marca: <em>otros trabajos con clientes.</em></h2><div><p><strong>Edelvives:</strong> proyecto puntual de CRM a medida en desarrollo.</p><p><strong>Kenta:</strong> construcción de marca, contenido y campañas para desarrollar su canal propio.</p><p><strong>Dexa / Kahuna:</strong> operación comercial con CRM, pauta y automatización según el frente.</p></div></div></section>

    <Closing eyebrow="HABLEMOS DE TU NEGOCIO" title={<>¿Qué venta o proceso necesitás <em>poner a funcionar?</em></>} copy="Contanos si el problema está en un canal de venta, el seguimiento comercial o un sistema que ya no acompaña. Empezamos por lo que pasa en tu empresa." action="Conversemos sobre tu empresa" />
  </div></Layout>;
}
