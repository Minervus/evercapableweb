import { useQuery } from '@tanstack/react-query';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from 'lucide-react';

// Custom components for rendering Portable Text from Sanity
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          className="rounded-xl my-8 w-full border border-white/5"
        />
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-4 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
    normal: ({ children }: any) => <p className="text-zinc-300 leading-relaxed mb-6 text-lg">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-8 text-xl text-zinc-400 italic bg-zinc-900/30 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-orange-500 hover:text-orange-400 underline decoration-orange-500/30 underline-offset-4 transition-colors">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-6 text-zinc-300 text-lg ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-6 text-zinc-300 text-lg ml-4">{children}</ol>,
  },
};

export default function Article() {
  const [match, params] = useRoute("/journal/:slug");
  const slug = params?.slug;

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['sanityArticle', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      return client.fetch(`
        *[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          mainImage,
          body,
          author
        }
      `, { slug });
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <span className="text-zinc-500 font-mono text-sm animate-pulse">LOADING_ARTICLE...</span>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Article not found</h1>
        <Link href="/journal">
          <a className="text-orange-500 hover:underline">Return to Journal</a>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/journal">
            <a className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journal
            </a>
          </Link>

          <header className="mb-12">
            {article.publishedAt && (
              <time className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm mb-4 block">
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              </time>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>
            {article.author && (
              <p className="text-zinc-400 font-medium flex items-center">
                By {article.author}
              </p>
            )}
          </header>

          {article.mainImage && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-white/5">
              <img
                src={urlFor(article.mainImage).width(1200).height(600).fit('crop').auto('format').url()}
                alt={article.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            {article.body ? (
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-zinc-500 italic">No content available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
