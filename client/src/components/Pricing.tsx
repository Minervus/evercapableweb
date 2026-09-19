import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Minus } from "lucide-react";

const resultMarkers = [
  {
    title: "Steady weight change",
    description: "A food strategy you can keep — not another short burst that snaps back.",
  },
  {
    title: "Weekly course-correction",
    description: "You track food in the coaching app. I send written adjustments each week — and on 1:1, a video deep dive too.",
  },
  {
    title: "Energy that lasts the day",
    description: "Fewer 3 PM crashes because meals, portions, and timing actually fit your life.",
  },
  {
    title: "Strength as support",
    description: "Optional training for energy, longevity, and feeling capable — not a second job.",
  },
  {
    title: "You know what to do next",
    description: "The knowledge and tools to take the reins on your health, nutrition, and longevity for the long haul.",
  },
];

type OfferFeature = {
  text: string;
  included: boolean;
};

type Offer = {
  id: string;
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  summary: string;
  features: OfferFeature[];
  cadenceNote: string;
  footnote: string;
  cta: string;
  href: string;
  testId: string;
};

const offers: Offer[] = [
  {
    id: "audit",
    eyebrow: "Front door · one-off",
    name: "Audit + Roadmap",
    price: "$150",
    cadence: "NZD · one session",
    badge: "Start here",
    summary: "A nutrition and lifestyle diagnostic plus a 4–6 week roadmap. No ongoing chat — just a clear plan you can use.",
    features: [
      { text: "One-off nutrition & lifestyle diagnostic", included: true },
      { text: "Personal 4–6 week food and habit roadmap", included: true },
      { text: "Practical next steps for meals, portions, and weekly rhythm", included: true },
      { text: "Credited toward Habits or 1:1 if you join within 14 days", included: true },
      { text: "Weekly check-ins or ongoing messaging", included: false },
    ],
    cadenceNote: "One session. You walk away with the roadmap. I don't stay in your inbox after that unless you join a monthly offer.",
    footnote: "The $150 NZD is credited toward Nutrition Habits or 1:1 Coaching if you start within 14 days. No 48-hour pressure.",
    cta: "Get your roadmap",
    href: "/initialize?plan=audit",
    testId: "button-offer-audit",
  },
  {
    id: "habits",
    eyebrow: "Lighter · higher capacity",
    name: "Nutrition Habits",
    price: "$129",
    cadence: "NZD / month",
    summary: "Track food in the coaching app each week. I review your inputs and send written adjustments. Limited messaging. Training optional and light.",
    features: [
      { text: "Weekly check-in in the coaching app (food tracking / inputs)", included: true },
      { text: "Written adjustments for the week ahead", included: true },
      { text: "Limited messaging between check-ins", included: true },
      { text: "Optional light training support", included: true },
      { text: "Video deep dives", included: false },
      { text: "Priority messaging or fuller personal roadmap updates", included: false },
    ],
    cadenceNote: "Each week you track food in the coaching app. I review the week you actually had and send written adjustments — specific tweaks, not a leftover meal plan. Messaging stays limited. Video deep dives aren't part of this tier.",
    footnote: "A lighter monthly option if you want a weekly written review without 1:1 video deep dives and priority access.",
    cta: "Start weekly habits",
    href: "/initialize?plan=habits",
    testId: "button-offer-habits",
  },
  {
    id: "coaching",
    eyebrow: "Premium · capped",
    name: "1:1 Nutrition Coaching",
    price: "$279",
    cadence: "NZD / month",
    summary: "Same coaching-app tracking as Habits, plus video deep dives with specific adjustments. Priority messaging, fuller roadmap updates, and optional training support.",
    features: [
      { text: "Weekly food tracking in the coaching app", included: true },
      { text: "Video deep dives with specific adjustments", included: true },
      { text: "Priority messaging between check-ins", included: true },
      { text: "Personal roadmap updates as life changes", included: true },
      { text: "Optional training support for strength, energy, and longevity", included: true },
      { text: "Audit $150 NZD credited to month one", included: true },
    ],
    cadenceNote: "Same weekly tracking as Habits — you log food in the app, I review it. 1:1 adds video deep dives, more personalization, priority chat, and a roadmap that gets rewritten when life changes.",
    footnote: "A soft 90-day stretch is recommended so the habits have time to stick. Month-to-month after that. Spots are capped.",
    cta: "Apply for coaching",
    href: "/initialize?plan=coaching",
    testId: "button-offer-coaching",
  },
];

function FeatureIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
        <svg className="w-2.5 h-2.5 text-orange-400" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
      <Minus className="w-2.5 h-2.5 text-zinc-500" />
    </span>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">

      <motion.div
        id="protocol-tiers"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="mb-10 text-center">
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Three ways to work together
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start with a roadmap. Stay for weekly coaching.
          </h2>
          <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            All prices in NZD. Audit is the soft front door. Habits is the lighter weekly rhythm. 1:1 is the capped, hands-on option.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto border border-dashed border-orange-500/50 bg-orange-500/5 p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <span className="font-mono text-[80px] text-orange-500 font-bold select-none leading-none">1:1</span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h4 className="text-orange-500 font-mono font-bold uppercase tracking-widest text-sm md:text-base mb-3">
                1:1 spots are capped
              </h4>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Not sure which one yet?</h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
                Start with the Audit + Roadmap. You'll get a 4–6 week plan without a monthly commitment. If you join Habits or 1:1 within 14 days, the $150 NZD comes off your first month.
              </p>
              <Link href="/initialize?plan=audit">
                <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-mono uppercase tracking-widest px-6 py-2.5 text-sm transition-colors duration-200">
                  Get your roadmap
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="border-l-2 border-orange-500/30 pl-6 py-2 mb-8">
            <h4 className="text-[12px] font-mono text-orange-500 tracking-widest uppercase mb-2">
              What this is for
            </h4>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">You'll have:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {resultMarkers.map((marker, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-white text-base md:text-lg mb-1">
                    {marker.title}
                  </h5>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {marker.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto mb-16">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`flex flex-col rounded-xl border bg-zinc-900/60 overflow-hidden shadow-xl shadow-black/30 ${
                offer.badge
                  ? "border-orange-500/50"
                  : "border-zinc-700/60"
              }`}
            >
              <div className="bg-zinc-800/80 border-b border-zinc-700/60 px-6 py-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-1">
                    {offer.eyebrow}
                  </p>
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {offer.name}
                  </h3>
                </div>
                <div className="shrink-0 text-right">
                  {offer.badge && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-1">
                      {offer.badge}
                    </p>
                  )}
                  <span className="text-3xl font-bold text-white tracking-tight">{offer.price}</span>
                  <p className="text-zinc-500 text-[10px] mt-0.5">{offer.cadence}</p>
                </div>
              </div>

              <div className="px-6 py-7 flex flex-col flex-1">
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {offer.summary}
                </p>

                <ul className="space-y-3 mb-7 flex-1">
                  {offer.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-start gap-3 text-sm leading-relaxed ${
                        feature.included ? "text-zinc-200" : "text-zinc-500"
                      }`}
                    >
                      <FeatureIcon included={feature.included} />
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <div className="rounded-md bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 mb-4">
                  <p className="text-zinc-300 text-[11px] font-mono uppercase tracking-widest mb-2">
                    Weekly rhythm
                  </p>
                  <p className="text-zinc-400 text-xs leading-[1.75]">
                    {offer.cadenceNote}
                  </p>
                </div>

                <div className="rounded-md bg-zinc-800/40 border border-zinc-700/40 px-4 py-3 mb-7">
                  <p className="text-zinc-400 text-xs leading-[1.75]">
                    {offer.footnote}
                  </p>
                </div>

                <Link href={offer.href}>
                  <button
                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-white font-bold tracking-widest text-xs uppercase rounded-sm transition-all duration-200 shadow-lg shadow-orange-500/20"
                    data-testid={offer.testId}
                  >
                    {offer.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-900/40 rounded-xl p-6 md:p-8"
        >
          <h4 className="text-white font-bold text-lg md:text-xl mb-2">A fair start</h4>
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
            For 1:1, I recommend giving it about 90 days so the weekly rhythm has time to stick. Track in the app, watch the video deep dive, and we'll keep adjusting the food strategy until it fits.{" "}
            <span className="text-white font-bold">You bring the week. I bring the next adjustment.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-28 text-center pb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Start with the roadmap
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            One session. A 4–6 week plan. Credit toward Habits or 1:1 if you join within 14 days.
          </p>
          <Link href="/initialize?plan=audit">
            <button className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-widest text-sm uppercase px-12 py-5 rounded-sm transition-all duration-200 shadow-xl shadow-orange-500/20">
              Get your roadmap
            </button>
          </Link>
        </motion.div>

      </motion.div >
    </section >
  );
}
