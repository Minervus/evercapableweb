import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/alexander-red-qo1pyCD02t4-unsplash_1768606692957.jpg";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPrograms = () => {
    const element = document.querySelector("#programs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6" data-testid="text-hero-headline">
            Stop the Sprint. Build a Body That Lasts.
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8" data-testid="text-hero-subheadline">
            Data-driven nutrition and habit layering for dads who are done with 30-day challenges. Gain functional strength, avoid generational health risks, and become EverCapable for the people who need you most.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="gap-2"
              data-testid="button-hero-cta-primary"
            >
              Apply for Pro Coaching
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={scrollToPrograms}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
              data-testid="button-hero-cta-secondary"
            >
              View Programs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
