import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import styles from "./HomePage.module.css";

const clients = ["OnlySellers", "Sommier Magno", "Casa Italia", "Dexa / Kahuna", "Kenta", "Edelvives", "Punky"];
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
        <h1 id="home-title">Hacemos que tu negocio online <em>genere más ingresos.</em></h1>
        <p>Escalamos tu ecommerce, Mercado Libre y redes, con equipo, procesos y tecnología. Porque generar ingresos no alcanza si no se traducen en ganancia real.</p>
        <div className={styles.heroActions}><a className={styles.primary} href="#contacto">Contanos tu caso <ArrowRight size={18} /></a></div>
        <div className={styles.heroProof}><span className={styles.proofMark}>N<span>↗</span></span><p><strong>+10 años ayudando negocios a crecer sus canales digitales de manera sostenida.</strong></p></div>
      </div>
      <figure className={styles.heroVisual}><img src="/assets/nexops-conversation-editorial.webp" alt="Imagen editorial ilustrativa de profesionales conversando sobre un negocio" fetchPriority="high" /><figcaption><span>ENTENDER → ACTUAR</span><strong>El punto de partida es lo que hoy le pasa a tu empresa.</strong></figcaption><small>Imagen editorial ilustrativa</small></figure>
    </div></div></section>

    <section className={styles.doors} id="soluciones" aria-labelledby="doors-title"><div className={styles.shell}>
      <span className={styles.eyebrow}>DOS FORMAS DE AYUDARTE</span><h2 id="doors-title">¿Dónde está hoy <em>el freno?</em></h2>
      <div className={styles.doorGrid}>
        <article className={styles.doorEcommerce}><span className={styles.doorNumber}>01 / ECOMMERCE</span><h3>Vendés online y querés crecer sin perder rentabilidad ni control.</h3><p>Ordenamos tu venta online —producto, tienda, marketplaces y campañas— para que crecer no te cueste margen.</p><ul className={styles.doorSituations}><li>Dependés demasiado de Mercado Libre.</li><li>Tu tienda tiene tráfico, pero no convierte.</li><li>Invertís en pauta sin saber qué vende.</li><li>Stock, catálogo o precios llevan demasiado trabajo manual.</li></ul><Link to="/ecommerce">Quiero potenciar mi ecommerce <ArrowUpRight size={18} /></Link></article>
        <article className={styles.doorConsulting}><span className={styles.doorNumber}>02 / CONSULTORÍA</span><h3>Tu ecommerce creció, pero la operación no acompañó.</h3><p>Entramos al negocio, ubicamos la fricción y definimos qué cambio vale la pena hacer primero.</p><ul className={styles.doorSituations}><li>Los pedidos pierden seguimiento entre canales.</li><li>Todo depende de una sola persona operando a mano.</li><li>Tu tienda, tu CRM y tus marketplaces no se comunican entre sí.</li><li>Tenés datos de venta, pero no sabés qué producto o canal es rentable.</li></ul><Link to="/consultoria">Quiero entender por dónde empezar <ArrowUpRight size={18} /></Link></article>
      </div>
    </div></section>

    <section className={styles.authority} id="nosotros" aria-labelledby="authority-title"><div className={styles.shell}>
      <div className={styles.authorityTop}><div><span className={styles.eyebrow}>POR QUÉ NEXOPS</span><h2 id="authority-title">Más de 10 años escalando negocios <em>con estrategia y tecnología.</em></h2></div><div><p>Con un equipo multidisciplinario, con amplia experiencia en distintos rubros y presencia en toda Latinoamérica, nos convertimos en tu aliado estratégico para crecer tu negocio digital.</p><p>Los procesos, la tecnología y los datos son nuestros pilares. Toda estrategia de crecimiento necesita estar fundamentada en eso — ya sea en anuncios, sitio web, mailing, tienda online o marketplaces.</p></div></div>
      <div className={styles.authorityExamples}><div><strong>Sommier Magno</strong><span>Catálogo, web y Mercado Libre en una salida piloto.</span></div><div><strong>Casa Italia</strong><span>ERP comercial a medida en producción.</span></div><div><strong>OnlySellers</strong><span>Operación de email con segmentación y calendario.</span></div></div>
      <div className={styles.clientLine}><span>EMPRESAS CON LAS QUE TRABAJAMOS</span><div><img src="/globaltrip_logo.svg" alt="GlobalTrip" loading="lazy" />{clients.map((name) => <strong key={name}>{name}</strong>)}</div></div>
    </div></section>

    <section className={styles.methodSection} id="como-funciona" aria-labelledby="method-title"><div className={styles.shell}>
      <div className={styles.methodIntro}><span className={styles.eyebrow}>CÓMO TRABAJAMOS</span><h2 id="method-title">Primero el problema. <em>Después la solución.</em></h2><p>Revisamos el negocio con vos, elegimos una prioridad, la ponemos a trabajar y ajustamos con lo que muestra la operación.</p></div>
      <div className={styles.methodRow}><div><span>01</span><strong>Entender</strong><p>Qué se pierde, dónde se traba y quién vive el problema.</p></div><div><span>02</span><strong>Priorizar</strong><p>Qué cambio tiene sentido ahora y qué puede esperar.</p></div><div><span>03</span><strong>Hacer</strong><p>Implementar con el equipo, no dejar un documento en un cajón.</p></div><div><span>04</span><strong>Mejorar</strong><p>Mirar el uso y los resultados para ajustar el trabajo.</p></div></div>
    </div></section>

    <section className={styles.knowledge} aria-labelledby="knowledge-title"><div className={`${styles.shell} ${styles.knowledgeGrid}`}>
      <div className={styles.knowledgeCopy}>
        <span className={styles.eyebrow}>IDEAS QUE IMPULSAN</span>
        <h2 id="knowledge-title">Ideas para crecer <em>con mejores decisiones.</em></h2>
        <p>Compartimos aprendizajes sobre ecommerce, procesos, datos y tecnología para quienes tienen que hacer avanzar un negocio todos los días.</p>
        <Link className={styles.knowledgeAction} to="/noticias">Explorar las ideas <ArrowUpRight size={19} /></Link>
        <span className={styles.knowledgeNote}>Lecturas prácticas · Mirada de negocio · Sin fórmulas mágicas</span>
      </div>
      <div className={styles.knowledgeVisual}>
        <img src="/assets/nexops-implementation-editorial.webp" alt="Imagen editorial ilustrativa de un equipo analizando información de negocio" loading="lazy" />
        <div className={styles.knowledgeStamp} aria-hidden="true"><span>IDEAS</span><strong>↗</strong><span>EN ACCIÓN</span></div>
      </div>
    </div></section>
    <section className={styles.contact} id="contacto"><div className={`${styles.shell} ${styles.contactGrid}`}><div><span className={styles.eyebrow}>HABLEMOS DE TU EMPRESA</span><h2>Contanos qué te está <em>frenando.</em></h2></div><div><p>Puede ser una tienda que no convierte, ventas que pierden seguimiento o una operación que ya no escala. Empecemos por el problema; después definimos si Ecommerce o Consultoría es el mejor camino.</p><a className={styles.primary} href={CALENDLY_LINK} target="_blank" rel="noreferrer">Agendar una conversación <ArrowUpRight size={18} /></a></div></div></section>
  </div></Layout>;
}
