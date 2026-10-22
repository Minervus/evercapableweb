/*
 * DRAFT: needs Tony's or a lawyer's review before it is relied on.
 *
 * Plain-language summary built only from facts already on the site: prices,
 * credit and guarantee from lib/offer.ts, and the cancellation and "not a
 * dietitian" answers in components/FAQ.tsx. It deliberately leaves out
 * governing law, liability limits and dispute terms; a lawyer should add those.
 */
import { Link } from "wouter";
import { EmailLink, LegalPage, LegalSection } from "@/components/LegalPage";
import { money, useDisplayCurrency } from "@/lib/displayCurrency";
import {
  AUDIT_MINUTES,
  AUDIT_PRICE,
  COACHING_APP,
  COACHING_DELIVERY,
  COACHING_PRICE,
  MONTHLY_TERMS_LINE,
  auditProcessLine,
  creditLine,
  creditRefundLine,
  guaranteeLine,
  refundWindowLine,
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
        <p>{auditProcessLine(currency)}</p>
        <p>
          1:1 Nutrition Coaching is {money(COACHING_PRICE, currency)} a month. {COACHING_DELIVERY} It runs in {COACHING_APP}.
        </p>
        <p>
          The audit is paid through Stripe. {creditLine(currency)}
        </p>
      </LegalSection>

      <LegalSection title="Cancelling 1:1 coaching">
        <p>
          {MONTHLY_TERMS_LINE} To cancel, email <EmailLink /> before your next billing date. There's no notice period and no exit fee. A month that has already been billed is not refunded in part.
        </p>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          {guaranteeLine(currency)} {refundWindowLine()} {creditRefundLine(currency)} 1:1 coaching has no guarantee. The details are on the{" "}
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
          Everyone's body and week are different, so I can't promise a set amount of weight by a set date. What I can do is coach you honestly from what you tell me, so please be open in the intake form and in the messages you send.
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
