import { motion } from "framer-motion";
import { RefreshCcw, ZapOff, BatteryLow } from "lucide-react";

export function Familiar() {
    return (
        <section className="relative py-16 md:py-24 bg-black border-y border-zinc-900 overflow-hidden">
            {/* Subtle Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(rgba(255, 102, 0, 0.03) 1px, transparent 1px),
                        linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px, 100% 4px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="mb-12 md:mb-16 text-center">
                        <p className="font-mono text-sm tracking-widest text-[#FF9500]/80 mb-4 uppercase">
                            // THE_COMMON_FRICTION
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            The cycle that's holding you back.
                        </h2>
                    </div>

                    {/* The Three Themes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Point 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-6 hover:border-[#FF6600]/30 transition-colors duration-300 flex flex-col group"
                        >
                            <div className="flex flex-col items-center mb-6 text-center relative">
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#FF6600]/30">
                                    <RefreshCcw size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-[#FF9500] text-sm font-medium tracking-wide">
                                    [01] THE_REBOUND
                                </span>
                            </div>
                            <p className="text-zinc-300 text-base md:text-lg leading-relaxed text-left flex-grow">
                                You've seen progress before, only to watch it slip away months later—often leaving you worse off than when you started.
                            </p>
                        </motion.div>

                        {/* Point 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-6 hover:border-[#FF6600]/30 transition-colors duration-300 flex flex-col group"
                        >
                            <div className="flex flex-col items-center mb-6 text-center relative">
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#FF6600]/30">
                                    <ZapOff size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-[#FF9500] text-sm font-medium tracking-wide">
                                    [02] THE_FALLACY
                                </span>
                            </div>
                            <p className="text-zinc-300 text-base md:text-lg leading-relaxed text-left flex-grow">
                                Generic plans fail because they don't account for real-life friction. If a plan requires 'perfect' conditions, it's a liability.
                            </p>
                        </motion.div>

                        {/* Point 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-6 hover:border-[#FF6600]/30 transition-colors duration-300 flex flex-col group"
                        >
                            <div className="flex flex-col items-center mb-6 text-center relative">
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#FF6600]/30">
                                    <BatteryLow size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-[#FF9500] text-sm font-medium tracking-wide">
                                    [03] THE_TRAP
                                </span>
                            </div>
                            <p className="text-zinc-300 text-base md:text-lg leading-relaxed text-left flex-grow">
                                White-knuckling through intensity works for three weeks. But when motivation inevitably fades, you're back at square one.
                            </p>
                        </motion.div>
                    </div>

                    {/* Transition Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-16 pt-8 border-t border-zinc-800/50 text-center"
                    >
                        <p className="text-zinc-500 text-base md:text-lg leading-relaxed italic max-w-2xl mx-auto">
                            "I spent years in this cycle. I didn't need more motivation; I needed a better way to manage the reality of a high-performance life."
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
