import { motion } from "framer-motion";
import { Activity, Zap, TrendingUp } from "lucide-react";
import dashboardImage from "@assets/dashboard_preview.png";
import dataOverlay from "@assets/data_overlay.png";
import mobileOverlay from "@assets/mobile_overlay.png";

export function DataSection() {
    return (
        <section className="py-20 md:py-28 bg-zinc-900 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-6">
                            <span className="font-mono text-orange-500 uppercase tracking-wider text-sm font-medium block mb-2">
                // DATA: VISUALIZING YOUR PROGRESS
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Your Dashboard: Zero Guesswork
                            </h2>
                            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                                We track the metrics that actually matter. No more wondering if what you're doing is working. See your strength, consistency, and bio-feedback trends in real-time.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Bio-Feedback Tracking</h3>
                                    <p className="text-zinc-400">Monitor sleep, stress, and energy levels to optimize your performance.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Strength Milestones</h3>
                                    <p className="text-zinc-400">Clear visuals of your lifting progress and personal bests.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Consistency Trends</h3>
                                    <p className="text-zinc-400">Focus on trends and consistency to build sustainable habits.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl shadow-2xl border border-zinc-800 bg-zinc-800/50 group">
                            <img
                                src={dashboardImage}
                                alt="EverCapable App Dashboard"
                                className="w-full h-auto object-cover relative z-10 rounded-2xl"
                            />

                            {/* Data Overlay - Spills over Top-Right */}
                            <motion.img
                                src={dataOverlay}
                                alt="Data Metrics"
                                className="absolute -top-[30%] -right-[45%] w-[88%] md:w-[75%] shadow-2xl rounded-xl z-20"
                                initial={{ opacity: 0, y: -40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            />

                            {/* Mobile Overlay - Spills over Bottom-Left */}
                            <motion.img
                                src={mobileOverlay}
                                alt="Mobile Workout View"
                                className="absolute -bottom-[30%] -left-[20%] w-[85%] md:w-[72%] shadow-2xl rounded-[2.5rem] z-30"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            />

                            {/* Decorative elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/5 blur-3xl rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
