import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const programs = [
  {
    name: "The Self-Led Blueprint",
    price: 99,
    description: "Self-guided, no coach access",
    features: [
      "Custom Habit Roadmap",
      "Tailored Workout Protocol",
      "Everfit App Access",
    ],
    popular: false,
    note: "Self-guided, no coach access",
  },
  {
    name: "The Collaborative Pro",
    price: 500,
    description: "Full coaching experience with The Forever Guarantee",
    features: [
      "Everything in Blueprint",
      "60-min Strategy Kickoff",
      "Fortnightly Video Audits",
      "Priority Messaging",
      "The Forever Guarantee",
    ],
    popular: true,
    note: null,
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-2">
            Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Signature Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the level of support that fits your goals and lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                  Recommended
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
                {program.note && (
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    {program.note}
                  </p>
                )}
                <Button
                  className="mt-6 w-full"
                  variant={program.popular ? "default" : "outline"}
                  onClick={scrollToContact}
                  data-testid={`button-program-${index}`}
                >
                  {program.popular ? "Apply Now" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
