import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { toHTML } from "@portabletext/to-html";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import {
  escapeHtmlAttribute,
  escapeHtmlText,
  injectArticleMetadata,
  injectPageMetadata,
  injectRootContent,
  SITE_BASE_URL,
} from "../shared/articleSeo";
import { buildJournalRedirectRules } from "../shared/journalRedirects";

const client = createClient({
  projectId: "49ykafev",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

interface PrerenderPost {
  title: string;
  slug: string;
  snippet?: string | null;
  publishedAt?: string | null;
  author?: string | null;
  body?: unknown;
  seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
}

const PRERENDER_GROQ = `
  title,
  "slug": slug.current,
  snippet,
  publishedAt,
  author,
  body,
  seo { metaTitle, metaDescription }
`;

function formatDate(iso?: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function renderBody(body: unknown): string {
  if (!body) return "";
  return toHTML(body as any, {
    components: {
      types: {
        image: ({ value }: any) => {
          if (!value?.asset?._ref) return "";
          const url = builder.image(value).width(1200).fit("max").auto("format").url();
          return `<img src="${escapeHtmlAttribute(url)}" alt="${escapeHtmlAttribute(value.alt || "")}" loading="lazy" />`;
        },
      },
    },
  });
}

function articleLinkItems(posts: PrerenderPost[]): string {
  return posts
    .map(
      (p) =>
        `<li><a href="/journal/${escapeHtmlAttribute(p.slug)}">${escapeHtmlText(p.title)}</a></li>`,
    )
    .join("");
}

function renderArticleContent(post: PrerenderPost, allPosts: PrerenderPost[]): string {
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const meta = [post.author, formatDate(post.publishedAt)].filter(Boolean).join(" · ");

  return [
    `<main>`,
    `<nav aria-label="Breadcrumb"><a href="/">Home</a> <a href="/journal">Journal</a></nav>`,
    `<article>`,
    `<h1>${escapeHtmlText(post.title)}</h1>`,
    meta ? `<p>${escapeHtmlText(meta)}</p>` : "",
    renderBody(post.body),
    `</article>`,
    related.length
      ? `<aside aria-label="More articles"><h2>More from the Journal</h2><ul>${articleLinkItems(
          related,
        )}</ul><p><a href="/journal">View all articles</a></p></aside>`
      : `<p><a href="/journal">View all articles</a></p>`,
    `</main>`,
  ]
    .filter(Boolean)
    .join("");
}

function renderJournalIndexContent(posts: PrerenderPost[]): string {
  const items = posts
    .map((p) => {
      const snippet = p.snippet ? ` — ${escapeHtmlText(p.snippet)}` : "";
      return `<li><a href="/journal/${escapeHtmlAttribute(p.slug)}">${escapeHtmlText(
        p.title,
      )}</a>${snippet}</li>`;
    })
    .join("");

  return [
    `<main>`,
    `<nav aria-label="Breadcrumb"><a href="/">Home</a></nav>`,
    `<h1>EverCapable Journal</h1>`,
    `<p>Insights on training, nutrition, and performance designed to help you build a body that lasts.</p>`,
    `<ul>${items}</ul>`,
    `</main>`,
  ].join("");
}

function renderHomeArticlesNav(posts: PrerenderPost[]): string {
  return [
    `<nav aria-label="Site"><a href="/">Home</a> <a href="/journal">Journal</a> <a href="/initialize">Get Started</a></nav>`,
    `<section aria-label="Latest articles"><h2>From the Journal</h2><ul>${articleLinkItems(
      posts,
    )}</ul><p><a href="/journal">View all articles</a></p></section>`,
  ].join("");
}

export async function prerenderArticles() {
  console.log("Prerendering journal pages with crawlable content + SEO metadata...");

  const posts: PrerenderPost[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${PRERENDER_GROQ} }`,
  );

  const publicDir = resolve(process.cwd(), "dist/public");
  const indexPath = resolve(publicDir, "index.html");
  const template = readFileSync(indexPath, "utf-8");
  const journalDir = resolve(publicDir, "journal");

  // Remove stale journal/{slug}/index.html folders from prior deploys
  if (existsSync(journalDir)) {
    rmSync(journalDir, { recursive: true, force: true });
  }
  mkdirSync(journalDir, { recursive: true });

  // Per-article pages: meta + crawlable body, internal links, related links
  for (const post of posts) {
    const cleanSlug = post.slug.replace(/^\/+|\/+$/g, "");
    let html = injectArticleMetadata(template, { ...post, slug: cleanSlug });
    html = injectRootContent(html, renderArticleContent(post, posts));
    const outPath = resolve(journalDir, `${cleanSlug}.html`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
  }

  // Journal index page: crawlable list linking to every article
  const journalUrl = `${SITE_BASE_URL}/journal`;
  let journalHtml = injectPageMetadata(template, {
    title: "EverCapable Journal | Training & Nutrition for Busy Dads",
    description:
      "Insights on training, nutrition, and performance designed to help busy dads build a body that lasts.",
    url: journalUrl,
  });
  journalHtml = injectRootContent(journalHtml, renderJournalIndexContent(posts));
  writeFileSync(resolve(publicDir, "journal.html"), journalHtml, "utf-8");

  // Home page: inject static links to every article so posts are not orphaned
  const homeHtml = injectRootContent(template, renderHomeArticlesNav(posts));
  writeFileSync(indexPath, homeHtml, "utf-8");

  // /audit landing page: static crawlable shell with SEO meta
  const auditUrl = `${SITE_BASE_URL}/audit`;
  let auditHtml = injectPageMetadata(template, {
    title: "The Millennial Vitality Audit & Roadmap — Tony Nguyen Fit",
    description:
      "A 60-minute data-backed strategy session ($149) for 35–45 year-old professionals ready to build a health system that fits their real life.",
    url: auditUrl,
  });
  auditHtml = injectRootContent(
    auditHtml,
    [
      `<main>`,
      `<nav aria-label="Site"><a href="/">Home</a> <a href="/journal">Journal</a></nav>`,
      `<h1>The Millennial Vitality Audit &amp; Roadmap</h1>`,
      `<p>A 60-minute data-backed strategy session ($149) for 35–45 year-old professionals who are done guessing and ready to build a health system that fits their real life.</p>`,
      `<p><a href="/journal">Read the Journal</a></p>`,
      `</main>`,
    ].join(""),
  );
  writeFileSync(resolve(publicDir, "audit.html"), auditHtml, "utf-8");

  // Redirects (article rewrites + journal index + /audit + SPA fallback)
  writeFileSync(
    resolve(publicDir, "_redirects"),
    buildJournalRedirectRules(posts.map((p) => p.slug)),
    "utf-8",
  );

  console.log(
    `Prerendered ${posts.length} article page(s), journal index, and home article links.`,
  );
}
