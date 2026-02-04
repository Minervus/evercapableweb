import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const matrixBlocks = [
    {
        level: "L1",
        label: "Calibration",
        desc: "Foundation & Metrics",
        color: "border-zinc-700",
    },
    {
        level: "L2",
        label: "Recomp",
        desc: "Metabolic Shift",
        color: "border-orange-500",
    },
    {
        level: "L3",
        label: "Density",
        desc: "Strength & Mass",
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
              // THE_PROTOCOL_BLUEPRINT
                        </h2>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            A 6-Month Biological Operating System. <br className="hidden md:block" />
                            <span className="text-zinc-500">No Guesswork. Just Data.</span>
                        </h3>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Every 4 weeks, your protocol automatically levels up (L1 → L2 → L3), introducing new stimulus and metabolic demands to ensure zero plateaus.
                        </p>
                    </motion.div>
                </div>

                {/* Matrix Visualization */}
                <div className="mb-24 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -translate-y-1/2 hidden md:block" />
                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {matrixBlocks.map((block, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-zinc-950 border border-zinc-800 p-6 relative group hover:border-orange-500/50 transition-colors duration-300"
                            >
                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                                    <div
                                        className={`h-full transition-all duration-300 ${i === 0 ? 'w-1/3 bg-orange-500' :
                                            i === 1 ? 'w-2/3 bg-orange-500' :
                                                'w-full bg-orange-500'
                                            }`}
                                    />
                                </div>
                                <div className="font-mono text-xs text-zinc-500 mb-2">PHASE_0{i + 1}</div>
                                <div className="text-2xl font-bold mb-1 flex items-center gap-2">
                                    <span className={i === 1 ? "text-orange-500" : "text-white"}>{block.level}</span>
                                    <span className="text-zinc-600">/</span>
                                    <span>{block.label}</span>
                                </div>
                                <p className="text-zinc-400 text-sm font-mono uppercase tracking-wider">{block.desc}</p>

                                {i < 2 && (
                                    <ChevronRight className="absolute top-1/2 -right-6 -translate-y-1/2 text-zinc-800 w-6 h-6 hidden md:block" />
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
                        INITIATE_PROTOCOL <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                    <p className="mt-6 text-zinc-500 text-sm font-mono">
                        Billed monthly. Cancel anytime. Access via the Everfit App.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
