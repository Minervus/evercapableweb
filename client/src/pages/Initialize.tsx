import { useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Plan label map
// ---------------------------------------------------------------------------
const PLAN_LABELS: Record<string, string> = {
    monthly: "MONTHLY ($285 / mo)",
    "6month": "6-MONTH ($1,495 / once — Save $215)",
    annual: "1-YEAR ($2,695 / once — Save $725)",
};

const TIMEZONES = [
    // Americas
    "America/Los_Angeles (PT — UTC-8/7)",
    "America/Denver (MT — UTC-7/6)",
    "America/Chicago (CT — UTC-6/5)",
    "America/New_York (ET — UTC-5/4)",
    "America/Halifax (AT — UTC-4/3)",
    "America/St_Johns (NT — UTC-3:30)",
    "America/Sao_Paulo (BRT — UTC-3)",
    "America/Anchorage (AKT — UTC-9/8)",
    "Pacific/Honolulu (HST — UTC-10)",
    "America/Toronto (ET — UTC-5/4)",
    "America/Vancouver (PT — UTC-8/7)",
    "America/Phoenix (MT no DST — UTC-7)",
    // Europe
    "Europe/London (GMT/BST — UTC+0/1)",
    "Europe/Dublin (IST — UTC+0/1)",
    "Europe/Lisbon (WET — UTC+0/1)",
    "Europe/Paris (CET — UTC+1/2)",
    "Europe/Berlin (CET — UTC+1/2)",
    "Europe/Amsterdam (CET — UTC+1/2)",
    "Europe/Madrid (CET — UTC+1/2)",
    "Europe/Rome (CET — UTC+1/2)",
    "Europe/Stockholm (CET — UTC+1/2)",
    "Europe/Helsinki (EET — UTC+2/3)",
    "Europe/Athens (EET — UTC+2/3)",
    "Europe/Bucharest (EET — UTC+2/3)",
    "Europe/Istanbul (TRT — UTC+3)",
    "Europe/Moscow (MSK — UTC+3)",
    // Africa
    "Africa/Cairo (EET — UTC+2)",
    "Africa/Johannesburg (SAST — UTC+2)",
    "Africa/Lagos (WAT — UTC+1)",
    "Africa/Nairobi (EAT — UTC+3)",
    // Middle East & Asia
    "Asia/Dubai (GST — UTC+4)",
    "Asia/Karachi (PKT — UTC+5)",
    "Asia/Kolkata (IST — UTC+5:30)",
    "Asia/Dhaka (BST — UTC+6)",
    "Asia/Bangkok (ICT — UTC+7)",
    "Asia/Jakarta (WIB — UTC+7)",
    "Asia/Singapore (SGT — UTC+8)",
    "Asia/Shanghai (CST — UTC+8)",
    "Asia/Hong_Kong (HKT — UTC+8)",
    "Asia/Manila (PHT — UTC+8)",
    "Asia/Seoul (KST — UTC+9)",
    "Asia/Tokyo (JST — UTC+9)",
    // Oceania
    "Australia/Perth (AWST — UTC+8)",
    "Australia/Darwin (ACST — UTC+9:30)",
    "Australia/Adelaide (ACST — UTC+9:30/10:30)",
    "Australia/Sydney (AEST — UTC+10/11)",
    "Australia/Brisbane (AEST — UTC+10)",
    "Pacific/Auckland (NZST — UTC+12/13)",
    "Pacific/Fiji (FJT — UTC+12)",
] as const;

// ---------------------------------------------------------------------------
// Question steps — Step 1 is the new contact details page
// ---------------------------------------------------------------------------
type FieldType = "text" | "email" | "textarea" | "select";

interface Question {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: readonly string[];
}

const questions: Question[][] = [
    // ── STEP 1: Contact Details (NEW) ─────────────────────────────────────────
    [
        { id: "fullName", label: "FULL NAME //", type: "text", required: true },
        { id: "emailAddress", label: "EMAIL ADDRESS //", type: "email", required: true },
        {
            id: "timezone",
            label: "TIMEZONE //",
            type: "select",
            required: true,
            options: TIMEZONES,
        },
    ],
    // ── STEP 2 ────────────────────────────────────────────────────────────────
    [
        { id: "age", label: "AGE //", type: "text", required: true },
        { id: "currentWeight", label: "CURRENT WEIGHT // (lbs)", type: "text", required: true },
        { id: "currentHeight", label: "CURRENT HEIGHT // (ft/in)", type: "text", required: true },
        { id: "primaryConstraint", label: "PRIMARY CONSTRAINT // (What's holding you back? Time, Knowledge, Consistency)", type: "text", required: true },
    ],
    // ── STEP 3 ────────────────────────────────────────────────────────────────
    [
        { id: "yearsLifting", label: "TRAINING HISTORY // (How many years of experience do you have with structured resistance training (Barbells, Dumbbells, etc)) //", type: "text", required: true },
        { id: "currentSplit", label: "CURRENT LOAD (Average weekly training frequency over the last 90 days?) //", type: "select", required: true, options: ["0 Days", "1-2 Days", "3-4 Days", "5+ Days"] },
        { id: "failedDiets", label: "PREVIOUSLY ATTEMPTED DIETS (AND what worked and what didn't) //", type: "textarea", required: true },
    ],
    // ── STEP 4 ────────────────────────────────────────────────────────────────
    [
        { id: "proteinIntake", label: "EST. DAILY PROTEIN INTAKE (GRAMS) //", type: "text", required: true },
        { id: "macroTracking", label: "CURRENT FOOD TRACKING PROFICIENCY (1-10 — 1=never, 10=daily) //", type: "text", required: true },
        { id: "dietaryRestrictions", label: "BIOLOGICAL/DIETARY RESTRICTIONS //", type: "textarea", required: true },
    ],
    // ── STEP 5 ────────────────────────────────────────────────────────────────
    [
        { id: "primaryGoal", label: "PRIMARY OBJECTIVE // (Muscle Gain, Fat Loss, Performance, Longevity, etc.)", type: "text", required: true },
        { id: "sixMonthMetric", label: "MANDATORY: 6-MONTH METRIC TO HIT (What does success look like in 6 months?) //", type: "text", required: true },
        { id: "idealPhysique", label: "DESCRIBE THE 'IDEAL' OUTCOME (How do you look and feel in 6 months?) //", type: "textarea", required: true },
    ],
    // ── STEP 6 ────────────────────────────────────────────────────────────────
    [
        { id: "injuries", label: "EXISTING HISTORICAL INJURIES/LIMITATIONS //", type: "textarea", required: true },
        { id: "sleepQuality", label: "AVERAGE SLEEP QUALITY METRIC (1-10 — 1=terrible, 10=perfect) //", type: "text", required: true },
        { id: "lifeStressor", label: "PRIMARY CAREER/LIFE STRESSOR (What's your biggest challenge right now?) //", type: "text", required: true },
    ],
    // ── STEP 7 (Contract) ─────────────────────────────────────────────────────
    [
        { id: "dataLogging", label: "WILL YOU LOG BIOMETRICS DAILY? (Y/N) //", type: "text", required: true },
        { id: "coachability", label: "COACHABILITY METRIC (1-10 — 1=resistant, 10=coachable) //", type: "text", required: true },
    ],
];

const TOTAL_STEPS = questions.length; // 7

// ---------------------------------------------------------------------------
// Email validator
// ---------------------------------------------------------------------------
function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Initialize() {
    const searchString = useSearch();
    const params = new URLSearchParams(searchString);
    const planKey = params.get("plan") ?? "monthly";
    const planLabel = PLAN_LABELS[planKey] ?? "MONTHLY ($285 / mo)";

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [contractAgreed, setContractAgreed] = useState(false);

    const currentStepQuestions = questions[currentStep - 1];

    const isStepValid = currentStepQuestions.every((q) => {
        if (!q.required) return true;
        const val = (formData[q.id] ?? "").trim();
        if (!val) return false;
        if (q.type === "email") return isValidEmail(val);
        return true;
    });

    const canProceed = isStepValid && (currentStep !== TOTAL_STEPS || contractAgreed);

    const handleInputChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (canProceed && currentStep < TOTAL_STEPS) setCurrentStep((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((p) => p - 1);
    };

    const handleSubmit = async () => {
        if (!canProceed) return;
        setIsSubmitting(true);

        try {
            const url = "https://formspree.io/f/xdawwwqd";
            const payload = {
                ...formData,
                selected_plan: planLabel,
                "80_Percent_Rule_Agreed": contractAgreed ? "YES" : "NO",
            };

            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            setUploadSuccess(true);
        } catch (error) {
            console.error("Submission failed:", error);
            setUploadSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── SUCCESS STATE ──────────────────────────────────────────────────────────
    if (uploadSuccess) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] font-mono text-zinc-300 flex flex-col items-center justify-center p-6 relative overflow-hidden">
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

                    <p className="mb-4 leading-relaxed">
                        Your biological calibration is now in the queue. I am personally auditing your goals and constraints.
                    </p>

                    <div className="bg-white/5 border border-white/10 text-zinc-500 text-[10px] px-4 py-2 font-mono uppercase tracking-widest mb-6">
                        SELECTED_PLAN: {planLabel}
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-sm mb-10">
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2">NEXT_STEP:</p>
                        <p className="text-sm">
                            Check your inbox within 24 hours for your "System Validation" update. I will confirm your 6-month goal feasibility before initializing the partnership.
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

    // ── FORM UI ───────────────────────────────────────────────────────────────
    const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-mono text-zinc-300 relative overflow-hidden pb-24 md:pb-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Progress Header */}
            <div className="fixed top-0 left-0 w-full z-10 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] md:text-xs text-orange-500 tracking-widest uppercase">
              // INITIALIZING_PROTOCOL_CALIBRATION...
                        </span>
                        <span className="text-[9px] text-zinc-600 tracking-widest uppercase">
                            PLAN: {planLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] md:text-xs text-zinc-500">[{currentStep}/{TOTAL_STEPS}]</span>
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
                        {currentStep === 1 ? "Contact Details" : "System Deep-Dive"}
                    </h1>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                        {currentStep === 1
                            ? "Confirm your details so I can follow up directly."
                            : "Provide precise, objective data. No estimates."}
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (currentStep === TOTAL_STEPS) handleSubmit();
                        else handleNext();
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            {currentStepQuestions.map((q) => {
                                const emailInvalid =
                                    q.type === "email" &&
                                    !!formData[q.id] &&
                                    !isValidEmail(formData[q.id]);

                                return (
                                    <div key={q.id} className="group relative">
                                        <label
                                            htmlFor={q.id}
                                            className="block text-xs md:text-sm text-zinc-400 mb-3 tracking-widest uppercase transition-colors group-focus-within:text-orange-500"
                                        >
                                            {q.label}
                                        </label>

                                        {/* ── SELECT ── */}
                                        {q.type === "select" && (
                                            <select
                                                id={q.id}
                                                required={q.required}
                                                value={formData[q.id] || ""}
                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-base transition-colors pb-2 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-[#0A0A0A] text-zinc-500">
                                                    [ SELECT_TIMEZONE... ]
                                                </option>
                                                {q.options?.map((tz) => (
                                                    <option key={tz} value={tz} className="bg-[#0A0A0A] text-white">
                                                        {tz}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {/* ── TEXTAREA ── */}
                                        {q.type === "textarea" && (
                                            <textarea
                                                id={q.id}
                                                required={q.required}
                                                rows={4}
                                                value={formData[q.id] || ""}
                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-lg transition-colors resize-none pb-2 placeholder:text-zinc-800"
                                                placeholder="[ INPUT_DATA... ]"
                                            />
                                        )}

                                        {/* ── TEXT / EMAIL ── */}
                                        {(q.type === "text" || q.type === "email") && (
                                            <>
                                                <input
                                                    type={q.type}
                                                    id={q.id}
                                                    required={q.required}
                                                    value={formData[q.id] || ""}
                                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                    className={`w-full bg-transparent border-0 border-b focus:ring-0 focus:outline-none text-white md:text-lg transition-colors pb-2 placeholder:text-zinc-800 ${emailInvalid
                                                        ? "border-red-500/60 focus:border-red-500"
                                                        : "border-white/20 focus:border-orange-500"
                                                        }`}
                                                    placeholder="[ INPUT_DATA... ]"
                                                />
                                                {emailInvalid && (
                                                    <p className="text-red-500 text-[10px] mt-2 tracking-widest uppercase">
                                                        {">"} INVALID_EMAIL_FORMAT
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Contract Toggle — final step only */}
                            {currentStep === TOTAL_STEPS && (
                                <div className="mt-16 pt-8 border-t border-white/5">
                                    <div className="bg-orange-500/5 p-6 border border-orange-500/20 rounded-sm">
                                        <p className="text-orange-500 text-sm font-bold tracking-wider mb-4 uppercase">
                                            CRITICAL: THE 80% RULE
                                        </p>
                                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-6">
                                            By toggling this switch, you agree to the foundational system contract: If you execute your custom protocols with 80% or greater consistency over 24 weeks, and you do not hit your target, I will coach you for free until you do. If you fail to maintain 80% compliance, the warranty is void.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-widest text-zinc-400">
                                                Acknowledge & Accept Terms
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setContractAgreed(!contractAgreed)}
                                                className={`relative w-16 h-8 rounded-full transition-colors duration-300 outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] ${contractAgreed
                                                    ? "bg-orange-500 shadow-[0_0_15px_rgba(255,102,0,0.4)]"
                                                    : "bg-white/10"
                                                    }`}
                                                data-testid="contract-toggle"
                                            >
                                                <span
                                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform duration-300 flex items-center justify-center ${contractAgreed ? "translate-x-8" : "translate-x-0"
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

                        {currentStep < TOTAL_STEPS ? (
                            <button
                                type="button"
                                disabled={!canProceed}
                                onClick={handleNext}
                                className={`flex items-center gap-2 px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase transition-all ${canProceed
                                    ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                                    }`}
                            >
                                {currentStep === 1 ? "Begin Deep-Dive" : `Proceed to Stage 0${currentStep}`}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!canProceed || isSubmitting}
                                className={`flex items-center gap-2 px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase transition-all ${canProceed && !isSubmitting
                                    ? "bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(255,102,0,0.4)]"
                                    : "bg-orange-500/20 text-orange-500/50 cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? "[ TRANSMITTING... ]" : "[ SUBMIT_DATA ]"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
