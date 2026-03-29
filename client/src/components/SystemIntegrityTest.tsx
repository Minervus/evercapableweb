import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Terminal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
    id: string;
    category: string;
    text: string;
    options: { label: string; value: number }[];
    tip: string;
}

const QUESTIONS: Question[] = [
    {
        id: "structural",
        category: "STRUCTURAL",
        text: "Do joint issues or 'nagging pain' dictate your workout intensity?",
        options: [
            { label: "[ NO ] – I train without restriction", value: 25 },
            { label: "[ YES ] – I have to modify or skip completely", value: 0 },
            { label: "[ NOT_TRAINING ] – I'm not training right now", value: 0 },
        ],
        tip: "> QUICK WIN (STRUCTURAL): Implement Daily Dead Hangs. Accumulate 2 minutes to decompress the spine and build shoulder resilience.",
    },
    {
        id: "metabolic",
        category: "METABOLIC",
        text: "Do you experience a '3 PM Crash' or heavy reliance on caffeine to function?",
        options: [
            { label: "[ NO ] – My energy is stable all day", value: 25 },
            { label: "[ YES ] – I crash hard in the afternoon", value: 0 },
        ],
        tip: "> QUICK WIN (METABOLIC): The 30g Protocol. Consume 30g of protein within 30 minutes of waking to stabilize your daily glucose curve.",
    },
    {
        id: "force",
        category: "FORCE",
        text: "Could you carry 50lbs for a mile right now without needing a full recovery day?",
        options: [
            { label: "[ YES ] – Easily. I am durably built.", value: 25 },
            { label: "[ NO ] – That would destroy me.", value: 0 },
        ],
        tip: "> QUICK WIN (FORCE): Farmer's Carries. Add heavy 60-second loaded carries to your weekly routine to build foundational work capacity.",
    },
    {
        id: "consistency",
        category: "CONSISTENCY",
        text: "Does your fitness plan completely break during travel or high-stress deadlines?",
        options: [
            { label: "[ NO ] – I adapt and maintain momentum", value: 25 },
            { label: "[ YES ] – It's all or nothing for me", value: 0 },
        ],
        tip: "> QUICK WIN (CONSISTENCY): The 5-Minute Minimum. On chaotic days, execute 5 minutes of continuous bodyweight movement. Never score a zero.",
    },
];

