import { createClient } from "@sanity/client";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { ARTICLE_SEO_GROQ, injectArticleMetadata } from "../shared/articleSeo";

const client = createClient({
  projectId: "49ykafev",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

export async function prerenderArticles() {
  console.log("Prerendering journal articles with per-post SEO metadata...");

  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] { ${ARTICLE_SEO_GROQ} }`,
  );

  const indexPath = resolve(process.cwd(), "dist/public/index.html");
  const indexHtml = readFileSync(indexPath, "utf-8");
  const journalDir = resolve(process.cwd(), "dist/public/journal");

  // Remove stale journal/{slug}/index.html folders from prior deploys
  if (existsSync(journalDir)) {
    rmSync(journalDir, { recursive: true, force: true });
  }
  mkdirSync(journalDir, { recursive: true });

  for (const post of posts) {
    const html = injectArticleMetadata(indexHtml, post);
    const cleanSlug = post.slug.replace(/^\/+|\/+$/g, "");
    const outPath = resolve(process.cwd(), `dist/public/journal/${cleanSlug}`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
  }

  console.log(`Prerendered ${posts.length} article page(s).`);
}
