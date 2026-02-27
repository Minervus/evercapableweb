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
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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
        <section id="blueprint" className="py-24 bg-[#0A0A0B] text-white scroll-mt-20 relative overflow-hidden">
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

            {/* Architectural Grid Background Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px'
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-3xl text-center md:text-left mx-auto md:mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-mono text-orange-500 text-lg md:text-xl mb-4 tracking-tight">
              // THE_BLUEPRINT_GRID
                        </h2>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                            The Blueprint Protocol
                        </h3>
                        <p className="text-orange-500/80 text-lg md:text-xl mb-4 font-mono">
                            A 24-week, 6-stage path to physical mastery.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                            Every 30 days, we audit your stats against clear milestones. Hit your targets, and the system automatically upgrades your protocol—unlocking sharper training and refined fueling for the next level.
                        </p>
                    </motion.div>
                </div>

                {/* Grid Execution Flow Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 font-mono text-zinc-400 uppercase tracking-widest text-sm text-center md:text-left"
                >
                    // SYSTEM_EXECUTION_FLOW
                </motion.div>

                {/* 3x2 Grid Pipeline */}
                <div className="relative mb-24 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                        {protocolStages.map((stage, i) => {
                            const isFirst = i === 0;
                            const isLast = i === protocolStages.length - 1;
                            const isRowEnd = (i + 1) % 3 === 0;

                            return (
                                <div key={i} className="relative flex flex-col h-full">
                                    {/* 3D Flip Card Container */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        className={`card-container h-full flex-grow ${flippedCards.has(i) ? 'flipped' : ''}`}
                                        onClick={() => handleCardFlip(i)}
                                        style={{
                                            perspective: '1000px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {/* Card Inner - 3D Transform */}
                                        <div
                                            className="card-inner relative w-full h-full min-h-[280px]"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        >
                                            {/* Card Front */}
                                            <div
                                                className={`card-front absolute inset-0 w-full h-full rounded ${isFirst
                                                    ? 'bg-white/[0.03] border-2 border-orange-500 shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
                                                    : isLast ? 'bg-white/[0.03] border border-orange-500/50 shadow-[#FF9500]/20 shadow-[0_0_15px] animate-pulse-slow' : 'bg-white/[0.03] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm'
                                                    } p-6 relative flex flex-col`}
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                }}
                                            >
                                                {/* Version Tag (Top Right) */}
                                                <div className={`absolute top-4 right-4 font-mono text-sm md:text-base font-bold px-2 py-1 rounded ${isFirst ? 'bg-orange-500 text-black' : 'bg-white/5 text-orange-500'}`}>
                                                    {stage.version}
                                                </div>

                                                {/* Month Marker */}
                                                <div className="font-mono text-xs md:text-sm text-orange-500/80 mb-2 tracking-widest mt-1">
                                                    {stage.month}
                                                </div>

                                                {/* Stage Title */}
                                                <h4 className={`text-xl md:text-2xl font-bold mb-2 mt-auto ${isFirst || isLast ? 'text-white' : 'text-zinc-300'}`}>
                                                    {stage.title}
                                                </h4>

                                                {/* Technical Description */}
                                                <p className={`text-xs md:text-sm font-mono uppercase tracking-wider leading-relaxed ${isFirst || isLast ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                                    {stage.desc}
                                                </p>
                                            </div>

                                            {/* Card Back - Technical Objective */}
                                            <div
                                                className={`card-back absolute inset-0 w-full h-full bg-black border ${isLast ? 'border-orange-500 shadow-[#FF9500]/30 shadow-[0_0_20px]' : 'border-orange-500/50'} p-6 rounded flex flex-col`}
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)',
                                                }}
                                            >
                                                {/* Orange Pulse Glow on Flip */}
                                                <div className="absolute inset-0 bg-orange-500/5 pointer-events-none rounded" />

                                                {/* Technical Objective Header */}
                                                <div className="font-mono text-xs text-orange-500 mb-3 tracking-tight">
                                                    // TECHNICAL_OBJECTIVE
                                                </div>

                                                {/* Technical Description */}
                                                <p className="text-zinc-300 text-sm md:text-base leading-relaxed flex-grow overflow-y-auto pr-2 custom-scrollbar">
                                                    {stage.technicalObjective}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Desktop Snaking Connectors */}
                                    {/* Horizontal Line to Right (Stages 1, 2, 4, 5) */}
                                    {!isLast && !isRowEnd && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 md:-right-8 w-4 md:w-8 h-[2px] bg-orange-500/50 z-0">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-orange-500 transform rotate-45" />
                                        </div>
                                    )}

                                    {/* Carriage Return Connector (Stage 3 to 4) */}
                                    {i === 2 && (
                                        <>
                                            {/* Short drop down from Stage 3 */}
                                            <div className="hidden md:block absolute -bottom-4 right-1/2 w-[2px] h-4 bg-orange-500/50 z-0" />

                                            {/* Long horizontal line from Stage 3 to Stage 4 */}
                                            <div className="hidden md:block absolute -bottom-4 right-1/2 w-[calc(200%+4rem)] h-[2px] bg-orange-500/50 z-0" />

                                            {/* Short drop down into Stage 4 */}
                                            <div className="hidden md:block absolute -bottom-8 right-[calc(50%+200%+4rem)] w-[2px] h-4 bg-orange-500/50 z-0">
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                    <ChevronDown className="w-4 h-4 text-orange-500 translate-y-3/4" />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Mobile Vertical Connectors */}
                                    {!isLast && (
                                        <div className="md:hidden flex justify-center py-3">
                                            <div className="w-[2px] h-6 bg-orange-500/50 flex items-end justify-center">
                                                <ChevronDown className="w-4 h-4 text-orange-500 transform translate-y-2" />
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
