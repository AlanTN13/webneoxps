import { validateCoverCollection } from "./news-image-policy.mjs";
import { validateRepositoryNews } from "./news-validate.mjs";

try {
  const result = await validateRepositoryNews();
  const imageErrors = validateCoverCollection(result.articles);
  const errors = [...new Set([...result.errors, ...imageErrors])];

  for (const article of result.articles) {
    const ownErrors = errors.filter((error) => error.includes(article.slug));
    if (ownErrors.length === 0) {
      console.log(`OK ${article.slug}`);
    } else {
      for (const error of ownErrors) console.error(`ERROR ${error}`);
    }
  }

  if (errors.length > 0) {
    console.error(`news:audit ERROR — ${errors.length} problema(s)`);
    process.exitCode = 1;
  } else {
    console.log(`news:audit OK — ${result.articles.length} noticia(s), 100% portadas landscape únicas + criterio editorial/foco responsive + metadata SEO/OG lista para build`);
  }
} catch (error) {
  console.error(`news:audit ERROR — ${error.message}`);
  process.exitCode = 1;
}
