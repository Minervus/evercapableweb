import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    // STEP 1
    [
        { id: "age", label: "AGE //", type: "text", required: true },
        { id: "currentStats", label: "CURRENT WEIGHT & HEIGHT //", type: "text", required: true },
        { id: "primaryConstraint", label: "PRIMARY CONSTRAINT // (Time, Knowledge, Consistency)", type: "text", required: true },
    ],
    // STEP 2
    [
        { id: "yearsLifting", label: "YEARS CONSECUTIVE LIFTING //", type: "text", required: true },
        { id: "currentSplit", label: "CURRENT WEEKLY TRAINING SPLIT //", type: "text", required: true },
        { id: "failedDiets", label: "PREVIOUSLY CALIBRATED DIETS (AND WHY THEY FAILED) //", type: "textarea", required: true },
    ],
    // STEP 3
    [
        { id: "proteinIntake", label: "EST. DAILY PROTEIN INTAKE (GRAMS) //", type: "text", required: true },
        { id: "macroTracking", label: "CURRENT MACRO TRACKING PROFICIENCY (1-10) //", type: "text", required: true },
        { id: "dietaryRestrictions", label: "BIOLOGICAL/DIETARY RESTRICTIONS //", type: "textarea", required: true },
    ],
    // STEP 4
    [
        { id: "primaryGoal", label: "PRIMARY SYSTEM OBJECTIVE // (Muscle Gain, Fat Loss, Recomp)", type: "text", required: true },
        { id: "sixMonthMetric", label: "MANDATORY: 6-MONTH METRIC TO HIT //", type: "text", required: true },
        { id: "idealPhysique", label: "DESCRIBE THE 'IDEAL' PHYSIQUE OUTCOME //", type: "textarea", required: true },
    ],
    // STEP 5
    [
        { id: "injuries", label: "EXISTING HISTORICAL INJURIES/LIMITATIONS //", type: "textarea", required: true },
        { id: "sleepQuality", label: "AVERAGE SLEEP QUALITY METRIC (1-10) //", type: "text", required: true },
        { id: "lifeStressor", label: "PRIMARY CAREER/LIFE STRESSOR //", type: "text", required: true },
    ],
    // STEP 6
    [
        { id: "dataLogging", label: "WILL YOU LOG BIOMETRICS DAILY? (Y/N) //", type: "text", required: true },
        { id: "coachability", label: "COACHABILITY METRIC (1-10) //", type: "text", required: true },
    ],
];

