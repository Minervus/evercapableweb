import { motion } from "framer-motion";
import { Check, ArrowRight, Quote, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const valueStack = [
    {
        title: "Bi-Weekly Video Telemetry Briefings",
        desc: "Every 14 days, I record a deep-dive Loom review of your data. We audit your strength curves, sleep quality, and metabolic trends to pivot the protocol in real-time.",
    },
    {
        title: "Dynamic Plan Adjustments",
        desc: "Life is volatile. Whether it's international travel or a high-stress week, I manually rebuild your training and nutrition blocks to fit your current environment.",
    },
    {
        title: "Video Form Analysis",
        desc: "Upload your heavy lifts; I provide frame-by-frame corrections to ensure maximum skeletal loading with zero injury risk.",
    },
    {
        title: "24/7 Priority Access",
        desc: "Direct encrypted messaging for instant answers to your nutrition and training questions.",
    },
];

export function ProCoachingSection() {
    const scrollToContact = () => {
        const element = document.querySelector("#contact");
        if (element) {
            const headerOffset = 100; // Account for fixed header + padding
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementTop - headerOffset;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="pro-coaching" className="py-24 bg-white text-zinc-900 border-t border-zinc-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
                                The Pro Protocol: <br />
                                <span className="text-orange-600">Elite Partnership.</span>
                            </h2>
                            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                                For the man who values time above all else. We don’t just give you the map; I drive the vehicle.
                            </p>
                        </div>

                        <div className="space-y-8 mb-12">
                            {valueStack.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-zinc-900 text-lg mb-1 flex items-center gap-2">
                                            {item.title}
                                            {i === 0 && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    VERIFIED DATA
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button
                                onClick={scrollToContact}
                                size="lg"
                                className="bg-white hover:bg-zinc-50 text-zinc-900 border-2 border-zinc-900 font-bold px-10 py-7 text-lg w-full sm:w-auto rounded-none tracking-wide transition-all shadow-sm hover:shadow-md font-mono"
                            >
                                APPLY_FOR_PRO_PROTOCOL <ArrowRight className="ml-3 w-5 h-5" />
                            </Button>
                            <span className="text-zinc-500 text-sm font-medium">
                                Limited to 10 active clients to ensure maximum protocol fidelity.
                            </span>
                        </div>
                        <p className="mt-4 text-xs text-zinc-400 italic text-center sm:text-left">
                            Selection is based on protocol alignment and current capacity. Applicants will be contacted for a technical briefing if a spot is available.
                        </p>
                    </motion.div>

                    {/* Right Column: Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-zinc-50 p-10 md:p-14 border-l-4 border-orange-500 relative">
                            <Quote className="absolute top-6 left-6 text-orange-200 w-16 h-16 -z-10" />

                            <blockquote className="relative z-10">
                                <p className="text-xl md:text-2xl font-medium text-zinc-800 leading-relaxed mb-8 italic">
                                    "Tony didn’t just give me a workout; he gave me a decade of my life back. The data doesn't lie."
                                </p>
                                <footer className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
                                        {/* Placeholder for client avatar if needed */}
                                        <div className="w-full h-full bg-zinc-300 flex items-center justify-center text-zinc-500 font-bold">
                                            BC
                                        </div>
                                    </div>
                                    <div>
                                        <cite className="not-italic font-bold text-zinc-900 block">Beta Client</cite>
                                        <span className="text-orange-600 text-sm font-medium uppercase tracking-wider">Verified Result</span>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-zinc-100 -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
