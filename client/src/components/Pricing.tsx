import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";

interface Tier {
  id: string;
  header: string;
  subtitle: string;
  featured: boolean;
  persona: string;
  price: string;
  ctaText: string;
  href: string;
  differentiators: string[];
}

const TIERS: Tier[] = [
  {
    id: "blueprint",
    header: "The Blueprint",
    subtitle: "The Plan",
    featured: false,
    persona: "Self-starters who want the Map (The Plan) to execute independently.",
    price: "$349",
    ctaText: "Get Started",
    href: "/initialize?tier=1",
    differentiators: [
      "90-Day Customized Nutrition & Workout Plan",
      "Tailored to your goals, body composition, and equipment",
      "Automated Data Tracking & Community Access",
    ],
  },
  {
    id: "signature",
    header: "Signature Experience",
    subtitle: "Most Popular",
    featured: true,
    persona: "Dads who want the Map AND the Guide (Bi-Weekly Loom Reviews).",
    price: "$899",
    ctaText: "Apply for Coaching",
    href: "/initialize?tier=2",
    differentiators: [
      "Everything in The Blueprint",
      "Bi-Weekly Asynchronous Video Reviews (Loom)",
      "Ongoing Nutrition Strategy Adjustments",
      "Guaranteed Testimonial Interview",
    ],
  },
  {
    id: "elite",
    header: "Elite Mastery",
    subtitle: "Full Access",
    featured: false,
    persona: "High-stakes leaders needing intensive 1-on-1 coaching.",
    price: "$1,900",
    ctaText: "Apply for Coaching",
    href: "/initialize?tier=3",
    differentiators: [
      "Everything in Signature Experience",
      "Weekly 1:1 Check-Ins",
      "Biomarker / VO2 Max Analysis",
      "Monthly Strategy Calls",
    ],
  },
];

