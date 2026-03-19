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
// Toggle plans
// ---------------------------------------------------------------------------
type PlanKey = "monthly" | "sixMonth" | "annual";

const PLANS: { id: PlanKey; label: string }[] = [
  { id: "monthly", label: "MONTHLY" },
  { id: "sixMonth", label: "6-MONTHS" },
  { id: "annual", label: "1-YEAR" },
];

// ---------------------------------------------------------------------------
// Tier data
// ---------------------------------------------------------------------------
interface PlanData {
  price: string;
  cadence: string;
  qualifier: string | null;
  href: string;
}

interface Tier {
  id: string;
  header: string;
  subtitle: string;
  scarcity: boolean;
  featured: boolean;
  persona: string;
  personaBadge: string;
  plans: Record<PlanKey, PlanData>;
  differentiators: string[];
}

const TIERS: Tier[] = [
  // ── Standard ──────────────────────────────────────────────────────────────
  {
    id: "standard",
    header: "// STANDARD_PROTOCOL_v1.3",
    subtitle: "The Industry Standard for Physical Autonomy.",
    scarcity: false,
    featured: true,
    persona: "> \"I have the discipline to execute; I just need a tailored roadmap and a periodic audit to ensure I'm moving in the right direction.\"",
    personaBadge: "// IDEAL_FOR: THE_AUTONOMOUS_OPERATOR",
    differentiators: [
      "> ASYNCHRONOUS PRECISION (LOOM-BASED)",
      "> BI-WEEKLY VIDEO AUDITS",
      "> PRIORITY MESSAGING (< 24HR RESPONSE)",
    ],
    plans: {
      monthly: { price: "$285", cadence: "/ mo", qualifier: null, href: "/initialize?plan=monthly&tier=standard" },
      sixMonth: { price: "$1,495", cadence: "/ once", qualifier: "Save $215", href: "/initialize?plan=6month&tier=standard" },
      annual: { price: "$2,695", cadence: "/ once", qualifier: "Save $725", href: "/initialize?plan=annual&tier=standard" },
    },
  },
  // ── Vanguard ──────────────────────────────────────────────────────────────
  {
    id: "vanguard",
    header: `// VANGUARD_PERFORMANCE_TIER [STATUS: ${VANGUARD_SEAT_LIMIT}_SEAT_LIMIT]`,
    subtitle: "Full-Spectrum Executive Support.",
    scarcity: true,
    featured: false,
    persona: "> \"My environment is volatile and my time is limited. I need a dedicated consultant for live calibration and real-time oversight.\"",
    personaBadge: "// IDEAL_FOR: THE_HIGH_STAKES_LEADER",
    differentiators: [
      "> BI-WEEKLY LIVE VIDEO CALLS (30-MIN)",
      "> PRIORITY MESSAGING (< 12HR RESPONSE)",
    ],
    plans: {
      monthly: { price: "$595", cadence: "/ mo", qualifier: null, href: "/initialize?plan=monthly&tier=vanguard" },
      sixMonth: { price: "$3,195", cadence: "/ once", qualifier: "Save $375", href: "/initialize?plan=6month&tier=vanguard" },
      annual: { price: "$5,940", cadence: "/ once", qualifier: "Equiv. $495/mo — Save $1,200", href: "/initialize?plan=annual&tier=vanguard" },
    },
  },
];

// ---------------------------------------------------------------------------
// Shared features — foundation for BOTH tiers
// ---------------------------------------------------------------------------
const sharedSpecs = [
  {
    title: "6-Stage Autonomy Curriculum",
    description: "The complete EverCapable roadmap: Calibration → Structural Integrity → Metabolic Efficiency → Force Production → Durability → Autonomy Graduation.",
  },
  {
    title: "Bi-Weekly Video Telemetry Briefings",
    description: "Every 14 days, a deep-dive Loom review auditing your strength curves, sleep, and metabolic trends to pivot the protocol in real-time.",
  },
  {
    title: "Dynamic Plan Adjustments",
    description: "Manual rebuilding of training and nutrition blocks to fit your environment—travel, high-stress weeks, or changing schedules.",
  },
  {
    title: "Video Form Analysis",
    description: "Frame-by-frame corrections of your primary lifts to ensure maximum skeletal loading while eliminating injury risk.",
  },
];

