import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { client } from '../lib/sanity';
import { Link } from "wouter";
import { JOURNAL_DESCRIPTION } from "@shared/articleSeo";

type FeedItem = {
  title: string;
  slug: string;
  pubDate: string;
  contentSnippet?: string;
};

export function LatestArticles() {
  const { data: articles, isLoading, isError } = useQuery<FeedItem[]>({
    queryKey: ['sanityLatestArticles'],
    queryFn: async () => {
      const posts = await client.fetch(`
        *[_type == "post"] | order(publishedAt desc)[0...3] {
          title,
          "slug": slug.current,
          publishedAt,
          snippet
        }
      `);
      
      return posts.map((post: any) => ({
        title: post.title,
        slug: post.slug,
        pubDate: post.publishedAt,
        contentSnippet: post.snippet
      }));
    },
    staleTime: 3600 * 1000,
  });

  return (
    <section id="latest-articles" className="py-16 md:py-24 bg-background border-t border-zinc-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.3 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <p className="mb-4 text-sm md:text-base font-medium text-orange-500 uppercase tracking-wider">
            The Journal
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight">
            Latest from the Journal
          </h2>
          <p className="text-zinc-400 mt-4 md:text-lg max-w-2xl">
            {JOURNAL_DESCRIPTION}
          </p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20 min-h-[300px]">
            <span className="text-zinc-500 font-mono text-sm animate-pulse">Loading articles…</span>
          </div>
        ) : isError || !articles || articles.length === 0 ? (
          // No error message on a sales page: the journal link below is enough.
          null
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {articles.map((article, index) => {
              const dateStr = article.pubDate ? format(new Date(article.pubDate), 'MMMM yyyy') : '';
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "120px 0px" }}
                  transition={{ duration: 0.3, delay: Math.min(index, 3) * 0.05 }}
                >
                  <Card className="bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/5 hover:border-orange-500/30 transition-all duration-300 h-full relative overflow-hidden group flex flex-col">
                    {/* Accent glow on hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />

                    <CardContent className="p-8 flex flex-col flex-grow">
                      <div>
                        <time dateTime={article.pubDate} className="text-xs font-mono text-orange-500 font-bold uppercase tracking-widest mb-4 block">
                          {dateStr}
                        </time>
                        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
                          {article.title}
                        </h3>
                        {article.contentSnippet && (
                          <p className="text-zinc-400 leading-relaxed text-sm line-clamp-3 mb-6">
                            {article.contentSnippet}
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/journal/${article.slug}`}
                        className="inline-flex items-center mt-auto text-sm font-bold text-zinc-300 hover:text-white group/link transition-colors pt-4 border-t border-white/5"
                      >
                        Read full article
                        <span className="sr-only">: {article.title}</span>
                        <span aria-hidden="true" className="ml-2 transform group-hover/link:translate-x-1 transition-transform text-orange-500">
                          →
                        </span>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center md:justify-start"
        >
          <Link
            href="/journal"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-zinc-950 font-bold rounded hover:bg-orange-500 hover:text-white transition-colors duration-300"
          >
            Read All Articles in the Journal
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
