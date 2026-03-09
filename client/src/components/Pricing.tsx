import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const stages = [
  "01_CALIBRATION_&_EASY_WINS",
  "02_STRUCTURAL_INTEGRITY",
  "03_METABOLIC_EFFICIENCY",
  "04_FORCE_PRODUCTION",
  "05_DURABILITY_STRESS_TEST",
  "06_AUTONOMY_GRADUATION",
];

const progressionStages = [
  {
    id: "01",
    label: "01_CALIBRATION_&_EASY_WINS",
    version: "v1.0",
    title: "Baseline Calibration",
    focus: "Establishing 'Ground Truth' and securing immediate wins in sleep, nutrition, and movement.",
    objective: "Establish ground truth and secure immediate wins across all biological systems."
  },
  {
    id: "02",
    label: "02_STRUCTURAL_INTEGRITY",
    version: "v2.0",
    title: "Structural Integrity",
    focus: "Master the foundational patterns (Squat, Hinge, Carry) to move with total confidence and zero pain.",
    objective: "Master high-value movement patterns to build a pain-free, capable foundation."
  },
  {
    id: "03",
    label: "03_METABOLIC_EFFICIENCY",
    version: "v3.0",
    title: "Metabolic Efficiency",
    focus: "Align fueling with your daily workload to eliminate the '3 PM energy crash' and stay sharp.",
    objective: "Optimize fuel timing and macros to eliminate energy crashes and stabilize daily output."
  },
  {
    id: "04",
    label: "04_FORCE_PRODUCTION",
    version: "v4.0",
    title: "Force Production",
    focus: "Build lean muscle and absolute strength to anchor your long-term healthspan.",
    objective: "Maximize strength acquisition and create a permanent physiological buffer for longevity."
  },
  {
    id: "05",
    label: "05_DURABILITY_STRESS_TEST",
    version: "v5.0",
    title: "Durability & Stress Test",
    focus: "Develop resilience protocols for travel, high-stress weeks, and missed sleep.",
    objective: "Field-test your systems against real-world friction like travel and high-stress cycles."
  },
  {
    id: "06",
    label: "06_AUTONOMY_GRADUATION",
    version: "v6.0",
    title: "Autonomy Graduation",
    focus: "Handing over the telemetry controls so you can manage your own system independently.",
    objective: "Shift from direct guidance to full self-directional mastery of your own biology."
  },
];

