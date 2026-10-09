/*
 * DRAFT: needs Tony's or a lawyer's review before it is relied on.
 *
 * Plain-language summary built only from facts already on the site: prices,
 * credit and guarantee from lib/offer.ts, and the cancellation and "not a
 * dietitian" answers in components/FAQ.tsx. It deliberately leaves out
 * governing law, liability limits and dispute terms; a lawyer should add those.
 *
 * TODO(tony): the intake form (/initialize) still shows a "90-Day System
 * Guarantee" toggle (free coaching until you hit your target at 90%
 * compliance). That isn't in offer.ts and isn't stated here. Decide whether it
 * still applies, then align the form, this page and offer.ts.
 */
import { Link } from "wouter";
import { EmailLink, LegalPage, LegalSection } from "@/components/LegalPage";
import { money, useDisplayCurrency } from "@/lib/displayCurrency";
import {
  AUDIT_MINUTES,
  AUDIT_PRICE,
  COACHING_PRICE,
  COACHING_SUMMARY,
  HABITS_PRICE,
  HABITS_SUMMARY,
  creditLine,
  guaranteeLine,
} from "@/lib/offer";

export default function Terms() {
  const currency = useDisplayCurrency();

  return (
    <LegalPage
      path="/terms"
      title="Terms"
      description="The plain-language terms for coaching with Tony Nguyen Fit. Tony Nguyen Fit is me, Tony Nguyen, working as a sole trader in New Zealand."
    >
      <LegalSection title="What you're paying for">
        <p>
          The Audit + Roadmap is {money(AUDIT_PRICE, currency)}, paid once. It's one {AUDIT_MINUTES}-minute session and a 4 to 6 week food roadmap you then use on your own.
        </p>
        <p>
          Nutrition Habits is {money(HABITS_PRICE, currency)} a month: {HABITS_SUMMARY.toLowerCase()} 1:1 Nutrition Coaching is {money(COACHING_PRICE, currency)} a month: {COACHING_SUMMARY.charAt(0).toLowerCase() + COACHING_SUMMARY.slice(1)}
        </p>
        <p>
          Prices show in NZD or CAD depending on where you're browsing from. The audit is paid through Stripe, which may also offer the price converted to your local currency at checkout. {creditLine(currency)}
        </p>
      </LegalSection>

      <LegalSection title="Monthly plans and cancelling">
        <p>
          Habits and 1:1 run month to month. Email me before your next billing date to cancel. There's no notice period and no exit fee.
        </p>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          {guaranteeLine(currency)} The details are on the{" "}
          <Link href="/refunds" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">
            refund policy
          </Link>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection title="Coaching isn't medical care">
        <p>
          I'm a certified nutrition coach (Precision Nutrition Level 1) and personal trainer (ISSA), not a dietitian or doctor. I don't diagnose, treat or prescribe. If a doctor is managing a condition for you, check with them before changing how you eat or train, and I'll work alongside them.
        </p>
        <p>
          If you have a medical condition that needs a dietitian's care, or any history of an eating disorder, a registered dietitian or your doctor is the right place to start.
        </p>
      </LegalSection>

      <LegalSection title="Results">
        <p>
          Everyone's body and week are different, so I can't promise a set amount of weight by a set date. What I can do is coach you honestly from what you tell me, so please be open in the intake form and your check-ins.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          Email <EmailLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
