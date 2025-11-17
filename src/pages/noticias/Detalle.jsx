// src/pages/noticias/Detalle.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../../components/Layout";
import { client } from "../../lib/sanity/client";
import { urlForImage } from "../../lib/sanity/image";
import { PortableText } from "@portabletext/react";

const portableComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={urlForImage(value).width(1200).url()}
          alt={value.alt || ""}
          className="rounded-xl mx-auto"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-slate-500">
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

  if (!post)
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-20 px-4 text-slate-600">
          Cargando…
        </div>
      </Layout>
    );

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

        {/* Contenido estilo “Medium” */}
        <div
          className="
            prose prose-lg prose-slate mt-10 mx-auto
            leading-relaxed
            prose-headings:font-sans prose-headings:text-slate-900 prose-headings:font-semibold
            prose-p:font-serif prose-li:font-serif prose-blockquote:font-serif
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
