import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const protocolStages = [
    {
        version: "v1.0",
        stage: "Stage 01",
        title: "Baseline Calibration",
        desc: "Metric alignment and neurological adaptation",
        color: "border-zinc-700",
    },
    {
        version: "v2.0",
        stage: "Stage 02",
        title: "Metabolic Priming",
        desc: "Increasing work capacity and insulin sensitivity",
        color: "border-orange-500",
    },
    {
        version: "v3.0",
        stage: "Stage 03",
        title: "Recomposition Alpha",
        desc: "Strategic shift in lean mass-to-adipose ratio",
        color: "border-zinc-700",
    },
    {
        version: "v4.0",
        stage: "Stage 04",
        title: "Skeletal Loading",
        desc: "Focus on bone density and peak force production",
        color: "border-zinc-700",
    },
    {
        version: "v5.0",
        stage: "Stage 05",
        title: "Performance Peak",
        desc: "Maximizing systemic output and anaerobic threshold",
        color: "border-zinc-700",
    },
    {
        version: "v6.0",
        stage: "Stage 06",
        title: "Protocol Mastery",
        desc: "Final validation and long-term autonomy prep",
        color: "border-zinc-700",
    },
];

const features = [
    {
        title: "Modular Training",
        description: "24-week automated progression tailored to your equipment (Full Gym, Home, or Bodyweight).",
    },
    {
        title: "Metabolic Nutrition",
        description: "Precision fuel protocols (Deficit, Recomp, or Growth) based on your physiological goal.",
    },
    {
        title: "Telemetry Tracking",
        description: "Automated monthly calibration forms to track your weight, strength, and body composition trends.",
    },
];

export function BlueprintSection() {
    return (
        <section id="blueprint" className="py-24 bg-zinc-950 text-white border-t border-zinc-900 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-mono text-orange-500 text-lg md:text-xl mb-4 tracking-tight">
              // THE_BLUEPRINT_PROTOCOL
                        </h2>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                            The Blueprint Protocol
                        </h3>
                        <p className="text-orange-500/80 text-lg md:text-xl mb-6 font-mono">
                            A 24-week, 6-stage biological promotion cycle. Move from Calibration to Mastery.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                            Every 30 days, your telemetry is audited against the stage-gate requirements. Upon completion, you are automatically promoted to the next version of the Protocol, introducing higher-fidelity training stimulus and refined nutritional targets.
                        </p>
                    </motion.div>
                </div>

                {/* Protocol Roadmap Visualization */}
                <div className="mb-24 relative">
                    {/* Circuit Board Connection Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 hidden lg:block">
                        <div className="relative w-full h-full">
                            {/* Base line */}
                            <div className="absolute inset-0 bg-zinc-800/50" />
                            {/* Glowing orange data-path */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/60 to-orange-500/0 h-full blur-sm" />
                            <div className="absolute inset-0 bg-orange-500/40 h-full" />
                            {/* Circuit nodes/segments */}
                            {protocolStages.map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"
                                    style={{ left: `${(i * 100) / (protocolStages.length - 1)}%` }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* 6-Stage Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                        {protocolStages.map((stage, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-zinc-950 border border-zinc-800 p-6 relative group hover:border-orange-500/50 transition-colors duration-300"
                            >
                                {/* Progress Indicator */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                                    <div
                                        className={`h-full transition-all duration-300 bg-orange-500`}
                                        style={{ width: `${((i + 1) / protocolStages.length) * 100}%` }}
                                    />
                                </div>
                                
                                {/* Version Icon */}
                                <div className="font-mono text-xs text-orange-500/60 mb-3 flex items-center gap-2">
                                    <span className="text-orange-500">{stage.version}</span>
                                    <span className="text-zinc-600">/</span>
                                    <span className="text-zinc-500">{stage.stage}</span>
                                </div>
                                
                                {/* Stage Title */}
                                <div className="text-xl font-bold mb-2 text-white">
                                    {stage.title}
                                </div>
                                
                                {/* Technical Description */}
                                <p className="text-zinc-400 text-sm font-mono uppercase tracking-wider">
                                    {stage.desc}
                                </p>

                                {/* Connection Arrow (hidden on mobile, shown between stages) */}
                                {i < protocolStages.length - 1 && (i + 1) % 3 !== 0 && (
                                    <ChevronRight className="absolute top-1/2 -right-3 -translate-y-1/2 text-zinc-800 w-5 h-5 hidden lg:block" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            className="bg-zinc-900/30 border border-orange-500/30 p-8 hover:bg-zinc-900/50 hover:border-orange-500/60 transition-all duration-300"
                        >
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                {feature.title}
                            </h4>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center"
                >
                    <Button
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold tracking-wider px-12 py-8 text-lg rounded-none"
                    >
                        INITIATE_STAGE_01 <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                    <p className="mt-6 text-zinc-500 text-sm font-mono">
                        $99/mo. Billed monthly. Cancel after any Stage.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
