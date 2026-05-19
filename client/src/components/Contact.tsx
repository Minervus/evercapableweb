import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-black scroll-mt-20 border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs md:text-sm text-orange-500 mb-4 font-mono uppercase tracking-widest font-bold">
            // SECURE_YOUR_POSITION
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Ready to Build Permanent Autonomy?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-light leading-relaxed">
            Stop guessing. Stop running 30-day programs. Start building habits that actually last.
          </p>
          
          {/* 90-Day Guarantee Box */}
          <div className="mb-12 max-w-2xl mx-auto border-2 border-orange-500/30 bg-orange-500/5 p-6 md:p-8 text-left">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-orange-600 text-black font-mono font-bold text-xl px-3 py-1 flex-shrink-0">
                [ ! ]
              </div>
              <div>
                <h4 className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm md:text-base mb-2">
                  [ ! ] THE_90-DAY_SYSTEM_GUARANTEE
                </h4>
                <p className="text-zinc-300 font-sans leading-relaxed text-sm md:text-base">
                  If you maintain 90% protocol consistency and we don't hit your primary Stage 01 milestones within the first 90 days, <span className="text-white font-bold text-lg md:text-xl">I coach you for FREE</span> until we do. <span className="text-white font-bold">You risk the effort; I risk my time and reputation.</span>
                </p>
              </div>
            </div>
          </div>

          <Link href="/initialize">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FF6600] hover:bg-[#FF6600]/90 text-black font-mono font-bold tracking-widest uppercase px-12 h-16 text-sm md:text-base rounded-none shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)] transition-all"
              data-testid="button-final-apply"
            >
              [ APPLY_FOR_STAGE_1 ]
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>

          <p className="mt-8 text-[10px] md:text-xs text-zinc-600 font-mono tracking-widest uppercase">
            {">"} High-Intent Application • Takes 3 Minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
