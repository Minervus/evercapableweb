import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Target, TrendingUp, Trophy, Video, Users, BarChart3, Sparkles } from "lucide-react";

const blueprintSteps = [
  {
    step: "01",
    title: "Instant Access",
    description: "Download the app and unlock the full Habit Layering curriculum immediately.",
    icon: Download,
  },
  {
    step: "02",
    title: "Set Your Targets",
    description: "Define your 30-day challenge goals using our guided assessment.",
    icon: Target,
  },
  {
    step: "03",
    title: "Layer Your Habits",
    description: "Follow the daily protocols and track your progress in-app.",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Build Momentum",
    description: "Stack wins, adjust as needed, and transform at your own pace.",
    icon: Trophy,
  },
];

const proSteps = [
  {
    step: "01",
    title: "Strategy Kickoff",
    description: "60-minute deep dive to map your goals, lifestyle, and custom plan.",
    icon: Video,
  },
  {
    step: "02",
    title: "Personalized Protocol",
    description: "Receive your tailored habit stack and nutrition blueprint within 48 hours.",
    icon: Users,
  },
  {
    step: "03",
    title: "Fortnightly Audits",
    description: "Video check-ins where we analyze your data and refine your approach.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Guaranteed Results",
    description: "Hit your 6-month milestone—or I coach you free until you do.",
    icon: Sparkles,
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-2">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Path Forward
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two programs. Two journeys. One destination: a body you can keep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <Card className="rounded-3xl" data-testid="card-process-blueprint">
            <CardHeader className="pb-6">
              <h3 className="text-xl font-bold text-foreground">
                The Blueprint Path
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Self-paced transformation
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {blueprintSteps.map((item) => (
                <div key={item.step} className="flex gap-4" data-testid={`step-blueprint-${item.step}`}>
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
                </div>
              ))}
            </CardContent>
          </Card>

          <Card 
            className="rounded-3xl border-primary/30 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]" 
            data-testid="card-process-pro"
          >
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  The Collaborative Pro Journey
                </h3>
                <Badge variant="secondary" className="text-xs">
                  High-Touch
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Expert-guided transformation
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {proSteps.map((item) => (
                <div key={item.step} className="flex gap-4" data-testid={`step-pro-${item.step}`}>
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
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
