import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import NewsVisual from "../../components/NewsVisual";
import {
  formatReadingTime,
  formatNewsDate,
  getNewsLabel,
  newsPosts,
} from "../../data/news/contract";

const PURPOSE_OPTIONS = {
  seo: {
    index: "01",
    label: "Resolver problemas",
    description: "Guías para ordenar ventas, automatizar tareas y dejar de depender de procesos manuales.",
    topics: "WhatsApp + CRM · reporting · automatizaciones",
    idle: "border-indigo-100 bg-indigo-50/60 hover:border-indigo-300 hover:bg-indigo-50",
    active: "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-900/15",
  },
  actualidad: {
    index: "02",
    label: "Entender qué está cambiando",
    description: "Novedades tecnológicas explicadas desde el impacto real que pueden tener en tu empresa.",
    topics: "IA · agentes · plataformas · nuevas capacidades",
    idle: "border-sky-100 bg-sky-50/60 hover:border-sky-300 hover:bg-sky-50",
    active: "border-sky-700 bg-sky-700 text-white shadow-lg shadow-sky-900/15",
  },
  criterio: {
    index: "03",
    label: "Cómo pensamos en NexOps",
    description: "Ideas y criterios para decidir qué automatizar, cómo usar IA y cómo diseñar mejores sistemas.",
    topics: "procesos · IA · automatización · diseño",
    idle: "border-violet-100 bg-violet-50/60 hover:border-violet-300 hover:bg-violet-50",
    active: "border-violet-700 bg-violet-700 text-white shadow-lg shadow-violet-900/15",
  },
  caso: {
    index: "04",
    label: "Ver cómo se aplica",
    description: "Ejemplos concretos para visualizar un problema convertido en un sistema que funciona.",
    topics: "flujos · integraciones · casos · operación",
    idle: "border-amber-100 bg-amber-50/60 hover:border-amber-300 hover:bg-amber-50",
    active: "border-amber-700 bg-amber-700 text-white shadow-lg shadow-amber-900/15",
  },
};

const purposeCounts = newsPosts.reduce((counts, post) => {
  counts[post.contentPurpose] = (counts[post.contentPurpose] || 0) + 1;
  return counts;
}, {});
const availablePurposes = Object.keys(PURPOSE_OPTIONS).filter((purpose) => purposeCounts[purpose]);

