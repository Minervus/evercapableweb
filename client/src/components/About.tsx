import { Flame, Zap, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import rachelImage from "@assets/stock_images/professional_woman_p_ddd82c22.jpg";

const philosophyPoints = [
  {
    title: "Strength Over Comparison",
    icon: Flame,
  },
  {
    title: "Balance Over Extremes",
    icon: Zap,
  },
  {
    title: "Habits Over Quick Fixes",
    icon: Crown,
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <img
              src={rachelImage}
              alt="Tony Nguyen, personal trainer"
              className="w-full rounded-lg object-cover aspect-[3/4]"
            />
          </div>

          <div className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-2">
              Meet your coach
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hi, I'm Rachel Stone
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                For years, I thought strength meant doing more — training harder, eating cleaner, sleeping less. I pushed through exhaustion, believing discipline would bring freedom. It didn't.
              </p>
              <p>
                When burnout finally forced me to slow down, I started listening. I studied how movement, hormones, rest, and mindset work together — and rebuilt my strength through awareness, not pressure.
              </p>
              <p>
                Now I help women do the same: feel capable and confident again without sacrificing themselves to get there. My approach blends science and empathy — habit-based, psychology-first, and built for lasting balance.
              </p>
            </div>

            <p
              className="mt-8 text-2xl text-foreground italic"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Rachel Stone
            </p>

            <div className="mt-auto pt-10">
              <p className="text-lg font-semibold text-foreground mb-4">
                My Philosophy
              </p>
              <div className="grid grid-cols-3 gap-3">
                {philosophyPoints.map((point, index) => (
                  <Card key={index} className="bg-secondary border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <point.icon className="w-6 h-6 text-foreground mb-3" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-foreground leading-tight">{point.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
