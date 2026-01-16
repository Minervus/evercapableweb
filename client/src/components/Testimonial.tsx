import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import clientImage from "@assets/stock_images/happy_woman_fitness__b45a29e9.jpg";

export function Testimonial() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <Quote className="absolute -top-4 -left-2 w-12 h-12 md:w-16 md:h-16 text-primary/20" />
          
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed text-center pt-8">
            "After two kids, I never thought I'd feel this strong again. Rachel Stone helped me rebuild my body and confidence."
          </blockquote>

          <div className="flex flex-col items-center mt-8">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 mb-4">
              <AvatarImage src={clientImage} alt="Sara Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="text-center">
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
