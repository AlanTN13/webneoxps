import {
  ArrowRight,
  Blocks,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleGauge,
  Megaphone,
  MessageCircleMore,
  PanelsTopLeft,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import NexyStage from "../components/NexyStage";
import { CALENDLY_LINK } from "../config/constants";
import { solutions, systemSteps } from "../data/solutions";

const iconMap = {
  Megaphone,
  PanelsTopLeft,
  Sparkles,
  Workflow,
  ChartNoAxesCombined,
  Blocks,
};

const clientLogos = [
  ["/newsan_logo.svg", "Newsan"],
  ["/cencosud_logo.svg", "Cencosud"],
  ["/coke_logo.svg", "Coca-Cola"],
  ["/colgate_logo.svg", "Colgate"],
  ["/globaltrip_logo.svg", "GlobalTrip"],
];

const ownerProblems = [
  {
    title: "Las consultas entran, pero el seguimiento se corta.",
    before: "Conversaciones dispersas y responsables poco claros.",
    after: "CRM, tareas y alertas sostienen cada oportunidad.",
  },
  {
    title: "El equipo pierde tiempo moviendo información.",
    before: "Planillas, doble carga y sistemas que no se hablan.",
    after: "Automatizaciones conectan el flujo y registran qué pasó.",
  },
  {
    title: "El dueño recibe números, pero no una lectura.",
    before: "Reportes manuales y versiones distintas de la realidad.",
    after: "Indicadores comunes muestran desvíos y decisiones.",
  },
];

export default function HomePage() {
  useEffect(() => {
    document.title = "NexOps — Ventas y operación como un solo sistema";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", "NexOps conecta captación, CRM, inteligencia artificial, automatización y datos para mejorar la operación comercial de tu empresa.");
  }, []);

  return (
    <Layout>
      <section className="home-hero">
        <div className="site-shell home-hero__grid">
          <div className="home-hero__copy">
            <span className="eyebrow eyebrow--light">Sistema comercial conectado</span>
            <h1>Ventas, tecnología y operación. Un solo sistema.</h1>
            <p>
              Captamos oportunidades, las ordenamos, automatizamos el seguimiento y convertimos los datos en decisiones claras para tu empresa.
            </p>
            <div className="button-row">
              <a className="button button--brand" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
                Hablar con NexOps <ArrowRight size={17} />
              </a>
              <a className="button button--ghost-light" href="#como-funciona">
                Ver cómo funciona
              </a>
            </div>
            <div className="home-hero__signals" aria-label="Resultados del sistema">
              <span><Check size={15} /> Más oportunidades atendidas</span>
              <span><Check size={15} /> Menos tareas manuales</span>
              <span><Check size={15} /> Más visibilidad</span>
            </div>
          </div>
          <NexyStage />
        </div>
      </section>

      <section className="proof-strip" aria-labelledby="proof-heading">
        <div className="site-shell proof-strip__inner">
          <p id="proof-heading">Experiencia construyendo sistemas para equipos reales</p>
          <div className="proof-strip__logos">
            {clientLogos.map(([src, alt]) => (
              <span
                className="proof-strip__logo"
                key={alt}
                role="img"
                aria-label={alt}
                style={{ "--logo-source": `url(${src})` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm" id="como-funciona">
        <div className="site-shell">
          <header className="section-heading section-heading--split">
            <div>
              <span className="eyebrow">El sistema NexOps</span>
              <h2>Una oportunidad no debería cambiar de dueño cada vez que cambia de herramienta.</h2>
            </div>
            <p>
              Diseñamos el recorrido completo. Cada capa recibe contexto, hace su parte y deja trazabilidad para la siguiente.
            </p>
          </header>

          <div className="system-flow">
            <div className="system-flow__line" aria-hidden="true" />
            {systemSteps.map((step, index) => (
              <div className="system-flow__step" key={step.id}>
                <span className="system-flow__index">0{index + 1}</span>
                <strong>{step.label}</strong>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className="system-flow__outcome">
            <CircleGauge size={20} />
            <span>El dueño ve qué entró, qué se hizo y dónde necesita intervenir.</span>
          </div>
        </div>
      </section>

      <section className="section section--ink operation-section">
        <div className="site-shell operation-section__grid">
          <div className="operation-section__copy">
            <span className="eyebrow eyebrow--light">NexOps en acción</span>
            <h2>De una consulta suelta a una oportunidad con seguimiento.</h2>
            <p>
              La escena no depende de magia: combina proceso, herramientas y criterio para que la operación avance sin perder contexto.
            </p>
            <ol className="operation-list">
              <li><span>1</span><div><strong>La consulta entra</strong><p>Desde WhatsApp, una campaña, la web o un canal comercial.</p></div></li>
              <li><span>2</span><div><strong>El sistema organiza</strong><p>CRM registra, asigna responsable y conserva el historial.</p></div></li>
              <li><span>3</span><div><strong>IA y automatización asisten</strong><p>Interpretan, preparan acciones y ejecutan tareas permitidas.</p></div></li>
              <li><span>4</span><div><strong>El equipo interviene con foco</strong><p>Las excepciones llegan a una persona con el contexto necesario.</p></div></li>
            </ol>
          </div>
          <NexyStage compact />
        </div>
      </section>

      <section className="section" id="soluciones">
        <div className="site-shell">
          <header className="section-heading">
            <span className="eyebrow">Soluciones conectadas</span>
            <h2>Entramos por el problema. Construimos el sistema que lo resuelve.</h2>
            <p>
              Cada capacidad puede empezar como un proyecto concreto y quedar preparada para trabajar con el resto de la operación.
            </p>
          </header>

          <div className="solutions-list">
            {solutions.map((solution, index) => {
              const Icon = iconMap[solution.icon];
              return (
                <article className={`solution-row solution-row--${solution.accent}`} key={solution.slug}>
                  <div className="solution-row__index">0{index + 1}</div>
                  <div className="solution-row__icon"><Icon size={24} /></div>
                  <div className="solution-row__copy">
                    <h3>{solution.shortTitle}</h3>
                    <p>{solution.summary}</p>
                    <span>{solution.change}</span>
                  </div>
                  <div className="solution-row__nexy">
                    <img src={solution.nexy} alt="" loading="lazy" width="1200" height="800" />
                  </div>
                  <Link className="solution-row__link" to={`/soluciones/${solution.slug}`} aria-label={`Ver solución ${solution.title}`}>
                    Ver solución <ChevronRight size={18} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--lavender" id="casos">
        <div className="site-shell">
          <header className="section-heading section-heading--center">
            <span className="eyebrow">Escenarios reconocibles</span>
            <h2>Problemas cotidianos que se convierten en una operación más clara.</h2>
          </header>
          <div className="owner-problems">
            {ownerProblems.map((problem, index) => (
              <article className="owner-problem" key={problem.title}>
                <span className="owner-problem__number">0{index + 1}</span>
                <h3>{problem.title}</h3>
                <div className="owner-problem__state">
                  <small>Antes</small>
                  <p>{problem.before}</p>
                </div>
                <ArrowRight className="owner-problem__arrow" size={20} />
                <div className="owner-problem__state owner-problem__state--after">
                  <small>Con NexOps</small>
                  <p>{problem.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nosotros">
        <div className="site-shell about-system">
          <div className="about-system__visual">
            <img src="/assets/nexis/nexi-core.webp" alt="Nexy conectando procesos y tecnología" loading="lazy" width="1200" height="800" />
            <div className="about-system__orbit about-system__orbit--one">Negocio</div>
            <div className="about-system__orbit about-system__orbit--two">Procesos</div>
            <div className="about-system__orbit about-system__orbit--three">Tecnología</div>
          </div>
          <div className="about-system__copy">
            <span className="eyebrow">Cómo pensamos</span>
            <h2>No vendemos herramientas aisladas. Construimos capacidad de ejecución.</h2>
            <p>
              NexOps combina negocio, procesos, automatización, inteligencia artificial y datos para resolver problemas concretos y dejar una operación más sostenible.
            </p>
            <div className="about-system__principles">
              <span><Check size={16} /> Entender antes de implementar</span>
              <span><Check size={16} /> Integrar antes de duplicar</span>
              <span><Check size={16} /> Medir el resultado, no la tecnología</span>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-cta" id="contacto">
        <div className="site-shell closing-cta__inner">
          <div>
            <span className="eyebrow eyebrow--light">El próximo paso</span>
            <h2>Mostranos dónde se corta tu operación.</h2>
            <p>En una primera conversación identificamos el problema, el impacto y el mejor punto para empezar.</p>
          </div>
          <a className="button button--brand button--large" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
            Hablar con NexOps <ArrowRight size={18} />
          </a>
          <div className="closing-cta__note">
            <MessageCircleMore size={17} /> 30 minutos · conversación consultiva
          </div>
        </div>
      </section>
    </Layout>
  );
}
