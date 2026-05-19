import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function TrustSection() {
    return (
        <section className="py-20 md:py-32 bg-background border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0A0A0A] border border-zinc-800/60 rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden group"
                >
                    {/* Subtle gradient glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6600]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:bg-[#FF6600]/10 transition-colors duration-700"></div>

                    <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#FF6600] uppercase mb-12">
                        Client Feedback
                    </p>

                    <div className="grid md:grid-cols-[40%_1fr] gap-12 md:gap-20 items-start relative z-10">
                        {/* Left Column: User Profile */}
                        <div className="flex flex-col gap-6">
                            <Avatar className="w-24 h-24 border border-zinc-800">
                                <AvatarImage src="/gary.jpeg" alt="Gary Y." className="object-cover" />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400 font-medium tracking-widest text-lg">GY</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-serif text-3xl tracking-wide text-white mb-2">Gary Y.</p>
                                <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF6600] uppercase">
                                    Software Engineering Lead
                                </p>
                            </div>


                        </div>

                        {/* Right Column: Quote */}
                        <div className="space-y-10 relative">
                            {/* Desktop inner divider */}
                            <div className="absolute left-[-24px] top-2 bottom-2 w-[2px] bg-zinc-800 hidden md:block"></div>

                            <div className="relative pl-0 md:pl-6">
                                <h3 className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-orange-500/50"></span>
                                    What he said
                                </h3>

                                <div className="relative pl-6">
                                    <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#FF6600]"></div>
                                    <p className="text-zinc-300 font-sans text-base md:text-xl leading-relaxed tracking-wide">
                                        "Tony has a great <span className="text-orange-500 font-medium">attention to detail</span>, making him the perfect coach to help assess my overall health routine—from habits, to exercise, to nutrition—and find the best way for me to improve. Not only that, but he has a genuine interest in the subject matter and <span className="text-orange-500 font-medium">nerds out about it</span>. I couldn't have asked for a better coach to not only provide me guidance, but also educate me on the <span className="text-orange-500 font-medium">underlying reasoning</span> as well."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