export default function ProProtocol() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [contractAgreed, setContractAgreed] = useState(false);

    // Validation
    const currentStepQuestions = questions[currentStep - 1];
    const isStepValid = currentStepQuestions.every((q) => {
        if (!q.required) return true;
        return !!formData[q.id] && formData[q.id].trim().length > 0;
    });

    const canProceed = isStepValid && (currentStep !== 6 || contractAgreed);

    const handleInputChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (canProceed && currentStep < 6) setCurrentStep((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((p) => p - 1);
    };

    const handleSubmit = async () => {
        if (!canProceed) return;
        setIsSubmitting(true);

        try {
            // PASTE FORMSPREE ID HERE
            // e.g. "https://formspree.io/f/xyzaqrwb"
            const url = "https://formspree.io/f/YOUR_ID_HERE";

            const payload = { ...formData, "80_Percent_Rule_Agreed": contractAgreed ? "YES" : "NO" };

            // Make the actual request (uncomment when Formspree ID is ready)
            /*
            await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json", "Accept": "application/json" },
              body: JSON.stringify(payload),
            });
            */

            // Simulate network request for the UI
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setUploadSuccess(true);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // SUCCESS STATE (Terminal UI)
    if (uploadSuccess) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] font-mono text-zinc-300 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl w-full"
                >
                    <div className="text-orange-500 mb-6 font-bold tracking-widest uppercase">
                        {">"} UPLOADING_BIO_DATA... SUCCESS.<br />
                        {">"} // DATA_RECEIVED
                    </div>

                    <p className="mb-6 leading-relaxed">
                        Your biological calibration is now in the queue. Lead Engineer Tony is personally auditing your goals and constraints.
                    </p>

                    <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-sm mb-10">
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2">NEXT_STEP:</p>
                        <p className="text-sm">
                            Check your inbox within 24 hours for your "System Validation" update. We will confirm your 6-month goal feasibility before initializing the partnership.
                        </p>
                    </div>

                    <Link href="/">
                        <button className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                            [ RETURN TO MAIN DIRECTORY ]
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    // FORM UI
    const progressPercentage = (currentStep / 6) * 100;

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-mono text-zinc-300 relative overflow-hidden pb-24 md:pb-0">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Progress Header */}
            <div className="fixed top-0 left-0 w-full z-10 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <span className="text-[10px] md:text-xs text-orange-500 tracking-widest uppercase">
             // INITIALIZING_PRO_PROTOCOL_CALIBRATION...
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] md:text-xs text-zinc-500">[{currentStep}/6]</span>
                        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 relative z-10">

                <div className="mb-12">
                    <h1 className="text-2xl md:text-4xl text-white font-bold tracking-tight mb-2 uppercase">
                        System Deep-Dive
                    </h1>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                        Provide precise, objective data. No estimates.
                    </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (currentStep === 6) handleSubmit(); else handleNext(); }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            {currentStepQuestions.map((q) => (
                                <div key={q.id} className="group relative">
                                    <label htmlFor={q.id} className="block text-xs md:text-sm text-zinc-400 mb-3 tracking-widest uppercase transition-colors group-focus-within:text-orange-500">
                                        {q.label}
                                    </label>

                                    {q.type === "textarea" ? (
                                        <textarea
                                            id={q.id}
                                            required={q.required}
                                            rows={4}
                                            value={formData[q.id] || ""}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-lg transition-colors resize-none pb-2 placeholder:text-zinc-800"
                                            placeholder="[ INPUT_DATA... ]"
                                        />
                                    ) : (
                                        <input
                                            type={q.type}
                                            id={q.id}
                                            required={q.required}
                                            value={formData[q.id] || ""}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-lg transition-colors pb-2 placeholder:text-zinc-800"
                                            placeholder="[ INPUT_DATA... ]"
                                        />
                                    )}
                                </div>
                            ))}

                            {/* The Contract Toggle (Only on Step 6) */}
                            {currentStep === 6 && (
                                <div className="mt-16 pt-8 border-t border-white/5">
                                    <div className="bg-orange-500/5 p-6 border border-orange-500/20 rounded-sm">
                                        <p className="text-orange-500 text-sm font-bold tracking-wider mb-4 uppercase">
                                            CRITICAL: THE 80% RULE
                                        </p>
                                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-6">
                                            By toggling this switch, you agree to the foundational system contract: If you execute your custom protocols with 80% or greater consistency over 24 weeks, and you do not hit your target, Lead Engineer Tony will coach you for free until you do. If you fail to maintain 80% compliance, the warranty is void.
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-widest text-zinc-400">
                                                Acknowledge & Accept Terms
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setContractAgreed(!contractAgreed)}
                                                className={`relative w-16 h-8 rounded-full transition-colors duration-300 outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] ${contractAgreed ? 'bg-orange-500 shadow-[0_0_15px_rgba(255,102,0,0.4)]' : 'bg-white/10'
                                                    }`}
                                                data-testid="contract-toggle"
                                            >
                                                <span
                                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform duration-300 flex items-center justify-center ${contractAgreed ? 'translate-x-8' : 'translate-x-0'
                                                        }`}
                                                >
                                                    {contractAgreed && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8 pb-10">
                        <button
                            type="button"
                            disabled={currentStep === 1 || isSubmitting}
                            onClick={handlePrev}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-zinc-500 text-xs md:text-sm tracking-widest uppercase p-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden md:inline">Go Back</span>
                        </button>

                        {currentStep < 6 ? (
                            <button
                                type="button"
                                disabled={!canProceed}
                                onClick={handleNext}
                                className={`flex items-center gap-2 px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase transition-all
                  ${canProceed
                                        ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                        : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                                    }`}
                            >
                                Proceed to Stage 0{currentStep + 1}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!canProceed || isSubmitting}
                                className={`flex items-center gap-2 px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase transition-all
                  ${canProceed && !isSubmitting
                                        ? 'bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(255,102,0,0.4)]'
                                        : 'bg-orange-500/20 text-orange-500/50 cursor-not-allowed'
                                    }`}
                            >
                                {isSubmitting ? '[ TRANSMITTING... ]' : '[ TRANSMIT_DATA ]'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
