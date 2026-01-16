import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import transformImage from "@assets/stock_images/woman_fitness_transf_e54a1f2d.jpg";

const steps = [
  {
    number: "01",
    title: "Discovery call",
    description: "We'll explore your goals, challenges, and lifestyle to create the right approach.",
  },
  {
    number: "02",
    title: "Personalized Plan",
    description: "Training and nutrition tailored to your lifestyle — realistic, flexible, and sustainable.",
  },
  {
    number: "03",
    title: "Weekly Coaching",
    description: "We'll explore your goals, challenges, and lifestyle to create the right approach.",
  },
  {
    number: "04",
    title: "Lifestyle Integration",
    description: "We adapt your plan as your schedule, cycle, and needs shift",
  },
  {
    number: "05",
    title: "Long-Term Balance",
    description: "Progress doesn't end here — we'll refine, celebrate, and keep building together",
  },
];

export function HowItWorks() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your path to lasting results
            </h2>
            <p className="text-muted-foreground mb-6">
              Every transformation starts with structure. Here's how we turn goals into real progress — one step at a time.
            </p>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="w-fit gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              data-testid="button-how-it-works-cta"
            >
              Book Your Free Call
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="mt-8">
              <img
                src={transformImage}
                alt="Fitness transformation journey"
                className="w-full rounded-lg object-cover aspect-[3/4] max-w-md"
              />
            </div>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} data-testid={`step-${index}`}>
                <p className="text-sm text-primary font-medium mb-1">
                  {step.number}
                </p>
                <h3 className="font-bold text-xl md:text-2xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