// ---------------------------------------------------------------------------
// 6-Stage roadmap data
// ---------------------------------------------------------------------------
const progressionStages = [
  {
    id: "01", label: "01_CALIBRATION_&_EASY_WINS", version: "v1.0", title: "Baseline Calibration",
    focus: "Establishing 'Ground Truth' and securing immediate wins in sleep, nutrition, and movement.",
    objective: "Establish ground truth and secure immediate wins across all biological systems."
  },
  {
    id: "02", label: "02_STRUCTURAL_INTEGRITY", version: "v2.0", title: "Structural Integrity",
    focus: "Master the foundational patterns (Squat, Hinge, Carry) to move with total confidence and zero pain.",
    objective: "Master high-value movement patterns to build a pain-free, capable foundation."
  },
  {
    id: "03", label: "03_METABOLIC_EFFICIENCY", version: "v3.0", title: "Metabolic Efficiency",
    focus: "Align fueling with your daily workload to eliminate the '3 PM energy crash' and stay sharp.",
    objective: "Optimize fuel timing and macros to eliminate energy crashes and stabilize daily output."
  },
  {
    id: "04", label: "04_FORCE_PRODUCTION", version: "v4.0", title: "Force Production",
    focus: "Build lean muscle and absolute strength to anchor your long-term healthspan.",
    objective: "Maximize strength acquisition and create a permanent physiological buffer for longevity."
  },
  {
    id: "05", label: "05_DURABILITY_STRESS_TEST", version: "v5.0", title: "Durability & Stress Test",
    focus: "Develop resilience protocols for travel, high-stress weeks, and missed sleep.",
    objective: "Field-test your systems against real-world friction like travel and high-stress cycles."
  },
  {
    id: "06", label: "06_AUTONOMY_GRADUATION", version: "v6.0", title: "Autonomy Graduation",
    focus: "Handing over the telemetry controls so you can manage your own system independently.",
    objective: "Shift from direct guidance to full self-directional mastery of your own biology."
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Pricing() {
  const [activePlan, setActivePlan] = useState<PlanKey>("monthly");
  const isCommitment = activePlan !== "monthly";

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">

      {/* ── 6-Stage Roadmap ────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mb-24">
        <div className="mb-12">
          <p className="mb-2 text-sm text-orange-500 font-mono uppercase tracking-wider">
            // THE_EVERCAPABLE_METHOD
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 tracking-tight">
            The 6-Stage Autonomy Curriculum
          </h2>
          <p className="text-xl md:text-2xl text-orange-500 font-mono mb-6 max-w-2xl">
            Six stages to permanent autonomy.
          </p>
          <p className="text-base text-zinc-400 max-w-3xl leading-relaxed font-sans mb-6">
            A systematic evolution from bio-data chaos to permanent physical autonomy. Master the 6 stages.
          </p>
          <p className="text-xl text-orange-500 font-mono mb-6 max-w-2xl">
            The Goal isn't just to get you in shape, it's to make you bulletproof for life.
          </p>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            // SYSTEM_EXECUTION_FLOW
          </p>
        </div>

        <div className="relative">
          {/* Row 1 arrows */}
          <div className="hidden lg:block absolute top-[135px] left-[32%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2" />
          </div>
          <div className="hidden lg:block absolute top-[135px] left-[65.5%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2" />
          </div>
          {/* S-curve Row 1 → Row 2 */}
          <div className="hidden lg:block absolute left-[83.33%] top-[385px] w-0.5 h-[20px] bg-orange-500/40 z-0" />
          <div className="hidden lg:block absolute top-[405px] left-[16.66%] right-[16.66%] h-0.5 bg-orange-500/40 z-0" />
          <div className="hidden lg:block absolute left-[16.66%] top-[405px] w-0.5 h-[20px] bg-orange-500/40 z-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-orange-500/80 rotate-45 transform translate-y-1/2" />
          </div>
          {/* Row 2 arrows */}
          <div className="hidden lg:block absolute top-[560px] left-[32%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2" />
          </div>
          <div className="hidden lg:block absolute top-[560px] left-[65.5%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6 relative z-10 w-full pl-6 lg:pl-0">
            {progressionStages.map((stage, idx) => {
              const isActive = idx === 0;
              return (
                <motion.div key={stage.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: idx * 0.1 }}>
                  <Card className={`h-full bg-[#111111] transition-all duration-300 shadow-none rounded-none border relative overflow-visible flex flex-col pt-10 px-8 pb-8 min-h-[220px] cursor-default
                    ${isActive ? "border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)]" : "border-zinc-800 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(255,87,34,0.1)]"}`}>
                    <CardHeader className="p-0 mb-auto relative z-10 flex flex-row items-center justify-between">
                      <span className={`font-mono text-[11px] tracking-widest ${isActive ? "text-[#FF5722]" : "text-orange-500"}`}>{stage.label}</span>
                      <span className={`font-mono text-xs font-bold px-2 py-1 rounded-sm ${isActive ? "bg-[#FF5722] text-black" : "bg-white/5 text-[#FF5722]"}`}>{stage.version}</span>
                    </CardHeader>
                    <CardContent className="p-0 relative z-10 mt-12 flex flex-col flex-grow">
                      <h4 className="font-sans text-[22px] font-bold text-white mb-3">{stage.title}</h4>
                      <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">{stage.focus}</p>
                      <div className="mt-auto bg-white/5 border border-white/5 rounded-sm p-4">
                        <span className="block font-mono text-orange-500 text-[10px] uppercase font-bold tracking-widest mb-2 select-none">[ THE_OBJECTIVE ]</span>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">{stage.objective}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

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
            // SELECT_PROTOCOL_TIER — SAME_6_STAGE_CURRICULUM. DIFFERENCE: COMMUNICATION_BANDWIDTH.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-zinc-800 bg-[#0A0A0A] p-1 gap-1">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlan(p.id)}
                className={`px-5 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-200 select-none
                  ${activePlan === p.id ? "bg-orange-600 text-black font-bold" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"}`}
                data-testid={`toggle-plan-${p.id}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {TIERS.map((tier, tierIdx) => {
            const plan = tier.plans[activePlan];
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
                  className={`relative flex flex-col h-full bg-[#0A0A0A]
                    ${tier.featured
                      ? "border border-orange-500/50 shadow-[inset_0_0_40px_rgba(255,102,0,0.06),0_0_0_1px_rgba(255,102,0,0.2)]"
                      : "border border-zinc-800/80"
                    }`}
                  data-testid={`card-tier-${tier.id}`}
                >
                  {/* Featured badge */}
                  {tier.featured && (
                    <div className="absolute -top-3 left-6 z-10">
                      <span className="bg-orange-600 text-black text-[9px] font-mono font-bold tracking-widest uppercase px-4 py-1">
                        // RECOMMENDED_FOR_AUTONOMY
                      </span>
                    </div>
                  )}
                  {/* Scarcity badge */}
                  {tier.scarcity && (
                    <div className="absolute -top-3 left-6 z-10">
                      <span className="bg-orange-600 text-black text-[9px] font-mono font-bold tracking-widest uppercase px-4 py-1">
                        [ SYSTEM_CAPACITY: {VANGUARD_SEAT_LIMIT - VANGUARD_SEATS_REMAINING}/{VANGUARD_SEAT_LIMIT} SEATS FILLED ]
                      </span>
                    </div>
                  )}

                  <CardHeader className="pb-6 border-b border-white/5 relative overflow-hidden">
                    {/* Grid bg */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{
                      backgroundImage: `linear-gradient(to right, rgba(255,102,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,102,0,0.15) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }} />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <h3 className={`text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 ${tier.featured ? "text-orange-500" : "text-zinc-500"}`}>
                            {tier.header}
                          </h3>
                          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                            {tier.subtitle}
                          </p>
                        </div>
                        <AnimatePresence>
                          {isCommitment && (
                            <motion.span
                              key="badge"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.2 }}
                              className="text-[8px] font-mono text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 tracking-widest uppercase whitespace-nowrap"
                            >
                              // COMMITMENT_REWARD_APPLIED
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Animated price */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${tier.id}-${activePlan}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl md:text-5xl font-bold text-white font-mono tracking-tight" data-testid={`price-${tier.id}`}>
                              {plan.price}
                            </span>
                            <span className="text-zinc-500 font-mono font-medium tracking-wider text-sm">
                              {plan.cadence} <span className="text-xs text-zinc-600">(USD)</span>
                            </span>
                          </div>
                          {plan.qualifier && (
                            <p className="text-xs text-green-400 font-mono tracking-wide">{plan.qualifier}</p>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-3">
                        [ ESTIMATED_EVOLUTION: 6_STAGES ]
                      </p>

                      {/* Persona self-selection quote */}
                      <div className={`mt-5 pt-5 border-t ${tier.scarcity ? "border-zinc-700" : "border-white/5"}`}>
                        <p className={`text-[10px] md:text-xs font-mono italic leading-relaxed mb-2 ${tier.scarcity ? "text-zinc-300" : "text-zinc-500"}`}>
                          {tier.persona}
                        </p>
                        <span className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold ${tier.scarcity ? "text-orange-400" : "text-zinc-600"}`}>
                          {tier.personaBadge}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col pt-8 space-y-8 relative z-10">

                    {/* Shared foundation specs */}
                    <div>
                      <h4 className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-5">
                        // INCLUDED_IN_BOTH_TIERS
                      </h4>
                      <div className="space-y-5">
                        {sharedSpecs.map((spec, i) => (
                          <div key={i} className="space-y-1">
                            <h5 className="font-mono text-orange-500 text-[10px] uppercase tracking-wider font-bold">
                              {spec.title}
                            </h5>
                            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                              {spec.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tier-exclusive differentiators */}
                    <div className={`border-t pt-5 space-y-3 ${tier.scarcity ? "border-orange-500/20" : "border-white/5"}`}>
                      <h4 className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-3">
                        // TIER_EXCLUSIVE
                      </h4>
                      {tier.differentiators.map((d, i) => (
                        <p key={i} className={`text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold ${tier.scarcity ? "text-orange-400" : "text-zinc-300"}`}>
                          {d}
                          {tier.scarcity && d.includes("BI-WEEKLY LIVE VIDEO CALLS") && (
                            <span className="ml-2 text-[8px] text-orange-400/60 tracking-widest">★ HIGH-TOUCH</span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* FULL_STAGE_MASTERY_LOCKED */}
                    <AnimatePresence>
                      {isCommitment && (
                        <motion.p
                          key="mastery"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-[10px] font-mono text-green-400/70 tracking-widest uppercase overflow-hidden"
                        >
                          {">"} FULL_STAGE_MASTERY_LOCKED
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* CTA */}
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <Link href={plan.href}>
                        <Button
                          className={`w-full h-14 font-mono font-bold tracking-widest uppercase text-sm rounded-none transition-all
                            ${tier.featured
                              ? "bg-[#FF5722] hover:bg-[#FF5722]/90 text-black shadow-[0_0_15px_rgba(255,87,34,0.3)] hover:shadow-[0_0_25px_rgba(255,87,34,0.5)]"
                              : "bg-transparent hover:bg-white/5 text-zinc-300 border border-zinc-700 hover:border-zinc-400"
                            }`}
                          data-testid={`cta-${tier.id}`}
                        >
                          [ APPLY_FOR_STAGE_1 ]
                        </Button>
                      </Link>
                      <div className="flex flex-col items-center gap-3 mt-5">
                        {tier.scarcity ? (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                              [ SYSTEM_CAPACITY: {VANGUARD_SEAT_LIMIT - VANGUARD_SEATS_REMAINING}/{VANGUARD_SEAT_LIMIT} SEATS FILLED ]
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                              [ SYSTEM_CAPACITY: 5/20 SEATS FILLED ]
                            </p>
                          </div>
                        )}
                        {tierIdx === 0 && (
                          <p className="text-[9px] text-zinc-700 font-mono text-center leading-relaxed">
                            <span className="text-orange-500/50 mr-1">{">"} SYSTEM_PARITY:</span>
                            All transactions in USD. Approx $390 CAD / $470 NZD based on current rates.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
