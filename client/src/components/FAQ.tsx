import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import { CREDIT_WINDOW_DAYS, REFUND_WINDOW_DAYS, creditLine } from "@/lib/offer";

const faqs = (currency: DisplayCurrency | null) => [
  {
    question: "What's the difference between the three offers?",
    answer: `Audit + Roadmap (${money(149, currency)}) is a one-off diagnostic and a 4–6 week plan — no ongoing chat, and no weekly app loop. Nutrition Habits (${money(149, currency)}/month) is weekly food tracking in the coaching app, Q&A in the check-in, and written adjustments from me. 1:1 Nutrition Coaching (${money(279, currency)}/month) uses the same app tracking, plus video deep dives with specific adjustments, priority messaging, fuller roadmap updates, and optional training support. Spots for 1:1 are capped.`,
  },
  {
    question: "What do I send each week?",
    answer: "On Habits and 1:1, you track food in the coaching app and can ask questions in the weekly check-in. I review your inputs and send written adjustments. 1:1 adds video deep dives, priority chat, and fuller roadmap updates when life changes. The audit is one-off — no weekly app loop.",
  },
  {
    question: "Do I have to train?",
    answer: "No. Food is the front door. Training is optional support for strength, energy, and longevity. On Habits it's light if you want it. On 1:1 we can add more if it helps — it isn't the headline.",
  },
  {
    question: "Am I going to be starving?",
    answer: "No starvation. No endless chicken and broccoli. We'll work with foods you actually like, including family dinners and eating out, and still move weight in a sustainable way.",
  },
  {
    question: "If I start with the audit, can I join a monthly offer later?",
    answer: `Yes. ${creditLine(currency)} After ${CREDIT_WINDOW_DAYS} days the audit still stands on its own — there's just no credit.`,
  },
  {
    question: "I'm on a GLP-1 medication. Can you help?",
    answer:
      "Yes, and it's a good fit for what I do. The risk on a GLP-1 is losing muscle along with fat, and eating so little that you feel flat. We focus on getting enough protein, keeping meals practical when appetite is low, and adding strength work to hold onto muscle. I work alongside the doctor who prescribed it — I don't advise on the medication itself, dosing, or whether to stay on it.",
  },
  {
    question: "I cook for picky kids. Do I need to make separate meals?",
    answer:
      "No. Separate meals are the first thing that breaks when the week gets busy. We build around what the family already eats and adjust your portions and a couple of components, so you're eating a version of the same dinner rather than cooking twice.",
  },
  {
    question: "How much time does this take each week?",
    answer:
      "Tracking food takes a few minutes a day in the app, and the weekly check-in takes about 10 minutes to fill in. Reading the adjustments I send back takes another few minutes. Training is optional — if you want it, we'll fit it to the time you actually have, not an ideal week.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "Energy usually shifts first, often inside the first two to three weeks, because it responds to how and when you eat. Weight moves more slowly and less tidily — some weeks nothing, then a drop. Anyone promising a fixed number by a fixed date is guessing. What I'll commit to is that you'll know each week whether the plan is working and what to change.",
  },
  {
    question: "How do cancelling and refunds work?",
    answer: `The monthly offers are month to month — email me before your next billing date and that's it, no notice period and no exit fee. For the audit: if the roadmap isn't useful, email me within ${REFUND_WINDOW_DAYS} days and I'll refund it.`,
  },
  {
    question: "Do you take clients outside New Zealand and Canada?",
    answer:
      "Yes. Coaching is fully online, so where you are only affects the check-in timing, and that's flexible. Prices are shown in NZD or CAD depending on where you're browsing from; if you're somewhere else, you'll see the amount without a currency label — just ask and I'll confirm which one you'd be charged in.",
  },
  {
    question: "Are you a dietitian?",
    answer:
      "No. I'm a certified nutrition coach (Precision Nutrition Level 1) and a certified personal trainer (ISSA). I coach habits, food strategy, and training. I don't diagnose, treat, or prescribe, and I don't write medical nutrition therapy for a diagnosed condition. If you have one — diabetes, heart disease, a pregnancy, a GLP-1 prescription, anything your doctor is managing — I'll work alongside them rather than around them, and I'll say so when something belongs with them rather than me.",
  },
  {
    question: "Is there a 90-day lock-in?",
    answer: "Not a hard contract. For 1:1 I recommend about 90 days so the weekly rhythm has time to stick. After that it's month-to-month. The audit is one-off with no ongoing commitment.",
  },
  {
    question: "Is coaching online?",
    answer: "Yes. Coaching is online, so we can work together wherever you are. Weekly check-ins work across timezones.",
  },
  {
    question: "Do I need a wearable?",
    answer: "No. A watch or ring can add useful context, but honest food tracking in the coaching app is enough for useful written adjustments — and, on 1:1, a video deep dive.",
  },
  {
    question: "Why are 1:1 spots capped?",
    answer: "1:1 includes video deep dives, priority messaging, and fuller roadmap updates. I keep that roster small so those replies stay thoughtful. Habits uses the same app tracking with written adjustments and Q&A in the weekly check-in — still me, just a lighter tier.",
  },
  {
    question: "Why not just use a generic tracker?",
    answer: "A generic tracker is just a log. In the coaching app you track food, I actually review it, and you get written adjustments for your week — plus video deep dives on 1:1. Not a leftover meal plan sitting in a PDF.",
  },
];

export function FAQ() {
  const currency = useDisplayCurrency();
  const items = faqs(currency);

  // Built from the same array that renders below, so the markup Google reads
  // can never drift from the answers a visitor sees.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-black scroll-mt-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-sm text-orange-500 font-mono uppercase tracking-wider mb-2">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 mb-6">
              Straight answers about the offers, weekly check-ins, and how we work together.
            </p>
          </div>

          <Accordion type="single" collapsible data-testid="accordion-faq">
            {items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left font-mono font-medium text-white min-w-0 break-words" data-testid={`button-faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
