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
    <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 md:scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-28 pb-16 md:pb-24 px-6 md:px-0">
        <div className="w-full max-w-[800px] text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="font-mono text-orange-500 uppercase tracking-wider text-sm md:text-base font-medium block">
              // SUSTAINABLE HEALTH & LONGEVITY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-[60px] font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-lg"
            data-testid="text-hero-headline"
          >Finally Build the Body and Health You Want—Without Another Failed Diet or Burnout Cycle.</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md"
            data-testid="text-hero-subheadline"
          >For millennial men 28-45 who've tried keto, carnivore, gym bros, and apps. Get lean, strong, and injury-free for the long haul.</motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="gap-2 bg-[#FF9500] hover:bg-[#FF9500]/90 text-white border-none w-full sm:w-auto min-w-[250px] min-h-[56px] text-[20px] rounded-full shadow-[0_0_15px_rgba(255,149,0,0.3)] hover:shadow-[0_0_25px_rgba(255,149,0,0.6)] transition-all font-semibold"
                data-testid="button-hero-cta-primary"
              >
                See If Coaching Fits You
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                onClick={scrollToPrograms}
                variant="outline"
                size="lg"
                className="bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto min-w-[200px] min-h-[56px] rounded-full text-lg"
                data-testid="button-hero-cta-secondary"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
              <p className="text-xs uppercase text-white/60 tracking-widest font-medium">
                CERTIFIED AUTHORITY
              </p>
              <div className="flex items-center justify-center gap-6 opacity-70 grayscale">
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
