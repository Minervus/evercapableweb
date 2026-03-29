import { Zap, Dumbbell, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const phases = [
  {
    icon: Zap,
    title: "Phase 1: The Reset",
    timeframe: "Weeks 1–4",
    outcome: "Drop your first 5–10 lbs of stubborn fat and water weight.",
    benefit: "Double your morning energy, sleep better, and completely eliminate the 3 PM afternoon crash.",
  },
  {
    icon: Dumbbell,
    title: "Phase 2: The Build",
    timeframe: "Weeks 5–12",
    outcome: "Start to add lean, visible muscle.",
    benefit: "Notice your shirts fitting better. Your nagging joint pain fades away as your real strength returns.",
  },
  {
    icon: ShieldCheck,
    title: "Phase 3: The Autopilot",
    timeframe: "Weeks 13–24",
    outcome: "Lock in your new body so you never rebound.",
    benefit: "Effortlessly maintain your results and habits, even while traveling for work or taking clients out to dinner.",
  },
];

export function Method() {
  return (
    <section id="evercapable-method" className="py-16 md:py-24 bg-background scroll-mt-20 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Positioning / Solution Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="mb-4 text-sm md:text-base font-medium text-orange-500 font-mono uppercase tracking-wider">
            // THE_SMARTER_WAY
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-foreground mb-8 tracking-tight">
            The Smarter Way To Build Muscle & Burn Fat
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed">
            <p>
              Traditional fitness fails men in their 30s and 40s because it thrives on extremes. It expects you to eat out of Tupperware, train 6 days a week, and have zero stress. <strong className="text-white">That is a recipe for failure.</strong>
            </p>
            <p>
              We built a totally different approach. We focus on building a resilient body that burns fat automatically, handles stress like a machine, and only takes 3–4 focused days a week.
            </p>
            <p className="text-orange-500 font-medium pt-4">
              No fluff. No wasted time in the gym. Just measurable daily progress.
            </p>
          </div>
        </motion.div>

        {/* The 3-Phase Transformation System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The 3-Phase Transformation System
          </h2>
          <p className="text-zinc-500 text-base md:text-lg">
            Here is exactly how we rebuild your body in 24 weeks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        [ OUTCOME ]
                      </p>
                      <p className="text-zinc-300 leading-relaxed font-semibold">
                        {phase.outcome}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-1">
                        [ BENEFIT ]
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
