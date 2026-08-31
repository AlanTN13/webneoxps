import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  Megaphone,
  PanelsTopLeft,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { CALENDLY_LINK } from "../config/constants";
import { getSolution, solutions } from "../data/solutions";

const iconMap = {
  Megaphone,
  PanelsTopLeft,
  Sparkles,
  Workflow,
  ChartNoAxesCombined,
  Blocks,
};

export default function SolutionLanding() {
  const { slug } = useParams();
  const solution = getSolution(slug);

  useEffect(() => {
    if (!solution) return;
    document.title = `${solution.shortTitle} — NexOps`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", solution.summary);
  }, [solution]);

  if (!solution) return <Navigate to="/" replace />;

  const Icon = iconMap[solution.icon];
  const nextIndex = (solutions.findIndex((item) => item.slug === solution.slug) + 1) % solutions.length;
  const nextSolution = solutions[nextIndex];

  return (
    <Layout>
      <article className={`solution-page solution-page--${solution.accent}`}>
        <section className="solution-hero">
          <div className="site-shell">
            <Link className="solution-hero__back" to="/#soluciones">
              <ArrowLeft size={16} /> Todas las soluciones
            </Link>
            <div className="solution-hero__grid">
              <div className="solution-hero__copy">
                <span className="eyebrow"><Icon size={15} /> {solution.eyebrow}</span>
                <h1>{solution.statement}</h1>
                <p>{solution.summary}</p>
                <div className="button-row">
                  <a className="button button--dark" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
                    Quiero resolver esto <ArrowRight size={17} />
                  </a>
                  <a className="button button--ghost" href="#como-funciona">Ver cómo funciona</a>
                </div>
              </div>
              <div className="solution-hero__visual">
                <div className="solution-hero__role">{solution.nexyRole}</div>
                <img src={solution.nexy} alt={solution.nexyRole} width="1200" height="800" />
                <div className="solution-hero__signal solution-hero__signal--one">Problema detectado</div>
                <div className="solution-hero__signal solution-hero__signal--two">Siguiente acción</div>
                <div className="solution-hero__signal solution-hero__signal--three">Resultado visible</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section solution-problem">
          <div className="site-shell solution-problem__grid">
            <div>
              <span className="eyebrow">El problema</span>
              <h2>Una escena que muchas empresas conocen.</h2>
            </div>
            <blockquote>“{solution.problem}”</blockquote>
            <div className="solution-problem__change">
              <small>Qué cambia con NexOps</small>
              <p>{solution.change}</p>
            </div>
          </div>
        </section>

        <section className="section section--warm" id="como-funciona">
          <div className="site-shell">
            <header className="section-heading section-heading--split">
              <div>
                <span className="eyebrow">Cómo funciona</span>
                <h2>Un recorrido simple, con responsables y resultado.</h2>
              </div>
              <p>Empezamos por ordenar el proceso y elegimos la tecnología que mejor lo sostiene.</p>
            </header>
            <div className="landing-flow">
              {solution.flow.map((step, index) => (
                <div className="landing-flow__step" key={step}>
                  <span>0{index + 1}</span>
                  <strong>{step}</strong>
                  {index < solution.flow.length - 1 && <ChevronRight size={20} aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-shell capability-grid">
            <div className="capability-grid__intro">
              <span className="eyebrow">Qué podemos implementar</span>
              <h2>Capacidad concreta alrededor del problema.</h2>
              <p>
                El alcance se define según impacto, realidad operativa e integración con lo que la empresa ya usa.
              </p>
            </div>
            <ul className="capability-list">
              {solution.capabilities.map((capability) => (
                <li key={capability}><span><Check size={16} /></span>{capability}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--ink">
          <div className="site-shell solution-example">
            <div className="solution-example__heading">
              <span className="eyebrow eyebrow--light">Ejemplo de uso</span>
              <h2>{solution.example.title}</h2>
            </div>
            <div className="solution-example__states">
              <div>
                <small>Antes</small>
                <p>{solution.example.before}</p>
              </div>
              <ArrowRight size={26} />
              <div className="solution-example__after">
                <small>Con NexOps</small>
                <p>{solution.example.after}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section solution-integrations">
          <div className="site-shell solution-integrations__inner">
            <div>
              <span className="eyebrow">Integraciones</span>
              <h2>Trabajamos con el ecosistema que la operación necesita.</h2>
              <p>Las herramientas se eligen por su función dentro del sistema, no por acumular logos.</p>
            </div>
            <div className="solution-integrations__chips">
              {solution.integrations.map((integration) => <span key={integration}>{integration}</span>)}
            </div>
          </div>
        </section>

        <section className="solution-next">
          <div className="site-shell solution-next__inner">
            <div>
              <span>Siguiente solución</span>
              <h2>{nextSolution.shortTitle}</h2>
            </div>
            <Link className="button button--ghost-light" to={`/soluciones/${nextSolution.slug}`}>
              Ver {nextSolution.title} <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="closing-cta">
          <div className="site-shell closing-cta__inner">
            <div>
              <span className="eyebrow eyebrow--light">Empezar por lo concreto</span>
              <h2>Veamos si este es el punto correcto para empezar.</h2>
              <p>Revisamos el problema, el flujo actual y el resultado que tiene sentido perseguir.</p>
            </div>
            <a className="button button--brand button--large" href={CALENDLY_LINK} target="_blank" rel="noreferrer">
              Quiero resolver esto <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </article>
    </Layout>
  );
}
