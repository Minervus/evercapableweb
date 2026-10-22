import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIT_BOOKING_URL, AUDIT_PAY_URL } from "@/lib/auditPayment";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import {
    AUDIT_BOOKING_LINE,
    AUDIT_FORMAT_LINE,
    AUDIT_INTAKE_LINE,
    BOOKING_PICK_LINE,
    COACHING_APP,
    COACHING_DELIVERY,
    COACHING_PRICE,
    MONTHLY_TERMS_LINE,
    ROADMAP_DELIVERY_LINE,
    creditLine,
    guaranteeLine,
    INTAKE_MINUTES,
    refundWindowLine,
} from "@/lib/offer";
import { watchCanonical } from "@/lib/sectionRoutes";
import { SITE_BASE_URL } from "@shared/articleSeo";
import { CONTACT_EMAIL } from "@/components/LegalPage";

function planLabels(currency: DisplayCurrency | null): Record<string, string> {
    return {
        audit: `AUDIT + ROADMAP (${money(149, currency)})`,
        coaching: `1:1 NUTRITION COACHING (${money(COACHING_PRICE, currency)} / Month)`,
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

function readBrowserTimeZone(): string {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone?.trim() ?? "";
    } catch {
        return "";
    }
}

/** Match the browser IANA zone to a labeled option, or offer the raw zone if it is new. */
function timezoneChoice(detected: string): { value: string; options: string[] } {
    const options = [...TIMEZONES];
    if (!detected) return { value: "", options };
    const match = options.find(
        (option) => option === detected || option.startsWith(`${detected} `) || option.startsWith(`${detected}(`),
    );
    if (match) return { value: match, options };
    return { value: detected, options: [detected, ...options] };
}

// ---------------------------------------------------------------------------
// Question steps — Step 1 is the new contact details page
// ---------------------------------------------------------------------------
type FieldType = "text" | "email" | "textarea" | "select" | "number" | "radio" | "scale";

interface Question {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: readonly string[];
    /** Short line shown above the field. */
    helper?: string;
    /** Bounds for "number" fields. */
    min?: number;
    max?: number;
    /** End labels for "scale" fields, e.g. ["rarely", "every day"]. */
    scaleEnds?: readonly [string, string];
    /** Only ask this question when another answer matches. */
    showIf?: { id: string; equals: string };
}

/** Sent to Formspree for a question that was skipped because its condition wasn't met. */
const NOT_ASKED = "N/A (not asked)";

const SCALE_VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

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
        { id: "age", label: "AGE //", type: "number", required: true, min: 1, max: 120 },
        { id: "currentWeight", label: "CURRENT WEIGHT // (lbs or kgs)", type: "text", required: true },
        { id: "currentHeight", label: "CURRENT HEIGHT // (ft/in or cms)", type: "text", required: true },
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
        { id: "foodTracking", label: "DO YOU CURRENTLY TRACK YOUR FOOD? //", type: "radio", required: true, options: ["Yes", "No"] },
        {
            id: "trackingConsistency",
            label: "HOW CONSISTENTLY DO YOU TRACK? // (1 = rarely, 10 = every day)",
            type: "scale",
            required: true,
            scaleEnds: ["rarely", "every day"],
            showIf: { id: "foodTracking", equals: "Yes" },
        },
        { id: "dietaryRestrictions", label: "BIOLOGICAL/DIETARY RESTRICTIONS //", type: "textarea", required: true },
        { id: "whoCooks", label: "WHO DOES MOST OF THE COOKING AT HOME? //", type: "text", required: true },
        { id: "kidsAndAges", label: "HOW MANY KIDS DO YOU HAVE, AND HOW OLD ARE THEY? // (Write 'none' if you don't have kids.)", type: "text", required: true },
        { id: "pickyEaters", label: "ARE THERE ANY PICKY EATERS? //", type: "text", required: true },
        { id: "weekdayDinner", label: "WHAT DOES A TYPICAL WEEKDAY DINNER LOOK LIKE? //", type: "textarea", required: true },
    ],
    // ── STEP 5 ────────────────────────────────────────────────────────────────
    [
        { id: "primaryGoal", label: "WHAT WOULD YOU MOST LIKE TO CHANGE? // (energy, weight, fitness, health)", type: "text", required: true },
        { id: "ninetyDayObjective", label: "90-DAY OBJECTIVE // (What's your primary goal for the next 90 days?) //", type: "text", required: true },
        { id: "sixMonthMetric", label: "6-MONTH OBJECTIVE // (What does success look like in 6 months?) //", type: "text", required: true },
        { id: "idealPhysique", label: "DESCRIBE THE 'IDEAL' OUTCOME (How do you look and feel in 6 months?) //", type: "textarea", required: true },
    ],
    // ── STEP 6 ────────────────────────────────────────────────────────────────
    [
        { id: "injuries", label: "EXISTING HISTORICAL INJURIES/LIMITATIONS //", type: "textarea", required: true },
        {
            id: "sleepQuality",
            label: "AVERAGE SLEEP QUALITY METRIC (1-10 — 1=terrible, 10=perfect) //",
            type: "scale",
            required: true,
            scaleEnds: ["terrible", "perfect"],
        },
        { id: "lifeStressor", label: "PRIMARY CAREER/LIFE STRESSOR (What's your biggest challenge right now?) //", type: "text", required: true },
        {
            id: "medicalConditions",
            label: "ANYTHING A DOCTOR IS CURRENTLY MANAGING? // (e.g. diabetes, heart or thyroid condition, pregnancy. Write 'none' if not.)",
            type: "textarea",
            required: true,
        },
        {
            id: "medications",
            label: "ARE YOU TAKING ANY MEDICATIONS? // (Include GLP-1s like Ozempic, Wegovy or Mounjaro. Write 'None' if not.)",
            type: "textarea",
            required: true,
        },
        {
            id: "disorderedEatingHistory",
            label: "HAVE YOU EVER HAD AN EATING DISORDER, OR TREATMENT FOR DISORDERED EATING? //",
            helper: "Optional. I ask because it changes how I coach tracking and the scale. It doesn't rule you out.",
            type: "textarea",
            required: false,
        },
    ],
    // ── STEP 7 (Tracking and coaching) ─────────────────────────────────────────────────────
    [
        { id: "healthMetrics", label: "DO YOU CURRENTLY TRACK YOUR HEALTH METRICS? // (e.g. steps via a watch or phone, HRV, sleep data, etc.) //", type: "text", required: true },
        {
            id: "coachability",
            label: "COACHABILITY METRIC (1-10 — 1=resistant, 10=coachable) //",
            type: "scale",
            required: true,
            scaleEnds: ["resistant", "coachable"],
        },
    ],
];

