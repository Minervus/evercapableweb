import { useEffect, useState } from "react";

export type DisplayCurrency = "CAD" | "NZD";

const NZ_TIMEZONES = new Set(["Pacific/Auckland", "Pacific/Chatham"]);

const CA_TIMEZONES = new Set([
  "America/Toronto",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/St_Johns",
  "America/Whitehorse",
  "America/Yellowknife",
  "America/Iqaluit",
  "America/Moncton",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Regina",
  "America/Swift_Current",
  "America/Dawson",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Creston",
  "America/Cambridge_Bay",
  "America/Inuvik",
  "America/Rankin_Inlet",
  "America/Resolute",
  "America/Atikokan",
  "America/Nipigon",
  "America/Thunder_Bay",
  "America/Rainy_River",
  "America/Pangnirtung",
  "America/Coral_Harbour",
]);

function languages(): string[] {
  if (typeof navigator === "undefined") return [];
  return [...(navigator.languages ?? []), navigator.language]
    .filter(Boolean)
    .map((lang) => lang.toLowerCase());
}

function timeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

/** Light locale heuristic: language, then timezone. No FX conversion. */
export function detectDisplayCurrency(): DisplayCurrency | null {
  const langs = languages();
  const tz = timeZone();

  if (langs.some((lang) => lang === "en-nz" || lang.endsWith("-nz"))) return "NZD";
  if (langs.some((lang) => lang === "en-ca" || lang === "fr-ca" || lang.endsWith("-ca"))) return "CAD";
  if (NZ_TIMEZONES.has(tz)) return "NZD";
  if (CA_TIMEZONES.has(tz)) return "CAD";
  return null;
}

export function useDisplayCurrency(): DisplayCurrency | null {
  const [currency, setCurrency] = useState<DisplayCurrency | null>(null);

  useEffect(() => {
    setCurrency(detectDisplayCurrency());
  }, []);

  return currency;
}

/** `$149` or `$149 CAD` — same number, label only. */
export function money(amount: number, currency: DisplayCurrency | null): string {
  return currency ? `$${amount} ${currency}` : `$${amount}`;
}
