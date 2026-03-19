import { Activity, LayoutList, Utensils, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const methodCards = [
  {
    icon: LayoutList,
    title: "Habits That Stick",
    description: "No more yo-yo plans—habits that stick around kids, deadlines, and weekends.",
  },
  {
    icon: Activity,
    title: "Track What Matters",
    description: "Track what matters: strength gains, joint health, not just scale weight.",
  },
  {
    icon: Utensils,
    title: "Real-Life Nutrition",
    description: "Real-life nutrition: work travel, nights out, busy schedules.",
  },
  {
    icon: ShieldCheck,
    title: "Built For Longevity",
    description: "Built for longevity: injury-proof training + recovery focus.",
  },
];

export function Method() {
  return (
    <section id="method" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="mb-2 text-sm md:text-base font-medium text-orange-500 font-mono uppercase tracking-wider">
            // SYSTEM_ARCHITECTURE
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The 4 Pillars of Physical Autonomy
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The problem isn't you—it's the plan. Your 30s/40s need sustainable systems, not 30-day punishments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-muted/50 dark:bg-zinc-800/80 border-0 h-full hover:bg-zinc-800 transition-colors"
                data-testid={`card-method-${index}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-lg bg-[#FF9500]/10 flex items-center justify-center mb-6">
                    <card.icon className="w-6 h-6 text-[#FF9500]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
