import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import styles from "./HomePage.module.css";

const clients = ["GlobalTrip", "OnlySellers", "Sommier Magno", "Casa Italia", "Edelvives", "Kenta"];
const situations = [
  ["Ecommerce", "Vendés en Mercado Libre, pero el canal propio no despega.", "Catálogo, precios, contenido y campañas tienen que trabajar juntos para no depender de una sola vidriera."],
  ["Ecommerce", "Pagás por visitas y no tenés claro qué termina en ventas.", "Revisamos la tienda, el recorrido de compra, la inversión y los datos antes de pedirle más presupuesto a la pauta."],
  ["Consultoría", "El equipo comercial recibe consultas, pero pierde el seguimiento.", "Ordenamos responsables, etapas y próximos pasos para que las oportunidades no dependan de la memoria de cada persona."],
  ["Consultoría", "La empresa creció y ahora todo pasa por planillas y mensajes.", "Entramos a la operación para encontrar los cortes reales y definir qué conviene cambiar primero."],
];
const proof = [
  { client: "Sommier Magno", category: "ECOMMERCE Y MARKETPLACE", problem: "Lanzar web y Mercado Libre con catálogo, contenido y economía de canal coordinados.", work: "Acompañamos una salida por etapas, desde el catálogo piloto y las publicaciones hasta la preparación de contenido y pauta.", result: "Un piloto ordenado por catálogo y validaciones comerciales antes de ampliar la pauta.", href: "/experiencia#sommier-magno" },
  { client: "OnlySellers", category: "EMAIL Y RELACIÓN CON CLIENTES", problem: "Sostener comunicación comercial sin improvisar cada envío.", work: "Organizamos segmentación, calendario y una biblioteca editorial para alimentar campañas de email.", result: "Un circuito de comunicación activo que permite revisar y ajustar cada campaña.", href: "/experiencia#onlysellers" },
  { client: "Casa Italia", category: "OPERACIÓN Y SISTEMAS", problem: "Reunir pedidos, compras, productos y precios en un mismo trabajo comercial.", work: "Desarrollamos un ERP a medida y lo incorporamos a la operación por circuitos.", result: "Un sistema comercial en producción, con evolución guiada por el uso real.", href: "/experiencia#casa-italia" },
];

