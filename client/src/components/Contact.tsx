import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AUDIT_PAY_URL } from "@/lib/auditPayment";
import { useDisplayCurrency } from "@/lib/displayCurrency";
import { AUDIT_BOOKING_LINE, AUDIT_MINUTES, INTAKE_MINUTES, auditPayLine, creditLine, guaranteeLine } from "@/lib/offer";

export function Contact() {
  const currency = useDisplayCurrency();

  return (
    <section id="contact" className="py-20 md:py-32 bg-black scroll-mt-20 border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs md:text-sm text-orange-500 mb-4 font-mono uppercase tracking-widest font-bold">
            Ready when you are
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Get a 4–6 week roadmap before you commit to 1:1 coaching.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-light leading-relaxed">
            One {AUDIT_MINUTES}-minute nutrition session. A plan you can use. {creditLine(currency)}
          </p>

          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#FF6600] hover:bg-[#FF6600]/90 text-black font-mono font-bold tracking-widest uppercase px-12 h-16 text-sm md:text-base rounded-none shadow-[0_0_20px_rgba(255,149,0,0.3)] hover:shadow-[0_0_30px_rgba(255,149,0,0.5)] transition-all"
          >
            <a href={AUDIT_PAY_URL} data-testid="button-final-apply">
              Get your roadmap
              <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
            </a>
          </Button>

          <p className="mt-8 text-sm text-zinc-500">
            {auditPayLine(currency)} It's a short form about how you eat now, about {INTAKE_MINUTES}{" "}
            minutes. {AUDIT_BOOKING_LINE}
          </p>
          <p className="mt-2 text-sm text-zinc-500">{guaranteeLine(currency)}</p>
          <p className="mt-4 text-sm text-zinc-500">
            Email Tony at{" "}
            <a
              href="mailto:tony@tonynguyenfit.com"
              className="text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              tony@tonynguyenfit.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
