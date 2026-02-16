import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@assets/alexander-red-qo1pyCD02t4-unsplash_1768606692957.jpg";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const headerOffset = 100; // Account for fixed header + padding
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  };

  const scrollToPrograms = () => {
    const element = document.querySelector("#pricing");
    if (element) {
      const headerOffset = 100; // Account for fixed header + padding
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)' }}
      />
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-0">
        <div className="w-full max-w-[600px] text-left md:ml-12 lg:ml-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="font-mono text-orange-500 uppercase tracking-wider text-sm md:text-base font-medium block">
              // PROTOCOL: SUSTAINABLE RECOMPOSITION
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em] mb-6 drop-shadow-lg"
            data-testid="text-hero-headline"
          >Stop the Sprints. Build Sustainable Health.</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-xl mb-8 drop-shadow-md"
            data-testid="text-hero-subheadline"
          >Stop guessing. Get data-driven nutrition and habit layering designed for longevity. Gain functional strength and become the person your family needs you to be.</motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-start gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 w-full sm:w-auto">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-white border-none w-full sm:w-auto min-w-[200px]"
                data-testid="button-hero-cta-primary"
              >
                Apply for Pro Coaching
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                onClick={scrollToPrograms}
                variant="outline"
                size="lg"
                className="bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto min-w-[200px]"
                data-testid="button-hero-cta-secondary"
              >
                View Programs
              </Button>
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="text-[10px] uppercase text-white/60 tracking-widest font-medium">
                CERTIFIED AUTHORITY
              </p>
              <div className="flex items-center gap-6 opacity-70 grayscale">
                {/* Placeholders for logos */}
                <div className="text-white font-bold text-lg tracking-tight">ISSA</div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="text-white font-bold text-lg tracking-tight">Precision Nutrition</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
