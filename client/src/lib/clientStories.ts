/**
 * Christian's result, shared by the homepage results card and /audit so the
 * two can't drift. Facts from Tony: 3 months of coaching, 12 lb (5.4 kg) lost
 * in that time, and the steps below.
 *
 * TODO(tony): confirm the energy result (steady energy through 60+ hour weeks).
 * It was on the page before and isn't in what Christian or you have confirmed.
 * If it doesn't hold, drop `energy`.
 */
export const CHRISTIAN = {
  timeframe: "Over 3 months of coaching",
  weight: "5.4 kg / 12 lb down",
  energy: "steady energy through 60+ hour weeks",
  steps: [
    "We started by tracking his food, so he could see how he really ate.",
    "Then we found the easy changes and tracked those for a couple of weeks.",
    "As those started to work, we slowly layered in more habits to crowd out the ones keeping his weight and energy stuck.",
    "Once that held, we moved to more specific changes for his running as he trained for a half marathon.",
  ],
} as const;

export const CHRISTIAN_RESULT = `${CHRISTIAN.weight}, ${CHRISTIAN.energy}.`;

/**
 * Gary's result. Facts from Tony: 4 months of coaching to build muscle and
 * reduce body fat before his wedding, then week-to-week coaching since to
 * maintain and keep making steady gains. No figures have been given.
 *
 * TODO(tony): confirm Gary is happy with the quote below. It was on the
 * homepage before this story and is kept word for word.
 * TODO(tony): confirm the starting point. It was on the homepage before and
 * isn't part of what you sent.
 */
export const GARY = {
  timeframe: "Over 4 months of coaching",
  startingPoint: "Wanted a straight read on his habits, training and food together.",
  result: "More muscle and less body fat in time for his wedding. We still work together week to week.",
  steps: [
    "In the 4 months before his wedding, we worked on building muscle and bringing his body fat down.",
    "Since the wedding, we work week to week so he holds onto what he built and keeps making steady gains.",
  ],
  quote: "Tony has a great attention to detail… he educates me on the underlying reasoning as well.",
} as const;
