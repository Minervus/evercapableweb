import type { DisplayCurrency } from "./displayCurrency";

/** Tony's Wise payment links for the $149 nutrition audit. */
const AUDIT_WISE_PAY_URL = {
  CAD: "https://wise.com/pay/r/c2Zsg3lQwYzcQo4",
  NZD: "https://wise.com/pay/r/xAREGf4eI35QlrY",
} as const;

/**
 * CAD visitors pay in CAD. NZD visitors pay in NZD.
 * An unknown locale uses the NZD link, since Tony is based in New Zealand.
 * The on-page label stays with money(): plain `$149` when currency is null.
 */
export function wiseAuditPayUrl(currency: DisplayCurrency | null): string {
  return currency === "CAD" ? AUDIT_WISE_PAY_URL.CAD : AUDIT_WISE_PAY_URL.NZD;
}
