import fs from "node:fs/promises";
import path from "node:path";
import { validateCollection } from "./news-contract.mjs";

export const NEWS_DIR = path.resolve("src/data/news");

export async function readNewsFiles(directory = NEWS_DIR) {
  let entries = [];
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
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
    const fullPath = path.join(directory, file);
    let parsed;
    try {
      parsed = JSON.parse(await fs.readFile(fullPath, "utf8"));
    } catch (error) {
      throw new Error(`${file}: JSON inválido (${error.message})`);
    }
    if (`${parsed.slug}.json` !== file) {
      throw new Error(`${file}: el nombre debe coincidir con el slug (${parsed.slug}.json)`);
    }
    articles.push(parsed);
  }
  return articles;
}

export async function validateRepositoryNews(directory = NEWS_DIR) {
  const articles = await readNewsFiles(directory);
  return { articles, ...validateCollection(articles) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = await validateRepositoryNews();
    if (result.errors.length > 0) {
      for (const error of result.errors) console.error(`ERROR ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`news:validate OK — ${result.articles.length} noticia(s); dedupe OK por slug, sourceUrl, engineRunId y topicFingerprint`);
    }
  } catch (error) {
    console.error(`news:validate ERROR — ${error.message}`);
    process.exitCode = 1;
  }
}
