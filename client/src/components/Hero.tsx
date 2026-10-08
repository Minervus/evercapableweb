import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

/**
 * The hero used to run four stock gym clips (pull-ups, barbell plates) behind
 * the copy, which argued against the page: food leads here, training supports.
 * It now leads with the real family photo.
 *
 * TODO(tony): if you want motion back, shoot or source footage of cooking, a
 * family dinner, or a kitchen bench — not a gym — and restore the crossfade.
 */
const HERO_IMAGE = "/tony-family.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Mobile: portrait photo sits behind the copy, which it suits. */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-no-repeat bg-[center_18%]"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 md:hidden"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.94) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 md:py-32">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-orange-500 uppercase tracking-wider text-xs md:text-sm font-medium mb-4"
            >
              Weekly nutrition coaching for busy parents 35–50
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
              data-testid="text-hero-headline"
            >
              Get your energy back without another meal plan.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
              data-testid="text-hero-subheadline"
            >
              We look at how you actually eat, build a food strategy that survives work and kids,
              and adjust it together every week. Training is there to support it, not to take over
              your calendar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
            >
              <Link href="/initialize?plan=audit" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2 bg-[#FF9500] hover:bg-[#FF9500]/90 text-white border-none w-full sm:w-auto min-w-[230px] min-h-[56px] text-sm md:text-base rounded-full shadow-[0_0_15px_rgba(255,149,0,0.3)] hover:shadow-[0_0_25px_rgba(255,149,0,0.6)] transition-all font-bold font-mono uppercase tracking-tight"
                  data-testid="button-hero-cta-primary"
                >
                  Get your roadmap
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-transparent hover:bg-white/10 text-white border-white/30 w-full sm:w-auto min-w-[200px] min-h-[56px] text-sm md:text-base rounded-full transition-all font-bold font-mono uppercase tracking-tight"
                  data-testid="button-hero-cta-secondary"
                >
                  See the offers
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-zinc-400"
            >
              <span>Precision Nutrition Level 1</span>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <span>ISSA Certified Personal Trainer</span>
            </motion.div>
          </div>

          {/* Photo — desktop only; mobile uses it as the background above. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden md:block"
          >
            <img
              src={HERO_IMAGE}
              alt="Tony Nguyen lifting his son up on the waterfront"
              width={768}
              height={1024}
              fetchPriority="high"
              className="w-full max-w-sm mx-auto rounded-2xl object-cover shadow-2xl shadow-black/60"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
