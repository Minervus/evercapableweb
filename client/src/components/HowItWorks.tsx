import { Button } from "@/components/ui/button";
import transformImage from "@assets/stock_images/woman_fitness_transf_e54a1f2d.jpg";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
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
    description: "Regular check-ins to adjust, motivate, and keep you accountable.",
  },
  {
    number: "04",
    title: "Lifestyle Integration",
    description: "We adapt your plan as your schedule, cycle, and needs shift.",
  },
  {
    number: "05",
    title: "Long-Term Balance",
    description: "Progress doesn't end here — we'll refine, celebrate, and keep building together.",
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
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your path to lasting results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Every transformation starts with structure. Here's how we turn goals into real progress — one step at a time.
          </p>
          <Button
            onClick={scrollToContact}
            data-testid="button-how-it-works-cta"
          >
            Book Your Free Call
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mt-12">
          <div className="relative hidden md:block">
            <img
              src={transformImage}
              alt="Fitness transformation journey"
              className="w-full rounded-lg object-cover aspect-[3/4]"
            />
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-16" data-testid={`step-${index}`}>
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-full bg-border -translate-x-1/2" />
                )}
                <div className="pb-6">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
