import { createClient } from "@sanity/client";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
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

  for (const post of posts) {
    const html = injectArticleMetadata(indexHtml, post);
    const outPath = resolve(process.cwd(), `dist/public/journal/${post.slug}/index.html`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
  }

  console.log(`Prerendered ${posts.length} article page(s).`);
}
