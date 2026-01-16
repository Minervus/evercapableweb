import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Guarantee() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="text-guarantee-heading">
                  The Forever Guarantee
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-guarantee-body">
                  If you follow your habit protocols with 90% consistency and don't reach your 6-month milestone—I will coach you for free until you do. I'm putting my time on the line because the system works.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
