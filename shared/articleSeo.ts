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

export function buildArticleMetadata(article: ArticleSeoFields): ArticleMetadata {
  const title = article.seo?.metaTitle?.trim() || article.title;
  const description =
    article.seo?.metaDescription?.trim() ||
    article.snippet?.trim() ||
    "";

  return { title, description };
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function injectArticleMetadata(
  html: string,
  article: ArticleSeoFields & { slug: string },
  baseUrl = "https://evercapable.com",
): string {
  const { title, description } = buildArticleMetadata(article);
  const url = `${baseUrl}/journal/${article.slug}`;
  const safeTitle = escapeHtmlAttribute(title);
  const safeDescription = escapeHtmlAttribute(description);

  return html
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
      `<meta property="og:type" content="article" />`,
    )
    .replace(
      /<\/head>/,
      `    <meta property="og:url" content="${escapeHtmlAttribute(url)}" />\n    <link rel="canonical" href="${escapeHtmlAttribute(url)}" />\n  </head>`,
    );
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
