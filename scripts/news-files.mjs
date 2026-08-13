import fs from 'node:fs/promises';
import path from 'node:path';
import { NEWS_DIRECTORY } from './news-validation.mjs';

export const readJsonFile = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'));

export const loadNewsEntries = async (directory = NEWS_DIRECTORY) => {
  let names = [];
  try {
    names = (await fs.readdir(directory)).filter((name) => name.endsWith('.json')).sort();
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  return Promise.all(names.map(async (name) => {
    const filePath = path.join(directory, name);
    return {
      label: path.relative(process.cwd(), filePath),
      path: filePath,
      post: await readJsonFile(filePath),
    };
  }));
};
