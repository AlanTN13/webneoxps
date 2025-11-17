// src/pages/noticias/index.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import { client } from "../../lib/sanity/client";
import { urlForImage } from "../../lib/sanity/image";

const NEWS_LIST_QUERY = `
  *[
    _type == "post"
    && !(_id in path("drafts.**"))
  ]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,
    mainImage,
    excerpt,
    "category": category->title
  }
`;

export default function Noticias() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    client
      .fetch(NEWS_LIST_QUERY)
      .then((data) => {
        // pequeño log por si algo falla en prod
        console.log("[Noticias] posts recibidos:", data?.length || 0);
        setPosts(data || []);
      })
      .catch((err) => {
        console.error("[Noticias] Error al traer posts de Sanity:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Categorías únicas
  const categories = Array.from(
    new Set(
      (posts || [])
        .map((p) => p.category || "")
        .filter(Boolean)
    )
  );

  // Posts visibles (filtrados por categoría si hay una activa)
  const visiblePosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <Layout>
      <main className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Encabezado */}
          <header className="mb-10 sm:mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              NEXOPS BLOG
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Tendencias, innovación y automatización para negocios
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
              Proyectos recientes, ideas y aprendizajes.
            </p>

            {/* Categorías como filtros */}
            {categories.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {/* Pill "Todas" */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition
                    ${
                      activeCategory === null
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                >
                  Todas
                </button>

                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setActiveCategory(isActive ? null : cat)
                      }
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition
                        ${
                          isActive
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </header>

          {/* Listado */}
          {loading ? (
            <p className="text-sm text-slate-500">Cargando noticias…</p>
          ) : visiblePosts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No hay noticias para esa categoría. Probá con otra 😊
            </p>
          ) : (
            <section className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => {
                const date = new Date(post.publishedAt || post._createdAt);
                const formatted = date.toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                const hasImage = post.mainImage && post.mainImage.asset;

                return (
                  <article
                    key={post._id}
                    className="group flex flex-col rounded-2xl border border-slate-200/70 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Imagen */}
                    {hasImage && (
                      <Link to={`/noticias/${post.slug.current}`}>
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                          <img
                            src={urlForImage(post.mainImage)
                              .width(800)
                              .height(500)
                              .fit("crop")
                              .url()}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      </Link>
                    )}

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col px-5 sm:px-6 pt-5 pb-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                        {formatted}
                      </p>

                      <Link
                        to={`/noticias/${post.slug.current}`}
                        className="mt-2 inline-block"
                      >
                        <h2 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h2>
                      </Link>

                      {post.excerpt && (
                        <p className="mt-2 text-sm text-slate-600 line-clamp-4">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Footer tarjeta */}
                      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          {post.category && (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                              <span className="font-medium text-slate-600">
                                {post.category}
                              </span>
                            </>
                          )}
                        </div>

                        <Link
                          to={`/noticias/${post.slug.current}`}
                          className="inline-flex items-center gap-1 font-medium text-[11px] text-indigo-600 group-hover:text-indigo-700"
                        >
                          Leer más
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
