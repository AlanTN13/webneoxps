import fs from "node:fs/promises";
import path from "node:path";
import { detectAddAction } from "./news-contract.mjs";
import { readNewsFiles } from "./news-validate.mjs";

const source = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
if (!source) {
  console.error("Uso: npm run news:check -- <archivo.json>");
  process.exit(1);
}

try {
  const candidate = JSON.parse(await fs.readFile(path.resolve(source), "utf8"));
  const existing = await readNewsFiles();
  const result = detectAddAction(existing, candidate);
  if (result.action !== "add") {
    for (const error of result.errors || []) console.error(`ERROR ${error}`);
    console.error("news:check CONFLICT — el candidato no debe incorporarse");
    process.exit(1);
  }
  console.log(`news:check DRY-RUN OK — ${candidate.slug}.json puede incorporarse sin mutar el repo`);
} catch (error) {
  console.error(`news:check ERROR — ${error.message}`);
  process.exit(1);
}
