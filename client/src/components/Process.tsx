import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Target, TrendingUp, Trophy, Video, Users, BarChart3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const blueprintSteps = [
  {
    step: "01",
    title: "The Intake",
    description: "Complete your comprehensive metabolic and lifestyle audit.",
    icon: Download,
  },
  {
    step: "02",
    title: "The Build",
    description: "Receive your custom habit roadmap and workout protocol within 48 hours.",
    icon: Target,
  },
  {
    step: "03",
    title: "The Execution",
    description: "Track your wins in the Everfit app with zero guesswork.",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "The Evolution",
    description: "Adjust your plan monthly as your body and strength evolve.",
    icon: Trophy,
  },
];

const proSteps = [
  {
    step: "01",
    title: "The Strategy Kickoff",
    description: "A 60-minute deep dive to analyze your data and set your 6-month milestones.",
    icon: Video,
  },
  {
    step: "02",
    title: "The Habit Layering",
    description: "We implement 1-2 non-negotiable skills every two weeks to bridge the gap between \"knowing\" and \"doing.\"",
    icon: Users,
  },
  {
    step: "03",
    title: "The Audit",
    description: "Fortnightly video reviews of your data, bio-feedback, and form to ensure you never plateau.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "The Forever Guarantee",
    description: "We stay in the trenches with you until your new body is a permanent part of your identity.",
    icon: Sparkles,
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-2">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Path Forward
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two programs. Two journeys. One destination: a body you can keep.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-3xl h-full" data-testid="card-process-blueprint">
            <CardHeader className="pb-6">
              <h3 className="text-xl font-bold text-foreground">
                The Self-Led Blueprint
              </h3>
              <p className="text-sm text-primary font-medium mt-1">
                Focus: Speed and Clarity
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {blueprintSteps.map((item, index) => (
                <motion.div 
                  key={item.step} 
                  className="flex gap-4" 
                  data-testid={`step-blueprint-${item.step}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        Step {item.step}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card 
              className="rounded-3xl h-full border-primary/30 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]" 
              data-testid="card-process-pro"
            >
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  The Collaborative Pro
                </h3>
                <Badge variant="secondary" className="text-xs">
                  High-Touch
                </Badge>
              </div>
              <p className="text-sm text-primary font-medium mt-1">
                Focus: High-Touch and Strategy
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {proSteps.map((item, index) => (
                <motion.div 
                  key={item.step} 
                  className="flex gap-4" 
                  data-testid={`step-pro-${item.step}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        Step {item.step}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