export function SystemIntegrityTest() {
    const [step, setStep] = useState(0); // 0: Intro, 1-4: Questions, 5: Analyzing, 6: Results/Lead, 7: Success
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    const handleStart = () => setStep(1);

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));

        if (step < QUESTIONS.length) {
            setStep(step + 1);
        } else {
            setStep(5); // Move to analyzing
        }
    };

    useEffect(() => {
        if (step === 5) {
            const timer = setTimeout(() => {
                setStep(6);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const url = "https://formspree.io/f/xdawwwqd"; // using the same endpoint as main form
            const payload = {
                formType: "Integrity_Test_Lead_Capture",
                email: email,
                IntegrityScore: calculateScore(),
                metrics: answers
            };

            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            setStep(7);
        } catch (error) {
            console.error("Submission failed:", error);
            setStep(7); // Show success anyway to not block user
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateScore = () => {
        const sum = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
        return sum; // Max is 100
    };

    const score = calculateScore();
    const getWeaknesses = () => {
        return QUESTIONS.filter((q) => answers[q.id] === 0);
    };
    const weaknesses = getWeaknesses();
    const tipsToShow = weaknesses.length > 0 ? weaknesses.slice(0, 2) : [QUESTIONS[0], QUESTIONS[1]]; // Show first two if perfect score

    return (
        <section id="system-integrity-test" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden font-mono border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="border border-white/10 bg-black/50 p-6 md:p-12 min-h-[450px] flex flex-col justify-center relative">

                    <AnimatePresence mode="wait">
                        {/* STEP 0: INTRO */}
                        {step === 0 && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <div className="inline-block p-3 bg-white/5 rounded-sm mb-6 border border-white/10">
                                    <Activity className="w-8 h-8 text-orange-500" />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                    The 2-Minute Health Integrity Test
                                </h2>
                                <p className="text-zinc-400 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
                                    Find out exactly where your body is losing energy and strength. Answer 4 quick questions to get your performance score. I will personally review your results and email you 2-3 specific "Quick Win" tips to start fixing your biggest leaks today.
                                </p>
                                <Button
                                    onClick={handleStart}
                                    className="bg-white hover:bg-zinc-200 text-black font-bold tracking-widest uppercase rounded-none px-8 py-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all"
                                >
                                    <Terminal className="w-4 h-4 mr-2" />
                                    [ SEE_MY_SCORE ]
                                </Button>
                            </motion.div>
                        )}

                        {/* STEPS 1-4: QUESTIONS */}
                        {step > 0 && step <= QUESTIONS.length && (
                            <motion.div
                                key={`q-${step}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex-1 flex flex-col justify-center"
                            >
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">
                                            // {QUESTIONS[step - 1].category}_METRIC
                                        </span>
                                        <span className="text-xs text-zinc-600 font-mono">
                                            0{step} / 0{QUESTIONS.length}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-3xl text-white leading-tight font-sans mb-8">
                                        {QUESTIONS[step - 1].text}
                                    </h3>
                                </div>

                                <div className="grid gap-4">
                                    {QUESTIONS[step - 1].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(QUESTIONS[step - 1].id, option.value)}
                                            className="w-full text-left p-5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-sm md:text-base text-zinc-300 font-mono tracking-wide flex items-center justify-between group"
                                        >
                                            {option.label}
                                            <ArrowRight className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5: ANALYZING */}
                        {step === 5 && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center w-full flex-1 flex flex-col items-center justify-center space-y-6"
                            >
                                <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                <div className="text-orange-500 font-bold tracking-widest uppercase">
                                    <div>{">"} COMPILING_TELEMETRY...</div>
                                    <div className="text-xs text-zinc-500 mt-2">CALCULATING_INTEGRITY_SCORE</div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 6: RESULTS & CAPTURE */}
                        {step === 6 && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full flex flex-col items-center text-center"
                            >
                                <div className="mb-8">
                                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">YOUR_SYSTEM_INTEGRITY_SCORE</p>
                                    <div className="text-7xl md:text-8xl font-bold font-mono tracking-tighter text-white mb-2">
                                        {score}<span className="text-2xl text-zinc-600">%</span>
                                    </div>
                                    {score === 100 ? (
                                        <>
                                            <p className="text-sm font-mono tracking-widest uppercase text-orange-500 mb-1">
                                                [ 100%_FOUNDATION_DETECTED ]
                                            </p>
                                            <p className="text-xs font-mono tracking-widest uppercase text-green-500">
                                                [ STATUS: SYSTEM_INTEGRITY_HIGH ]
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm font-mono tracking-widest uppercase text-green-500">
                                            [ ANALYSIS_COMPLETE ]
                                        </p>
                                    )}
                                </div>

                                <div className="w-full border-t border-white/10 pt-8 mt-4">
                                    {score === 100 ? (
                                        <>
                                            <p className="text-zinc-300 font-sans text-sm mb-6 max-w-md mx-auto leading-relaxed">
                                                Well done on building a great foundation. You've mastered the variables that most men in their 30s and 40s ignore. My mission at EverCapable is building systems for men moving from 0 to 1—reclaiming health that was lost to career and family friction. If you are already at your peak, you likely don't need this protocol. However, if you have the foundation but feel you aren't where you want to be—or you're struggling to maintain this standard as your life scales—then let's chat.
                                            </p>
                                            <form onSubmit={handleSubmitEmail} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto mb-4">
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="ENTER_EMAIL_ADDRESS"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="flex-1 bg-white/5 border border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-white text-sm tracking-widest placeholder:text-zinc-600 rounded-none transition-colors"
                                                />
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-widest uppercase rounded-none px-6 py-6"
                                                >
                                                    {isSubmitting ? "[ SENDING... ]" : "[ REQUEST_MAINTENANCE_AUDIT ]"}
                                                </Button>
                                            </form>
                                            <p className="text-[10px] md:text-xs font-mono text-zinc-500 max-w-md mx-auto leading-relaxed text-left">
                                                <span className="text-orange-500 mr-2">{">"}</span>
                                                {"[ SYSTEM_NOTE ]: Enter your email, and I'll send over 2-3 specific \"Maintenance & Scaling\" tips. I manually review every 100% audit to see if there are high-level leaks in your longevity architecture."}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-zinc-400 font-sans text-sm mb-6 max-w-md mx-auto">
                                                Enter your email below, and I'll send over 2-3 quick wins based on your answers that you can get started on today.
                                            </p>
                                            <form onSubmit={handleSubmitEmail} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto mb-4">
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="ENTER_EMAIL_ADDRESS"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="flex-1 bg-white/5 border border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-white text-sm tracking-widest placeholder:text-zinc-600 rounded-none transition-colors"
                                                />
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-widest uppercase rounded-none px-6 py-6"
                                                >
                                                    {isSubmitting ? "[ SENDING... ]" : "SEND_ME_QUICK_TIPS"}
                                                </Button>
                                            </form>
                                            <p className="text-[10px] md:text-xs font-mono text-zinc-500 max-w-md mx-auto leading-relaxed text-left">
                                                <span className="text-orange-500 mr-2">{">"}</span> Note: These aren't AI-generated suggestions. I manually review every audit to ensure the advice fits your specific career and family constraints.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 7: SUCCESS */}
                        {step === 7 && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center w-full flex flex-col items-center justify-center space-y-6"
                            >
                                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Transmission Secured</h3>
                                <p className="text-zinc-400 font-sans max-w-sm mx-auto leading-relaxed">
                                    The 6-Stage Repair Manual has been dispatched to your inbox. It's time to rebuild the system.
                                </p>
                                <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs tracking-widest uppercase">
                 // READY_WHEN_YOU_ARE: INITIALIZE_STAGE_01 TO BEGIN
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}
