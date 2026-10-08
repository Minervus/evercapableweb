import React, { Suspense, lazy, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HOME_CANONICAL, HOME_TITLE, scrollToSectionId, watchCanonical } from "@/lib/sectionRoutes";

// Lazy Load Below-the-fold Components
const Familiar = lazy(() => import("@/components/Familiar").then(m => ({ default: m.Familiar })));
const Method = lazy(() => import("@/components/Method").then(m => ({ default: m.Method })));
const ClientResults = lazy(() => import("@/components/ClientResults").then(m => ({ default: m.ClientResults })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const DataSection = lazy(() => import("@/components/DataSection").then(m => ({ default: m.DataSection })));
const Coach = lazy(() => import("@/components/Coach").then(m => ({ default: m.Coach })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const LatestArticles = lazy(() => import("@/components/LatestArticles").then(m => ({ default: m.LatestArticles })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const KickstarterSignup = lazy(() => import("@/components/KickstarterSignup").then(m => ({ default: m.KickstarterSignup })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

export default function Home({ scrollToId }: { scrollToId?: string }) {
  useEffect(() => {
    document.title = HOME_TITLE;
    const stopWatching = watchCanonical(HOME_CANONICAL);

    const id = scrollToId || window.location.hash.replace(/^#/, "");
    if (!id) return stopWatching;
    const stopScrolling = scrollToSectionId(id);
    return () => {
      stopWatching();
      stopScrolling();
    };
  }, [scrollToId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center bg-black"><span className="text-zinc-500 font-mono text-sm">Loading…</span></div>}>
          <Familiar />
          <Method />
          <ClientResults />
          <Pricing />
          <DataSection />
          <Coach />
          {/* Most first-time visitors won't pay for the audit yet — give them
              the free option right after they've met Tony, not at the very end. */}
          <KickstarterSignup />
          <FAQ />
          <LatestArticles />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 bg-black" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