const operationalSpecs = [
  {
    title: "Bi-Weekly Video Telemetry Briefings",
    description: "Every 14 days, I record a deep-dive Loom review of your data. We audit your strength curves, sleep quality, and metabolic trends to pivot the protocol in real-time."
  },
  {
    title: "Dynamic Plan Adjustments",
    description: "Life is volatile. Whether it's international travel or a high-stress week, I manually rebuild your training and nutrition blocks to fit your current environment."
  },
  {
    title: "Video Form Analysis",
    description: "Upload your heavy lifts; I provide frame-by-frame corrections to ensure maximum skeletal loading while reducing injury risk."
  },
  {
    title: "Priority Messaging Access",
    description: "Direct encrypted messaging with a guaranteed < 24-hour response time."
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mb-24">
        <div className="mb-12">
          <p className="mb-2 text-sm text-orange-500 font-mono uppercase tracking-wider">
            // THE_EVERCAPABLE_JOURNEY
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 tracking-tight">
            The EverCapable Method
          </h2>
          <p className="text-xl md:text-2xl text-orange-500 font-mono mb-6 max-w-2xl">
            A 24-week strategic evolution. Six stages to permanent autonomy.
          </p>
          <p className="text-base text-zinc-400 max-w-3xl leading-relaxed font-sans mb-12">
            Every 30 days, we audit your telemetry against clear milestones. Hit your targets, and the system automatically upgrades your protocol—unlocking sharper training and refined fueling for the next level.
          </p>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            // SYSTEM_EXECUTION_FLOW
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connective Tissue Arrows */}
          {/* Row 1: Node 1 to 2 */}
          <div className="hidden lg:block absolute top-[135px] left-[32%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2"></div>
          </div>
          {/* Row 1: Node 2 to 3 */}
          <div className="hidden lg:block absolute top-[135px] left-[65.5%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2"></div>
          </div>

          {/* The S-Curve from Row 1 to Row 2 (3 -> 4) */}
          {/* Vertical down from Stage 3 bottom */}
          <div className="hidden lg:block absolute left-[83.33%] top-[385px] w-0.5 h-[20px] bg-orange-500/40 z-0" />
          {/* Horizontal across from right to left */}
          <div className="hidden lg:block absolute top-[405px] left-[16.66%] right-[16.66%] h-0.5 bg-orange-500/40 z-0" />
          {/* Vertical down into Stage 4 top */}
          <div className="hidden lg:block absolute left-[16.66%] top-[405px] w-0.5 h-[20px] bg-orange-500/40 z-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-orange-500/80 rotate-45 transform translate-y-1/2"></div>
          </div>

          {/* Row 2: Node 4 to 5 */}
          <div className="hidden lg:block absolute top-[560px] left-[32%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2"></div>
          </div>
          {/* Row 2: Node 5 to 6 */}
          <div className="hidden lg:block absolute top-[560px] left-[65.5%] w-[1.5%] h-0.5 bg-orange-500/40 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-orange-500/60 rotate-45 transform translate-x-1/2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6 relative z-10 w-full pl-6 lg:pl-0">
            {progressionStages.map((stage, idx) => {
              const isActive = idx === 0;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card
                    className={`h-full bg-[#111111] transition-all duration-300 shadow-none rounded-none border relative overflow-visible flex flex-col pt-10 px-8 pb-8 min-h-[220px] cursor-default
                      ${isActive
                        ? 'border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)]'
                        : 'border-zinc-800 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(255,87,34,0.1)]'}`}
                  >
                    <CardHeader className="p-0 mb-auto relative z-10 flex flex-row items-center justify-between">
                      <span className={`font-mono text-[11px] tracking-widest ${isActive ? 'text-[#FF5722]' : 'text-orange-500'}`}>
                        {stage.label}
                      </span>

                      <span className={`font-mono text-xs font-bold px-2 py-1 rounded-sm ${isActive ? 'bg-[#FF5722] text-black' : 'bg-white/5 text-[#FF5722]'}`}>
                        {stage.version}
                      </span>
                    </CardHeader>

                    <CardContent className="p-0 relative z-10 mt-12 flex flex-col flex-grow">
                      <h4 className="font-sans text-[22px] font-bold text-white mb-3">
                        {stage.title}
                      </h4>
                      <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                        {stage.focus}
                      </p>
                      <div className="mt-auto bg-white/5 border border-white/5 rounded-sm p-4">
                        <span className="block font-mono text-orange-500 text-[10px] uppercase font-bold tracking-widest mb-2 select-none">
                          [ THE_OBJECTIVE ]
                        </span>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                          {stage.objective}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Master Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <Card
          className="relative flex flex-col h-full bg-[#0A0A0A] border border-orange-500/30 shadow-[inset_0_0_30px_rgba(255,102,0,0.05)]"
          data-testid="card-pricing-master"
        >
          <CardHeader className="pb-6 border-b border-white/5 relative overflow-hidden">
            {/* Grid Background Effect in Header */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
              backgroundImage: `linear-gradient(to right, rgba(255,102,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,102,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />

            <div className="relative z-10">
              <h3 className="text-xs md:text-sm text-orange-500 font-mono uppercase tracking-widest mb-6 block">
                  // SYSTEM_INVESTMENT_v1.0
              </h3>

              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="text-5xl md:text-6xl font-bold text-white transition-all duration-300 font-mono tracking-tight"
                  data-testid="text-program-price"
                >
                  $285
                </span>
                <span className="text-zinc-500 font-mono font-medium tracking-wider">
                  / MONTH <span className="text-xs md:text-sm text-zinc-600">(USD)</span>
                </span>
              </div>
              <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest mt-2">
                [ 24_WEEK_BIO_ARCHITECTURAL_COMMITMENT ]
              </p>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col pt-8 space-y-12 relative z-10">
            {/* Operational Specs (2x2 Grid) */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-4">
                // OPERATIONAL_SPECS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {operationalSpecs.map((spec, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-mono text-orange-500 text-xs uppercase tracking-wider font-bold">
                      {spec.title}
                    </h5>
                    <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-6">
              <div>
                <Link href="/calibrate">
                  <Button
                    className="w-full h-14 bg-[#FF5722] hover:bg-[#FF5722]/90 text-black font-mono shadow-[0_0_15px_rgba(255,87,34,0.3)] hover:shadow-[0_0_25px_rgba(255,87,34,0.5)] transition-all font-bold tracking-widest uppercase text-sm md:text-base rounded-none"
                    data-testid="button-initialize-calibration"
                  >
                    [ INITIALIZE_STAGE_1_CALIBRATION ]
                  </Button>
                </Link>
                <div className="flex flex-col items-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest text-center">
                      [ SYSTEM_CAPACITY: 4/40 SEATS FILLED ]
                    </p>
                  </div>

                  {/* Currency Note directly below */}
                  <div className="text-center">
                    <p className="text-[10px] md:text-xs text-zinc-500 font-mono leading-relaxed opacity-70">
                      <span className="text-orange-500 mr-2">{">"}</span>
                      <strong className="text-zinc-400 font-bold uppercase tracking-tighter">CURRENCY_SYNC:</strong> PARITY_LOCKED_FOR_FOUNDER_BETA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
