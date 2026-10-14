import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import {
  CREDIT_WINDOW_DAYS,
  MONTHLY_TERMS_LINE,
  auditProcessFaq,
  creditLine,
  creditRefundLine,
  guaranteeLine,
  refundWindowLine,
} from "@/lib/offer";

const faqs = (currency: DisplayCurrency | null) => [
  {
    question: "What's the difference between the three offers?",
    answer: `Audit + Roadmap (${money(149, currency)}) is a one-off diagnostic and a 4–6 week plan — no ongoing chat, and no weekly app loop. Nutrition Habits (${money(149, currency)}/month) is a weekly check-in in the coaching app, Q&A in the check-in, and written adjustments from me. 1:1 Nutrition Coaching (${money(279, currency)}/month) is the same weekly check-in, plus video deep dives with specific adjustments, priority messaging, fuller roadmap updates, and training guidance if you want it. Spots for 1:1 are capped.`,
  },
  auditProcessFaq(currency),
  {
    question: "What do I send each week?",
    answer: "On Habits and 1:1, you check in weekly in the coaching app and can ask questions there. Tracking your food gives me the clearest picture, so I'll encourage it, but how much you track depends on what you can keep up. I review what you send and reply with written adjustments. 1:1 adds video deep dives, priority chat, and fuller roadmap updates when life changes. The audit is one-off — no weekly app loop.",
  },
  {
    question: "Do I have to track my food?",
    answer: "No, but it helps more than almost anything else. Tracking shows what's actually happening rather than what we think is happening, and most people learn a lot from the first couple of weeks of it. It isn't make or break, though. If weighing and logging every meal won't last in your life, we find a level that will, like logging a few days a week or just keeping an eye on protein. The habits are the goal. Tracking is a tool for building them.",
  },
  {
    question: "Do I have to eat nothing but kale salads?",
    answer: "No. A plan built on food you don't like lasts about a week. We start with what you already eat, like the family dinners, Friday pizza, and snacks in the car, and change a few habits at a time: a bit more protein at breakfast, a portion adjusted at dinner, a go-to lunch that keeps you going through the afternoon. The aim is a way of eating you could keep up for years, not a strict phase you're counting down to the end of. If you like kale, great. If you don't, you never have to eat it.",
  },
  {
    question: "Do I have to train?",
    answer: "No. Nutrition is where I start, because for busy parents it's where most of the change comes from. I do recommend training for longevity, mobility, and staying able to do the things you want to do as you get older, and I can give you guidance on it. It just isn't my main service, and it's never a requirement. On Habits that guidance is light. On 1:1 we can go further if it helps.",
  },
  {
    question: "Am I going to be starving?",
    answer: "No. Being hungry all the time is the fastest way to quit, so we avoid it on purpose. We set portions you can live with, lean on protein and fiber to keep you full, and adjust if hunger creeps up. Weight still moves, just at a pace you can keep.",
  },
  {
    question: "If I start with the audit, can I join a monthly offer later?",
    answer: `Yes. ${creditLine(currency)} After ${CREDIT_WINDOW_DAYS} days the audit still stands on its own — there's just no credit.`,
  },
  {
    question: "I'm on a GLP-1 medication. Can you help?",
    answer:
      "Yes, and it's a good fit for what I do. The risk on a GLP-1 is losing muscle along with fat, and eating so little that you feel flat. We focus on getting enough protein, keeping meals practical when appetite is low, and keeping some strength work in your week to hold onto muscle. It's one case where I'll push training a bit harder. I work alongside the doctor who prescribed it — I don't advise on the medication itself, dosing, or whether to stay on it.",
  },
  {
    question: "I cook for picky kids. Do I need to make separate meals?",
    answer:
      "No. Separate meals are the first thing that breaks when the week gets busy. We build around what the family already eats and adjust your portions and a couple of components, so you're eating a version of the same dinner rather than cooking twice.",
  },
  {
    question: "How much time does this take each week?",
    answer:
      "The weekly check-in takes about 10 minutes to fill in, and reading the adjustments I send back takes a few more. If you track food, that's a few minutes a day on top. Training is optional — if you want it, we'll fit it to the time you actually have, not an ideal week.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "Energy usually shifts first, often inside the first two to three weeks, because it responds to how and when you eat. Weight moves more slowly and less tidily — some weeks nothing, then a drop. Anyone promising a fixed number by a fixed date is guessing. What I'll commit to is that you'll know each week whether the plan is working and what to change.",
  },
  {
    question: "How do cancelling and refunds work?",
    answer: `${MONTHLY_TERMS_LINE} ${guaranteeLine(currency)} ${refundWindowLine()} ${creditRefundLine(currency)}`,
  },
  {
    question: "Do you take clients outside New Zealand and Canada?",
    answer:
      "Yes. Coaching is fully online, so where you are only affects the check-in timing, and that's flexible.",
  },
  {
    question: "Are you a dietitian?",
    answer:
      "No. I'm a certified nutrition coach (Precision Nutrition Level 1) and a certified personal trainer (ISSA). I coach habits and food strategy, with training guidance where it helps. I don't diagnose, treat, or prescribe, and I don't write medical nutrition therapy for a diagnosed condition. If you have one — diabetes, heart disease, a pregnancy, a GLP-1 prescription, anything your doctor is managing — I'll work alongside them rather than around them, and I'll say so when something belongs with them rather than me.",
  },
  {
    question: "Is there a 90-day lock-in?",
    answer: `No. ${MONTHLY_TERMS_LINE} For 1:1 I recommend about 90 days so the weekly rhythm has time to stick. The audit is one-off with no ongoing commitment.`,
  },
  {
    question: "Is coaching online?",
    answer: "Yes. Coaching is online, so we can work together wherever you are. Weekly check-ins work across timezones.",
  },
  {
    question: "Do I need a wearable?",
    answer: "No. A watch or ring can add useful context, but your weekly check-in, plus whatever food tracking you can keep up, is enough for useful written adjustments — and, on 1:1, a video deep dive.",
  },
  {
    question: "Why are 1:1 spots capped?",
    answer: "1:1 includes video deep dives, priority messaging, and fuller roadmap updates. I keep that roster small so those replies stay thoughtful. Habits uses the same weekly check-in with written adjustments and Q&A — still me, just a lighter tier.",
  },
  {
    question: "Why not just use a generic tracker?",
    answer: "A generic tracker is just a log. Here, I review what you send each week and reply with written adjustments — plus video deep dives on 1:1. Tracking is one input, not the whole program, and you never get a leftover meal plan sitting in a PDF.",
  },
];

export type FaqItem = { question: string; answer: string };

type FAQProps = {
  /** Defaults to the homepage questions. */
  items?: FaqItem[];
  heading?: string;
  intro?: string;
  className?: string;
};

export function FAQ({
  items: itemsProp,
  heading = "Frequently Asked Questions",
  intro = "Straight answers about the offers, weekly check-ins, and how we work together.",
  className = "py-16 md:py-24 bg-black",
}: FAQProps = {}) {
  const currency = useDisplayCurrency();
  const items = itemsProp ?? faqs(currency);

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
    <section id="faq" className={`${className} scroll-mt-20 overflow-hidden`}>
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
              {heading}
            </h2>
            <p className="text-zinc-400 mb-6">{intro}</p>
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
