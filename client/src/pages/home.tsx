import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Familiar } from "@/components/Familiar";
import { Method } from "@/components/Method";
import { DataSection } from "@/components/DataSection";
import { Coach } from "@/components/Coach";
import { EngagementLevel } from "@/components/EngagementLevel";
import { BlueprintSection } from "@/components/BlueprintSection";
import { ProCoachingSection } from "@/components/ProCoachingSection";
import { Pricing } from "@/components/Pricing";
import { Guarantee } from "@/components/Guarantee";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Familiar />
        <Method />
        <DataSection />
        <Coach />
        <EngagementLevel />
        <BlueprintSection />
        <ProCoachingSection />
        <Pricing />
        <Guarantee />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
