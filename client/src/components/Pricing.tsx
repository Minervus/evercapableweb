import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Minus } from "lucide-react";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import {
  AUDIT_PRICE,
  auditSteps,
  COACHING_PRICE,
  HABITS_PRICE,
  COACHING_SUMMARY,
  creditLine,
  MONTHLY_TERMS_LINE,
  guaranteeLine,
  HABITS_SUMMARY,
  spotsLine,
} from "@/lib/offer";
import { reveal, revealAt } from "@/lib/reveal";

const resultMarkers = [
  {
    title: "Steady weight change",
    description: "A food strategy you can keep — not another short burst that snaps back.",
  },
  {
    title: "Weekly course-correction",
    description: "You track food in the coaching app. I send written adjustments each week.",
  },
  {
    title: "Energy that lasts the day",
    description: "Fewer 3 PM crashes because meals, portions, and timing actually fit your life.",
  },
  {
    title: "You know what to do next",
    description: "The tools to take the reins on your own health for the long haul.",
  },
];

type Plan = {
  id: string;
  name: string;
  price: number;
  cadence: () => string;
  summary: string;
  cta: string;
  href: string;
  testId: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "audit",
    name: "Audit + Roadmap",
    price: AUDIT_PRICE,
    cadence: () => "one-off",
    summary: "One session and a plan you can use on your own.",
    cta: "Get your roadmap",
    href: "/initialize?plan=audit",
    testId: "button-offer-audit",
    featured: true,
  },
  {
    id: "habits",
    name: "Nutrition Habits",
    price: HABITS_PRICE,
    cadence: () => "per month",
    summary: HABITS_SUMMARY,
    cta: "Start weekly habits",
    href: "/initialize?plan=habits",
    testId: "button-offer-habits",
  },
  {
    id: "coaching",
    name: "1:1 Coaching",
    price: COACHING_PRICE,
    cadence: () => "per month",
    summary: COACHING_SUMMARY,
    cta: "Apply for coaching",
    href: "/initialize?plan=coaching",
    testId: "button-offer-coaching",
  },
];

/** `true` = included, `false` = not included, string = included with a caveat. */
type Cell = boolean | string;

const comparison: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "60-minute nutrition session", cells: [true, false, false] },
  { label: "4–6 week food roadmap", cells: [true, false, "Rewritten as life changes"] },
  { label: "Track food in the coaching app", cells: [false, "Weekly", "Weekly"] },
  { label: "Written adjustments each week", cells: [false, true, true] },
  { label: "Questions answered in the check-in", cells: [false, true, true] },
  { label: "Video deep dive each week", cells: [false, false, true] },
  { label: "Priority messaging between check-ins", cells: [false, false, true] },
  { label: "Training support", cells: [false, "Optional, light", "Optional, fuller"] },
];

function CellMark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check className="w-4 h-4 text-orange-400 mx-auto" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="w-4 h-4 text-zinc-600 mx-auto" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-zinc-300 text-xs leading-snug">{value}</span>;
}

