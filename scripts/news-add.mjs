import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { detectAddAction } from "./news-contract.mjs";
import { validateCoverCollection } from "./news-image-policy.mjs";
import { NEWS_DIR, readNewsFiles } from "./news-validate.mjs";

export async function addNewsFile({ source, newsDirectory = NEWS_DIR }) {
  if (!source) throw new Error("Falta la ruta al JSON candidato");
  const raw = await fs.readFile(path.resolve(source), "utf8");
  const candidate = JSON.parse(raw);
  const existing = await readNewsFiles(newsDirectory);
  const imageErrors = validateCoverCollection([...existing, candidate]);
  const result = detectAddAction(existing, candidate);

  if (imageErrors.length > 0 || result.action !== "add") {
    const error = new Error("La noticia no fue incorporada");
    error.validationErrors = [...imageErrors, ...(result.errors || [])];
    throw error;
  }

  await fs.mkdir(newsDirectory, { recursive: true });
  const destination = path.join(newsDirectory, `${candidate.slug}.json`);
  await fs.writeFile(destination, `${JSON.stringify(candidate, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  return destination;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const source = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
  if (!source) {
    console.error("Uso: npm run news:add -- <archivo.json>");
    process.exit(1);
  }
  try {
    const destination = await addNewsFile({ source });
    console.log(`news:add OK — ${path.relative(process.cwd(), destination)}`);
  } catch (error) {
    for (const validationError of error.validationErrors || []) console.error(`ERROR ${validationError}`);
    console.error(`news:add ERROR — ${error.message}`);
    process.exit(1);
  }
}
