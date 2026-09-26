import { Link } from "wouter";
import { MailerLiteEmbed } from "@/components/MailerLiteEmbed";

export function KickstarterSignup() {
  return (
    <section
      id="kickstarter"
      aria-label="Free 12-week kickstarter emails"
      className="py-16 md:py-24 bg-black border-t border-white/5 scroll-mt-20"
      data-testid="section-kickstarter"
    >
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <p className="text-xs md:text-sm text-orange-500 mb-3 font-mono uppercase tracking-widest font-bold">
          Or start smaller
        </p>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
          If the audit can wait, start with the free emails.
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
