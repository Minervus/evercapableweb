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
    question: "// WHAT_IS_THE_HABIT_LAYERING_CURRICULUM?",
    answer: "It is our system for building sustainable biological habits. Instead of overwhelming you, we layer one technical habit every 2 weeks—syncing perfectly with your 6-stage protocol progression.",
  },
  {
    question: "// HOW_IS_THE_EVERCAPABLE_METHODOLOGY_DIFFERENT?",
    answer: "Most programs guess; we audit. We use your real-time telemetry (Whoop, Oura, Apple) to drive the protocol. You don't just 'work out'—you execute a 24-week biological promotion cycle based on your data.",
  },
  {
    question: "// DO_I_NEED_A_WEARABLE?",
    answer: "Yes. The system requires hardware (Whoop, Oura, or Apple Watch) to establish your 'Ground Truth' in Stage 01. We use this telemetry to automate your monthly promotion audits.",
  },
  {
    question: "// WHAT_IS_THE_FOREVER_GUARANTEE?",
    answer: "It is a performance-based commitment. During Stage 01 Calibration, we set a clear, data-backed 6-month goal. If you execute the protocol for the full 24 weeks and don't reach that target by the end of Stage 06, I will continue to coach you 1-on-1 for free until you do.",
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
              Everything you need to know about working with EverCapable and our approach to lasting transformation.
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
