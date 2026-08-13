import fs from "node:fs/promises";
import path from "node:path";
import { canonicalizeArticle, validateCollection } from "./news-contract.mjs";

export const NEWS_DIR = path.resolve("src/data/news");

export async function readNewsFiles() {
  let entries = [];
  try {
    entries = await fs.readdir(NEWS_DIR, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const articles = [];
  for (const file of files) {
    const fullPath = path.join(NEWS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${file}: JSON inválido (${error.message})`);
    }
    const article = canonicalizeArticle(parsed);
    if (`${article.slug}.json` !== file) {
      throw new Error(`${file}: el nombre debe coincidir con el slug (${article.slug}.json)`);
    }
    articles.push(article);
  }
  return articles;
}

export async function validateRepositoryNews() {
  const articles = await readNewsFiles();
  const result = validateCollection(articles);
  return { articles, ...result };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = await validateRepositoryNews();
    for (const warning of result.warnings) console.warn(`WARN ${warning}`);
    if (result.errors.length > 0) {
      for (const error of result.errors) console.error(`ERROR ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`news:validate OK — ${result.articles.length} artículo(s), ${result.warnings.length} warning(s)`);
    }
  } catch (error) {
    console.error(`news:validate ERROR — ${error.message}`);
    process.exitCode = 1;
  }
}
