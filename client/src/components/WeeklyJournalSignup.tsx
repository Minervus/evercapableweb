import { useState } from "react";
import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";

const WEEKLY_JOURNAL_FORM = "IIVSHZ";

export function WeeklyJournalSignup() {
  const [formMissing, setFormMissing] = useState(false);

  return (
    <aside
      aria-label="Weekly Journal email signup"
      className="mt-12 border border-zinc-800 bg-[#111111] rounded-sm px-6 py-7 md:px-8 font-sans"
      data-testid="section-weekly-journal"
    >
      <p className="text-xs text-orange-500 mb-2 uppercase tracking-widest font-bold">
        The weekly Journal email
      </p>
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
        Get the next article in your inbox
      </h2>
      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5">
        One short email a week with each new Journal article. Unsubscribe in a click.
      </p>
      {formMissing ? (
        <p className="text-sm text-zinc-500" data-testid="weekly-journal-unavailable">
          The signup form is on its way. Check back soon.
        </p>
      ) : (
        <MailerLiteEmbed
          appearance="site"
          form={WEEKLY_JOURNAL_FORM}
          compact
          onEmpty={() => setFormMissing(true)}
        />
      )}
    </aside>
  );
}
