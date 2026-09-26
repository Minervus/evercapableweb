import { useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";

function planLabels(currency: DisplayCurrency | null): Record<string, string> {
    return {
        audit: `AUDIT + ROADMAP (${money(149, currency)})`,
        habits: `NUTRITION HABITS (${money(149, currency)} / Month)`,
        coaching: `1:1 NUTRITION COACHING (${money(279, currency)} / Month)`,
    };
}

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
// Nutrition-first intake — 7 stages. Payload is Formspree form data only.
// ---------------------------------------------------------------------------
type FieldType = "text" | "email" | "textarea" | "select";

interface ShowIf {
    id: string;
    values: readonly string[];
}

interface Question {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: readonly string[];
    placeholder?: string;
    /** Render (and require, if required) only when another answer matches. */
    showIf?: ShowIf;
}

const FOOD_TRACKING_OPTIONS = ["Yes", "No", "Sometimes"] as const;

const STAGE_TITLES = [
    "Contact",
    "Basics",
    "How you eat now",
    "Tracking & restrictions",
    "Goals",
    "Life context",
    "Fit & tools",
] as const;

const questions: Question[][] = [
    // ── Stage 1: Contact ──────────────────────────────────────────────────────
    [
        { id: "fullName", label: "Full name", type: "text", required: true },
        { id: "emailAddress", label: "Email", type: "email", required: true },
        {
            id: "timezone",
            label: "Timezone",
            type: "select",
            required: true,
            options: TIMEZONES,
        },
    ],
    // ── Stage 2: Basics ───────────────────────────────────────────────────────
    [
        { id: "age", label: "Age", type: "text", required: true },
        { id: "currentWeight", label: "Current weight (lbs or kg)", type: "text", required: true },
        { id: "currentHeight", label: "Current height (ft/in or cm)", type: "text", required: true },
        {
            id: "primaryConstraint",
            label: "What's holding you back most right now?",
            type: "select",
            required: true,
            options: ["Time", "Knowledge", "Consistency", "Motivation", "Environment (home/work)"],
        },
    ],
    // ── Stage 3: How you eat now ──────────────────────────────────────────────
    [
        {
            id: "weekdayEating",
            label: "Walk me through a typical weekday of eating — meals, snacks, drinks",
            type: "textarea",
            required: true,
        },
        {
            id: "mealSource",
            label: "Where do most meals come from?",
            type: "select",
            required: true,
            options: ["Cooked at home", "Takeout or cafes", "Partner/family cooks", "Mix"],
        },
        {
            id: "eatingHabitToFix",
            label: "Is there an eating habit that you think you need to fix?",
            type: "text",
            required: false,
            placeholder: "night snacking, skipping lunch, weekends, not enough protein, portions",
        },
    ],
    // ── Stage 4: Tracking & restrictions ──────────────────────────────────────
    [
        {
            id: "foodTracking",
            label: "Do you currently track your food?",
            type: "select",
            required: true,
            options: FOOD_TRACKING_OPTIONS,
        },
        {
            id: "trackingConsistency",
            label: "If yes or sometimes, how consistent are you? (1–10)",
            type: "text",
            required: true,
            showIf: { id: "foodTracking", values: ["Yes", "Sometimes"] },
        },
        {
            id: "dietaryRestrictions",
            label: "Any dietary restrictions, allergies, or foods you won't eat?",
            type: "textarea",
            required: true,
        },
        {
            id: "dietsTried",
            label: "Diets or nutrition approaches you've tried — and what worked / didn't",
            type: "textarea",
            required: true,
        },
    ],
    // ── Stage 5: Goals ────────────────────────────────────────────────────────
    [
        {
            id: "primaryGoal",
            label: "Primary goal",
            type: "select",
            required: true,
            options: ["Fat loss", "Better energy", "Build healthier habits", "Performance", "Longevity", "Other"],
        },
        { id: "ninetyDayObjective", label: "What does success look like in 90 days?", type: "text", required: true },
        { id: "sixMonthMetric", label: "What does success look like in 6 months?", type: "text", required: true },
        {
            id: "feelAndFunction",
            label: "How do you want to feel and function then?",
            type: "textarea",
            required: true,
        },
    ],
    // ── Stage 6: Life context ─────────────────────────────────────────────────
    [
        { id: "sleepQuality", label: "Sleep quality lately (1–10)", type: "text", required: true },
        { id: "lifeStressor", label: "Biggest career / life stressor right now", type: "text", required: true },
        {
            id: "movementEatingLimits",
            label: "Anything that limits how you move or eat? (injuries, meds, schedule, travel)",
            type: "textarea",
            required: false,
        },
    ],
    // ── Stage 7: Fit & tools ──────────────────────────────────────────────────
    [
        {
            id: "healthMetrics",
            label: "Do you track any health metrics? (steps, sleep, HRV, watch, etc.)",
            type: "text",
            required: true,
        },
        {
            id: "planReadiness",
            label: "How ready are you to follow a simple weekly plan and check in? (1–10)",
            type: "text",
            required: true,
        },
        {
            id: "currentTraining",
            label: "Do you currently lift or train? If yes, how many days/week on average?",
            type: "text",
            required: false,
        },
    ],
];

const TOTAL_STEPS = questions.length; // 7

function isQuestionVisible(question: Question, data: Record<string, string>) {
    if (!question.showIf) return true;
    return question.showIf.values.includes(data[question.showIf.id] ?? "");
}

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
    const planKey = params.get("plan") ?? "audit";
    const currency = useDisplayCurrency();
    const labels = planLabels(currency);
    const planLabel = labels[planKey] ?? labels.audit;

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [contractAgreed, setContractAgreed] = useState(false);

    const currentStepQuestions = questions[currentStep - 1];
    const visibleStepQuestions = currentStepQuestions.filter((q) => isQuestionVisible(q, formData));

    const isStepValid = visibleStepQuestions.every((q) => {
        if (!q.required) return true;
        const val = (formData[q.id] ?? "").trim();
        if (!val) return false;
        if (q.type === "email") return isValidEmail(val);
        return true;
    });

    const canProceed = isStepValid && (currentStep !== TOTAL_STEPS || contractAgreed);

    const handleInputChange = (id: string, value: string) => {
        setFormData((prev) => {
            const next = { ...prev, [id]: value };
            if (id === "foodTracking" && value !== "Yes" && value !== "Sometimes") {
                delete next.trackingConsistency;
            }
            return next;
        });
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
            const answers = { ...formData };
            if (answers.foodTracking !== "Yes" && answers.foodTracking !== "Sometimes") {
                delete answers.trackingConsistency;
            }

            const payload = {
                ...answers,
                selected_plan: planLabel,
                "90_Day_System_Guarantee_Agreed": contractAgreed ? "YES" : "NO",
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
                        {">"} APPLICATION_RECEIVED<br />
                        {">"} // DATA_RECEIVED
                    </div>

                    <div className="bg-white/5 border border-white/10 text-zinc-500 text-[10px] px-4 py-2 font-mono uppercase tracking-widest mb-6">
                        SELECTED_PLAN: {planLabel}
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-sm mb-10">
                        <p className="text-sm leading-relaxed">
                            Got it — I'm reviewing your goals and how you eat. I'll follow up on next steps for your Audit + Roadmap.
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
              // APPLICATION
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
                        {STAGE_TITLES[currentStep - 1]}
                    </h1>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                        {currentStep === 1
                            ? "Confirm your details so I can follow up directly."
                            : "Answer in your own words."}
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
                            {visibleStepQuestions.map((q) => {
                                const emailInvalid =
                                    q.type === "email" &&
                                    !!formData[q.id] &&
                                    !isValidEmail(formData[q.id]);

                                return (
                                    <div key={q.id} className="group relative">
                                        <div className="flex items-baseline justify-between gap-4 mb-3">
                                            <label
                                                htmlFor={q.id}
                                                className="block text-xs md:text-sm text-zinc-400 tracking-widest uppercase transition-colors group-focus-within:text-orange-500"
                                            >
                                                {q.label}
                                            </label>
                                            {!q.required && (
                                                <span className="shrink-0 text-[10px] text-zinc-600 tracking-widest uppercase">
                                                    Optional
                                                </span>
                                            )}
                                        </div>

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
                                                    {q.id === "timezone" ? "[ SELECT_TIMEZONE... ]" : "[ SELECT_OPTION... ]"}
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
                                                className={`w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-lg transition-colors resize-none pb-2 ${q.placeholder ? "placeholder:text-zinc-500" : "placeholder:text-zinc-800"}`}
                                                placeholder={q.placeholder ?? "[ INPUT_DATA... ]"}
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
                                                    className={`w-full bg-transparent border-0 border-b focus:ring-0 focus:outline-none text-white md:text-lg transition-colors pb-2 ${q.placeholder ? "placeholder:text-zinc-500" : "placeholder:text-zinc-800"} ${emailInvalid
                                                        ? "border-red-500/60 focus:border-red-500"
                                                        : "border-white/20 focus:border-orange-500"
                                                        }`}
                                                    placeholder={q.placeholder ?? "[ INPUT_DATA... ]"}
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
                                            THE 90-DAY SYSTEM GUARANTEE
                                        </p>
                                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-6">
                                            By toggling this switch, you agree to the foundational system contract: If you execute your custom protocols with 90% or greater consistency over 90 days, and you do not hit your target, I will coach you for free until you do. If you fail to maintain 90% compliance, the guarantee is void.
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
                                {currentStep === 1 ? "Begin application" : "Continue"}
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
