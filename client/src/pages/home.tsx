import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Testimonial } from "@/components/Testimonial";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Testimonial />
        <About />
        <Services />
        <HowItWorks />
        <Pricing />
        <Results />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
