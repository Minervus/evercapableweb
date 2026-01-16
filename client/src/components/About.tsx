import rachelImage from "@assets/stock_images/professional_woman_p_ddd82c22.jpg";

const philosophyPoints = [
  {
    title: "Strength Over Comparison",
    description: "Focus on your own journey, not others'",
  },
  {
    title: "Balance Over Extremes",
    description: "Sustainable progress through moderation",
  },
  {
    title: "Habits Over Quick Fixes",
    description: "Build lasting change through daily practice",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Meet your coach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hi, I'm Rachel Stone
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
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

            <p className="mt-6 font-semibold text-foreground">Rachel Stone</p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                My Philosophy
              </p>
              <div className="space-y-4">
                {philosophyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{point.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={rachelImage}
                alt="Rachel Stone, personal trainer"
                className="w-full rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
