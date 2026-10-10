/*
 * DRAFT: needs Tony's or a lawyer's review before it is relied on.
 *
 * Every line here comes from lib/offer.ts, so this page can't drift from the
 * guarantee shown beside the price. Only the audit has a guarantee.
 *
 * TODO(tony): confirm or fill in
 *   - how to ask for a refund (email is a placeholder until you confirm it);
 *   - how the refund is paid back (through Stripe, to the card used, in the currency paid) and how long it takes;
 *   - whether a refunded audit can still be credited to Habits or 1:1.
 */
import { EmailLink, LegalPage, LegalSection } from "@/components/LegalPage";
import { useDisplayCurrency } from "@/lib/displayCurrency";
import {
  MONTHLY_TERMS_LINE,
  ROADMAP_DELIVERY_LINE,
  creditRefundLine,
  guaranteeLine,
  refundWindowLine,
} from "@/lib/offer";

export default function Refunds() {
  const currency = useDisplayCurrency();

  return (
    <LegalPage
      path="/refunds"
      title="Refund policy"
      description="How refunds work for the Audit + Roadmap, and how to stop a monthly plan."
    >
      <LegalSection title="Audit + Roadmap">
        <p>{guaranteeLine(currency)}</p>
        <p>{ROADMAP_DELIVERY_LINE} {refundWindowLine()}</p>
        <p>{creditRefundLine(currency)}</p>
        <p>
          To ask for a refund, email <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="Habits and 1:1">
        <p>{MONTHLY_TERMS_LINE}</p>
        <p>
          To cancel, email <EmailLink /> before your next billing date.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
