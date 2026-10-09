import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SlidersHorizontal, Utensils, GitMerge, ClipboardList } from "lucide-react";
import { Link } from "wouter";
import logoIcon from "@assets/tn-logo-on-black-128.png";
import { FAQ, type FaqItem } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AUDIT_PAY_URL } from "@/lib/auditPayment";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import {
  AUDIT_MINUTES,
  AUDIT_PRICE,
  COACHING_SUMMARY,
  HABITS_SUMMARY,
  INTAKE_MINUTES,
  auditSteps,
  creditLine,
  guaranteeLine,
} from "@/lib/offer";
import { watchCanonical } from "@/lib/sectionRoutes";
import { SHARE_IMAGE_URL } from "@shared/articleSeo";
import {
  AUDIT_DESCRIPTION,
  AUDIT_H1_LEAD,
  AUDIT_H1_REST,
  AUDIT_SHARE_DESCRIPTION,
  AUDIT_SHARE_TITLE,
  AUDIT_TITLE,
} from "@shared/auditPage";

const AUDIT_CANONICAL = "https://tonynguyenfit.com/audit";

/** The intake form. Keep this route: Pricing, old emails and the Stripe redirect link to it. */
const INTAKE_URL = "/initialize?plan=audit";

/** The plans section on the homepage. */
const PLANS_URL = "/pricing";

const payButtonClass =
  "inline-block bg-orange-500 hover:bg-orange-400 active:scale-[0.97] text-white font-bold tracking-widest text-xs uppercase px-10 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-orange-500/20";

const inlineLinkClass =
  "text-orange-400 hover:text-orange-300 underline underline-offset-2";

const HARBOR_IMG = "/tony-harbor.png";

/* ─── Animation variants ────────────────────────────────────────────────── */
const fadeUp = {
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeIn = {
  initial:    { opacity: 0 },
  whileInView:{ opacity: 1 },
  viewport:   { once: true },
  transition: { duration: 0.8 },
};

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
function auditFaqs(currency: DisplayCurrency | null): FaqItem[] {
  return [
    {
      question: "What if I need to reschedule?",
      // TODO(tony): add a notice period if you want one (e.g. 24 hours). None is stated anywhere yet.
      answer:
        "We set the time over email, so reply to that email and we'll find another time that works.",
    },
    {
      question: "How do refunds work?",
      answer: `${guaranteeLine(currency)} The full policy is at tonynguyenfit.com/refunds.`,
    },
    {
      question: "Does my time zone matter?",
      answer:
        "The session is online, so you can join from anywhere. The intake form asks for your time zone, and I use it to book a time that suits where you are.",
    },
    {
      question: "Which currency do I pay in?",
      answer: `The page shows ${money(AUDIT_PRICE, "NZD")} or ${money(AUDIT_PRICE, "CAD")} depending on where you're browsing from. Book now opens a Stripe checkout priced in NZD with a CAD option. Stripe may also offer the price converted to your local currency, and you pick the one you want before paying.`,
    },
  ];
}

/* ─── Shared primitives ──────────────────────────────────────────────────── */
/** Same tab on purpose: Stripe redirects to the intake form after payment. */
function PayButton({ label }: { label: string }) {
  return (
    <a href={AUDIT_PAY_URL} className={payButtonClass}>
      {label}
    </a>
  );
}

function IntakeLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href={INTAKE_URL} className={inlineLinkClass}>
      {children}
    </Link>
  );
}

function PlanLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href={PLANS_URL} className={inlineLinkClass}>
      {children}
    </Link>
  );
}

function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/** The step after paying. Sits directly under each main Book now button. */
function IntakeCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-md border border-orange-500/40 bg-orange-500/[0.07] px-5 py-5 text-left ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-md bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5 text-orange-500" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1.5">
            After you book
          </p>
          <p className="text-zinc-200 text-sm leading-relaxed">
            Once you pay, Stripe takes you straight to the intake form so I can prepare. It takes about {INTAKE_MINUTES} minutes, and then I email you to book a time.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Credit, plan explainer and guarantee. Shown beside every price. */
