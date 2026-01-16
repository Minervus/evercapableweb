import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import clientImage from "@assets/stock_images/happy_woman_fitness__b45a29e9.jpg";

export function Testimonial() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
              "After two kids, I never thought I'd feel this strong again. Rachel Stone helped me rebuild my body and confidence."
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 md:w-20 md:h-20">
              <AvatarImage src={clientImage} alt="Sara Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Sara Chen</p>
              <p className="text-sm text-muted-foreground">
                Postnatal Reboot - November 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
