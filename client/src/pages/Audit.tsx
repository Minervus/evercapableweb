import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SlidersHorizontal, FlaskConical, GitMerge } from "lucide-react";
import { Link } from "wouter";
import logoIcon from "@assets/tn-logo-on-black.png";

const APPLY_URL = "/initialize?plan=audit";

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
function ApplyButton({ label = "Apply for Your Audit" }: { label?: string }) {
  return (
    <Link href={APPLY_URL}>
      <a className="
        inline-block bg-orange-500 hover:bg-orange-400 active:scale-[0.97]
        text-white font-bold tracking-widest text-xs uppercase
        px-10 py-4 rounded-sm transition-all duration-200
        shadow-xl shadow-orange-500/20
      ">
        {label}
      </a>
    </Link>
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
  return (
    <>
      <Helmet>
        <title>The Millennial Vitality Audit & Roadmap — Tony Nguyen Fit</title>
        <meta
          name="description"
          content="A 60-minute data-backed strategy session ($149) for 35–45 year-old professionals who are done guessing and ready to build a health system that actually fits their life."
        />
        <meta property="og:title" content="The Millennial Vitality Audit & Roadmap — Tony Nguyen Fit" />
        <meta property="og:description" content="Stop searching for the magic secret. There isn't one. Apply for your personalised 60-minute Vitality Audit with Tony Nguyen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://evercapable.com/audit" />
        <meta property="og:image" content="https://evercapable.com/tony-harbor.png" />
        <link rel="canonical" href="https://evercapable.com/audit" />
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
          <ApplyButton label="Apply Now →" />
        </header>

        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <motion.div {...fadeUp}>
              <EyebrowLabel>The Millennial Vitality Audit &amp; Roadmap — $149</EyebrowLabel>

              <h1 className="text-[2.6rem] md:text-[3.5rem] font-bold leading-[1.06] tracking-tight text-white mb-7">
                Stop Searching for the{" "}
                <span className="text-orange-500">"Magic Secret."</span>
                <br />
                <span className="text-zinc-400 font-light">There isn't one.</span>
              </h1>

              <p className="text-xl text-zinc-300 leading-[1.75] mb-10 max-w-[520px]">
                There's just the <strong className="text-white">science</strong>,
                the <strong className="text-white">system</strong>, and the{" "}
                <strong className="text-white">execution</strong>.
              </p>

              <ApplyButton />
              <p className="mt-4 text-zinc-500 text-xs tracking-wide">
                60 minutes · Personalised roadmap · $149 applied as credit if you join coaching
              </p>
            </motion.div>

            {/* Hero image */}
            <motion.div {...fadeIn} className="relative">
              <img
                src={HARBOR_IMG}
                alt="Tony Nguyen — coach and founder of Tony Nguyen Fit"
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
                Fitness shouldn't feel like a mystery.
              </h2>
              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  You've read the articles, bought the program, tracked the macros. And yet — six months later — you're back where you started, or worse.
                </p>
                <p>
                  The problem isn't your discipline. It isn't that you don't know <em>what</em> to do. The real challenge is execution: putting the right system in place for <em>your</em> specific body, schedule, and life.
                </p>
                <p>
                  Without that, every new tactic is just noise. <strong className="text-white">And the noise is deafening.</strong>
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
                Simple. Not easy. And never one-size-fits-all.
              </h2>

              <blockquote className="border-l-2 border-orange-500 pl-6 py-1 my-9 text-lg md:text-xl text-zinc-300 italic leading-[1.75] text-left">
                "It's simple, but it's not easy. And everyone is different — what works for a 20-year-old athlete won't work for a busy professional managing a career, a family, and a body that doesn't recover the way it used to."
              </blockquote>

              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8]">
                <p>
                  You need a <strong className="text-white">data-backed system</strong> that identifies how your body responds to your unique lifestyle. Not a template. A roadmap built around your biology, your schedule, and your actual goals.
                </p>
                <p>
                  I help you filter the noise and build the custom protocol that makes high-level health <strong className="text-white">sustainable</strong> — for your life, long-term.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center">
                <ApplyButton />
                <p className="mt-4 text-zinc-600 text-xs">
                  Applications are reviewed personally to ensure this is the right fit for your goals.
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
              The Millennial Vitality Audit
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-800/40 rounded-lg overflow-hidden border border-zinc-800">
            {[
              {
                number: "01",
                title: "Filter the Noise",
                body: "We audit everything you've tried and identify exactly what's working, what's wasted effort, and what's actively setting you back. No opinions — just data.",
                Icon: SlidersHorizontal,
              },
              {
                number: "02",
                title: "Define Your Protocol",
                body: "Based on your biometrics, lifestyle, and goals, we map your minimum effective dose — the precise inputs required to produce the results you're after.",
                Icon: FlaskConical,
              },
              {
                number: "03",
                title: "Bridge the Gap",
                body: "We build a 90-day execution roadmap that closes the distance between where you are and where you need to be — with clear checkpoints so nothing falls through the cracks.",
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
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-[6px] shrink-0 text-xs">◆</span>
                  <div className="text-zinc-300 leading-[1.8]">
                    <p>
                      <strong className="text-white">You're 35–45, career-driven, and serious about your health.</strong>
                    </p>
                    <p className="mt-2 text-zinc-400 text-sm leading-[1.8]">
                      You've realized your health isn't just about how you look — it's the foundation for everything else. You want the stamina to show up for your career, the energy to be present for your family, and the longevity to keep doing it for years to come.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-[6px] shrink-0 text-xs">◆</span>
                  <p className="text-zinc-300 leading-[1.8]">
                    You've tried generic programs and hit the same wall.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-[6px] shrink-0 text-xs">◆</span>
                  <p className="text-zinc-300 leading-[1.8]">
                    You want a system that <strong className="text-white">integrates into your life</strong>, not one that consumes it.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-orange-500 mt-[6px] shrink-0 text-xs">◆</span>
                  <p className="text-zinc-300 leading-[1.8]">
                    You're ready to stop experimenting and <strong className="text-white">start executing</strong>.
                  </p>
                </li>
              </ul>
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
                      With the Vitality Roadmap
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
            <EyebrowLabel>Ready to execute?</EyebrowLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to stop guessing?
            </h2>
            <p className="text-zinc-400 text-lg leading-[1.8]">
              Apply for your Vitality Audit. The application takes 3 minutes. If it's a fit, we'll schedule your 60-minute session.
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
                  The Millennial Vitality Audit &amp; Roadmap
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-4xl font-bold text-white tracking-tight">$149</span>
                <p className="text-zinc-500 text-xs mt-1">one session</p>
              </div>
            </div>

            {/* Features */}
            <div className="px-8 py-8">
              <ul className="space-y-4 mb-8">
                {[
                  "60-minute deep-dive consultation",
                  "Personalized 90-day execution roadmap",
                  "Data-backed bottleneck analysis",
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
                  <span className="text-zinc-200 font-semibold">Credit guarantee — </span>
                  If you join 1-on-1 coaching within 48 hours of your session, the $149 audit fee is applied as a credit toward your first month.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-4 text-center">
                <ApplyButton label="Apply for Your Audit" />
                <p className="text-zinc-600 text-xs max-w-xs leading-relaxed">
                  Applications are reviewed personally to ensure this is the right fit for your goals.
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
              evercapable.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
