import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const NOTION_FORM_URL = "https://tonynguyenfit.notion.site/apply"; // ← replace with your real Notion link

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function ApplyButton({ label = "Apply for Your Audit" }: { label?: string }) {
  return (
    <a
      href={NOTION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold tracking-wide text-sm uppercase px-10 py-4 rounded transition-all duration-200 shadow-lg shadow-orange-500/20"
    >
      {label}
    </a>
  );
}

function Divider() {
  return <hr className="border-t border-zinc-800 my-16 md:my-24" />;
}

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
        <meta
          property="og:description"
          content="Stop searching for the magic secret. There isn't one. Apply for your personalised 60-minute Vitality Audit with Tony Nguyen."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://evercapable.com/audit" />
        <link rel="canonical" href="https://evercapable.com/audit" />
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white antialiased">
        {/* ─── NAV ──────────────────────────────────────────────── */}
        <header className="px-6 py-6 flex items-center justify-between max-w-5xl mx-auto">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            Tony Nguyen Fit
          </span>
          <ApplyButton label="Apply Now →" />
        </header>

        <main className="max-w-3xl mx-auto px-6 pb-32">
          {/* ─── HERO ─────────────────────────────────────────────── */}
          <motion.section {...fadeUp} className="pt-20 md:pt-32 pb-8">
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">
              The Millennial Vitality Audit &amp; Roadmap — $149
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-8">
              Stop Searching for the "Magic Secret."
              <br />
              <span className="text-zinc-400">There isn't one.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              There's just the science, the system, and the execution.
            </p>

            <div className="mt-12">
              <ApplyButton />
              <p className="mt-4 text-zinc-500 text-sm">
                60 minutes · Personalised roadmap · $149 applied as credit if you join coaching
              </p>
            </div>
          </motion.section>

          <Divider />

          {/* ─── THE PROBLEM ──────────────────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">
              The Problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Fitness shouldn't feel like a mystery.
            </h2>
            <div className="space-y-5 text-zinc-300 text-lg leading-relaxed">
              <p>
                You've read the articles, bought the program, tracked the macros. And yet — six months later — you're back where you started, or worse.
              </p>
              <p>
                The problem isn't your discipline. The problem isn't that you don't know <em>what</em> to do. The real challenge is execution: putting the right system in place for <em>your</em> specific body, schedule, and life.
              </p>
              <p>
                Without that, every new tactic is just noise. And the noise is deafening.
              </p>
            </div>
          </motion.section>

          <Divider />

          {/* ─── PHILOSOPHY ───────────────────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">
              The Core Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Simple. Not easy. And never one-size-fits-all.
            </h2>
            <blockquote className="border-l-2 border-orange-500 pl-6 py-1 my-8 text-xl text-zinc-300 italic leading-relaxed">
              "It's simple, but it's not easy. And everyone is different."
            </blockquote>
            <div className="space-y-5 text-zinc-300 text-lg leading-relaxed">
              <p>
                What works for a 20-year-old athlete won't work for a busy professional in their late 30s managing a career, a family, and a body that doesn't recover the way it used to.
              </p>
              <p>
                You need a data-backed system that identifies how <em>your</em> body responds to <em>your</em> unique lifestyle. Not a template. A roadmap built around your biology, your schedule, and your actual goals.
              </p>
              <p>
                I help you filter the noise and build the custom protocol that makes high-level health sustainable — for your life, long-term.
              </p>
            </div>
          </motion.section>

          <Divider />

          {/* ─── WHAT HAPPENS IN THE AUDIT ────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">
              What We Do in 60 Minutes
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
              The Millennial Vitality Audit
            </h2>

            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Filter the Noise",
                  body: "We audit everything you've tried and identify exactly what's working, what's wasted effort, and what's actively setting you back. No opinions — just data.",
                },
                {
                  number: "02",
                  title: "Define Your Protocol",
                  body: "Based on your biometrics, lifestyle, and goals, we map your minimum effective dose — the precise inputs (training, nutrition, recovery) required to produce the results you're after.",
                },
                {
                  number: "03",
                  title: "Bridge the Gap",
                  body: "We build a 90-day execution roadmap that closes the distance between where you are and where you need to be — with clear checkpoints, so nothing falls through the cracks.",
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-6 group">
                  <span className="text-orange-500 font-mono text-xs font-bold mt-1 shrink-0 w-6">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* ─── WHO THIS IS FOR ──────────────────────────────────── */}
          <motion.section {...fadeUp}>
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              This is for you if…
            </h2>
            <ul className="space-y-4">
              {[
                "You're 35–45, career-driven, and serious about your health.",
                "You've tried programs before and keep hitting the same wall.",
                "You want answers, not another generic plan.",
                "You're ready to stop experimenting and start executing.",
                "You want results that last — not a 30-day before/after.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300 text-lg">
                  <span className="text-orange-500 mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          <Divider />

          {/* ─── FINAL CTA ────────────────────────────────────────── */}
          <motion.section {...fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to stop guessing?
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              Apply for your Vitality Audit. The application takes 3 minutes. If it's a fit, we'll schedule your 60-minute session.
            </p>
            <ApplyButton label="Apply for Your Audit" />

            <p className="mt-8 text-zinc-600 text-sm max-w-md mx-auto leading-relaxed">
              If you join 1-on-1 coaching within 48 hours of your session, the $149 audit fee is applied as a credit toward your first month.
            </p>
          </motion.section>
        </main>

        {/* ─── MINIMAL FOOTER ───────────────────────────────────── */}
        <footer className="border-t border-zinc-900 py-10 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
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