function OfferNotes({ currency, className = "" }: { currency: DisplayCurrency | null; className?: string }) {
  return (
    <div className={`space-y-2 text-xs leading-[1.75] text-zinc-400 ${className}`}>
      <p>
        <span className="text-zinc-200 font-semibold">{creditLine(currency)}</span>{" "}
        <PlanLink>Habits</PlanLink> is {lowerFirst(HABITS_SUMMARY)}{" "}
        <PlanLink>1:1</PlanLink> is {lowerFirst(COACHING_SUMMARY)}
      </p>
      <p>
        <span className="text-zinc-200 font-semibold">{guaranteeLine(currency)}</span>{" "}
        <Link href="/refunds" className={inlineLinkClass}>
          Refund policy
        </Link>
      </p>
    </div>
  );
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-5">
      {children}
    </p>
  );
}

function SectionDivider() {
  return <div className="my-20 md:my-28 border-t border-zinc-800/60" />;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Audit() {
  const currency = useDisplayCurrency();
  const price = money(AUDIT_PRICE, currency);

  useEffect(() => watchCanonical(AUDIT_CANONICAL), []);

  return (
    <>
      <Helmet>
        <title>{AUDIT_TITLE}</title>
        <meta name="description" content={AUDIT_DESCRIPTION} />
        <meta property="og:title" content={AUDIT_SHARE_TITLE} />
        <meta property="og:description" content={AUDIT_SHARE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={AUDIT_CANONICAL} />
        <meta property="og:image" content={SHARE_IMAGE_URL} />
        <meta name="twitter:title" content={AUDIT_SHARE_TITLE} />
        <meta name="twitter:description" content={AUDIT_SHARE_DESCRIPTION} />
        <meta name="twitter:image" content={SHARE_IMAGE_URL} />
        <link rel="canonical" href={AUDIT_CANONICAL} />
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-orange-500/30">

        {/* ─── NAV ────────────────────────────────────────────────────── */}
        <header className="px-6 py-5 flex items-center justify-between gap-4 max-w-6xl mx-auto border-b border-zinc-900">
          <Link href="/" asChild>
            <a className="flex items-center gap-2.5 min-w-0">
              <img
                src={logoIcon}
                alt="Tony Nguyen Fit"
                width={24}
                height={24}
                className="h-6 w-auto shrink-0"
              />
              <span className="text-base font-bold text-white tracking-tight truncate">
                Tony Nguyen Fit
              </span>
            </a>
          </Link>
          <PayButton label="Book now" />
        </header>

        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <motion.div {...fadeUp}>
              <EyebrowLabel>Audit + Roadmap, {price}</EyebrowLabel>

              <h1 className="text-[2.6rem] md:text-[3.5rem] font-bold leading-[1.06] tracking-tight text-white mb-7">
                <span className="text-orange-500">{AUDIT_H1_LEAD}</span> {AUDIT_H1_REST}
              </h1>

              <p className="text-xl text-zinc-300 leading-[1.75] mb-10 max-w-[520px]">
                One {AUDIT_MINUTES}-minute session. You leave with a 4 to 6 week food roadmap, one habit at a time.
              </p>

              <PayButton label="Book now" />
              <p className="mt-3 text-zinc-500 text-xs tracking-wide">Checkout is on Stripe.</p>
              <IntakeCard className="mt-6 max-w-[480px]" />
              <OfferNotes currency={currency} className="mt-6 max-w-[480px]" />
            </motion.div>

            {/* Hero image */}
            <motion.div {...fadeIn} className="relative">
              <img
                src={HARBOR_IMG}
                alt="Tony Nguyen, coach and founder of Tony Nguyen Fit"
                className="w-full rounded-lg object-cover shadow-2xl shadow-black/60"
                style={{ aspectRatio: "4/5", objectPosition: "top" }}
              />
              {/* Subtle bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/50 to-transparent rounded-b-lg pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ─── THE PROBLEM ────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <motion.div {...fadeUp}>
              <EyebrowLabel>The Problem</EyebrowLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Energy fades before the day is over.
              </h2>
              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  You have already tried to eat better, and you may have kept a food log for a while. Six months later the 3pm crash still decides how the rest of the day goes.
                </p>
                <p>
                  Work runs late and dinner is whatever the kids will eat. A plan written for an empty calendar does not survive that week.
                </p>
                <p>
                  You want energy that lasts past school pickup, so that's where we start. Once your eating gives you that back, we work on the weight.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── PHILOSOPHY (accent band) ───────────────────────────────── */}
        <div className="mt-20 md:mt-28 bg-zinc-900/70 border-y border-zinc-800">
          <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <motion.div {...fadeUp} className="max-w-[700px] mx-auto text-center">
              <EyebrowLabel>The Core Philosophy</EyebrowLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                A food plan for the week you already have.
              </h2>

              {/* TODO(tony): who said this? No source is in the repo. Add a <cite> with the
                  name (or "Tony Nguyen" if it's yours), or drop the quote marks. */}
              <blockquote className="border-l-2 border-orange-500 pl-6 py-1 my-9 text-lg md:text-xl text-zinc-300 italic leading-[1.75] text-left">
                "A 20-year-old athlete can train and bounce back in a way a parent with a full workday and school pickup cannot. Your roadmap has to fit the recovery and the calendar you have now."
              </blockquote>

              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  We look at how your energy responds to the way you eat on a normal week with the kids. You leave with a <strong className="text-white">food roadmap</strong> written for that week, aimed at the afternoon energy you want back.
                </p>
                <p>
                  I will help you keep a way of eating that still works when the week gets messy. <strong className="text-white">Steady afternoon energy</strong> comes first.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center">
                <PayButton label="Book now" />
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-sm">
                  After you book, Stripe takes you to the <IntakeLink>intake form</IntakeLink> so I can prepare. I'll email you to set the session.
                </p>
              </div>
            </motion.div>
          </section>
        </div>

        {/* ─── WHAT HAPPENS IN 60 MINUTES ─────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <motion.div {...fadeUp} className="mb-14">
            <EyebrowLabel>What We Do in {AUDIT_MINUTES} Minutes</EyebrowLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Audit + Roadmap
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-800/40 rounded-lg overflow-hidden border border-zinc-800">
            {[
              {
                number: "01",
                title: "Look at your week",
                body: "We go through how you eat now and what you have already tried. The session stays with your real meals and your real schedule, so the next step belongs to your life.",
                Icon: SlidersHorizontal,
              },
              {
                number: "02",
                title: "Sketch the meals",
                body: "From that week, we sketch meals and portions you can repeat on a busy Tuesday. The aim is energy you can feel in the afternoon.",
                Icon: Utensils,
              },
              {
                number: "03",
                title: "Leave with the next habit",
                body: "You leave with a 4 to 6 week roadmap and one habit to practice first.",
                Icon: GitMerge,
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                {...fadeUp}
                className="relative bg-zinc-950 p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
              >
                <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {item.number}
                </span>

                <div className="w-11 h-11 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <item.Icon className="w-5 h-5 text-orange-500" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-[1.8] text-sm">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── FROM BOOKING TO ROADMAP ────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <motion.div {...fadeUp} className="max-w-[700px]">
            <EyebrowLabel>How It Works</EyebrowLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              From booking to roadmap
            </h2>
            <ol className="space-y-6">
              {auditSteps(currency).map((step, index) => (
                <li key={step.label} className="flex gap-5">
                  <span className="font-mono text-orange-500 text-xs pt-1.5 w-6 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{step.label}</h3>
                    <p className="text-zinc-400 leading-[1.8]">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* ─── WHO THIS IS FOR ────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6">
          <SectionDivider />
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <motion.div {...fadeUp}>
              <EyebrowLabel>Who This Is For</EyebrowLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
                This is for you if…
              </h2>
              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  You're a working parent, 35 to 50, and the afternoon slump is the problem you actually feel. You want a way of eating that fits the job and the kids you already have.
                </p>
                <p>
                  Generic programs left you guessing at dinner. You want one habit at a time, not a second job. You're ready for a clear picture of where you are, and a roadmap from there.
                </p>
                <p className="border-l-2 border-zinc-700 pl-5 text-zinc-400 text-base">
                  <strong className="text-zinc-200">This isn't for you if</strong> you have a medical condition that needs a dietitian's care, or any history of an eating disorder. A registered dietitian or your doctor is the right place to start.
                </p>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div {...fadeIn}>
              <img
                src="/tony-family.png"
                alt="Tony Nguyen with his son at the waterfront"
                className="w-full rounded-lg object-cover shadow-2xl shadow-black/60"
                style={{ aspectRatio: "3/4", objectPosition: "top" }}
              />
            </motion.div>

          </div>
        </section>

        {/* ─── CLIENT RESULTS ─────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6">
          <SectionDivider />
          <motion.div {...fadeUp}>
            <EyebrowLabel>Client Results</EyebrowLabel>

            {/* Unified testimonial + comparison container */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-xl shadow-black/30">

              {/* ── Testimonial row ── */}
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-800">

                {/* Profile + quote */}
                <div className="px-8 py-9 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-zinc-700 overflow-hidden shrink-0 ring-2 ring-orange-500/30">
                      <img
                        src="/christian.jpeg"
                        alt="Christian K."
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-white font-bold text-base leading-tight">Christian K.</p>
                      <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5">
                        Finance Exec &amp; Dad
                      </p>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-orange-500 pl-5 text-zinc-200 text-base leading-[1.75] italic">
                    "I feel <strong className="text-white not-italic">more in control</strong> of my health than ever before."
                  </blockquote>
                </div>

                {/* Before / After metrics */}
                <div className="px-8 py-9 flex flex-col gap-6 justify-center">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                        [ Before ]
                      </p>
                      <p className="text-zinc-400 text-sm italic leading-relaxed">
                        "Weight fluctuations, 3 PM energy crashes, low control."
                      </p>
                    </div>
                  </div>

                  {/* TODO(tony): confirm what Christian did in these 90 days, i.e. the audit
                      plus how many months of Habits or 1:1, and add it under this label. */}
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                        [ After 90 Days ]
                      </p>
                      <p className="text-white font-semibold text-base leading-relaxed">
                        5.4 kg / 12 lb down, maintaining weight, consistent energy despite 60+ hour weeks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Comparison bridge ── */}
              <div className="border-t border-zinc-800 px-8 py-8">
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">
                  How Christian Changed His Trajectory
                </p>
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Without column */}
                  <div className="rounded-lg bg-red-950/20 border border-red-900/30 px-6 py-5">
                    <p className="text-red-400 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">
                      Without a Roadmap
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Trying to eat healthy, but still gaining weight",
                        "Guessing at nutrition and recovery",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                          <span className="mt-0.5 text-red-500 font-bold shrink-0" aria-hidden="true">✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* With column */}
                  <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 px-6 py-5">
                    <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">
                      With the roadmap
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Making smarter food choices, losing weight",
                        "Having a plan to fit my goals, making consistent progress",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-zinc-200 text-sm leading-relaxed">
                          <span className="mt-0.5 text-emerald-400 font-bold shrink-0" aria-hidden="true">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ─── CLOSING HOOK ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6">
          <SectionDivider />
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <EyebrowLabel>Ready to book?</EyebrowLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to stop guessing?
            </h2>
            <p className="text-zinc-400 text-lg leading-[1.8]">
              Pay {price} for the Audit + Roadmap and you go straight to the intake form so I can prepare. I'll email you to set the session.
            </p>
          </motion.div>
        </section>

        {/* ─── PRICING CARD ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mt-16 md:mt-20 pb-20 md:pb-28">
          <motion.div
            {...fadeUp}
            className="max-w-[680px] mx-auto rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden shadow-2xl shadow-black/40"
          >
            {/* Card header band */}
            <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1">
                    One-time investment
                  </p>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Audit + Roadmap
                  </h3>
                </div>
                <div className="shrink-0 sm:text-right">
                  <span className="text-4xl font-bold text-white tracking-tight">${AUDIT_PRICE}</span>
                  <p className="text-zinc-500 text-xs mt-1">{currency ? `${currency} · one session` : "one session"}</p>
                </div>
              </div>
              <OfferNotes currency={currency} className="mt-5 pt-5 border-t border-zinc-700/60" />
            </div>

            {/* Features */}
            <div className="px-8 py-8">
              <ul className="space-y-4 mb-8">
                {[
                  "One-off nutrition and lifestyle review",
                  "Personal 4 to 6 week food and habit roadmap",
                  "One session, then a plan you use on your own",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-200 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-orange-400" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-col items-center gap-3 text-center">
                <PayButton label="Book now" />
                <p className="text-zinc-500 text-xs">Checkout is on Stripe.</p>
                <IntakeCard className="mt-3 w-full" />
              </div>
            </div>
          </motion.div>
        </section>

        <FAQ
          items={auditFaqs(currency)}
          heading="Questions about the audit"
          intro="The practical side of booking the session."
          className="py-16 md:py-24 bg-black border-t border-white/5"
        />

        <Footer />
      </div>
    </>
  );
}
