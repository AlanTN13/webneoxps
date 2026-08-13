import fs from "node:fs/promises";
import path from "node:path";
import { detectAddAction } from "./news-contract.mjs";
import { readNewsFiles } from "./news-validate.mjs";

const argv = process.argv.slice(2);
const source = argv.find((arg) => !arg.startsWith("--"));

if (!source) {
  console.error("Uso: npm run news:add -- <archivo.json>");
  process.exit(1);
}

try {
  const raw = await fs.readFile(path.resolve(source), "utf8");
  const candidate = JSON.parse(raw);
  const existing = await readNewsFiles();
  const result = detectAddAction(existing, candidate);

  if (result.action !== "add") {
    for (const error of result.errors || []) console.error(`ERROR ${error}`);
    process.exit(1);
  }

  const newsDir = path.resolve("src/data/news");
  await fs.mkdir(newsDir, { recursive: true });
  const destination = path.join(newsDir, `${candidate.slug}.json`);
  await fs.writeFile(destination, `${JSON.stringify(candidate, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  console.log(`news:add OK — ${path.relative(process.cwd(), destination)}`);
} catch (error) {
  console.error(`news:add ERROR — ${error.message}`);
  process.exit(1);
}