const resultMarkers = [
  {
    title: "Weight Mastery",
    description: "Total control over your weight without the guesswork.",
  },
  {
    title: "Peak Strength",
    description: "Feeling stronger than you ever have before.",
  },
  {
    title: "Endless Energy",
    description: "More daily energy to tackle your career and your passions.",
  },
  {
    title: "Family Vitality",
    description: "The stamina and strength to play with your kids without getting winded.",
  },
  {
    title: "Complete Autonomy",
    description: "The knowledge and tools to take the reigns on your health, nutrition, and longevity for the long haul.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">

      <motion.div
        id="protocol-tiers"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="mb-10 text-center">
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Choose Your Coaching Plan
          </p>
        </div>

        {/* Case Study Callout - Moved above pricing table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto border border-dashed border-orange-500/50 bg-orange-500/5 p-8 md:p-10 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <span className="font-mono text-[80px] text-orange-500 font-bold select-none leading-none">10</span>
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
               <h4 className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm md:text-base mb-3">
                 Limited Founding Member Spots
               </h4>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Looking for 10 Transformations</h3>
               <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
                 We are actively recruiting 10 founding members for our Case Study (Signature & Elite tiers). If you are accepted, you get priority access and a tailored 90-day roadmap. In return, you agree to document your progress and share your before and after metrics as a public case study.
               </p>
               <Link href="/initialize?tier=2">
                 <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-mono uppercase tracking-widest rounded-none">
                   Apply for Case Study
                 </Button>
               </Link>
             </div>
           </div>
        </motion.div>

        {/* The 12-Week Result */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="border-l-2 border-orange-500/30 pl-6 py-2 mb-8">
            <h4 className="text-[12px] font-mono text-orange-500 tracking-widest uppercase mb-2">
              What You Will Achieve
            </h4>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">You will have:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {resultMarkers.map((marker, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-white text-base md:text-lg mb-1">
                    {marker.title}
                  </h5>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {marker.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Three-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          {TIERS.map((tier, tierIdx) => {
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + tierIdx * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`flex flex-col h-full bg-[#0A0A0A] rounded-none border-t-4 transition-all duration-500
                    ${tier.featured
                      ? "border-orange-500"
                      : "border-slate-400"
                    } shadow-none`}
                  data-testid={`card-tier-${tier.id}`}
                >
                  <CardHeader className="pt-10 pb-8 px-8 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Grid bg */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{
                      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }} />

                    <div className="relative z-10 w-full space-y-6">
                      {/* Tier name & status */}
                      <div className="space-y-1">
                        <h3 className={`text-xl md:text-2xl font-bold tracking-tighter uppercase italic ${tier.featured ? "text-orange-500" : "text-white"}`}>
                          {tier.header}
                        </h3>
                        <p className={`text-[10px] font-mono tracking-widest uppercase font-bold ${tier.featured ? "text-orange-500" : "text-slate-400"}`}>
                          {tier.subtitle}
                        </p>
                      </div>

                      {/* User Profile callout */}
                      <div className={`p-4 ${tier.featured ? "bg-orange-500/10 border-l-2 border-orange-500" : "bg-white/5 border-l-2 border-slate-400"}`}>
                        <p className="text-[11px] font-mono leading-relaxed text-white text-left">
                          <span className="text-zinc-500 mr-2 uppercase tracking-tighter font-bold">Best for:</span>
                          {tier.persona}
                        </p>
                      </div>

                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col px-8 pb-10 relative z-10">
                    {/* Features list */}
                    <div className="flex-1 pt-4 pb-8">
                      <div className="space-y-4">
                        {tier.differentiators.map((d, i) => {
                          const isPriority = d.includes("[ PRIORITY ]");
                          return (
                            <div key={i} className="flex items-start gap-3">
                              <span className={`mt-1 font-mono text-xs ${tier.featured ? "text-orange-500" : "text-slate-400"}`}>
                                &gt;
                              </span>
                              <p className={`text-xs md:text-sm font-mono tracking-wide ${isPriority ? "text-white font-bold" : "text-zinc-300"}`}>
                                {d}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-8 border-t border-slate-800 space-y-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white`} data-testid={`price-${tier.id}`}>
                          {tier.price}<span className="text-xl md:text-2xl text-zinc-400 ml-1">USD</span>
                        </span>
                        <span className="text-zinc-500 font-mono text-xs">/ 90 days</span>
                      </div>

                      {/* Final CTA — dynamic URL */}
                      <div>
                        <Link href={tier.href}>
                          <Button
                            className={`w-full h-16 font-mono font-bold tracking-[0.2em] uppercase text-sm rounded-none transition-all duration-300
                            ${tier.featured
                                ? "bg-orange-500 text-black hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                : "bg-transparent border-2 border-slate-600 text-white hover:bg-white/5"
                              }`}
                            data-testid={`cta-${tier.id}`}
                          >
                            {tier.ctaText}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* ── Weaponized Guarantee ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="max-w-4xl mx-auto border-2 border-slate-800 bg-slate-900/30 p-6 md:p-8"
        >
          <div className="space-y-3">
            <h4 className="text-white font-bold text-lg md:text-xl">
              Our Guarantee
            </h4>
            <p className="text-zinc-400 font-sans leading-relaxed text-sm md:text-base">
              Follow the plan with 90% consistency. If you don't hit your goals in 90 days, I coach you for free until you do. <span className="text-white font-bold">You risk the effort. I risk my time.</span>
            </p>
          </div>
        </motion.div>

        {/* ── Ready to Get Your Edge Back? ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-32 text-center pb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to Get Your Edge Back?
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Stop guessing. Start executing. Find out exactly what is holding your body back right now.
          </p>
          <Button
            onClick={() => {
              const el = document.querySelector("#system-integrity-test");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            size="lg"
            className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white border-none min-w-[300px] min-h-[64px] text-lg rounded-full font-bold font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(255,149,0,0.3)]"
          >
            Take the 2-Minute Fitness Audit
          </Button>
        </motion.div>

      </motion.div >
    </section >
  );
}
