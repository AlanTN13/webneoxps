import { Link, useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import NewsContent from "../../components/NewsContent";
import NewsVisual from "../../components/NewsVisual";
import {
  formatReadingTime,
  formatNewsDate,
  getNewsPurposeLabel,
  getNewsCta,
  getNewsLabel,
  getNewsPostBySlug,
  getNewsSources,
  getRelatedNews,
} from "../../data/news/contract";

export default function Detalle() {
  const { slug } = useParams();
  const post = getNewsPostBySlug(slug);

  if (!post) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Insight no encontrado</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Esta publicación no existe o cambió de URL.</h1>
          <Link to="/noticias" className="mt-6 inline-flex font-medium text-indigo-600 hover:text-indigo-700">← Volver a Insights</Link>
        </div>
      </Layout>
    );
  }

  const sources = getNewsSources(post);
  const cta = getNewsCta(post);
  const related = getRelatedNews(post);

  return (
    <Layout>
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <Link to="/noticias" className="text-sm text-slate-600 hover:text-slate-900">← Volver a Insights</Link>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>{getNewsPurposeLabel(post)}</span><span aria-hidden="true">·</span><span>{getNewsLabel(post)}</span><span aria-hidden="true">·</span><time dateTime={post.publishedAt}>{formatNewsDate(post.publishedAt)}</time><span aria-hidden="true">·</span><span>{formatReadingTime(post)}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">{post.excerpt}</p>
        </header>

        <div className="mt-9 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <NewsVisual post={post} className="aspect-[16/10]" sizes="(min-width: 1024px) 56rem, 100vw" eager />
        </div>

        <div className="mx-auto mt-10 max-w-3xl"><NewsContent content={post.content} /></div>

        {sources.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Fuentes utilizadas</h2>
            <ul className="mt-4 space-y-3">
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">{source.name || source.url} ↗</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-indigo-100 bg-indigo-50/70 px-6 py-7 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Próximo paso</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{cta.label}</h2>
          {cta.copy && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{cta.copy}</p>}
          <Link to={cta.href} className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Ver cómo lo resolvemos</Link>
        </section>

        {related.length > 0 && (
          <section className="mt-14 border-t border-slate-200 pt-9">
            <div className="flex items-end justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Seguir leyendo</p><h2 className="mt-2 text-2xl font-semibold text-slate-900">Insights relacionados</h2></div>
              <Link to="/noticias" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Ver todos</Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/noticias/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{getNewsPurposeLabel(item)}</p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900">{item.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
