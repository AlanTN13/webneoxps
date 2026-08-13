import fs from "node:fs/promises";
import path from "node:path";
import { detectAddAction } from "./news-contract.mjs";
import { readNewsFiles } from "./news-validate.mjs";

const argv = process.argv.slice(2);
const printJson = argv.includes("--print");
const source = argv.find((arg) => !arg.startsWith("--"));

if (!source) {
  console.error("Uso: npm run news:add -- <archivo.json> [--print]");
  process.exit(1);
}

try {
  const raw = await fs.readFile(path.resolve(source), "utf8");
  const candidate = JSON.parse(raw);
  const existing = await readNewsFiles();
  const result = detectAddAction(existing, candidate);

  for (const warning of result.warnings || []) console.warn(`WARN ${warning}`);

  if (result.action === "conflict") {
    for (const error of result.errors) console.error(`ERROR ${error}`);
    process.exit(1);
  }

  if (result.action === "noop") {
    console.log(`news:add NOOP — ${result.article.slug} ya existe con el mismo contenido`);
    process.exit(0);
  }

  console.log(`news:add ADD — candidato válido para src/data/news/${result.article.slug}.json`);
  if (printJson) console.log(JSON.stringify(result.article, null, 2));
} catch (error) {
  console.error(`news:add ERROR — ${error.message}`);
  process.exit(1);
}
