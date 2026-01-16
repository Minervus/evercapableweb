import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star } from "lucide-react";

const programs = [
  {
    name: "The Self-Led Blueprint",
    price: 99,
    goal: "DIY access to the system.",
    commitment: "Month-to-month",
    features: [
      { name: "Habit Layering Curriculum", included: true },
      { name: "Custom Workout Protocol", included: true },
      { name: "Progress Tracking App", included: true },
      { name: "Digital Setup Only", included: false },
      { name: "No Data Analysis", included: false },
      { name: "Self-Adjusted", included: false },
      { name: "No Coach Access", included: false },
      { name: "No Guarantee", included: false },
    ],
    popular: false,
    cta: "Get the App",
  },
  {
    name: "The Collaborative Pro",
    price: 499,
    goal: "A guaranteed result.",
    commitment: "6-Month Partnership",
    features: [
      { name: "Habit Layering Curriculum", included: true },
      { name: "Custom Workout Protocol", included: true },
      { name: "Progress Tracking App", included: true },
      { name: "60-Min Strategy Kickoff", included: true },
      { name: "Fortnightly Video Audits", included: true },
      { name: "Expert Plan Refinement", included: true },
      { name: "Priority Private Messaging", included: true },
      { name: "THE FOREVER GUARANTEE", included: "star" },
    ],
    popular: true,
    cta: "Apply for Pro Coaching",
  },
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderIcon = (included: boolean | string) => {
    if (included === "star") {
      return <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />;
    }
    if (included) {
      return <Check className="w-5 h-5 text-green-500 flex-shrink-0" />;
    }
    return <X className="w-5 h-5 text-red-500 flex-shrink-0" />;
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
                <p className="text-sm text-primary font-medium mt-3">
                  {program.goal}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {program.commitment}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm font-semibold text-foreground mb-4">
                  What's included
                </p>
                <ul className="space-y-3 flex-1">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {renderIcon(feature.included)}
                      <span className={`text-sm ${
                        feature.included === "star" 
                          ? "text-yellow-500 font-semibold" 
                          : feature.included 
                            ? "text-foreground" 
                            : "text-muted-foreground"
                      }`}>
                        {feature.name}
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
                  {program.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
