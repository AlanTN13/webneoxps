// schemaTypes/post.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post del blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título (máximo 95 caracteres)",
      type: "string",
      validation: (Rule) => Rule.required().max(95).error("El título debe tener máximo 95 caracteres"),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "category",
      title: "Categoría principal",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Resumen / Bajada",
      type: "text",
      rows: 3,
      description: "Texto corto que se muestra en la tarjeta del listado.",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" }
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "mainImage",
    },
  },
});
