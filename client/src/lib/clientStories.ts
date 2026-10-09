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
