import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { DataSection } from "@/components/DataSection";
import { Coach } from "@/components/Coach";
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
        <Method />
        <DataSection />
        <Coach />
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