export default function Noticias() {
  const [activePurpose, setActivePurpose] = useState("all");
  const featuredPost = newsPosts.find((post) => post.coverImage);
  const visiblePosts = activePurpose === "all" ? newsPosts : newsPosts.filter((post) => post.contentPurpose === activePurpose);
  const showFeatured = activePurpose === "all" && featuredPost;
  const gridPosts = showFeatured ? visiblePosts.filter((post) => post.slug !== featuredPost.slug) : visiblePosts;

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <header className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-9 text-white shadow-2xl shadow-slate-900/10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-40 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
            <div className="relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)] lg:gap-16">
              <div>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                  <span className="h-px w-8 bg-indigo-300/80" aria-hidden="true" />
                  NEXOPS INSIGHTS
                </p>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.45rem]">
                  Ideas prácticas para vender más, operar mejor y escalar con automatización e IA
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Guías, análisis y casos para ordenar procesos, conectar sistemas y tomar mejores decisiones con tecnología.
                </p>
              </div>
              <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-400">Ideas para pasar de</p>
                <p className="mt-3 text-xl font-medium leading-7 text-white">tareas dispersas a sistemas que funcionan.</p>
                <div className="mt-6 hidden flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300 sm:flex lg:block lg:space-y-2">
                  <p><span className="text-indigo-300">Vender</span> con mejor seguimiento</p>
                  <p><span className="text-sky-300">Operar</span> con menos fricción</p>
                  <p><span className="text-violet-300">Escalar</span> con IA y datos</p>
                </div>
              </div>
            </div>
          </header>

          {availablePurposes.length > 0 && (
            <section className="mt-12 sm:mt-16" aria-labelledby="purpose-heading">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.17em] text-indigo-600">Explorá a tu manera</p>
                  <h2 id="purpose-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Elegí por dónde querés empezar</h2>
                  <p className="mt-2 text-sm text-slate-600 sm:text-base">Encontrá ideas según el problema o la decisión que tenés enfrente.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePurpose("all")}
                  aria-pressed={activePurpose === "all"}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${activePurpose === "all" ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                >
                  Ver todos ({newsPosts.length})
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {availablePurposes.map((purpose) => {
                  const option = PURPOSE_OPTIONS[purpose];
                  const isActive = activePurpose === purpose;
                  return (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setActivePurpose(purpose)}
                      aria-pressed={isActive}
                      className={`group flex min-h-60 flex-col rounded-[1.4rem] border p-5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:min-h-64 ${isActive ? option.active : `${option.idle} text-slate-950 hover:-translate-y-0.5 hover:shadow-md`}`}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className={`text-xs font-semibold tracking-[0.16em] ${isActive ? "text-white/65" : "text-slate-400"}`}>{option.index}</span>
                        <span className={`text-xs font-semibold ${isActive ? "text-white/80" : "text-slate-500"}`}>{purposeCounts[purpose]} artículos</span>
                      </span>
                      <span className="mt-7 text-lg font-semibold leading-6">{option.label}</span>
                      <span className={`mt-3 block text-sm leading-6 ${isActive ? "text-white/85" : "text-slate-600"}`}>{option.description}</span>
                      <span className={`mt-auto pt-5 text-xs leading-5 ${isActive ? "text-white/60" : "text-slate-500"}`}>{option.topics}</span>
                      <span className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${isActive ? "text-white" : "text-slate-800"}`}>
                        Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {showFeatured && (
            <section className="mt-14 sm:mt-20" aria-labelledby="featured-heading">
              <div className="mb-5 flex items-center gap-4">
                <p id="featured-heading" className="shrink-0 text-xs font-semibold uppercase tracking-[0.17em] text-slate-500">Insight destacado</p>
                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
              </div>
              <article className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-lg">
                <div className="grid lg:grid-cols-[1.2fr_1fr]">
                  <Link to={`/noticias/${featuredPost.slug}`} aria-label={`Leer ${featuredPost.title}`} className="block min-h-0 min-w-0">
                    <NewsVisual post={featuredPost} eager sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[23rem]" />
                  </Link>
                  <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-10">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
                      <span>{PURPOSE_OPTIONS[featuredPost.contentPurpose]?.label || "Insight"}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <time dateTime={featuredPost.publishedAt} className="text-slate-500">{formatNewsDate(featuredPost.publishedAt)}</time>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">{formatReadingTime(featuredPost)}</span>
                    </div>
                    <Link to={`/noticias/${featuredPost.slug}`} className="mt-4 inline-block">
                      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-indigo-700 sm:text-3xl">{featuredPost.title}</h2>
                    </Link>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{featuredPost.excerpt}</p>
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs font-medium text-slate-500">{getNewsLabel(featuredPost)}</span>
                      <Link to={`/noticias/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
                        Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          )}

          <section className="mt-14 sm:mt-20" aria-labelledby="insights-heading">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Seguí explorando</p>
                <h2 id="insights-heading" className="mt-1 text-xl font-semibold text-slate-950 sm:text-2xl">
                  {activePurpose === "all" ? "Todos los Insights" : PURPOSE_OPTIONS[activePurpose].label}
                </h2>
              </div>
              <span className="shrink-0 text-sm text-slate-500">{visiblePosts.length} {visiblePosts.length === 1 ? "artículo" : "artículos"}</span>
            </div>

            {visiblePosts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">Todavía no hay Insights publicados en esta categoría.</div>
            ) : (
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <article key={post.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">
                    <Link to={`/noticias/${post.slug}`} aria-label={`Leer ${post.title}`}>
                      <NewsVisual post={post} className="aspect-[16/10]" />
                    </Link>
                    <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                        <span>{PURPOSE_OPTIONS[post.contentPurpose]?.label || "Insight"}</span><span aria-hidden="true">·</span><time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time><span aria-hidden="true">·</span><span>{formatReadingTime(post)}</span>
                      </div>
                      <Link to={`/noticias/${post.slug}`} className="mt-2 inline-block">
                        <h3 className="text-base font-semibold leading-snug text-slate-950 transition-colors group-hover:text-indigo-700 sm:text-lg">{post.title}</h3>
                      </Link>
                      <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                      <div className="mt-5 flex items-end justify-between gap-3 text-xs text-slate-500">
                        <span className="font-medium text-slate-600">{getNewsLabel(post)}</span>
                        <Link to={`/noticias/${post.slug}`} className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-indigo-700 hover:text-indigo-900">
                          Leer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
