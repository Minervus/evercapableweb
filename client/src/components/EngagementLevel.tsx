import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function EngagementLevel() {
    const scrollToBlueprint = () => {
        const element = document.querySelector("#blueprint");
        if (element) {
            const headerOffset = 100;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.max(0, elementTop - headerOffset),
                behavior: "smooth",
            });
        }
    };

    const scrollToPro = () => {
        const element = document.querySelector("#pro-coaching");
        if (element) {
            const headerOffset = 100;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.max(0, elementTop - headerOffset),
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-20 bg-[#0a0a0a] border-y border-zinc-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-mono text-zinc-400 uppercase tracking-widest text-sm md:text-base">
            // SELECT_YOUR_ENGAGEMENT_LEVEL
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
                    {/* Card 01: The Blueprint */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col h-full bg-[#111] border border-zinc-800 rounded-xl p-8 hover:bg-[#151515] transition-colors relative"
                    >
                        <div className="font-mono text-zinc-500 text-sm mb-6 uppercase tracking-wider">
                            01 // THE_BLUEPRINT_PROTOCOL
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Autonomous Execution
                        </h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed flex-grow">
                            A 24-week, 6-stage biological roadmap. You get the system, the telemetry tracking, and the protocol. You provide the discipline.
                        </p>
                        <button
                            onClick={scrollToBlueprint}
                            className="font-mono text-[#FF9500] hover:text-[#FF9500]/80 transition-colors uppercase tracking-wider text-sm flex items-center gap-2 group w-max mt-auto relative"
                        >
                            EXPLORE_THE_STAGES
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </button>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-10">
                            <div className="w-px h-8 bg-gradient-to-b from-[#FF9500]/50 to-transparent"></div>
                            <ChevronDown className="w-5 h-5 text-[#FF9500] absolute bottom-1" />
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center z-10 mb-2">
                            <div className="w-px h-16 bg-gradient-to-b from-[#FF9500]/50 to-transparent"></div>
                            <ChevronDown className="w-5 h-5 text-[#FF9500] absolute bottom-1" />
                        </div>
                    </motion.div>

                    {/* Card 02: The Pro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col h-full bg-white border border-zinc-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-xl p-8 hover:bg-zinc-50 hover:border-orange-500/50 transition-all relative mt-16 md:mt-0"
                    >
                        <div className="font-mono text-[#FF9500] text-sm mb-6 uppercase tracking-wider font-bold">
                            02 // THE_PRO_PROTOCOL
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                            Strategic Partnership
                        </h3>
                        <p className="text-zinc-600 mb-8 leading-relaxed flex-grow font-medium">
                            High-fidelity, 1-on-1 coaching. Includes the Forever Guarantee, bi-weekly data audits, and direct access for real-time protocol calibration.
                        </p>
                        <button
                            onClick={scrollToPro}
                            className="font-mono text-[#FF9500] hover:text-[#FF9500]/80 transition-colors uppercase tracking-wider text-sm flex items-center gap-2 group w-max mt-auto font-bold"
                        >
                            VIEW_PRO_SPECS
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </button>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-10">
                            <div className="w-px h-8 bg-gradient-to-b from-[#FF9500]/50 to-transparent"></div>
                            <ChevronDown className="w-5 h-5 text-[#FF9500] absolute bottom-1" />
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center z-10 mb-2">
                            <div className="w-px h-16 bg-gradient-to-b from-[#FF9500]/50 to-transparent"></div>
                            <ChevronDown className="w-5 h-5 text-[#FF9500] absolute bottom-1" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
