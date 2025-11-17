// src/lib/sanity/client.ts
import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = "2023-10-01";

if (!projectId || !dataset) {
  console.warn("⚠️ Falta configurar VITE_SANITY_PROJECT_ID o VITE_SANITY_DATASET");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // En dev, sin CDN para ver cambios rápido. En prod, con CDN.
  useCdn: !import.meta.env.DEV,
  // Si tu dataset es privado y usás token:
  token: import.meta.env.VITE_SANITY_TOKEN || undefined,
  // Nos aseguramos de leer solo publicados
  perspective: "published",
});
