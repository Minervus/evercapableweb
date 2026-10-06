export const SITE_BASE_URL = "https://tonynguyenfit.com";

export const JOURNAL_NAME = "TonyNguyenFit Journal";

export const JOURNAL_DESCRIPTION =
  "Practical nutrition notes for people who eat well but still feel stuck.";

const JOURNAL_TITLE_SUFFIX = ` | ${JOURNAL_NAME}`;

/** Document title for journal routes: `{title} | TonyNguyenFit Journal`. */
export function formatJournalDocumentTitle(title: string): string {
  const trimmed = title.trim();
  const base = trimmed
    .replace(/\s*\|\s*(?:EverCapable|TonyNguyenFit)\s+Journal\s*$/i, "")
    .trim();

  if (!base || base.toLowerCase() === JOURNAL_NAME.toLowerCase()) {
    return JOURNAL_NAME;
  }

  return `${base}${JOURNAL_TITLE_SUFFIX}`;
}

export interface ArticleSeoFields {
  title: string;
  snippet?: string | null;
  slug?: string;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
}

export interface ArticleMetadata {
  title: string;
  description: string;
}

/** Strip trailing slashes so canonical matches the non-trailing-slash 301 destination. */
export function normalizeCanonicalUrl(url: string): string {
  const parsed = new URL(url.trim());
  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  }
  return parsed.pathname === "/" ? parsed.origin + "/" : parsed.href.replace(/\/+$/, "");
}

export function buildArticleCanonicalUrl(
  slug: string,
  baseUrl = SITE_BASE_URL,
): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  return normalizeCanonicalUrl(`${baseUrl}/journal/${cleanSlug}`);
}

export function buildArticleMetadata(article: ArticleSeoFields): ArticleMetadata {
  const rawTitle = article.seo?.metaTitle?.trim() || article.title;
  const title = formatJournalDocumentTitle(rawTitle);
  const description =
    article.seo?.metaDescription?.trim() ||
    article.snippet?.trim() ||
    "";

  return { title, description };
}

export function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Replace the head meta/title/canonical tags for any prerendered page. */
export function injectPageMetadata(
  html: string,
  meta: { title: string; description: string; url: string; ogType?: string },
): string {
  const safeTitle = escapeHtmlAttribute(meta.title);
  const safeDescription = escapeHtmlAttribute(meta.description);
  const safeUrl = escapeHtmlAttribute(meta.url);
  const ogType = meta.ogType ?? "website";

  let next = html
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${safeDescription}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${safeTitle}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${safeDescription}" />`,
    )
    .replace(
      /<meta property="og:type" content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${ogType}" />`,
    );

  next = upsertHeadTag(
    next,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${safeUrl}" />`,
  );
  next = upsertHeadTag(
    next,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${safeUrl}" />`,
  );
  return next;
}

/** Replace an existing head tag, or insert one before </head>. Avoids duplicate canonicals. */
function upsertHeadTag(html: string, pattern: RegExp, tag: string): string {
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace(/<\/head>/, `    ${tag}\n  </head>`);
}

/** Inject server-rendered, crawlable content into the empty SPA root container. */
export function injectRootContent(html: string, contentHtml: string): string {
  return html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${contentHtml}</div>`,
  );
}

export function injectArticleMetadata(
  html: string,
  article: ArticleSeoFields & { slug: string },
  baseUrl = SITE_BASE_URL,
): string {
  const { title, description } = buildArticleMetadata(article);
  const url = buildArticleCanonicalUrl(article.slug, baseUrl);

  return injectPageMetadata(html, { title, description, url, ogType: "article" });
}

export const ARTICLE_SEO_GROQ = `
  title,
  "slug": slug.current,
  snippet,
  seo {
    metaTitle,
    metaDescription
  }
`;