export default function HomePage() {
  useEffect(() => {
    document.title = "NexOps — Ecommerce y consultoría para crecer y operar mejor";
    const existing = document.querySelector('meta[name="description"]');
    const meta = existing ?? document.createElement("meta");
    const previous = meta.getAttribute("content");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Ecommerce y consultoría para empresas que quieren vender mejor y ordenar su operación. NexOps conecta estrategia, canales, procesos y tecnología con problemas reales de negocio.");
    if (!existing) document.head.appendChild(meta);
    return () => {
      if (!existing) meta.remove();
      else if (previous === null) meta.removeAttribute("content");
      else meta.setAttribute("content", previous);
    };
  }, []);

  return <Layout showFloatingWhatsApp={false} home><div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title"><div className={styles.shell}><div className={styles.heroGrid}>
      <div className={styles.heroCopy}>
        <span className={styles.heroEyebrow}>ECOMMERCE + CONSULTORÍA DE NEGOCIO</span>
        <h1 id="home-title">Vendé mejor. <em>Hacé que tu empresa funcione mejor.</em></h1>
        <p>Si tu tienda recibe visitas pero no vende lo suficiente, o si tu empresa creció y la operación se volvió difícil de manejar, podemos ayudarte. Entramos al negocio, encontramos lo que frena el avance y trabajamos con vos para cambiarlo.</p>
        <div className={styles.heroActions}><Link className={styles.primary} to="/ecommerce">Quiero potenciar mi ecommerce <ArrowUpRight size={18} /></Link><Link className={styles.quietLink} to="/consultoria">Necesito ordenar mi empresa <ArrowRight size={18} /></Link></div>
        <div className={styles.heroProof}><span className={styles.proofMark}>N<span>↗</span></span><p><strong>Negocio primero. Trabajo que se implementa.</strong><br />Experiencia en canales de venta, procesos y sistemas reales.</p></div>
      </div>
      <figure className={styles.heroVisual}><img src="/assets/nexops-conversation-editorial.webp" alt="Imagen editorial ilustrativa de profesionales conversando sobre un negocio" fetchPriority="high" /><figcaption><span>ENTENDER → ACTUAR</span><strong>El punto de partida es lo que hoy le pasa a tu empresa.</strong></figcaption><small>Imagen editorial ilustrativa</small></figure>
    </div></div></section>

    <section className={styles.doors} id="soluciones" aria-labelledby="doors-title"><div className={styles.shell}>
      <span className={styles.eyebrow}>DOS FORMAS DE AYUDARTE</span><h2 id="doors-title">¿Qué necesitás resolver <em>hoy?</em></h2>
      <div className={styles.doorGrid}>
        <article className={styles.doorEcommerce}><span className={styles.doorNumber}>01 / VENDÉS ONLINE</span><h3>Ecommerce</h3><p>Tenés tienda, vendés en Mercado Libre o querés abrir un canal propio. Unimos estrategia, catálogo, campañas, contenido y operación para que vender online sea un negocio más sano.</p><div className={styles.doorSituations}><span>Tráfico que no convierte</span><span>Dependencia del marketplace</span><span>Pauta sin claridad</span></div><Link to="/ecommerce">Quiero potenciar mi ecommerce <ArrowUpRight size={18} /></Link></article>
        <article className={styles.doorConsulting}><span className={styles.doorNumber}>02 / NECESITÁS ORDENAR</span><h3>Consultoría</h3><p>Las ventas pierden seguimiento, los sistemas no se hablan o el equipo sostiene demasiadas tareas a mano. Entendemos el negocio y definimos con vos qué cambiar y en qué orden.</p><div className={styles.doorSituations}><span>Procesos desordenados</span><span>Datos dispersos</span><span>IA sin rumbo claro</span></div><Link to="/consultoria">Quiero entender por dónde empezar <ArrowUpRight size={18} /></Link></article>
      </div>
    </div></section>

    <section className={styles.authority} id="nosotros" aria-labelledby="authority-title"><div className={styles.shell}>
      <div className={styles.authorityTop}><div><span className={styles.eyebrow}>POR QUÉ NEXOPS</span><h2 id="authority-title">Venimos de resolver <em>problemas complejos.</em></h2></div><div><p>Traemos más de una década de experiencia en tecnología y proyectos complejos dentro de empresas grandes. Hoy aplicamos ese criterio a negocios que necesitan vender mejor y operar sin depender de parches.</p><p>Entendemos qué está pasando, trabajamos con quienes llevan el negocio y llevamos las decisiones a la operación.</p></div></div>
      <div className={styles.clientLine}><span>EMPRESAS CON LAS QUE TRABAJAMOS</span><div>{clients.map((name) => <strong key={name}>{name}</strong>)}</div></div>
    </div></section>

    <section className={styles.problemSection} aria-labelledby="problems-title"><div className={styles.shell}>
      <div className={styles.problemIntro}><span className={styles.eyebrow}>SITUACIONES QUE CONOCEMOS</span><h2 id="problems-title">Tal vez esto te está pasando <em>a vos.</em></h2></div>
      <div className={styles.problemList}>{situations.map(([label, title, copy], index) => <article key={title}><span>0{index + 1} / {label}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div></section>

    <section className={styles.proofSection} id="casos" aria-labelledby="cases-title"><div className={styles.shell}>
      <div className={styles.proofIntro}><div><span className={styles.eyebrow}>TRABAJO REAL</span><h2 id="cases-title">Clientes con nombre. <em>Problemas con contexto.</em></h2></div><p>En cada proyecto entramos por una situación concreta. Acá podés ver qué hicimos y qué quedó funcionando o en marcha.</p></div>
      <div className={styles.proofGrid}>{proof.map((item) => <article key={item.client}><span>{item.category}</span><h3>{item.client}</h3><p><strong>El problema:</strong> {item.problem}</p><p><strong>Qué hicimos:</strong> {item.work}</p><p><strong>Qué cambió:</strong> {item.result}</p><Link to={item.href}>Ver el caso <ArrowRight size={17} /></Link></article>)}</div>
      <Link className={styles.inlineLink} to="/experiencia">Conocer nuestra experiencia <ArrowRight size={18} /></Link>
    </div></section>

    <section className={styles.methodSection} id="como-funciona" aria-labelledby="method-title"><div className={styles.shell}>
      <div className={styles.methodIntro}><span className={styles.eyebrow}>CÓMO TRABAJAMOS</span><h2 id="method-title">Primero el problema. <em>Después la solución.</em></h2><p>Revisamos el negocio con vos, elegimos una prioridad, la ponemos a trabajar y ajustamos con lo que muestra la operación.</p></div>
      <div className={styles.methodRow}><div><span>01</span><strong>Entender</strong><p>Qué se pierde, dónde se traba y quién vive el problema.</p></div><div><span>02</span><strong>Priorizar</strong><p>Qué cambio tiene sentido ahora y qué puede esperar.</p></div><div><span>03</span><strong>Hacer</strong><p>Implementar con el equipo, no dejar un documento en un cajón.</p></div><div><span>04</span><strong>Mejorar</strong><p>Mirar el uso y los resultados para ajustar el trabajo.</p></div></div>
    </div></section>

    <section className={styles.knowledge} aria-labelledby="knowledge-title"><div className={`${styles.shell} ${styles.knowledgeGrid}`}><div><span className={styles.eyebrow}>IDEAS QUE IMPULSAN</span><h2 id="knowledge-title">Ideas útiles para vender y operar mejor.</h2></div><div><p>Lo que aprendemos sobre comercio digital, procesos, datos e IA, explicado desde decisiones que una empresa tiene que tomar.</p><Link className={styles.inlineLink} to="/noticias">Explorar ideas <ArrowUpRight size={18} /></Link></div></div></section>
    <section className={styles.contact} id="contacto"><div className={`${styles.shell} ${styles.contactGrid}`}><div><span className={styles.eyebrow}>HABLEMOS DE TU EMPRESA</span><h2>Contanos qué te está <em>frenando.</em></h2></div><div><p>Puede ser una tienda que no convierte, ventas que pierden seguimiento o una operación que ya no escala. Empecemos por el problema; después definimos si Ecommerce o Consultoría es el mejor camino.</p><a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación <ArrowUpRight size={18} /></a></div></div></section>
  </div></Layout>;
}