const TOTAL_STEPS = questions.length; // 7

const STEP_LABELS = [
    "Contact details",
    "About you",
    "Training",
    "Food and family",
    "Goals",
    "Sleep and stress",
    "Tracking and coaching",
];

const APPLICATION_MINUTES = INTAKE_MINUTES;

// ---------------------------------------------------------------------------
// Email validator
// ---------------------------------------------------------------------------
function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidNumber(q: Question, value: string) {
    if (!/^\d+$/.test(value)) return false;
    const n = Number(value);
    return (q.min === undefined || n >= q.min) && (q.max === undefined || n <= q.max);
}

/** A typed answer that can't be accepted yet, so the field can say why. */
function fieldError(q: Question, value: string): string | null {
    if (!value) return null;
    if (q.type === "email" && !isValidEmail(value)) return "INVALID_EMAIL_FORMAT";
    if (q.type === "number" && !isValidNumber(q, value)) return `ENTER A WHOLE NUMBER FROM ${q.min} TO ${q.max}`;
    return null;
}

function isAsked(q: Question, data: Record<string, string>) {
    return !q.showIf || data[q.showIf.id] === q.showIf.equals;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Initialize() {
    const searchString = useSearch();
    const params = new URLSearchParams(searchString);
    const requestedPlan = params.get("plan") ?? "audit";
    // Retired ?plan=habits bookmarks open 1:1 coaching.
    const planKey = requestedPlan === "habits" ? "coaching" : requestedPlan;
    const currency = useDisplayCurrency();
    const labels = planLabels(currency);
    const planLabel = labels[planKey] ?? labels.audit;
    const isAudit = planKey === "audit" || !(planKey in labels);
    const auditPrice = money(149, currency);
    const formName = isAudit ? "intake form" : "application";

    const [currentStep, setCurrentStep] = useState(1);
    const [timezoneChoiceState] = useState(() => timezoneChoice(readBrowserTimeZone()));
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        if (timezoneChoiceState.value) initial.timezone = timezoneChoiceState.value;
        return initial;
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const isFirstStepRender = useRef(true);

    useEffect(() => watchCanonical(`${SITE_BASE_URL}/initialize`), []);

    // On step change, bring the new step's heading to just below the fixed header.
    useEffect(() => {
        if (isFirstStepRender.current) {
            isFirstStepRender.current = false;
            return;
        }
        const heading = headingRef.current;
        if (!heading) return;
        const headerHeight = headerRef.current?.offsetHeight ?? 0;
        heading.style.scrollMarginTop = `${headerHeight + 24}px`;
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({ block: "start" });
    }, [currentStep]);

    const currentStepQuestions = questions[currentStep - 1].filter((q) => isAsked(q, formData));

    const isStepValid = currentStepQuestions.every((q) => {
        const val = (formData[q.id] ?? "").trim();
        if (!val) return !q.required;
        if (fieldError(q, val)) return false;
        if (q.type === "radio") return q.options?.includes(val) ?? false;
        if (q.type === "scale") return (SCALE_VALUES as readonly string[]).includes(val);
        return true;
    });

    const canProceed = isStepValid;

    const handleInputChange = (id: string, value: string) => {
        setFormData((prev) => {
            const next = { ...prev, [id]: value };
            // Drop answers to follow-ups that are no longer asked.
            for (const q of questions.flat()) {
                if (q.showIf?.id === id && !isAsked(q, next)) delete next[q.id];
            }
            return next;
        });
    };

    // Keep focus in the field until the click lands, so nothing (focus styles, the
    // on-screen keyboard closing) can move the button between press and release.
    const keepFocusOnPress = (e: { preventDefault(): void }) => e.preventDefault();

    const handleNext = () => {
        if (canProceed && currentStep < TOTAL_STEPS) setCurrentStep((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((p) => p - 1);
    };

    const handleSubmit = async () => {
        if (!canProceed) return;
        setIsSubmitting(true);
        setSubmitError(false);

        try {
            const url = "https://formspree.io/f/xdawwwqd";
            // Every question is sent, in form order, so Formspree always shows the same fields.
            const payload: Record<string, string> = {};
            for (const q of questions.flat()) {
                const val = (formData[q.id] ?? "").trim();
                payload[q.id] = !isAsked(q, formData) ? NOT_ASKED : val || "(left blank)";
            }
            payload.selected_plan = planLabel;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                // Formspree explains rejections as { errors: [{ message }] }.
                const body = await res.json().catch(() => null);
                const reason = body?.errors?.map((e: { message?: string }) => e.message).filter(Boolean).join(" ");
                throw new Error(reason || `Formspree returned ${res.status}`);
            }

            setUploadSuccess(true);
        } catch (error) {
            // Answers stay in the form, so the person can retry without retyping.
            console.error("Submission failed:", error);
            setSubmitError(true);
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
                        {isAudit ? "Intake form received" : "Application received"}
                    </div>

                    <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight mb-4">
                        Tony has your {formName}.
                    </h1>

                    {isAudit ? (
                        <div className="mb-8">
                            <a
                                href={AUDIT_BOOKING_URL}
                                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black font-bold tracking-widest text-sm uppercase px-8 py-4 transition-colors shadow-xl shadow-orange-500/20"
                                data-testid="button-book-call"
                            >
                                Book your call
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </a>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{BOOKING_PICK_LINE}</p>
                        </div>
                    ) : (
                        <p className="mb-4 leading-relaxed text-zinc-300">
                            He reviews it and replies by email to book the session.
                        </p>
                    )}

                    {isAudit && (
                        <p className="mb-6 leading-relaxed text-zinc-400">
                            If you haven't paid the {auditPrice} audit fee yet,{" "}
                            <a
                                href={AUDIT_PAY_URL}
                                className="text-orange-400 underline underline-offset-2 hover:text-orange-300"
                            >
                                pay it on Stripe
                            </a>{" "}
                            so the session can be booked. There's no need to fill in the form again after that. {creditLine(currency)}
                        </p>
                    )}

                    <div className="bg-white/5 border border-white/10 text-zinc-500 text-[10px] px-4 py-2 font-mono uppercase tracking-widest mb-10">
                        SELECTED_PLAN: {planLabel}
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
        // overflow-anchor: none stops the browser scrolling the page to follow the nav buttons
        // when a step's fields swap in or out, which moved the page under the pointer.
        <div className="min-h-screen bg-[#0A0A0A] font-mono text-zinc-300 relative overflow-hidden pb-24 md:pb-0 [overflow-anchor:none]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Progress Header */}
            <div ref={headerRef} className="fixed top-0 left-0 w-full z-20 bg-[#0A0A0A] border-b border-white/10">
                <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] md:text-xs text-orange-500 tracking-widest uppercase">
                            {TOTAL_STEPS} steps · about {APPLICATION_MINUTES} minutes
                        </span>
                        <span className="text-[10px] md:text-xs text-white tracking-wide">
                            Step {currentStep} of {TOTAL_STEPS}: {STEP_LABELS[currentStep - 1]}
                        </span>
                        <span className="text-[9px] text-zinc-600 tracking-widest uppercase">
                            PLAN: {planLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] md:text-xs text-zinc-500">Step {currentStep} of {TOTAL_STEPS}</span>
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
                    {!isAudit && currentStep === 1 && (
                        <div className="mb-8 max-w-xl border border-white/10 bg-white/5 px-5 py-5">
                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                1:1 coaching is {money(COACHING_PRICE, currency)} a month. {COACHING_DELIVERY} It runs in {COACHING_APP}. {MONTHLY_TERMS_LINE} {creditLine(currency)}
                            </p>
                        </div>
                    )}
                    {isAudit && currentStep === 1 && (
                        <div className="mb-8 max-w-xl border border-orange-500/30 bg-orange-500/5 px-5 py-5">
                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
                                If you just paid on Stripe, you're in the right place. {AUDIT_INTAKE_LINE} {AUDIT_BOOKING_LINE} {AUDIT_FORMAT_LINE} {ROADMAP_DELIVERY_LINE}
                                {" "}If you haven't paid yet, book the {auditPrice} audit first and Stripe brings you back here.
                                {" "}{creditLine(currency)}
                            </p>
                            <a
                                href={AUDIT_PAY_URL}
                                className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-bold tracking-widest text-xs uppercase px-6 py-3 transition-colors"
                            >
                                Book now
                            </a>
                        </div>
                    )}
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                        This {formName} is {TOTAL_STEPS} short steps and takes about {APPLICATION_MINUTES} minutes.{" "}
                        {isAudit
                            ? "When you submit, you book your call on the next screen."
                            : "When you submit, Tony reviews it and replies by email to book the session."}
                    </p>
                    <h1
                        ref={headingRef}
                        tabIndex={-1}
                        className="text-2xl md:text-4xl text-white font-bold tracking-tight mb-2 uppercase focus:outline-none"
                    >
                        {currentStep === 1 ? "Contact Details" : STEP_LABELS[currentStep - 1]}
                    </h1>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                        Step {currentStep} of {TOTAL_STEPS}.
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
                                const value = formData[q.id] || "";
                                const error = fieldError(q, value.trim());
                                const helperId = q.helper ? `${q.id}-helper` : undefined;
                                const isChoice = q.type === "radio" || q.type === "scale";
                                const labelClass =
                                    "block text-xs md:text-sm text-zinc-400 mb-3 tracking-widest uppercase transition-colors group-focus-within:text-orange-500";
                                const helper = q.helper && (
                                    <p id={helperId} className="-mt-1 mb-3 text-xs md:text-sm text-zinc-500 leading-relaxed">
                                        {q.helper}
                                    </p>
                                );

                                // ── RADIO / 1-10 SCALE ──
                                if (isChoice) {
                                    const choices = q.type === "scale" ? SCALE_VALUES : (q.options ?? []);
                                    return (
                                        <fieldset key={q.id} className="group relative" aria-describedby={helperId}>
                                            <legend className={labelClass}>{q.label}</legend>
                                            {helper}
                                            <div
                                                className={
                                                    q.type === "scale"
                                                        ? "grid grid-cols-5 sm:grid-cols-10 gap-2"
                                                        : "flex flex-wrap gap-3"
                                                }
                                            >
                                                {choices.map((choice) => (
                                                    <label key={choice} className="relative cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name={q.id}
                                                            value={choice}
                                                            required={q.required}
                                                            checked={value === choice}
                                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                            className="peer sr-only"
                                                        />
                                                        <span
                                                            className={`flex h-11 items-center justify-center border text-sm md:text-base transition-colors border-white/20 text-zinc-300 hover:border-white/50 peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500 ${q.type === "scale" ? "" : "px-8"}`}
                                                        >
                                                            {choice}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {q.scaleEnds && (
                                                <div className="mt-2 flex justify-between text-[10px] md:text-xs text-zinc-500 tracking-widest uppercase">
                                                    <span>1 = {q.scaleEnds[0]}</span>
                                                    <span>10 = {q.scaleEnds[1]}</span>
                                                </div>
                                            )}
                                        </fieldset>
                                    );
                                }

                                return (
                                    <div key={q.id} className="group relative">
                                        <label htmlFor={q.id} className={labelClass}>
                                            {q.label}
                                        </label>
                                        {helper}

                                        {/* ── SELECT ── */}
                                        {q.type === "select" && (
                                            <select
                                                id={q.id}
                                                required={q.required}
                                                value={value}
                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-base transition-colors pb-2 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-[#0A0A0A] text-zinc-500">
                                                    {q.id === "timezone" ? "[ SELECT_TIMEZONE... ]" : "[ SELECT_OPTION... ]"}
                                                </option>
                                                {(q.id === "timezone" ? timezoneChoiceState.options : q.options)?.map((tz) => (
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
                                                value={value}
                                                aria-describedby={helperId}
                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-orange-500 text-white md:text-lg transition-colors resize-none pb-2 placeholder:text-zinc-800"
                                                placeholder="[ INPUT_DATA... ]"
                                            />
                                        )}

                                        {/* ── TEXT / EMAIL / NUMBER ── */}
                                        {(q.type === "text" || q.type === "email" || q.type === "number") && (
                                            <>
                                                <input
                                                    type={q.type}
                                                    id={q.id}
                                                    required={q.required}
                                                    value={value}
                                                    min={q.min}
                                                    max={q.max}
                                                    step={q.type === "number" ? 1 : undefined}
                                                    inputMode={q.type === "number" ? "numeric" : undefined}
                                                    aria-invalid={!!error}
                                                    aria-describedby={error ? `${q.id}-error` : helperId}
                                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                    className={`w-full bg-transparent border-0 border-b focus:ring-0 focus:outline-none text-white md:text-lg transition-colors pb-2 placeholder:text-zinc-800 ${error
                                                        ? "border-red-500/60 focus:border-red-500"
                                                        : "border-white/20 focus:border-orange-500"
                                                        }`}
                                                    placeholder="[ INPUT_DATA... ]"
                                                />
                                                {/* Space is always reserved so the message never moves the page. */}
                                                {(q.type === "email" || q.type === "number") && (
                                                    <p
                                                        id={`${q.id}-error`}
                                                        aria-live="polite"
                                                        className="min-h-[15px] text-red-500 text-[10px] mt-2 tracking-widest uppercase"
                                                    >
                                                        {error && `> ${error}`}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}

                            {currentStep === TOTAL_STEPS && (
                                <div className="mt-16 pt-8 border-t border-white/5 space-y-3 text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xl">
                                    {isAudit && (
                                        <p>
                                            {guaranteeLine(currency)} {refundWindowLine()}
                                        </p>
                                    )}
                                    <p>{MONTHLY_TERMS_LINE}</p>
                                    <p>
                                        Full details are in the{" "}
                                        <Link href="/refunds" className="text-orange-400 underline underline-offset-2 hover:text-orange-300">
                                            refund policy
                                        </Link>
                                        .
                                    </p>
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
                            onMouseDown={keepFocusOnPress}
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
                                onMouseDown={keepFocusOnPress}
                                className={`flex items-center gap-2 px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-widest uppercase transition-all ${canProceed
                                    ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                                    }`}
                            >
                                Next step
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onMouseDown={keepFocusOnPress}
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

                    {/* Below the buttons, so showing it never moves them. */}
                    {submitError && currentStep === TOTAL_STEPS && (
                        <div role="alert" className="-mt-4 mb-10 border border-red-500/40 bg-red-500/5 px-5 py-4 text-sm leading-relaxed text-zinc-300">
                            <p className="text-red-400 font-bold tracking-widest uppercase text-xs mb-2">Your {formName} didn't send</p>
                            <p>
                                Your answers are still here. Try submitting again. If it keeps failing, email{" "}
                                <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 underline underline-offset-2 hover:text-orange-300">
                                    {CONTACT_EMAIL}
                                </a>{" "}
                                and Tony will sort it out.
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
