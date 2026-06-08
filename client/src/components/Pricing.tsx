import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";

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
                 We are actively recruiting 10 founding members for our Case Study. If you are accepted, you get priority access and a tailored 90-day roadmap. In return, you agree to document your progress and share your before and after metrics as a public case study.
               </p>
               <Link href="/initialize">
                 <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-mono uppercase tracking-widest rounded-none">
                   Apply for Coaching
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

        {/* Single centered card */}
        <div className="max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <Card
              className="flex flex-col h-full bg-[#0A0A0A] rounded-none border-t-4 border-orange-500 transition-all duration-500 shadow-[0_0_30px_rgba(255,149,0,0.1)]"
              data-testid="card-tier-coaching"
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
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase italic text-orange-500">
                      Tony Nguyen Fit Coaching
                    </h3>
                    <p className="text-[10px] font-mono tracking-widest uppercase font-bold text-orange-500">
                      FOUNDATION & SUSTAINABILITY SYSTEM
                    </p>
                  </div>

                  {/* User Profile callout */}
                  <div className="p-4 bg-orange-500/10 border-l-2 border-orange-500">
                    <p className="text-[11px] font-mono leading-relaxed text-white text-left">
                      <span className="text-zinc-500 mr-2 uppercase tracking-tighter font-bold">Best for:</span>
                      Busy dads who want a customized nutrition and training plan that actually works with work, travel, and kids.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col px-8 pb-10 relative z-10">
                {/* Features list */}
                <div className="flex-1 pt-4 pb-8">
                  <div className="space-y-4">
                    {[
                      "90-Day Customized Nutrition & Workout Plan",
                      "Tailored to your goals, body composition, and equipment",
                      "Bi-Weekly Asynchronous Video Reviews (Loom)",
                      "Ongoing Nutrition Strategy Adjustments",
                      "Automated Data Tracking & Community Access",
                      "Direct Messaging Access to Coach",
                    ].map((d, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1 font-mono text-xs text-orange-500">
                          &gt;
                        </span>
                        <p className="text-xs md:text-sm font-mono tracking-wide text-zinc-300">
                          {d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="pt-8 border-t border-slate-800 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white" data-testid="price-coaching">
                        $300<span className="text-xl md:text-2xl text-zinc-400 ml-1">USD</span>
                      </span>
                      <span className="text-zinc-500 font-mono text-xs">/ Month</span>
                    </div>
                    <p className="text-zinc-400 font-sans text-xs italic">
                      (Requires a 90-day initial commitment to build your foundation. Month-to-month afterward.)
                    </p>
                  </div>

                  {/* Final CTA */}
                  <div>
                    <Link href="/initialize">
                      <Button
                        className="w-full h-16 font-mono font-bold tracking-[0.2em] uppercase text-sm rounded-none transition-all duration-300 bg-orange-500 text-black hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        data-testid="cta-coaching"
                      >
                        Apply for Coaching
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
            Stop guessing. Start executing.
          </p>
          <Link href="/initialize">
            <Button
              size="lg"
              className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white border-none min-w-[300px] min-h-[64px] text-lg rounded-full font-bold font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(255,149,0,0.3)]"
            >
              Apply for Coaching
            </Button>
          </Link>
        </motion.div>

      </motion.div >
    </section >
  );
}
