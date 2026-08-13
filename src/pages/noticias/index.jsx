import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import NewsVisual from "../../components/NewsVisual";
import {
  CONTENT_PURPOSES,
  formatNewsDate,
  getNewsPurposeLabel,
  getNewsLabel,
  newsPosts,
} from "../../data/news/contract";

export default function Noticias() {
  const [activePurpose, setActivePurpose] = useState("all");
  const availablePurposes = useMemo(
    () => Object.keys(CONTENT_PURPOSES).filter((purpose) => newsPosts.some((post) => post.contentPurpose === purpose)),
    [],
  );
  const visiblePosts = activePurpose === "all" ? newsPosts : newsPosts.filter((post) => post.contentPurpose === activePurpose);

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <header className="mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">NEXOPS INSIGHTS</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Criterio práctico para automatizar, vender y operar mejor
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Guías para resolver problemas, actualidad aplicada, criterio NexOps y casos concretos sobre automatización, IA, CRM y datos.
            </p>

            {availablePurposes.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Filtrar insights">
                <button type="button" onClick={() => setActivePurpose("all")} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activePurpose === "all" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>
                  Todos
                </button>
                {availablePurposes.map((purpose) => (
                  <button key={purpose} type="button" onClick={() => setActivePurpose(purpose)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activePurpose === purpose ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`} title={CONTENT_PURPOSES[purpose].description}>
                    {CONTENT_PURPOSES[purpose].label}
                  </button>
                ))}
              </div>
            )}
          </header>

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
                      <span>{getNewsPurposeLabel(post)}</span><span aria-hidden="true">·</span><time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time>
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
