import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

// ---------------------------------------------------------------------------
// Scarcity — update manually to reflect real seat counts
// ---------------------------------------------------------------------------
const VANGUARD_SEATS_REMAINING = 8;
const VANGUARD_SEAT_LIMIT = 10;

// ---------------------------------------------------------------------------
interface Tier {
  id: string;
  header: string;
  subtitle: string;
  anchor: string | null;
  scarcity: boolean;
  featured: boolean;
  persona: string;
  personaBadge: string;
  price: string;
  cadence: string;
  href: string;
  differentiators: string[];
}

const TIERS: Tier[] = [
  // ── Standard ──────────────────────────────────────────────────────────────
  {
    id: "standard",
    header: "Standard Protocol",
    subtitle: "[ STATUS: MOST_POPULAR_FOR_OPERATORS ]",
    anchor: "TOTAL_INVESTMENT: ~$1,710",
    scarcity: false,
    featured: true,
    persona: "Ideal for: Ambitious operators who need a tailored roadmap and audit loops.",
    personaBadge: "// THE_AUTONOMOUS_OPERATOR",
    price: "$285",
    cadence: "USD",
    href: "/initialize?plan=monthly&tier=standard",
    differentiators: [
      "> Custom 24-Week Architecture",
      "> Bi-Weekly Video Telemetry (Loom)",
      "> Automated System Calibration",
      "> 24/7 Priority Messaging",
    ],
  },
  // ── Vanguard ──────────────────────────────────────────────────────────────
  {
    id: "vanguard",
    header: "Vanguard Performance",
    subtitle: "[ STATUS: 2/10 SEATS REMAINING ]",
    anchor: "TOTAL_INVESTMENT: ~$3,570",
    scarcity: true,
    featured: false,
    persona: "Ideal for: High-Stakes Leaders with Volatile Schedules",
    personaBadge: "// THE_HIGH_STAKES_LEADER",
    price: "$595",
    cadence: "USD",
    href: "/initialize?plan=monthly&tier=vanguard",
    differentiators: [
      "> [ PRIORITY ] 30-MIN LIVE SYSTEM CALIBRATIONS (BI-WEEKLY)",
      "> < 12HR DIRECT RESPONSE TIME",
      "> ALL STANDARD PROTOCOL FEATURES INCLUDED",
    ],
  },
];

