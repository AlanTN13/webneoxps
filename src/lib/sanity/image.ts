// src/lib/sanity/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// Creamos el builder una sola vez
const builder = imageUrlBuilder(client);

// Helper para construir URLs de imagen
export function urlForImage(source) {
  return builder.image(source);
}