export function Pricing() {
  const currency = useDisplayCurrency();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20 relative border-t border-white/10">
      <motion.div {...reveal} id="protocol-tiers" className="max-w-[1100px] mx-auto px-6">
        <div className="mb-10 text-center">
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Three ways to work together
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
            Start with a roadmap. Stay for weekly coaching.
          </h2>
          <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Most people start with the audit: one session, a plan, no monthly commitment.
          </p>
        </div>

        {/* The credit and the guarantee — stated once, in one wording. */}
        <motion.div
          {...reveal}
          className="mb-14 max-w-2xl mx-auto rounded-xl border border-orange-500/40 bg-orange-500/5 px-6 py-5 text-center"
        >
          <p className="text-white text-sm md:text-base font-medium">{creditLine(currency)}</p>
          <p className="mt-2 text-zinc-400 text-sm">{guaranteeLine(currency)}</p>
          <p className="mt-2 text-zinc-400 text-sm">{MONTHLY_TERMS_LINE}</p>
        </motion.div>

        {/* What the audit actually is, so $149 is easy to picture. */}
        <motion.div {...reveal} className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-6 text-center">
            What the audit involves
          </h3>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {auditSteps(currency).map((step, i) => (
              <li
                key={step.label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5"
              >
                <p className="text-orange-500 font-mono text-xs tracking-widest uppercase mb-2">
                  Step {i + 1}
                </p>
                <p className="text-white font-semibold mb-1">{step.label}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Comparison table — desktop */}
        <motion.div {...reveal} className="hidden md:block mb-6 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full border-collapse text-sm" data-testid="table-plan-comparison">
            <caption className="sr-only">Compare the three coaching options</caption>
            <thead>
              <tr className="bg-zinc-900">
                <th scope="col" className="text-left font-medium text-zinc-500 p-5 w-[34%]">
                  <span className="sr-only">Feature</span>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`p-5 text-left align-top border-l border-zinc-800 ${
                      plan.featured ? "bg-orange-500/[0.07]" : ""
                    }`}
                  >
                    {plan.featured && (
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-1">
                        Start here
                      </span>
                    )}
                    <span className="block text-white font-bold text-base">{plan.name}</span>
                    <span className="block text-2xl font-bold text-white mt-2">
                      {money(plan.price, currency)}
                    </span>
                    <span className="block text-zinc-500 text-xs mt-0.5">{plan.cadence()}</span>
                    <span className="block text-zinc-400 text-xs mt-3 leading-relaxed font-normal">
                      {plan.summary}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-zinc-800">
                  <th scope="row" className="text-left font-normal text-zinc-300 p-4 pl-5">
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={plans[i].id}
                      className={`p-4 text-center border-l border-zinc-800 ${
                        plans[i].featured ? "bg-orange-500/[0.04]" : ""
                      }`}
                    >
                      <CellMark value={cell} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-zinc-800">
                <td />
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={`p-4 border-l border-zinc-800 ${plan.featured ? "bg-orange-500/[0.04]" : ""}`}
                  >
                    <Link href={plan.href}>
                      <button
                        className={`w-full py-3 font-bold tracking-widest text-[11px] uppercase rounded-sm transition-colors ${
                          plan.featured
                            ? "bg-orange-500 hover:bg-orange-400 text-white"
                            : "border border-zinc-600 text-zinc-200 hover:border-orange-500 hover:text-orange-400"
                        }`}
                        data-testid={plan.testId}
                      >
                        {plan.cta}
                      </button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Comparison — mobile */}
        <div className="md:hidden space-y-5 mb-6">
          {plans.map((plan, planIndex) => (
            <motion.div
              key={plan.id}
              {...revealAt(planIndex)}
              className={`rounded-xl border p-6 ${
                plan.featured ? "border-orange-500/50 bg-orange-500/[0.06]" : "border-zinc-800 bg-zinc-900/40"
              }`}
            >
              {plan.featured && (
                <p className="text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-1">
                  Start here
                </p>
              )}
              <h3 className="text-white font-bold text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{money(plan.price, currency)}</p>
              <p className="text-zinc-500 text-xs">{plan.cadence()}</p>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{plan.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {comparison.map((row) => {
                  const cell = row.cells[planIndex];
                  if (cell === false) return null;
                  return (
                    <li key={row.label} className="flex items-start gap-2.5 text-sm text-zinc-200">
                      <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        {row.label}
                        {typeof cell === "string" && (
                          <span className="text-zinc-500"> — {cell.toLowerCase()}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link href={plan.href}>
                <button
                  className={`mt-6 w-full py-3.5 font-bold tracking-widest text-[11px] uppercase rounded-sm transition-colors ${
                    plan.featured
                      ? "bg-orange-500 hover:bg-orange-400 text-white"
                      : "border border-zinc-600 text-zinc-200 hover:border-orange-500 hover:text-orange-400"
                  }`}
                  data-testid={`${plan.testId}-mobile`}
                >
                  {plan.cta}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mb-16">
          {spotsLine()} For 1:1 I suggest giving it about 90 days so the weekly rhythm has time to
          stick. It's month to month from the first payment.
        </p>

        <motion.div {...reveal} className="mb-20 max-w-4xl mx-auto">
          <div className="border-l-2 border-orange-500/30 pl-6 py-2 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">You'll have:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {resultMarkers.map((marker) => (
              <div key={marker.title} className="flex items-start gap-4">
                <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg mb-1">{marker.title}</h4>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {marker.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal} className="text-center pb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Start with the roadmap
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            One session. A 4–6 week plan. {creditLine(currency)}
          </p>
          <Link href="/initialize?plan=audit">
            <button className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-widest text-sm uppercase px-12 py-5 rounded-sm transition-colors shadow-xl shadow-orange-500/20">
              Get your roadmap
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
