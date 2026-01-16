import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const programs = [
  {
    name: "12-Week Transformation",
    price: 249,
    description: "Step-by-step coaching to rebuild strength, improve energy, and see real, lasting results.",
    features: [
      "Personalized workouts",
      "Weekly progress tracking",
      "Nutrition fundamentals",
      "Chat & email support",
    ],
    popular: false,
  },
  {
    name: "Postnatal Reboot",
    price: 329,
    description: "Gentle, structured recovery for new mothers to help them get confidence and balance again.",
    features: [
      "Tailored postpartum training plan",
      "Nutrition & recovery coaching",
      "Weekly 1-on-1 check-ins",
      "Ongoing support between sessions",
    ],
    popular: true,
  },
  {
    name: "Tone with Hormone Balance",
    price: 449,
    description: "Workouts + nutrition designed around your cycle, energy, and hormonal needs.",
    features: [
      "Custom periodized training cycles",
      "Ready-made cooked meals",
      "Bi-weekly performance reviews",
      "Priority messaging access",
    ],
    popular: false,
  },
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            For you
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Signature Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the program that fits your goals, lifestyle, and pace. Every plan includes personalized workouts, nutrition guidance, and weekly support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                program.popular ? "border-primary border-2" : ""
              }`}
              data-testid={`card-pricing-${index}`}
            >
              {program.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold text-foreground" data-testid={`text-program-name-${index}`}>
                  {program.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-foreground" data-testid={`text-program-price-${index}`}>
                    ${program.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {program.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm font-semibold text-foreground mb-4">
                  What's included
                </p>
                <ul className="space-y-3 flex-1">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={program.popular ? "default" : "outline"}
                  onClick={scrollToContact}
                  data-testid={`button-program-${index}`}
                >
                  Join the Program
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
