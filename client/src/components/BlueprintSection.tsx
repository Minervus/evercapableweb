import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const protocolStages = [
    {
        version: "v1.0",
        stage: "Stage 01",
        month: "MONTH_01",
        title: "Baseline Calibration",
        desc: "Metric alignment and neurological adaptation",
        technicalObjective: "Establishing your metabolic 'Ground Truth.' We sync your hardware (Whoop/Apple/Oura) and audit your current metrics and movement patterns to ensure a strong foundation for the heavy loading ahead.",
    },
    {
        version: "v2.0",
        stage: "Stage 02",
        month: "MONTH_02",
        title: "Metabolic Priming",
        desc: "Increasing work capacity and insulin sensitivity",
        technicalObjective: "The Engine. We optimize your metabolism and energy levels. The goal is to turn your body into a high-performance machine that handles fuel better and burns fat more efficiently.",
    },
    {
        version: "v3.0",
        stage: "Stage 03",
        month: "MONTH_03",
        title: "Recomposition",
        desc: "Strategic shift in lean mass-to-adipose fat ratio",
        technicalObjective: "The Shift. This is where we focus on losing body fat while protecting your muscle. We adjust your nutrition to make the physical changes start looking undeniable.",
    },
    {
        version: "v4.0",
        stage: "Stage 04",
        month: "MONTH_04",
        title: "Strength Building",
        desc: "Focus on bone density and peak force production",
        technicalObjective: "The Foundation. We move into heavy, effective lifting. This builds the 'Body of Armor' you need to stay athletic, avoid injury, and feel significantly more powerful.",
    },
    {
        version: "v5.0",
        stage: "Stage 05",
        month: "MONTH_05",
        title: "Longevity Integration",
        desc: "Mobility, balance, and joint health",
        technicalObjective: "The Long Game. We add focus on mobility, joint health, and balance. It is about making sure your body is as capable and pain-free at 70 as it is today.",
    },
    {
        version: "v6.0",
        stage: "Stage 06",
        month: "MONTH_06",
        title: "Protocol Mastery",
        desc: "Final validation and long-term autonomy prep",
        technicalObjective: "The Graduation. You take the wheel. We move from coach-led to you managing your own progress. You have built the habits to keep these results for the rest of your life",
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
    const timelineRef = useRef<HTMLDivElement>(null);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const lineProgressPercent = useTransform(lineProgress, (v) => `${v}%`);

    const handleCardFlip = (index: number) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <section id="blueprint" className="py-24 bg-zinc-950 text-white border-t border-zinc-900 scroll-mt-20 relative overflow-hidden">
            {/* 3D Flip Card Styles */}
            <style>{`
                .card-container {
                    perspective: 1000px;
                }
                .card-inner {
                    transform-style: preserve-3d;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .card-container:hover .card-inner {
                    transform: rotateY(180deg);
                }
                .card-container.flipped .card-inner {
                    transform: rotateY(180deg);
                }
                .card-front,
                .card-back {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .card-back {
                    transform: rotateY(180deg);
                }
                @media (hover: none) {
                    .card-container:active .card-inner {
                        transform: rotateY(180deg);
                    }
                }
            `}</style>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                            A 24-week path to physical mastery. Move through 6 stages of progress, from your initial baseline to total autonomy.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                            Every 30 days, we audit your health data against clear performance milestones. Once you hit them, you’re promoted to the next stage, unlocking upgraded training and nutrition targets designed for your new level of fitness.
                        </p>
                    </motion.div>
                </div>

                {/* Vertical Technical Pipeline */}
                <div ref={timelineRef} className="relative mb-24">
                    {/* Vertical Pipeline Line (2px, orange) - Behind cards */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0" style={{ width: '2px' }}>
                        <div className="absolute inset-0 bg-zinc-800/30" />
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full bg-orange-500 origin-top"
                            style={{
                                height: lineProgressPercent,
                            }}
                        />
                    </div>

                    {/* Single Vertical Column - Centered */}
                    <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                        {protocolStages.map((stage, i) => {
                            const isFirst = i === 0;
                            const isLast = i === protocolStages.length - 1;

                            return (
                                <div key={i} className="relative">
                                    {/* 3D Flip Card Container */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        className={`card-container ${flippedCards.has(i) ? 'flipped' : ''}`}
                                        onClick={() => handleCardFlip(i)}
                                        style={{
                                            perspective: '1000px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {/* Card Inner - 3D Transform */}
                                        <div
                                            className="card-inner relative w-full"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        >
                                            {/* Card Front */}
                                            <div
                                                className={`card-front w-full rounded ${isFirst
                                                    ? 'bg-zinc-950 border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                                                    : 'bg-zinc-950/60 border border-zinc-800 opacity-60 grayscale'
                                                    } border-l-4 border-l-orange-500 p-6 md:p-8 relative`}
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                }}
                                            >
                                                {/* Locked Badge - Top Right */}
                                                {!isFirst && (
                                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 px-3 py-1.5 rounded z-20">
                                                        <Lock className="w-3 h-3 text-zinc-500" />
                                                        <span className="text-zinc-500 text-xs font-mono">LOCKED // REQUIRES_PREVIOUS_STAGE</span>
                                                    </div>
                                                )}

                                                {/* Month Marker - At Top */}
                                                <div className="font-mono text-sm md:text-base text-orange-500/80 mb-3 tracking-widest">
                                                    {stage.month}
                                                </div>

                                                {/* Version Tag */}
                                                <div className="font-mono text-2xl md:text-3xl text-orange-500 mb-2 font-bold">
                                                    {stage.version}
                                                </div>

                                                {/* Stage Number */}
                                                <div className="font-mono text-sm text-zinc-400 mb-3">
                                                    {stage.stage}
                                                </div>

                                                {/* Stage Title */}
                                                <h4 className={`text-2xl md:text-3xl font-bold mb-3 ${isFirst ? 'text-white' : 'text-zinc-400'
                                                    }`}>
                                                    {stage.title}
                                                </h4>

                                                {/* Technical Description */}
                                                <p className={`text-sm md:text-base font-mono uppercase tracking-wider ${isFirst ? 'text-zinc-400' : 'text-zinc-600'
                                                    }`}>
                                                    {stage.desc}
                                                </p>
                                            </div>

                                            {/* Card Back - Technical Objective */}
                                            <div
                                                className="card-back absolute inset-0 w-full bg-black border border-orange-500/50 border-l-4 border-l-orange-500 p-6 md:p-8 rounded"
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)',
                                                }}
                                            >
                                                {/* Orange Pulse Glow on Flip */}
                                                <div className="absolute inset-0 bg-orange-500/10 animate-pulse pointer-events-none rounded" />

                                                {/* Technical Objective Header */}
                                                <div className="font-mono text-sm text-orange-500 mb-4 tracking-tight">
                                                    // TECHNICAL_OBJECTIVE
                                                </div>

                                                {/* Technical Description */}
                                                <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                                                    {stage.technicalObjective}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Connector Line with Flow Icon */}
                                    {!isLast && (
                                        <div className="relative flex items-center justify-center py-4">
                                            {/* Vertical Connector Line (2px width, orange) */}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0" style={{ width: '2px' }}>
                                                <div className="absolute inset-0 bg-zinc-800/30" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-orange-500" />
                                            </div>

                                            {/* Circuitry Trace Pattern - Dot and Line */}
                                            <div className="relative z-10 flex flex-col items-center">
                                                {/* Dot Node */}
                                                <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-zinc-950" />

                                                {/* 45-degree Angled Connector Lines (Circuitry Trace) */}
                                                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center">
                                                    <div className="w-4 h-0.5 bg-orange-500" />
                                                    <div className="w-3 h-3 bg-orange-500 transform rotate-45 -mx-1.5" />
                                                    <div className="w-4 h-0.5 bg-orange-500" />
                                                </div>

                                                {/* Down Arrow / Flow Icon */}
                                                <ChevronDown className="w-5 h-5 text-orange-500 mt-3 animate-pulse" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Infrastructure Summary - Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-mono">
                        // THE_INFRASTRUCTURE
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
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
                </motion.div>

                {/* CTA - At Bottom of Pipeline */}
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
