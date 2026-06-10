import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import { generateSitemap } from "./generate-sitemap";
import { prerenderArticles } from "./prerender-articles";

async function buildStatic() {
  await rm("dist/public", { recursive: true, force: true });

  await generateSitemap();
  console.log("building client...");
  await viteBuild();
  await prerenderArticles();
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
