import { BarChart3, Layers, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const methodCards = [
  {
    icon: BarChart3,
    title: "Objective Data",
    description: "We don't guess. We analyze your metabolism, bio-feedback, and trends to build a map that actually works.",
  },
  {
    icon: Layers,
    title: "Habit Layering",
    description: "We bridge the gap between knowing and doing by layering 1-2 sustainable skills into your life at a time.",
  },
  {
    icon: Brain,
    title: "Performance Mindset",
    description: "Nutrition that supports your career, your training, and your life—not the other way around.",
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
            // THE METHOD
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The EverCapable Method
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to building lasting results through science, habits, and mindset.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {methodCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-muted/50 dark:bg-zinc-800/80 border-0 h-full"
                data-testid={`card-method-${index}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <card.icon className="w-6 h-6 text-primary" />
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