// ---------------------------------------------------------------------------
// Shared features — foundation for BOTH tiers
// ---------------------------------------------------------------------------
const sharedSpecs = [
  {
    title: "The Smarter Way",
    description: "Built for busy professionals. 3–4 days a week. No wasted effort.",
  },
  {
    title: "No B.S. Nutrition",
    description: "Eat real food, go to restaurants, and still drop fat without Tupperware.",
  },
  {
    title: "Video Telemetry",
    description: "Bi-weekly video audits of your lifting form so you never wonder if you're doing it right.",
  },
  {
    title: "Risk-Free Execution",
    description: "If you do your part and don't see progress, I work with you for free.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type BillingCycle = "monthly" | "upfront";

const PRICING_DATA: Record<string, { monthly: string; upfront: string; monthlyTotal: string; upfrontSaving: string; saving: string }> = {
  standard: { monthly: "$285", upfront: "$1,540", monthlyTotal: "$1,710", upfrontSaving: "$1,540", saving: "-$170" },
  vanguard: { monthly: "$595", upfront: "$3,210", monthlyTotal: "$3,570", upfrontSaving: "$3,210", saving: "-$360" },
};

export function Pricing() {
  const [billingCycles, setBillingCycles] = useState<Record<string, BillingCycle>>(
    Object.fromEntries(TIERS.map((t) => [t.id, "upfront" as BillingCycle]))
  );

  const setTierCycle = (tierId: string, cycle: BillingCycle) => {
    setBillingCycles((prev) => ({ ...prev, [tierId]: cycle }));
  };


  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">

      {/* ── Pricing Cards ──────────────────────────────────────────────────── */}
      <motion.div
        id="protocol-tiers"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="mb-4 text-center">
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            // SELECT_PROTOCOL_TIER — CHOOSE_YOUR_COMMUNICATION_BANDWIDTH.
          </p>
        </div>

        {/* Global System Standard Header */}
        <div className="mb-12 border-l-2 border-orange-500/30 pl-6 py-4 max-w-2xl">
          <h4 className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-4">
            // SYSTEM_STANDARD_INCLUSIONS
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sharedSpecs.map((spec, i) => (
              <div key={i} className="space-y-1">
                <h5 className="font-mono text-orange-500/80 text-[10px] uppercase tracking-wider font-bold">
                  {spec.title}
                </h5>
                <p className="text-zinc-500 font-sans text-[10px] leading-tight">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Two-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {TIERS.map((tier, tierIdx) => {
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: tierIdx * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`flex flex-col h-full bg-[#0A0A0A] rounded-none border-t-4 transition-all duration-500
                    ${tier.id === "standard"
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
                        <h3 className="text-xl md:text-2xl font-bold tracking-tighter text-white uppercase italic">
                          {tier.header}
                        </h3>
                        <p className={`text-[10px] font-mono tracking-widest uppercase font-bold ${tier.id === "standard" ? "text-orange-500" : "text-slate-400"}`}>
                          {tier.subtitle}
                        </p>
                      </div>


                      {/* User Profile callout */}
                      <div className={`p-4 ${tier.id === "standard" ? "bg-orange-500/10 border-l-2 border-orange-500" : "bg-white/5 border-l-2 border-slate-400"}`}>
                        <p className="text-[11px] font-mono leading-relaxed text-white text-left">
                          <span className="text-zinc-500 mr-2 uppercase tracking-tighter font-bold">[ IDEAL_FOR ]</span>
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
                              <span className={`mt-1 font-mono text-xs ${tier.id === "standard" ? "text-orange-500" : "text-slate-400"}`}>
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

                    {/* Billing Cycle Selector + Pricing */}
                    <div className="pt-8 border-t border-slate-800 space-y-3">
                      <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3">// SELECT_DEPLOYMENT_MODE</p>

                      {/* Monthly row */}
                      {(() => {
                        const pd = PRICING_DATA[tier.id];
                        const cycle = billingCycles[tier.id];
                        const isMonthly = cycle === "monthly";
                        const isUpfront = cycle === "upfront";
                        const accentCls = tier.id === "standard" ? "border-orange-500 bg-orange-500/5" : "border-slate-400 bg-white/5";
                        const accentText = tier.id === "standard" ? "text-orange-500" : "text-slate-300";
                        return (
                          <>
                            {/* Monthly Option */}
                            <button
                              onClick={() => setTierCycle(tier.id, "monthly")}
                              className={`w-full text-left px-4 py-3 border transition-all duration-200 cursor-pointer ${isMonthly ? accentCls : "border-white/5 bg-transparent hover:border-white/10"
                                }`}
                              data-testid={`billing-monthly-${tier.id}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter ${isMonthly ? "text-white" : "text-zinc-500"}`} data-testid={isMonthly ? `price-${tier.id}` : undefined}>
                                      {pd.monthly}
                                    </span>
                                    <span className="text-zinc-500 font-mono text-xs">/mo USD</span>
                                  </div>
                                  <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-1">
                                    6 Monthly Installments [ Total: {pd.monthlyTotal} ]
                                  </p>
                                </div>
                                <span className={`font-mono text-sm font-bold ${isMonthly ? accentText : "text-zinc-700"}`}>
                                  {isMonthly ? "[X]" : "[ ]"}
                                </span>
                              </div>
                            </button>

                            {/* Upfront Option */}
                            <button
                              onClick={() => setTierCycle(tier.id, "upfront")}
                              className={`w-full text-left px-4 py-3 border transition-all duration-200 cursor-pointer ${isUpfront ? accentCls : "border-white/5 bg-transparent hover:border-white/10"
                                }`}
                              data-testid={`billing-upfront-${tier.id}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter ${isUpfront ? "text-white" : "text-zinc-500"}`} data-testid={isUpfront ? `price-${tier.id}` : undefined}>
                                      {pd.upfront}
                                    </span>
                                    <span className="text-zinc-500 font-mono text-xs">upfront USD</span>
                                  </div>
                                  <p className="text-[10px] font-mono uppercase tracking-widest mt-1">
                                    <span className="text-[#f97316] font-bold">[ SAVE 10% / {pd.saving} ]</span>
                                    <span className="text-zinc-600 ml-2">— Full Deployment</span>
                                  </p>
                                </div>
                                <span className={`font-mono text-sm font-bold ${isUpfront ? accentText : "text-zinc-700"}`}>
                                  {isUpfront ? "[X]" : "[ ]"}
                                </span>
                              </div>
                            </button>
                          </>
                        );
                      })()}

                      {/* Commitment Callout — always visible */}
                      <p className="text-[10px] text-center text-zinc-500 font-mono tracking-tight leading-tight pt-1">
                        {">"}  [ SYSTEM_NOTE ]: 70% of members choose &apos;Full Deployment&apos; to maximize commitment and efficiency.
                      </p>

                      {/* Final CTA — dynamic URL */}
                      <div>
                        <Link href={`/initialize?protocol=${tier.id}&billing=${billingCycles[tier.id]}`}>
                          <Button
                            className={`w-full h-16 font-mono font-bold tracking-[0.2em] uppercase text-sm rounded-none transition-all duration-300
                            ${tier.id === "standard"
                                ? "bg-orange-500 text-black hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                : "bg-transparent border-2 border-slate-600 text-white hover:bg-white/5"
                              }`}
                            data-testid={`cta-${tier.id}`}
                          >
                            [ APPLY_FOR_STAGE_1 ]
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

        {/* ── Value Calibration Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-4xl mx-auto border border-zinc-900 bg-[#060606] p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="font-mono text-[60px] text-zinc-500 select-none">VAL</span>
          </div>

          <p className="text-xs text-orange-500 font-mono uppercase tracking-widest mb-8">
            // PRICE_VS_VALUE_CALIBRATION
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">Traditional Personal Training (3x/wk)</span>
              <span className="text-sm font-mono text-zinc-500 font-bold">$1,200/mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">Generic Meal Prep Apps</span>
              <span className="text-sm font-mono text-zinc-500 font-bold">$300/mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">Trial & Error Cycle</span>
              <span className="text-sm font-orange-500 font-mono font-bold uppercase tracking-widest">[ INFINITE_COST ]</span>
            </div>

            {/* Totaling the "Pains" */}
            <div className="flex items-center justify-between border-t border-dashed border-white/10 pt-6 mt-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">TOTAL_LEGACY_MAINTENANCE_COST</span>
              <span className="text-sm font-mono text-slate-400 font-bold">$1,500/mo +</span>
            </div>
          </div>

          <div className="bg-slate-900/40 border-l-4 border-orange-500 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -top-1 -right-1 p-4">
              <span className="text-[9px] font-mono text-orange-500/40 uppercase tracking-tighter">
                [ {">"}80%_SYSTEM_EFFICIENCY_GAIN ]
              </span>
            </div>
            <div>
              <p className="text-xs text-orange-500 font-mono uppercase tracking-[0.2em] mb-1 font-bold">THE_EFFICIENT_CHOICE</p>
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase italic">EverCapable Protocol</h4>
            </div>
            <div className="text-right relative">
              <span className="text-5xl md:text-6xl font-bold text-orange-500 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">$285</span>
              <span className="text-zinc-500 font-mono text-base ml-2">/mo</span>
            </div>
          </div>
        </motion.div>

        {/* ── Weaponized Guarantee ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto border-2 border-orange-500/30 bg-orange-500/5 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-orange-600 text-black font-mono font-bold text-xl px-3 py-1 flex-shrink-0">
              [ ! ]
            </div>
            <div>
              <h4 className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm md:text-base mb-2">
                [ ! ] THE_90-DAY_SYSTEM_GUARANTEE
              </h4>
              <p className="text-zinc-300 font-sans leading-relaxed text-sm md:text-base">
                If you maintain 90% protocol consistency and we don't hit your primary Phase 1 milestones within the first 90 days, <span className="text-white font-bold text-lg md:text-xl">I coach you for FREE</span> until we do. <span className="text-white font-bold">You risk the effort; I risk my time and reputation.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Ready to Get Your Edge Back? ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
