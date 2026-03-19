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
    answer: "It’s my way of making sure you actually stick to the plan when life gets chaotic. Instead of dumping a list of 'to-dos' on your desk, I introduce one specific habit every two weeks. This gives your brain and body time to adapt before I layer on the next piece, ensuring your progress is built on a foundation that doesn't crumble during a busy work week.",
  },
  {
    question: "// HOW_IS_THE_EVERCAPABLE_METHODOLOGY_DIFFERENT?",
    answer: "Most programs rely on guesswork and 'trying harder.' I look at objective data and your feedback. By auditing your real-time telemetry (Whoop, Oura, or Apple Watch), we can see exactly how your body is responding to the stress of your career and your training. You aren't just following a generic PDF; you’re following a tailored roadmap that recalibrates based on what your body is actually telling us.",
  },
  {
    question: "// DO_I_NEED_A_WEARABLE?",
    answer: "Ideally, yes. To get the high-precision results we’re after, moving past opinions and looking at objective data is the most efficient path. However, if you aren't ready for a Whoop or Oura, we can start with basic step tracking via your phone. It makes the 'Ground Truth' a bit harder to calibrate and isn't the ideal technical setup, but it’s definitely doable to get the ball rolling.",
  },
  {
    question: "// WHAT_IS_THE_FOREVER_GUARANTEE?",
    answer: "It’s my way of putting skin in the game. I know how many times busy professionals have 'started over' only to fall off. Before we start, we’ll set a clear, data-backed goal for your 6-month partnership. If you follow the protocol with 80% adherence or better for the full 6 months and we haven't hit that target, I will continue to coach you 1-on-1 for free until we do. If the system doesn't deliver, the cost is on me, not you.",
  },
  {
    question: "// WHY_ARE_THERE_LIMITED_SEATS?",
    answer: "For each client, I build a customized roadmap to ensure that it fits their unique environment. With a limited number of seats, I can focus on delivering the best possible experience for each client.",
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
