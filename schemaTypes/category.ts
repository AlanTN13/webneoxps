import { defineType, defineField } from "sanity";

export default {
    name: "category",
    type: "document",
    title: "Category",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Título",
        validation: (Rule) => Rule.required(),
      }
    ]
  }
  