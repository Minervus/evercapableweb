import { Star, CheckCircle, ArrowRight, Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import heroImage from "@assets/stock_images/modern_fitness_studi_27d96578.jpg";
import client1 from "@assets/stock_images/happy_woman_fitness__b34f9200.jpg";
import client2 from "@assets/stock_images/happy_woman_fitness__d73688ea.jpg";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">
                  30-Day Money-Back Guarantee
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Avatar className="w-10 h-10 border-2 border-white/30">
                    <AvatarImage src={client1} alt="Client" />
                    <AvatarFallback>C1</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10 border-2 border-white/30">
                    <AvatarImage src={client2} alt="Client" />
                    <AvatarFallback>C2</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-white text-sm" data-testid="text-trust-clients">
                  <p className="font-medium">Trusted by 2,000+ clients worldwide</p>
                  <div className="flex items-center gap-1" data-testid="text-trust-rating">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-white/80">Rated 4.9 out of 5.0</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight" data-testid="text-hero-headline">
                Because your best self isn't behind you, it's ahead
              </h1>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <button
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl p-4 pr-5 flex items-center gap-4 transition-colors"
                data-testid="button-hero-cta"
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm opacity-90">30-min session</span>
                  </div>
                  <span className="font-semibold text-lg">Book your call</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <p className="text-white/70 text-sm md:text-right">
                No pressure. Just a clear path forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
