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
                 <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-mono uppercase tracking-widest px-6 py-2.5 text-sm transition-colors duration-200">
                   Apply for Coaching
                 </button>
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

        {/* ── Pricing cards ── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">

          {/* ── Audit card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden shadow-xl shadow-black/30"
          >
            {/* Header band */}
            <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-7 py-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1">
                  One-time investment
                </p>
                <h3 className="text-white font-bold text-lg leading-snug">
                  Millennial Vitality Audit &amp; Roadmap
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-3xl font-bold text-white tracking-tight">$149</span>
                <p className="text-zinc-500 text-[10px] mt-0.5">one session</p>
              </div>
            </div>

            {/* Features */}
            <div className="px-7 py-7 flex flex-col flex-1">
              <ul className="space-y-3 mb-7 flex-1">
                {[
                  "60-minute deep-dive consultation",
                  "Personalized 90-day execution roadmap",
                  "Data-backed bottleneck analysis",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-zinc-200 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-orange-400" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Incentive */}
              <div className="rounded-md bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 mb-7">
                <p className="text-zinc-400 text-xs leading-[1.75]">
                  <span className="text-zinc-200 font-semibold">Credit guarantee — </span>
                  If you join 1-on-1 coaching within 48 hours, the $149 is applied as a credit toward your first month.
                </p>
              </div>

              <Link href="/initialize?plan=audit">
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-white font-bold tracking-widest text-xs uppercase rounded-sm transition-all duration-200 shadow-lg shadow-orange-500/20">
                  Apply for Your Audit
                </button>
              </Link>
              <p className="mt-3 text-zinc-600 text-[10px] text-center leading-relaxed">
                Applications are reviewed personally to ensure this is the right fit.
              </p>
            </div>
          </motion.div>

          {/* ── 1:1 Coaching card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden shadow-xl shadow-black/30"
          >
            {/* Header band */}
            <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-7 py-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1">
                  Ongoing coaching
                </p>
                <h3 className="text-white font-bold text-lg leading-snug">
                  1:1 Coaching
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-3xl font-bold text-white tracking-tight">$300</span>
                <p className="text-zinc-500 text-[10px] mt-0.5">/ month</p>
              </div>
            </div>

            {/* Features */}
            <div className="px-7 py-7 flex flex-col flex-1">
              <ul className="space-y-3 mb-7 flex-1">
                {[
                  "90-Day Customized Nutrition & Workout Plan",
                  "Tailored to your goals, body composition, and equipment",
                  "Bi-Weekly Asynchronous Video Reviews (Loom)",
                  "Ongoing Nutrition Strategy Adjustments",
                  "Automated Data Tracking & Community Access",
                  "Direct Messaging Access to Coach",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-zinc-200 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-orange-400" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Commitment note */}
              <div className="rounded-md bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 mb-7">
                <p className="text-zinc-400 text-xs leading-[1.75]">
                  Requires a 90-day initial commitment to build your foundation. Month-to-month afterward.
                </p>
              </div>

              <Link href="/initialize?plan=coaching">
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-white font-bold tracking-widest text-xs uppercase rounded-sm transition-all duration-200 shadow-lg shadow-orange-500/20">
                  Apply for Coaching
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Guarantee ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-900/40 rounded-xl p-6 md:p-8"
        >
          <h4 className="text-white font-bold text-lg md:text-xl mb-2">Our Guarantee</h4>
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
            Follow the plan with 90% consistency. If you don't hit your goals in 90 days, I coach you for free until you do.{" "}
            <span className="text-white font-bold">You risk the effort. I risk my time.</span>
          </p>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-28 text-center pb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to Get Your Edge Back?
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Stop guessing. Start executing.
          </p>
          <Link href="/initialize">
            <button className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-widest text-sm uppercase px-12 py-5 rounded-sm transition-all duration-200 shadow-xl shadow-orange-500/20">
              Apply for Coaching
            </button>
          </Link>
        </motion.div>

      </motion.div >
    </section >
  );
}
