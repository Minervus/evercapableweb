import { Shield } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function TrustSection() {
    return (
        <section className="py-20 bg-background border-t border-white/5">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-stretch">

                    {/* Column 1: The Forever Guarantee */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                    >
                        <Card className="h-full bg-primary/5 border-orange-500/20 rounded-2xl flex flex-col justify-center p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Shield className="w-24 h-24 text-primary" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-white/5">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>

                                <p className="font-mono text-[10px] text-orange-500 uppercase tracking-[0.2em] mb-4">
                  // THE_FOREVER_GUARANTEE
                                </p>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                                    The Forever<br />Guarantee
                                </h2>

                                <p className="text-zinc-400 leading-relaxed font-sans text-lg">
                                    If you maintain 90% protocol consistency and do not reach your 6-month primary milestone—established during your initial Stage 01 Calibration—I will coach you for free until the objective is met. My time is on the line because the system is engineered to work.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Column 2: The Gary Y Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full"
                    >
                        <Card className="h-full bg-[#0A0A0A] border-zinc-800/50 rounded-2xl flex flex-col p-8 md:p-12 relative shadow-2xl">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12 border border-orange-500/20">
                                        <AvatarImage src="/gary.jpeg" alt="Gary Y." className="object-cover" />
                                        <AvatarFallback className="bg-zinc-900 text-orange-500 font-mono text-xs">GY</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-lg leading-none mb-1">Gary Y.</span>
                                        <span className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-wider">
                      // Software Engineering Lead
                                        </span>
                                    </div>
                                </div>
                                {/* Quote Icon */}
                                <div className="opacity-10 select-none">
                                    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.4286 0C5.11429 0 0 5.11429 0 11.4286V21.4286C0 26.1429 3.85714 30 8.57143 30H11.4286C16.1429 30 20 26.1429 20 21.4286V8.57143C20 3.85714 16.1429 0 11.4286 0ZM31.4286 0C25.1143 0 20 5.11429 20 11.4286V21.4286C20 26.1429 23.8571 30 28.5714 30H31.4286C36.1429 30 40 26.1429 40 21.4286V8.57143C40 3.85714 36.1429 0 31.4286 0Z" fill="currentColor" className="text-zinc-600" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative border-t border-white/5 pt-10 flex-grow">
                                <p className="text-zinc-300 font-sans text-base md:text-xl leading-relaxed tracking-wide">
                                    "Tony has a great <span className="text-orange-500 font-medium">attention to detail</span>, making him the perfect coach to help assess my overall health routine—from habits, to exercise, to nutrition—and find the best way for me to improve. Not only that, but he has a genuine interest in the subject matter and <span className="text-orange-500 font-medium">nerds out about it</span>. I couldn't have asked for a better coach to not only provide me guidance, but also educate me on the <span className="text-orange-500 font-medium">underlying reasoning</span> as well."
                                </p>
                            </div>

                            <div className="mt-10 border-t border-white/5 pt-6 flex items-center justify-between">
                                <p className="text-zinc-500 font-mono text-[11px] tracking-tight italic uppercase">
                                    [ PRO_PROTOCOL_MEMBER ]
                                </p>
                                <div className="flex gap-6 opacity-40">
                                    <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase">
                                        PRTCL: PRO_v2.1
                                    </span>
                                    <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase">
                                        AUDIT: FULL_SYSTEM
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
