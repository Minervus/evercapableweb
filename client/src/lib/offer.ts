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

/** Days the audit refund stays open, counted from roadmap delivery. */
export const REFUND_WINDOW_DAYS = 7;

/** How many 1:1 seats are currently open. Edit this one number. */
export const SPOTS_OPEN: number = 4;

/** The month the open spots refer to, e.g. "November". */
export const SPOTS_MONTH = "November";

/** Minutes in the audit session. Matches the /audit page. */
export const AUDIT_MINUTES = 60;

/** Minutes the intake form at /initialize takes. Matches that page. */
export const INTAKE_MINUTES = 8;

/** One-line plain descriptions of the monthly plans, shared with Pricing. */
export const HABITS_SUMMARY = "Weekly check-ins and written adjustments.";
export const COACHING_SUMMARY = "Everything in Habits, plus weekly video deep dives.";

/**
 * The credit, stated once, in one wording.
 * Previously this appeared ~10 times as both "covers your first month"
 * and "$149 off month one" — which are the same offer.
 */
export function creditLine(currency: DisplayCurrency | null): string {
  return `Your ${money(AUDIT_PRICE, currency)} audit is credited to whichever plan you join within ${CREDIT_WINDOW_DAYS} days.`;
}

/**
 * The only guarantee on the site, and it covers the audit alone. Habits and
 * 1:1 have none. Keep refund wording to these helpers so no page promises
 * results, refunds once the credit is used, or "if you're not satisfied".
 */
export function guaranteeLine(currency: DisplayCurrency | null): string {
  return `If the roadmap isn't useful, tell me within ${REFUND_WINDOW_DAYS} days of receiving it and I'll refund the ${money(AUDIT_PRICE, currency)}.`;
}

export function refundWindowLine(): string {
  return `The ${REFUND_WINDOW_DAYS} days start on the day I email you the roadmap.`;
}

export function creditRefundLine(currency: DisplayCurrency | null): string {
  return `Once the ${money(AUDIT_PRICE, currency)} is credited to Habits or 1:1, it can't be refunded.`;
}

export const MONTHLY_TERMS_LINE =
  "Habits and 1:1 are month to month, and you can cancel any time before your next billing date. There are no refunds for part of a month.";

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
      label: "You book",
      detail: `Pay the ${money(AUDIT_PRICE, currency)} on Stripe and you land on the intake form about how you eat now. It takes about ${INTAKE_MINUTES} minutes, and I email you to book a time.`,
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
