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
        desc: "Upload your heavy lifts; I provide frame-by-frame corrections to ensure maximum skeletal loading while reducing injury risk.",
    },
    {
        title: "Priority Messaging Access",
        desc: "Direct encrypted messaging with a guaranteed < 24-hour response time.",
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
        <section id="pro-coaching" className="pt-32 pb-24 bg-white text-zinc-900 relative scroll-mt-20 overflow-hidden">
            {/* Technical Notch/Slant Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
                <svg
                    className="relative block w-full h-[40px] md:h-[60px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M1200 0L0 0 0 120 1200 0z"
                        className="fill-[#0A0A0B]"
                    ></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                                For those that value results and time above all else. I don't just give you the map; I have one hand on the wheel.
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

                    {/* Right Column: Verified Client Review */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div
                            className="bg-[#0D0D0D] rounded-2xl overflow-hidden relative flex flex-col"
                            style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                        >
                            {/* Decorative quote watermark */}
                            <Quote className="absolute top-6 right-6 text-white/20 w-12 h-12" />

                            {/* Card Header: Avatar + Client Info */}
                            <div className="px-8 pt-8 pb-6 flex items-center gap-4 border-b border-white/[0.06]">
                                <div className="w-11 h-11 rounded-full border border-white/10 overflow-hidden flex-shrink-0">
                                    <img src="/gary.jpeg" alt="Verified Pro Protocol Member" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm leading-none mb-1">Gary Y.</p>
                                    <p className="font-mono text-xs text-zinc-500">// Software Engineering Lead</p>
                                </div>
                            </div>

                            {/* Quote Body */}
                            <div className="px-8 py-8 flex-1">
                                <p className="text-zinc-300 text-base md:text-lg leading-[1.8]">
                                    "Tony has a great{" "}
                                    <span className="text-orange-500 font-medium">attention to detail</span>
                                    , making him the perfect coach to help assess my overall health routine—from habits, to exercise, to nutrition—and find the best way for me to improve. Not only that, but he has a genuine interest in the subject matter and{" "}
                                    <span className="text-orange-500 font-medium">nerds out about it</span>
                                    . I couldn't have asked for a better coach to not only provide me guidance, but also educate me on the{" "}
                                    <span className="text-orange-500 font-medium">underlying reasoning</span>
                                    {" "}as well."
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="px-8 pb-6 border-t border-white/[0.06] pt-5">
                                <p className="text-zinc-500 text-sm italic">— Pro Protocol Member</p>
                            </div>

                            {/* File Info Footer */}
                            <div className="px-8 py-4 bg-white/[0.03] border-t border-white/[0.06] flex items-center justify-between">
                                <span className="font-mono text-xs text-zinc-600">PRTCL: PRO_v2.1</span>
                                <span className="font-mono text-xs text-zinc-600">FOCUS: FULL_SYSTEM_AUDIT</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
