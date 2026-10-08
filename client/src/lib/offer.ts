import { money, type DisplayCurrency } from "@/lib/displayCurrency";

/**
 * Single source of truth for the offer facts that used to be restated
 * in Pricing, FAQ, Contact, Hero and the /audit page — in two different
 * wordings. Change a number here and every surface follows.
 */

export const AUDIT_PRICE = 149;
export const HABITS_PRICE = 149;
export const COACHING_PRICE = 279;

/** Days after the audit that the credit stays open. */
export const CREDIT_WINDOW_DAYS = 14;

/** Days the audit refund stays open. */
export const REFUND_WINDOW_DAYS = 14;

/** How many 1:1 seats are currently open. Edit this one number. */
export const SPOTS_OPEN: number = 4;

/** The month the open spots refer to, e.g. "November". */
export const SPOTS_MONTH = "November";

/** Minutes in the audit session. Matches the /audit page. */
export const AUDIT_MINUTES = 60;

/**
 * The credit, stated once, in one wording.
 * Previously this appeared ~10 times as both "covers your first month"
 * and "$149 off month one" — which are the same offer.
 */
export function creditLine(currency: DisplayCurrency | null): string {
  return `Your ${money(AUDIT_PRICE, currency)} audit is credited to whichever plan you join within ${CREDIT_WINDOW_DAYS} days.`;
}

export function guaranteeLine(currency: DisplayCurrency | null): string {
  return `If the roadmap isn't useful, email me within ${REFUND_WINDOW_DAYS} days and I'll refund the ${money(AUDIT_PRICE, currency)}.`;
}

export function spotsLine(): string {
  return `${SPOTS_OPEN} 1:1 ${SPOTS_OPEN === 1 ? "spot" : "spots"} open for ${SPOTS_MONTH}.`;
}

/**
 * What the audit actually is, so a visitor can picture it before paying.
 *
 * TODO(tony): confirm two details before this ships —
 *   1. the roadmap turnaround ("within 3 working days" is a placeholder);
 *   2. that the call is video rather than phone or async.
 * Everything else here matches what /audit already promises.
 */
export function auditSteps(currency: DisplayCurrency | null) {
  return [
    {
      label: "You apply",
      detail: `A short form about how you eat now — about 5 minutes. Pay the ${money(AUDIT_PRICE, currency)}, then I email you to book a time.`,
    },
    {
      label: "We talk",
      detail: `One ${AUDIT_MINUTES}-minute video call. We go through a normal week of your meals, not a perfect one.`,
    },
    {
      label: "You get the roadmap",
      detail:
        "Written up and emailed within 3 working days: a 4–6 week food plan and the one habit to start with.",
    },
  ];
}
