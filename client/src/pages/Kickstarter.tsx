import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";
import logoIcon from "@assets/tn-logo-on-black.png";
import { Footer } from "@/components/Footer";
import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";
import { SITE_BASE_URL } from "@shared/articleSeo";
import {
  KICKSTARTER_DESCRIPTION,
  KICKSTARTER_H1,
  KICKSTARTER_TITLE,
  KICKSTARTER_WEEKS,
} from "@shared/kickstarterPage";

const HARBOR_IMG = "/tony-harbor.png";
const PAGE_URL = `${SITE_BASE_URL}/kickstarter`;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const beats = [
  {
    title: "Sign up",
    body: "Leave your name and email. The series starts from there.",
  },
  {
    title: "One email a week",
    body: "A short note lands once a week for 12 weeks. Most take under three minutes.",
  },
  {
    title: "One action",
    body: "Each note asks you to change one thing about how you eat, and to stay with that until the next email.",
  },
];

const FIELD_SELECTOR =
  "input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio'])";

function scrollToSignup() {
  const section = document.getElementById("signup");
  if (!section) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  const started = Date.now();
  const timer = window.setInterval(() => {
    const root = section.querySelector(".ml-embedded");
    const input = root?.querySelector<HTMLInputElement>(FIELD_SELECTOR);
    if (input) {
      input.focus({ preventScroll: true });
      window.clearInterval(timer);
      return;
    }

    const iframe = root?.querySelector("iframe");
    if (iframe instanceof HTMLIFrameElement) {
      try {
        const inner = iframe.contentDocument?.querySelector<HTMLInputElement>(FIELD_SELECTOR);
        if (inner) {
          inner.focus();
          window.clearInterval(timer);
          return;
        }
      } catch {
        iframe.focus();
        window.clearInterval(timer);
        return;
      }
    }

    if (Date.now() - started > 4000) {
      window.clearInterval(timer);
    }
  }, 200);
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-5">
      {children}
    </p>
  );
}

function EmailButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={scrollToSignup}
      className={`inline-block bg-orange-500 hover:bg-orange-400 active:scale-[0.97] text-white font-bold tracking-widest text-xs uppercase px-10 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-orange-500/20 ${className}`}
    >
      {label}
    </button>
  );
}

