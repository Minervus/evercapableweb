/*
 * DRAFT: needs Tony's or a lawyer's review before it is relied on.
 *
 * The audit refund is guaranteeLine() from lib/offer.ts word for word, so this
 * page can't drift from the guarantee shown beside the price. Cancelling comes
 * from the FAQ. Nothing else is promised.
 *
 * TODO(tony): confirm or fill in
 *   - when the 14 days start (payment date, session date, or roadmap delivery);
 *   - how the refund is paid back (through Wise, in the currency paid) and how long it takes;
 *   - whether a refunded audit can still be credited to Habits or 1:1;
 *   - whether any part of a paid month on Habits or 1:1 is ever refunded.
 */
import { EmailLink, LegalPage, LegalSection } from "@/components/LegalPage";
import { useDisplayCurrency } from "@/lib/displayCurrency";
import { guaranteeLine } from "@/lib/offer";

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
        <p>
          To ask for it, email <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="Habits and 1:1">
        <p>
          Monthly plans run month to month. Email me before your next billing date to cancel. There's no notice period and no exit fee.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
