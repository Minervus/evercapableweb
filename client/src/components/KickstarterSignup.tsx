import { Link } from "wouter";
import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";
import { KICKSTARTER_NAME } from "@shared/kickstarterPage";

export function KickstarterSignup() {
  return (
    <section
      id="kickstarter"
      aria-label="Free 12-week energy reset emails"
      className="py-16 md:py-24 bg-black border-t border-white/5 scroll-mt-20"
      data-testid="section-kickstarter"
    >
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <p className="text-xs md:text-sm text-orange-500 mb-3 uppercase tracking-widest font-bold">
          Free · {KICKSTARTER_NAME}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Not ready to pay for anything yet?
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Twelve weekly emails, one food action each. Written for the same parents I coach — no
          charge, and you can unsubscribe in a click.
        </p>
        <p className="mt-3 mb-8">
          <Link href="/kickstarter" asChild>
            <a className="text-sm text-zinc-500 underline underline-offset-4 decoration-zinc-700 hover:text-zinc-300 transition-colors">
              See what the 12 weeks cover
            </a>
          </Link>
        </p>
        <MailerLiteEmbed />
      </div>
    </section>
  );
}