export default function Kickstarter() {
  return (
    <>
      <Helmet>
        <title>{KICKSTARTER_TITLE}</title>
        <meta name="description" content={KICKSTARTER_DESCRIPTION} />
        <meta property="og:title" content={KICKSTARTER_TITLE} />
        <meta property="og:description" content={KICKSTARTER_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${SITE_BASE_URL}/tony-harbor.png`} />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <div className="dark min-h-screen bg-zinc-950 text-white antialiased selection:bg-orange-500/30">
        <header className="px-6 py-5 flex items-center justify-between gap-4 max-w-6xl mx-auto border-b border-zinc-900">
          <Link href="/" asChild>
            <a className="flex items-center gap-2.5 min-w-0">
              <img src={logoIcon} alt="" className="h-6 w-auto shrink-0" />
              <span className="text-base font-bold text-white tracking-tight truncate">
                Tony Nguyen Fit
              </span>
            </a>
          </Link>
          <button
            type="button"
            onClick={scrollToSignup}
            className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-widest text-[10px] sm:text-xs uppercase px-4 sm:px-6 py-3 rounded-sm transition-colors"
          >
            Get the emails
          </button>
        </header>

        <main>
          <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div {...fadeUp}>
                <Eyebrow>Free 12-week Kickstarter</Eyebrow>
                <h1 className="text-[2.15rem] sm:text-4xl md:text-[3.15rem] font-bold leading-[1.08] tracking-tight text-white mb-6">
                  {KICKSTARTER_H1}
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 leading-[1.7] mb-8 max-w-[540px]">
                  {KICKSTARTER_DESCRIPTION}
                </p>
                <EmailButton label="Get the free emails" />
                <p className="mt-4 text-zinc-500 text-xs tracking-wide">
                  Free, under 3 minutes to read, and no crash diets.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src={HARBOR_IMG}
                  alt="Tony Nguyen, coach at Tony Nguyen Fit"
                  className="w-full rounded-lg object-cover shadow-2xl shadow-black/60"
                  style={{ aspectRatio: "4/5", objectPosition: "top" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/50 to-transparent rounded-b-lg pointer-events-none" />
              </motion.div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
            <motion.div {...fadeUp} className="max-w-3xl">
              <Eyebrow>The stuck point</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                A lot of nutrition advice, and no clear first step
              </h2>
              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8] max-w-[640px]">
                <p>
                  The meals are already in a decent place. The hard part is knowing what to change first.
                </p>
                <p>
                  One source says cut carbs. Another says raise protein and start fasting. If the food is already decent, that stack still doesn't say whether this week is about portions, protein, weekends, or sleep.
                </p>
                <p>
                  The scale sits still and the days feel flat while you try to hold every rule at once. These emails take one food topic a week. Daily movement shows up once, as support.
                </p>
              </div>
            </motion.div>
          </section>

          <section className="border-t border-zinc-800/80">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
              <motion.div {...fadeUp} className="max-w-3xl mb-10 md:mb-14">
                <Eyebrow>What's inside</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Twelve weeks, one action each
                </h2>
                <p className="text-zinc-300 text-[1.05rem] leading-[1.8]">
                  The first six weeks are for seeing your intake clearly. The next six are for keeping the change once life gets busy again.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {KICKSTARTER_WEEKS.map((block, blockIndex) => (
                  <motion.div
                    key={block.range}
                    {...fadeUp}
                    className="border border-zinc-800 bg-zinc-900/40 p-6 md:p-8"
                  >
                    <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.22em] mb-3">
                      {block.range}
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight mb-6">{block.title}</h3>
                    <ol className="space-y-3">
                      {block.topics.map((topic, index) => (
                        <li key={topic} className="flex gap-4 text-zinc-300 leading-relaxed">
                          <span className="font-mono text-orange-500/90 text-xs pt-1 w-6 shrink-0">
                            {String(blockIndex * 6 + index + 1).padStart(2, "0")}
                          </span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
            <motion.div {...fadeUp} className="mb-10 md:mb-12">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How the emails run
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {beats.map((beat, index) => (
                <motion.article
                  key={beat.title}
                  {...fadeUp}
                  className="border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <p className="font-mono text-orange-500 text-xs mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-bold mb-3">{beat.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{beat.body}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
            <motion.div {...fadeUp} className="max-w-3xl">
              <Eyebrow>What it costs</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                The 12 weeks are free
              </h2>
              <div className="space-y-6 text-zinc-300 text-[1.05rem] leading-[1.8] max-w-[640px]">
                <p>
                  Nothing to pay. You leave your name and email, a short note shows up once a week, and you can leave the list whenever you want.
                </p>
                <p>
                  The nutrition is already public. It sits in separate articles and videos, so gathering the useful parts into one sequence takes longer than a normal week allows. These emails do that sorting. Each note is one topic and one action, and the next email picks up from there.
                </p>
                <p>
                  The series is a general path, the kind a lot of people can follow. When you want a plan written for your situation and the way you live, the{" "}
                  <a
                    href="https://tonynguyenfit.com/audit"
                    className="text-zinc-200 underline underline-offset-4 decoration-zinc-600 hover:text-orange-400 hover:decoration-orange-400/70 transition-colors"
                  >
                    Audit + Roadmap
                  </a>{" "}
                  is there.
                </p>
              </div>
            </motion.div>
          </section>

          <section
            id="signup"
            aria-label="Name and email signup"
            className="bg-black border-y border-white/5 py-16 md:py-28 scroll-mt-6"
          >
            <div className="max-w-[720px] mx-auto px-6 text-center">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
                Your name and email. No spam, and you can unsubscribe any time.
              </p>
              <MailerLiteEmbed appearance="site" />
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                A closer look, if you want one
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-[1.75] mb-8">
                The emails can stand on their own. If you want a plan written around your actual week, the Audit + Roadmap is $149 for one session and a 4–6 week food roadmap.
              </p>
              <a
                href="https://tonynguyenfit.com/audit"
                className="inline-block text-sm text-zinc-300 underline underline-offset-4 decoration-zinc-600 hover:text-orange-400 hover:decoration-orange-400/70 transition-colors"
              >
                See the Audit + Roadmap
              </a>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
