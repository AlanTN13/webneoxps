import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import NewsVisual from "../../components/NewsVisual";
import {
  formatNewsDate,
  getNewsLabel,
  newsPosts,
} from "../../data/news/contract";

const PURPOSE_OPTIONS = {
  seo: {
    label: "Resolver problemas",
    description: "Guías prácticas para necesidades que una empresa ya está intentando resolver.",
    topics: "WhatsApp + CRM · reporting · automatizaciones",
  },
  actualidad: {
    label: "Actualidad aplicada",
    description: "Cambios tecnológicos traducidos a impacto y decisiones empresariales.",
  },
  criterio: {
    label: "Criterio NexOps",
    description: "Ideas y principios para decidir qué automatizar, cómo usar IA y cómo diseñar mejores sistemas.",
  },
  caso: {
    label: "Casos y aplicaciones",
    description: "Flujos concretos para visualizar un problema convertido en una solución operativa.",
  },
};

export default function Noticias() {
  const [activePurpose, setActivePurpose] = useState("all");
  const availablePurposes = useMemo(
    () => Object.keys(PURPOSE_OPTIONS).filter((purpose) => newsPosts.some((post) => post.contentPurpose === purpose)),
    [],
  );
  const visiblePosts = activePurpose === "all" ? newsPosts : newsPosts.filter((post) => post.contentPurpose === activePurpose);

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <header className="mb-12 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">NEXOPS INSIGHTS</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Ideas y soluciones para hacer funcionar mejor tu empresa
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Contenido sobre automatización, IA, CRM y datos, explicado desde problemas y decisiones reales de negocio.
            </p>

            {availablePurposes.length > 0 && (
              <div className="mt-8" aria-label="Elegí qué querés encontrar">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">¿Qué estás buscando?</p>
                    <p className="mt-1 text-sm text-slate-500">Elegí una intención para explorar los contenidos.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePurpose("all")}
                    aria-pressed={activePurpose === "all"}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${activePurpose === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}
                  >
                    Ver todos ({newsPosts.length})
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {availablePurposes.map((purpose) => {
                    const option = PURPOSE_OPTIONS[purpose];
                    const isActive = activePurpose === purpose;
                    return (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => setActivePurpose(purpose)}
                        aria-pressed={isActive}
                        className={`min-h-48 rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:min-h-36 sm:p-5 ${isActive ? "border-indigo-600 bg-indigo-600 text-white shadow-md" : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-indigo-200 hover:shadow-md"}`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-[15px] font-semibold leading-5 sm:text-base">{option.label}</span>
                          <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? "bg-white" : "bg-indigo-500"}`} aria-hidden="true" />
                        </span>
                        <span className={`mt-2 block text-[13px] leading-[1.35rem] sm:text-sm sm:leading-5 ${isActive ? "text-indigo-50" : "text-slate-600"}`}>{option.description}</span>
                        {option.topics && <span className={`mt-3 hidden text-xs leading-4 sm:block ${isActive ? "text-indigo-100" : "text-slate-400"}`}>{option.topics}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </header>

          <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Explorar Insights</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                {activePurpose === "all" ? "Todos los contenidos" : PURPOSE_OPTIONS[activePurpose].label}
              </h2>
            </div>
            <span className="shrink-0 text-sm text-slate-500">{visiblePosts.length} {visiblePosts.length === 1 ? "artículo" : "artículos"}</span>
          </div>

          {visiblePosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">Todavía no hay insights publicados en esta categoría.</div>
          ) : (
            <section className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <article key={post.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <Link to={`/noticias/${post.slug}`} aria-label={`Leer ${post.title}`}>
                    <NewsVisual post={post} />
                  </Link>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      <span>{PURPOSE_OPTIONS[post.contentPurpose]?.label || "Insight"}</span><span aria-hidden="true">·</span><time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time>
                    </div>
                    <Link to={`/noticias/${post.slug}`} className="mt-2 inline-block">
                      <h2 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-lg">{post.title}</h2>
                    </Link>
                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                    <div className="mt-5 flex items-end justify-between gap-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-600">{getNewsLabel(post)}</span>
                      <Link to={`/noticias/${post.slug}`} className="shrink-0 font-medium text-indigo-600 hover:text-indigo-700">Leer →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
