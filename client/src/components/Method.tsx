import { Zap, Dumbbell, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const phases = [
  {
    icon: Zap,
    title: "See what's actually going on",
    timeframe: "Week 1",
    outcome: "We look at how you eat now — not a perfect week, a real one — and sketch a 4–6 week food roadmap you can actually follow.",
    benefit: "You leave with a clear next step instead of another pile of rules.",
  },
  {
    icon: Dumbbell,
    title: "Fortnightly deep-dive video",
    timeframe: "Fortnightly",
    outcome: "Every fortnight I record a deep-dive video on your data and feedback. The video adjusts your plan and walks you through it. You can message me in Coach Catalyst between videos.",
    benefit: "You hear what changed in your plan, and why, while the fortnight is still fresh.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the change",
    timeframe: "Ongoing",
    outcome: "The way you eat holds up through travel and late dinners, so the weight change stays.",
    benefit: "I recommend training for longevity, mobility, and function, but it's optional and it isn't where we start. Food does the heavy lifting.",
  },
];

export function Method() {
  return (
    <section id="evercapable-method" className="py-14 md:py-20 bg-background scroll-mt-20 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Positioning / Solution Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="mb-4 text-sm md:text-base font-medium text-orange-500 font-mono uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Nutrition First
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-base md:text-lg text-zinc-400 leading-relaxed">
            <p>
              Most coaching leads with workouts and treats food as a PDF on the side. That falls apart the first week you're tired, travelling, or just cooking for other people.
            </p>
            <p>
              I start with nutrition and a food strategy that fits your life. On 1:1 coaching, every fortnight I record a deep-dive video on your data and feedback. That video adjusts your plan and walks you through it. Messaging between videos is included, and the coaching runs in Coach Catalyst.
            </p>
            <p className="text-orange-500 font-medium pt-4">
              Practical adjustments you can keep on a full week.
            </p>
          </div>
        </motion.div>

        {/* The 3-Phase Transformation System */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A simple fortnightly rhythm
          </h2>
          <p className="text-zinc-500 text-base md:text-lg">
            Here is how 1:1 coaching works, online and fortnight by fortnight.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.3, delay: Math.min(index, 3) * 0.05 }}
            >
              <Card
                className="bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/5 hover:border-orange-500/30 transition-all duration-300 h-full relative overflow-hidden group"
                data-testid={`card-phase-${index}`}
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />

                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                      <phase.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="font-mono text-sm text-zinc-500 font-bold bg-white/5 px-3 py-1 rounded-full">
                      {phase.timeframe}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6">
                    {phase.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-orange-500 font-mono tracking-widest uppercase mb-1">
                        What happens
                      </p>
                      <p className="text-zinc-300 leading-relaxed font-semibold">
                        {phase.outcome}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-1">
                        How it feels
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {phase.benefit}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
