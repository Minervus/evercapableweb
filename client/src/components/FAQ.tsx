import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail } from "lucide-react";

const faqs = [
  {
    question: "What's the difference between the three offers?",
    answer: "Audit + Roadmap ($149 NZD) is a one-off diagnostic and a 4–6 week plan — no ongoing chat, and no weekly app loop. Nutrition Habits ($149 NZD/month) is weekly food tracking in the coaching app, Q&A in the check-in, and written adjustments from me. 1:1 Nutrition Coaching ($279 NZD/month) uses the same app tracking, plus video deep dives with specific adjustments, priority messaging, fuller roadmap updates, and optional training support. Spots for 1:1 are capped.",
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
    answer: "Yes. If you start Nutrition Habits within 14 days of the audit, the audit covers your first month — then it's $149 NZD/month. If you start 1:1 within 14 days, you get $149 NZD off month one (you pay the rest toward $279). After 14 days the audit still stands on its own — there's just no first-month deal.",
  },
  {
    question: "Is there a 90-day lock-in?",
    answer: "Not a hard contract. For 1:1 I recommend about 90 days so the weekly rhythm has time to stick. After that it's month-to-month. The audit is one-off with no ongoing commitment.",
  },
  {
    question: "Where are you based?",
    answer: "Matakana, New Zealand. Coaching is online, with prices in NZD. If you're in NZ or nearby timezones, weekly check-ins are especially easy — and remote clients are welcome too.",
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
  return (
    <section id="faq" className="py-16 md:py-24 bg-black scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-sm text-orange-500 font-mono uppercase tracking-wider mb-2">
              // FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 mb-6">
              Straight answers about the offers, weekly check-ins, and how we work from Matakana, NZ.
            </p>
          </div>

          <Accordion type="single" collapsible data-testid="accordion-faq">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left font-mono font-medium text-white min-w-0 break-all" data-testid={`button-faq-trigger-${index}`}>
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
