import React, { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

// Lazy Load Below-the-fold Components
const Familiar = lazy(() => import("@/components/Familiar").then(m => ({ default: m.Familiar })));
const Method = lazy(() => import("@/components/Method").then(m => ({ default: m.Method })));
const Testimonial = lazy(() => import("@/components/Testimonial").then(m => ({ default: m.Testimonial })));
const TrustSection = lazy(() => import("@/components/TrustSection").then(m => ({ default: m.TrustSection })));
const SystemIntegrityTest = lazy(() => import("@/components/SystemIntegrityTest").then(m => ({ default: m.SystemIntegrityTest })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const DataSection = lazy(() => import("@/components/DataSection").then(m => ({ default: m.DataSection })));
const Coach = lazy(() => import("@/components/Coach").then(m => ({ default: m.Coach })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center bg-black"><span className="text-zinc-500 font-mono text-sm">LOADING_MODULE...</span></div>}>
          <Familiar />
          <Method />
          <Testimonial />
          <TrustSection />
          <SystemIntegrityTest />
          <Pricing />
          <DataSection />
          <Coach />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 bg-black" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
