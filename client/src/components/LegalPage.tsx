import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import logoIcon from "@assets/tn-logo-on-black-128.png";
import { Footer } from "@/components/Footer";
import { watchCanonical } from "@/lib/sectionRoutes";
import { SITE_BASE_URL } from "@shared/articleSeo";

export const CONTACT_EMAIL = "tony@tonynguyenfit.com";

export function EmailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-orange-400 hover:text-orange-300 underline underline-offset-2"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

/** Shell for /privacy, /terms and /refunds: plain reading layout on the dark brand background. */
export function LegalPage({
  path,
  title,
  description,
  children,
}: {
  path: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_BASE_URL}${path}`;
  useEffect(() => watchCanonical(url), [url]);

  return (
    <>
      <Helmet>
        <title>{`${title} | Tony Nguyen Fit`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Helmet>

      <div className="dark min-h-screen bg-zinc-950 text-white antialiased">
        <header className="px-6 py-5 flex items-center max-w-6xl mx-auto border-b border-zinc-900">
          <Link href="/" asChild>
            <a className="flex items-center gap-2.5">
              <img src={logoIcon} alt="" width={24} height={24} className="h-6 w-auto" />
              <span className="text-base font-bold text-white tracking-tight">Tony Nguyen Fit</span>
            </a>
          </Link>
        </header>

        <main className="max-w-[680px] mx-auto px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{title}</h1>
          <p className="text-zinc-300 text-[1.05rem] leading-[1.8] mb-12">{description}</p>
          <div className="space-y-10 text-zinc-300 leading-[1.8]">{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
}
