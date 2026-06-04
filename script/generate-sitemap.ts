import { createClient } from "@sanity/client";
import { writeFileSync } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: "49ykafev",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

const BASE_URL = "https://evercapable.com";

export async function generateSitemap() {
  console.log("Generating sitemap...");
  
  const staticPages = ["", "/journal"];
  
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }`);
  
  const urls = [
    ...staticPages.map(page => ({
      url: `${BASE_URL}${page}`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: page === "" ? "1.0" : "0.8"
    })),
    ...posts.map((post: any) => ({
      url: `${BASE_URL}/journal/${post.slug}`,
      lastmod: post._updatedAt ? post._updatedAt.split("T")[0] : new Date().toISOString().split("T")[0],
      priority: "0.6"
    }))
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  writeFileSync(resolve(process.cwd(), "client/public/sitemap.xml"), sitemapContent, "utf-8");
  console.log("Sitemap generated successfully!");
}
