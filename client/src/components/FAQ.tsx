import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { money, useDisplayCurrency, type DisplayCurrency } from "@/lib/displayCurrency";
import {
  COACHING_APP,
  COACHING_CADENCE,
  COACHING_DELIVERY,
  COACHING_PRICE,
  FIRST_PLAN_LINE,
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
    question: "What's the difference between the audit and 1:1 coaching?",
    answer: `Audit + Roadmap (${money(149, currency)}) is a one-off video call and a 4 to 6 week food plan. I email the roadmap within 2 working days of the call. 1:1 coaching (${money(COACHING_PRICE, currency)} ${COACHING_CADENCE}) includes that audit. ${FIRST_PLAN_LINE} ${COACHING_DELIVERY} It runs in ${COACHING_APP}. Spots for 1:1 are capped.`,
  },
  auditProcessFaq(currency),
  {
    question: "What do I send between the fortnightly videos?",
    answer: `On 1:1 you message me in ${COACHING_APP} between the fortnightly deep-dive videos. Food tracking gives me the clearest picture of your week, and how much you track depends on what you can keep up. I use what you send in the next video, where I adjust your plan and walk you through it. The audit is a one-off video call and a roadmap.`,
  },
  {
    question: "Do I have to track my food?",
    answer: "No, but it helps more than almost anything else. Tracking shows what's actually happening rather than what we think is happening, and most people learn a lot from the first couple of weeks of it. It isn't make or break, though. If weighing and logging every meal won't last in your life, we find a level that will, like logging a few days a week or just keeping an eye on protein. The way you eat is the goal. Tracking is a tool for building it.",
  },
  {
    question: "Do I have to eat nothing but kale salads?",
    answer: "No. A plan built on food you don't like lasts about a week. We start with what you already eat, like the family dinners, Friday pizza, and snacks in the car, and change one part of a meal at a time, like more protein at breakfast. The aim is a way of eating you could keep up for years, not a strict phase you're counting down to the end of. If you like kale, great. If you don't, you never have to eat it.",
  },
  {
    question: "Do I have to train?",
    answer: "No. Nutrition is where I start, because for busy parents it's where most of the change comes from. I can include training guidance in a fortnightly deep-dive video when you want it. Training is never a requirement.",
  },
  {
    question: "Am I going to be starving?",
    answer: "No. Being hungry all the time is the fastest way to quit, so we avoid it on purpose. We set portions you can live with, lean on protein and fiber to keep you full, and adjust if hunger creeps up. Weight still moves, just at a pace you can keep.",
  },
  {
    question: "If I start with the audit, can I join 1:1 coaching later?",
    answer: `Yes. ${creditLine(currency)} After ${CREDIT_WINDOW_DAYS} days the credit has closed, and the audit still stands on its own.`,
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
      "The fortnightly deep-dive video is the main time together. Messaging between videos takes as long as your question needs. If you track food, that is a few minutes a day. If you want training, we fit it to the time you actually have.",
  },
  {
    question: "How fast will I see results?",
    answer:
      "Energy usually shifts first, often inside the first two to three weeks, because it responds to how and when you eat. Weight moves more slowly and less tidily. Some fortnights nothing, then a drop. Anyone promising a fixed number by a fixed date is guessing. What I will commit to is a fortnightly deep-dive video that tells you how your plan is going and what to change.",
  },
  {
    question: "How do cancelling and refunds work?",
    answer: `${MONTHLY_TERMS_LINE} ${guaranteeLine(currency)} ${refundWindowLine()} ${creditRefundLine(currency)}`,
  },
  {
    question: "Do you take clients outside New Zealand and Canada?",
    answer:
      "Yes. Coaching is fully online. Where you live only changes when messages land, and that stays flexible.",
  },
  {
    question: "Are you a dietitian?",
    answer:
      "No. I'm a certified nutrition coach (Precision Nutrition Level 1) and a certified personal trainer (ISSA). I coach food strategy, with training guidance where it helps. I don't diagnose, treat, or prescribe, and I don't write medical nutrition therapy for a diagnosed condition. If you have one — diabetes, heart disease, a pregnancy, a GLP-1 prescription, anything your doctor is managing — I'll work alongside them rather than around them, and I'll say so when something belongs with them rather than me.",
  },
  {
    question: "Is there a 90-day lock-in?",
    answer: `No. ${MONTHLY_TERMS_LINE} For 1:1 I recommend about 90 days so the fortnightly videos have time to show what is working for you. The audit is a one-off with no ongoing commitment.`,
  },
  {
    question: "Is coaching online?",
    answer: "Yes. Coaching is online, so we can work together wherever you are. Fortnightly deep-dive videos and messages work across time zones.",
  },
  {
    question: "Do I need a wearable?",
    answer: "No. A watch or ring can add useful context. Your food tracking and the feedback you send are enough for the fortnightly deep-dive video.",
  },
  {
    question: "Why are 1:1 spots capped?",
    answer: "Each fortnightly deep-dive video is about your data and your feedback. I keep that roster small so the video stays specific to you.",
  },
  {
    question: "Why not just use a generic tracker?",
    answer: "A generic tracker stores a log. On 1:1 I use your data and your feedback in a fortnightly deep-dive video that adjusts your plan and walks you through it. You can message me between videos.",
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
  intro = "Straight answers about the audit and 1:1 coaching.",
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
