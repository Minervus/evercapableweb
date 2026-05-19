import { motion } from "framer-motion";
import { Clock, RefreshCcw, BatteryLow, FileX } from "lucide-react";

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
                            Sound Familiar?
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                            You're working harder than ever. Your body doesn't show it.
                        </h2>
                        <p className="text-zinc-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
                            You've got the drive. But between the job, the kids, and the travel, your health keeps slipping. Here's what we hear most.
                        </p>
                    </div>

                    {/* The 4 Themes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                                    <Clock size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-white text-base font-bold tracking-wide">
                                    Never Enough Time
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-center flex-grow">
                                Between work and family commitments, finding two hours a day for the gym feels completely impossible.
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
                                    <RefreshCcw size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-white text-base font-bold tracking-wide">
                                    The Same 10 lbs, Over and Over
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-center flex-grow">
                                You lose the same 10 pounds just to gain it right back the exact minute work or life gets stressful.
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
                                <span className="font-mono text-white text-base font-bold tracking-wide">
                                    Running on Empty
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-center flex-grow">
                                You crash hard at 3 PM and rely on three cups of coffee just to drag yourself to the finish line of the workday.
                            </p>
                        </motion.div>

                        {/* Point 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-6 hover:border-[#FF6600]/30 transition-colors duration-300 flex flex-col group"
                        >
                            <div className="flex flex-col items-center mb-6 text-center relative">
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#FF6600]/30">
                                    <FileX size={24} strokeWidth={1.25} color="#FF6600" className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                                </div>
                                <span className="font-mono text-white text-base font-bold tracking-wide">
                                    Nothing Has Lasted
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-center flex-grow">
                                You've tried the apps, the keto diets, the bootcamps. Nothing sticks. And the thought of ending up with the same health problems as your dad or grandfather keeps nagging at you.
                            </p>
                        </motion.div>
                    </div>

                    {/* Transition Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-16 pt-12 border-t border-zinc-800/50 text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            It is not your fault.
                        </h3>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            You don't need another generic plan. You need a system built for your actual life.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
