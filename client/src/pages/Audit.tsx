import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SlidersHorizontal, FlaskConical, GitMerge } from "lucide-react";
import { Link } from "wouter";
import logoIcon from "@assets/tn-logo-on-black.png";
import { AUDIT_PAY_URL } from "@/lib/auditPayment";
import { money, useDisplayCurrency } from "@/lib/displayCurrency";
import { watchCanonical } from "@/lib/sectionRoutes";

const AUDIT_CANONICAL = "https://tonynguyenfit.com/audit";

const payButtonClass =
  "inline-block bg-orange-500 hover:bg-orange-400 active:scale-[0.97] text-white font-bold tracking-widest text-xs uppercase px-10 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-orange-500/20";

const HARBOR_IMG = "/tony-harbor.png";
const SQUAT_IMG  = "/tony-squat.png";

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

/* ─── Shared primitives ──────────────────────────────────────────────────── */
/** Same tab on purpose: Stripe redirects to the intake form after payment. */
function PayButton({ label }: { label: string }) {
  return (
    <a href={AUDIT_PAY_URL} className={payButtonClass}>
      {label}
    </a>
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
  const price = money(149, currency);

  useEffect(() => watchCanonical(AUDIT_CANONICAL), []);

  return (
    <>
      <Helmet>
        <title>Nutrition Audit for Parents 35 to 50 | Tony Nguyen Fit</title>
        <meta
          name="description"
          content="A 60-minute nutrition session ($149) for professionals 35 to 50 who are raising kids and want more energy in a week that is already full."
        />
        <meta property="og:title" content="Nutrition Audit for Parents 35 to 50 | Tony Nguyen Fit" />
        <meta property="og:description" content="A 60-minute nutrition session ($149) for professionals 35 to 50 who are raising kids and want more energy in a week that is already full." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tonynguyenfit.com/audit" />
        <meta property="og:image" content="https://tonynguyenfit.com/tony-harbor.png" />
        <link rel="canonical" href={AUDIT_CANONICAL} />
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-orange-500/30">

        {/* ─── NAV ────────────────────────────────────────────────────── */}
        <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto border-b border-zinc-900">
          <Link href="/">
            <a className="flex items-center gap-2.5">
              <img
                src={logoIcon}
                alt="Tony Nguyen Fit"
                className="h-6 w-auto"
              />
              <span className="text-base font-bold text-white tracking-tight">
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
                <span className="text-orange-500">More energy,</span> in a week that already has work and kids.
              </h1>

              <p className="text-xl text-zinc-300 leading-[1.75] mb-10 max-w-[520px]">
                One 60-minute session. You leave with a 4 to 6 week food roadmap, one habit at a time. Once the energy is back, you feel healthier, and some of the weight comes off.
              </p>

              <PayButton label="Book now" />
              <p className="mt-4 text-zinc-500 text-xs tracking-wide leading-relaxed max-w-[480px]">
                Checkout is on Stripe. Once you pay, you land on a short intake form so I can prep the session and email you a time.
                Start Habits within 14 days and month one is covered. Start 1:1 and you get {price} off month one.
              </p>
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
                  You want energy that lasts past school pickup. Once that holds, the weight has room to change too.
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

              <blockquote className="border-l-2 border-orange-500 pl-6 py-1 my-9 text-lg md:text-xl text-zinc-300 italic leading-[1.75] text-left">
                "A 20-year-old athlete can train and bounce back in a way a parent with a full workday and school pickup cannot. Your roadmap has to fit the recovery and the calendar you have now."
              </blockquote>

              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  We look at how your energy responds to the way you eat on a normal week with the kids. You leave with a <strong className="text-white">food roadmap</strong> written for that week, aimed at the afternoon energy you want back.
                </p>
                <p>
                  I will help you keep a way of eating that still works when the week gets messy. <strong className="text-white">Steady afternoon energy</strong> comes first. A calmer scale can follow.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center">
                <PayButton label="Book now" />
                <p className="mt-4 text-zinc-600 text-xs leading-relaxed max-w-sm">
                  Pay on Stripe and the intake form opens next. I'll email you to book the session.
                </p>
              </div>
            </motion.div>
          </section>
        </div>

        {/* ─── WHAT HAPPENS IN 60 MINUTES ─────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <motion.div {...fadeUp} className="mb-14">
            <EyebrowLabel>What We Do in 60 Minutes</EyebrowLabel>
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
                Icon: FlaskConical,
              },
              {
                number: "03",
                title: "Leave with the next habit",
                body: "You leave with a 4 to 6 week roadmap and one habit to practice first. More energy in the coming weeks is the target, and the weight can move once that energy sticks.",
                Icon: GitMerge,
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                {...fadeUp}
                className="relative bg-zinc-950 p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
              >
                {/* Large ghost number */}
                <span className="absolute top-4 right-6 text-[6rem] font-bold text-zinc-800/50 leading-none select-none pointer-events-none">
                  {item.number}
                </span>

                <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {item.number}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <item.Icon className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-[1.8] text-sm">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
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

                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                        [ After 90 Days ]
                      </p>
                      <p className="text-white font-semibold text-base leading-relaxed">
                        12 lbs down, maintaining weight, consistent energy despite 60+ hour weeks.
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
                        "Running consistently, but not progressing",
                        "Trying to eat healthy, but still gaining weight",
                        "Guessing at nutrition and recovery",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                          <span className="mt-0.5 text-red-500 font-bold shrink-0">✕</span>
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
                        "Running consistently, improving pace",
                        "Making smarter food choices, losing weight",
                        "Having a plan to fit my goals, making consistent progress",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-zinc-200 text-sm leading-relaxed">
                          <span className="mt-0.5 text-emerald-400 font-bold shrink-0">✓</span>
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
              Pay {price} for the Audit + Roadmap and you go straight to a short intake form. I'll email you to set the session.
              Start Habits within 14 days and that fee covers month one. Start 1:1 within 14 days and you get {price} off month one.
            </p>
          </motion.div>
        </section>

        {/* ─── PRICING CARD ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mt-16 md:mt-20 pb-32">
          <motion.div
            {...fadeUp}
            className="max-w-[680px] mx-auto rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden shadow-2xl shadow-black/40"
          >
            {/* Card header band */}
            <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1">
                  One-time investment
                </p>
                <h3 className="text-white font-bold text-xl leading-tight">
                  Audit + Roadmap
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-4xl font-bold text-white tracking-tight">$149</span>
                <p className="text-zinc-500 text-xs mt-1">{currency ? `${currency} · one session` : "one session"}</p>
              </div>
            </div>

            {/* Features */}
            <div className="px-8 py-8">
              <ul className="space-y-4 mb-8">
                {[
                  "One-off nutrition and lifestyle diagnostic",
                  "Personal 4–6 week food and habit roadmap",
                  "One session, then a plan you use on your own",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-200 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-orange-400" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Incentive callout */}
              <div className="rounded-md bg-zinc-800/60 border border-zinc-700/50 px-5 py-4 mb-8">
                <p className="text-zinc-400 text-xs leading-[1.75]">
                  <span className="text-zinc-200 font-semibold">The {price} is credited if you start coaching: </span>
                  Start Nutrition Habits within 14 days and the audit covers your first month (then {price}/month). Start 1:1 within 14 days and you get {price} off month one.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-4 text-center">
                <PayButton label="Book now" />
                <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                  After Stripe confirms the payment, you land on the intake form. Fill it in and I'll email you a time.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── FOOTER ─────────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-900 py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-xs tracking-wide">
            <span>© {new Date().getFullYear()} Tony Nguyen Fit. All rights reserved.</span>
            <a href="/" className="hover:text-zinc-400 transition-colors">
              tonynguyenfit.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
