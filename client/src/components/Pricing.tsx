import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star } from "lucide-react";

const features = [
  {
    name: "The Goal",
    blueprint: "DIY access to the system.",
    pro: "A guaranteed result.",
    blueprintIncluded: "text",
    proIncluded: "text",
  },
  {
    name: "Investment",
    blueprint: "$99 / month",
    pro: "$499 / month",
    blueprintIncluded: "text",
    proIncluded: "text",
  },
  {
    name: "Commitment",
    blueprint: "Month-to-month",
    pro: "6-Month Partnership",
    blueprintIncluded: "text",
    proIncluded: "text",
  },
  {
    name: "The Methodology",
    blueprint: "Habit Layering Curriculum",
    pro: "Habit Layering Curriculum",
    blueprintIncluded: true,
    proIncluded: true,
  },
  {
    name: "The Training",
    blueprint: "Custom Workout Protocol",
    pro: "Custom Workout Protocol",
    blueprintIncluded: true,
    proIncluded: true,
  },
  {
    name: "The Tech",
    blueprint: "Progress Tracking App",
    pro: "Progress Tracking App",
    blueprintIncluded: true,
    proIncluded: true,
  },
  {
    name: "Onboarding",
    blueprint: "Digital Setup Only",
    pro: "60-Min Strategy Kickoff",
    blueprintIncluded: false,
    proIncluded: true,
  },
  {
    name: "Data Analysis",
    blueprint: "None",
    pro: "Fortnightly Video Audits",
    blueprintIncluded: false,
    proIncluded: true,
  },
  {
    name: "Adjustments",
    blueprint: "Self-Adjusted",
    pro: "Expert Plan Refinement",
    blueprintIncluded: false,
    proIncluded: true,
  },
  {
    name: "Support",
    blueprint: "No Coach Access",
    pro: "Priority Private Messaging",
    blueprintIncluded: false,
    proIncluded: true,
  },
  {
    name: "The Guarantee",
    blueprint: "No Guarantee",
    pro: "THE FOREVER GUARANTEE",
    blueprintIncluded: false,
    proIncluded: "star",
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
    if (included === "text") return null;
    if (included === "star") {
      return <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />;
    }
    if (included) {
      return <Check className="w-4 h-4 text-green-500" />;
    }
    return <X className="w-4 h-4 text-red-500" />;
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
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

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-pricing">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">
                    The Self-Led Blueprint
                  </th>
                  <th className="text-left p-4 relative">
                    <Badge className="absolute -top-0 left-4 text-xs">
                      Recommended
                    </Badge>
                    <span className="text-sm font-semibold text-primary">
                      The Collaborative Pro
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border last:border-b-0 ${
                      feature.name === "The Guarantee" ? "bg-primary/5" : ""
                    }`}
                    data-testid={`row-feature-${index}`}
                  >
                    <td className="p-4 text-sm font-medium text-foreground">
                      {feature.name}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {renderIcon(feature.blueprintIncluded)}
                        <span className={`text-sm ${
                          feature.blueprintIncluded === false 
                            ? "text-muted-foreground" 
                            : "text-foreground"
                        }`}>
                          {feature.blueprint}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {renderIcon(feature.proIncluded)}
                        <span className={`text-sm ${
                          feature.proIncluded === "star" 
                            ? "text-yellow-500 font-semibold" 
                            : "text-foreground"
                        }`}>
                          {feature.pro}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 border-t border-border">
            <div className="p-4"></div>
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={scrollToContact}
                data-testid="button-blueprint-cta"
              >
                Get the App
              </Button>
            </div>
            <div className="p-4">
              <Button
                className="w-full"
                onClick={scrollToContact}
                data-testid="button-pro-cta"
              >
                Apply for Pro Coaching
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
