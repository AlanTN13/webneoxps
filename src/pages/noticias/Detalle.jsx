// src/pages/noticias/Detalle.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../../components/Layout";
import { client } from "../../lib/sanity/client";
import { urlForImage } from "../../lib/sanity/image";
import { PortableText } from "@portabletext/react";

// --- Componentes para formatear el contenido del post ---
const portableComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-slate-700 leading-relaxed my-4">
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 text-slate-700 space-y-2 my-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 text-slate-700 space-y-2 my-4">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-800">{children}</em>
    ),
  },

  // --- Imágenes internas estilizadas ---
  types: {
    image: ({ value }) => (
      <figure className="my-10 w-full flex flex-col items-center">
        <img
          src={urlForImage(value).width(1600).url()}
          alt={value.alt || ""}
          className="
            rounded-2xl
            mx-auto
            w-full
            max-w-[768px]    /* mismo ancho que el texto */
            h-[300px]       /* más baja */
            object-cover    /* rellena sin deformar */
            shadow-sm
          "
        />
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function Detalle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          mainImage,
          body
        }`,
        { slug }
      )
      .then(setPost);
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-20 px-4 text-slate-600">
          Cargando…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto py-20 px-4">
        {/* Volver */}
        <Link
          to="/noticias"
          className="text-slate-600 hover:text-slate-900 text-sm"
        >
          ← Volver
        </Link>

        {/* Título */}
        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          {post.title}
        </h1>

        {/* Contenido */}
        <div
          className="
            prose
            prose-lg
            prose-slate
            mt-10 mx-auto
            leading-relaxed
            prose-headings:text-slate-900
            prose-img:rounded-xl
          "
        >
          {post.body && (
            <PortableText value={post.body} components={portableComponents} />
          )}
        </div>
      </article>
    </Layout>
  );
}
