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

          <Link href="/initialize">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FF6600] hover:bg-[#FF6600]/90 text-black font-mono font-bold tracking-widest uppercase px-12 h-16 text-sm md:text-base rounded-none shadow-[0_0_20px_rgba(255,149,0,0.3)] hover:shadow-[0_0_30px_rgba(255,149,0,0.5)] transition-all"
              data-testid="button-final-apply"
            >
              Apply for Coaching
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>

          <p className="mt-8 text-[10px] md:text-xs text-zinc-600 font-mono tracking-widest uppercase">
            {">"} HIGH-INTENT APPLICATION TAKES 2 MINUTES
          </p>
        </motion.div>
      </div>
    </section>
  );
}
