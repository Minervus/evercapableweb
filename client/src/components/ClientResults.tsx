import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reveal, revealAt } from "@/lib/reveal";

/**
 * One result and one testimonial isn't much proof at $279/month, so this holds
 * a list rather than two bespoke sections.
 *
 * TODO(tony): aim for 4–6 entries. Each needs a starting point, a timeframe,
 * the life context, and what actually changed — a quote about you as a person
 * is weaker than a quote about an outcome. Ask past clients for one line on
 * what's different now, and get written permission to use first name + initial.
 */

type Snapshot = {
  name: string;
  initials: string;
  photo?: string;
  context: string;
  /** Rendered as the result heading, e.g. "After 90 days" or "Where he is now". */
  timeframe: string;
  startingPoint: string;
  result: string;
  quote?: string;
};

const snapshots: Snapshot[] = [
  {
    name: "Christian K.",
    initials: "CK",
    photo: "/christian.jpeg",
    context: "Finance exec, two kids, 60+ hour weeks",
    timeframe: "After 90 days",
    startingPoint: "Weight swinging up and down, 3 PM energy crashes, felt out of control.",
    result: "12 lbs down and holding, steady energy through the workday.",
    quote: "I feel more in control of my health than ever before.",
  },
  {
    name: "Gary Y.",
    initials: "GY",
    photo: "/gary.jpeg",
    context: "Software engineering lead",
    timeframe: "Where he is now",
    startingPoint: "Wanted a straight read on his habits, training and food together.",
    result: "A routine he understands well enough to adjust himself.",
    quote:
      "Tony has a great attention to detail… he educates me on the underlying reasoning as well.",
  },
];

export function ClientResults() {
  return (
    <section
      id="results"
      className="py-16 md:py-24 bg-background border-t border-white/5 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...reveal} className="mb-12 text-center">
          <p className="text-xs md:text-sm text-orange-500 uppercase tracking-widest font-bold mb-3">
            Client results
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            What changed, and how long it took
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {snapshots.map((snapshot, i) => (
            <motion.article
              key={snapshot.name}
              {...revealAt(i)}
              className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-14 h-14 border border-zinc-800">
                  {snapshot.photo && (
                    <AvatarImage src={snapshot.photo} alt={snapshot.name} className="object-cover" />
                  )}
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 tracking-widest">
                    {snapshot.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-bold text-lg">{snapshot.name}</p>
                  <p className="text-zinc-500 text-sm">{snapshot.context}</p>
                </div>
              </div>

              <dl className="space-y-4 flex-1">
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1">
                    Starting point
                  </dt>
                  <dd className="text-zinc-400 text-sm leading-relaxed">{snapshot.startingPoint}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-green-500 mb-1">
                    {snapshot.timeframe}
                  </dt>
                  <dd className="text-white text-base leading-relaxed font-medium">
                    {snapshot.result}
                  </dd>
                </div>
              </dl>

              {snapshot.quote && (
                <blockquote className="mt-6 pt-6 border-t border-zinc-800/80 relative pl-5">
                  <span className="absolute left-0 top-6 bottom-0 w-[2px] bg-orange-500" />
                  <p className="text-zinc-300 italic leading-relaxed">“{snapshot.quote}”</p>
                </blockquote>
              )}
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-zinc-600 text-xs">
          Results shared with permission. Individual results vary — nothing here is a promise of a
          specific outcome.
        </p>
      </div>
    </section>
  );
}
