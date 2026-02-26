import { XCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Familiar() {
    const points = [
        "Tried strict diets but regained it all.",
        "Hit the gym hard, then injured or quit.",
        "Apps/programs that ignore real life.",
        "Now get systems that last."
    ];

    return (
        <section className="py-20 md:py-24 bg-zinc-950 border-y border-zinc-800">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="border border-[#FF9500]/30 bg-black/50 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-xl"
                >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF9500]"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        Sound familiar?
                    </h2>

                    <div className="flex flex-col gap-5">
                        {points.map((point, index) => {
                            const isLast = index === points.length - 1;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={`flex items-start gap-4 ${isLast ? 'pt-5 mt-2 border-t border-zinc-800/80' : ''}`}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        {isLast ? (
                                            <ArrowRight className="w-6 h-6 text-[#FF9500]" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-[#FF9500]/80" />
                                        )}
                                    </div>
                                    <p className={`text-lg md:text-xl ${isLast ? 'text-white font-semibold' : 'text-zinc-300'}`}>
                                        {point}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
