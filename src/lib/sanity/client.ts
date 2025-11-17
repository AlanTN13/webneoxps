// src/lib/sanity/client.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2023-10-01",
  useCdn: false,
  // sólo usamos token si existe
  token: import.meta.env.VITE_SANITY_TOKEN || undefined,
});
