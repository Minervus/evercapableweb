import { Button } from "@/components/ui/button";
import { MapPin, Laptop, Apple, Users } from "lucide-react";
import rachelImage from "@assets/stock_images/professional_woman_p_12e5ba1c.jpg";

const services = [
  {
    icon: MapPin,
    title: "In-Person Training",
    location: "NYC",
    description: "Train face-to-face with personalized coaching and real-time feedback.",
  },
  {
    icon: Laptop,
    title: "Online Coaching",
    description: "Flexible sessions from anywhere — your program, your schedule.",
  },
  {
    icon: Apple,
    title: "Nutrition Plans",
    description: "Tailored guidance to support your training and daily routine.",
  },
  {
    icon: Users,
    title: "Business or Group Training",
    description: "Designed for teams or partners who want shared motivation and accountability.",
  },
];

export function Services() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose the support that fits your life
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Flexible options to fit every budget and lifestyle. All packages include nutrition guidance and ongoing weekly support.
          </p>
          <Button
            onClick={scrollToContact}
            data-testid="button-services-cta"
          >
            Get Started with Rachel
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 dark:bg-zinc-800/80"
                data-testid={`card-service-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {service.location && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {service.location}
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative hidden md:block">
            <img
              src={rachelImage}
              alt="Rachel Stone fitness coach"
              className="w-full rounded-xl object-cover aspect-[3/4]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
