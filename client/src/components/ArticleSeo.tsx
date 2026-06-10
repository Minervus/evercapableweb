import { Helmet } from "react-helmet-async";
import { buildArticleMetadata, type ArticleSeoFields } from "@shared/articleSeo";

interface ArticleSeoProps {
  article: ArticleSeoFields & { slug: string };
}

export function ArticleSeo({ article }: ArticleSeoProps) {
  const { title, description } = buildArticleMetadata(article);
  const url = `https://evercapable.com/journal/${article.slug}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
