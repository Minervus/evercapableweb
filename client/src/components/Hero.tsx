import { Button } from "@/components/ui/button";
import { Star, Calendar } from "lucide-react";
import heroImage from "@assets/stock_images/modern_fitness_studi_27d96578.jpg";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <span className="text-white/90 text-sm font-medium">
            30-Day Money-Back Guarantee
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6" data-testid="text-hero-headline">
          Because your best self isn't behind you,{" "}
          <span className="text-primary">it's ahead</span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          No pressure. Just a clear path forward.
        </p>

        <Button
          size="lg"
          onClick={scrollToContact}
          className="text-lg px-8 py-6 h-auto gap-2"
          data-testid="button-hero-cta"
        >
          <Calendar className="w-5 h-5" />
          30-min session — Book your call
        </Button>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2" data-testid="text-trust-clients">
            <span className="text-white font-semibold">
              Trusted by 2,000+ clients worldwide
            </span>
          </div>
          <div className="flex items-center gap-1" data-testid="text-trust-rating">
            <span className="text-white font-semibold">Rated</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-white font-semibold">4.9 out of 5.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
