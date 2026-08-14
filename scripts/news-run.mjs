import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { detectAddAction } from "./news-contract.mjs";
import { NEWS_DIR, readNewsFiles } from "./news-validate.mjs";

const ASSET_DIR = path.resolve("public/assets/insights");
const OUTCOMES = new Set(["NO_PUBLICATION", "PUBLICATION"]);

function fail(message, validationErrors = []) {
  const error = new Error(message);
  error.validationErrors = validationErrors;
  throw error;
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) fail(`${command} ${args.join(" ")} falló`);
}

function gitOutput(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) fail(result.stderr.trim() || `git ${args.join(" ")} falló`);
  return result.stdout.trim();
}

async function exists(file) {
  try { await fs.access(file); return true; } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function localCoverPath(article) {
  const prefix = "/assets/insights/";
  if (typeof article.coverImage !== "string" || !article.coverImage.startsWith(prefix)) {
    fail("PUBLICATION requiere coverImage local dentro de /assets/insights/");
  }
  const filename = article.coverImage.slice(prefix.length);
  if (!filename || path.basename(filename) !== filename) fail("coverImage debe apuntar a un único archivo local");
  return path.join(ASSET_DIR, filename);
}

export async function runNewsDecision({ decisionPath, newsDirectory = NEWS_DIR, assetDirectory = ASSET_DIR }) {
  if (!decisionPath) fail("Falta la ruta a la decisión JSON");
  const decision = JSON.parse(await fs.readFile(path.resolve(decisionPath), "utf8"));
  if (!OUTCOMES.has(decision.outcome)) fail("outcome debe ser NO_PUBLICATION o PUBLICATION");

  if (decision.outcome === "NO_PUBLICATION") {
    return { outcome: decision.outcome, changed: false, files: [] };
  }

  if (!decision.article || !decision.coverAsset) fail("PUBLICATION requiere article y coverAsset");
  const articleSource = path.resolve(path.dirname(path.resolve(decisionPath)), decision.article);
  const assetSource = path.resolve(path.dirname(path.resolve(decisionPath)), decision.coverAsset);
  const article = JSON.parse(await fs.readFile(articleSource, "utf8"));
  const existing = await readNewsFiles(newsDirectory);
  const validation = detectAddAction(existing, article);
  if (validation.action !== "add") fail("La publicación entra en conflicto con el corpus", validation.errors);

  const articleDestination = path.join(newsDirectory, `${article.slug}.json`);
  const configuredAssetDestination = localCoverPath(article);
  const assetDestination = path.join(assetDirectory, path.basename(configuredAssetDestination));
  if (await exists(articleDestination) || await exists(assetDestination)) fail("El destino ya existe; no se sobrescribió ningún archivo");

  await fs.mkdir(newsDirectory, { recursive: true });
  await fs.mkdir(assetDirectory, { recursive: true });
  const token = `${process.pid}-${Date.now()}`;
  const articleStage = path.join(newsDirectory, `.${article.slug}.${token}.tmp`);
  const assetStage = path.join(assetDirectory, `.${path.basename(assetDestination)}.${token}.tmp`);
  const created = [];

  try {
    await fs.writeFile(articleStage, `${JSON.stringify(article, null, 2)}\n`, { flag: "wx" });
    await fs.copyFile(assetSource, assetStage, fs.constants.COPYFILE_EXCL);
    await fs.rename(assetStage, assetDestination);
    created.push(assetDestination);
    await fs.rename(articleStage, articleDestination);
    created.push(articleDestination);
    return { outcome: decision.outcome, changed: true, files: [articleDestination, assetDestination] };
  } catch (error) {
    await Promise.allSettled([articleStage, assetStage, ...created].map((file) => fs.rm(file, { force: true })));
    throw error;
  }
}

export function runAutonomousGates() {
  run("npm", ["run", "news:validate"]);
  run("npm", ["run", "news:test"]);
  run("npm", ["run", "lint"]);
  run("npm", ["run", "build"]);
  run("git", ["diff", "--check"]);
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const args = process.argv.slice(2);
  const decisionPath = args.find((arg) => !arg.startsWith("--"));
  const shouldCommit = args.includes("--commit");
  let transaction;
  try {
    if (shouldCommit && gitOutput(["status", "--porcelain", "--untracked-files=no"])) fail("--commit requiere no tener cambios versionados pendientes");
    transaction = await runNewsDecision({ decisionPath });
    if (!transaction.changed) {
      console.log("news:run NO_PUBLICATION — corpus sin mutaciones");
      process.exit(0);
    }
    if (shouldCommit) {
      const relativeFiles = transaction.files.map((file) => path.relative(process.cwd(), file));
      try {
        runAutonomousGates();
      } catch (error) {
        await Promise.allSettled(transaction.files.map((file) => fs.rm(file, { force: true })));
        throw error;
      }
      run("git", ["add", "--", ...relativeFiles]);
      try {
        run("git", ["commit", "-m", `content: publish ${path.basename(relativeFiles[0], ".json")}`]);
      } catch (error) {
        run("git", ["restore", "--staged", "--", ...relativeFiles]);
        await Promise.allSettled(transaction.files.map((file) => fs.rm(file, { force: true })));
        throw error;
      }
    }
    console.log(`news:run PUBLICATION OK — ${transaction.files.map((file) => path.relative(process.cwd(), file)).join(" + ")}${shouldCommit ? "; commit atómico creado" : ""}`);
  } catch (error) {
    for (const validationError of error.validationErrors || []) console.error(`ERROR ${validationError}`);
    console.error(`news:run ERROR — ${error.message}`);
    process.exit(1);
  }
}
