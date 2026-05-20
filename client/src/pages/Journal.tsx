import { useQuery } from '@tanstack/react-query';
import { client } from '../lib/sanity';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from 'lucide-react';

export default function Journal() {
  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ['sanityArticles'],
    queryFn: async () => {
      // Fetch all posts ordered by date
      // We only fetch needed fields for the list view
      return client.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          title,
          "slug": slug.current,
          publishedAt,
          snippet
        }
      `);
    },
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/">
          <a className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <p className="mb-4 text-sm md:text-base font-medium text-orange-500 font-mono uppercase tracking-wider">
            // THE_JOURNAL
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            EverCapable Journal
          </h1>
          <p className="text-zinc-400 mt-4 md:text-xl max-w-2xl">
            Insights on training, nutrition, and performance designed to help you build a body that lasts.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 min-h-[300px]">
            <span className="text-zinc-500 font-mono text-sm animate-pulse">LOADING_ARTICLES...</span>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-white/5">
            <p className="text-zinc-500">Currently unable to load the journal articles. Ensure Sanity project ID is configured.</p>
          </div>
        ) : articles?.length === 0 ? (
           <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-white/5">
            <p className="text-zinc-500">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article: any, index: number) => {
              const dateStr = article.publishedAt ? format(new Date(article.publishedAt), 'MMMM yyyy') : '';
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/5 hover:border-orange-500/30 transition-all duration-300 h-full relative overflow-hidden group flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />

                    <CardContent className="p-8 flex flex-col flex-grow">
                      <div>
                        {dateStr && (
                          <time className="text-xs font-mono text-orange-500 font-bold uppercase tracking-widest mb-4 block">
                            {dateStr}
                          </time>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
                          {article.title}
                        </h3>
                        {article.snippet && (
                          <p className="text-zinc-400 leading-relaxed text-sm line-clamp-3 mb-6">
                            {article.snippet}
                          </p>
                        )}
                      </div>

                      <Link href={`/journal/${article.slug}`}>
                        <a className="inline-flex items-center mt-auto text-sm font-bold text-zinc-300 hover:text-white group/link transition-colors pt-4 border-t border-white/5">
                          Read article
                          <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform text-orange-500">
                            →
                          </span>
                        </a>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
