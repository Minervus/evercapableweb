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
    question: "// HOW_MUCH_TIME_DO_I_NEED?",
    answer: "Only 3 to 4 days a week, and about 45 minutes a session. We build the plan around the time you actually have, not the time you wish you had. No 2-hour workouts required.",
  },
  {
    question: "// WHAT_IF_I_HAVEN_T_LIFTED_IN_YEARS?",
    answer: "Perfect. Whether you haven't touched a barbell in 5 years or you currently train inconsistently, we adapt the plan to your exact starting level so you progress safely and with confidence.",
  },
  {
    question: "// AM_I_GOING_TO_BE_STARVING?",
    answer: "No starvation. No endless chicken and broccoli. You will learn how to eat foods you actually like, go out to dinner with your family or clients, and still shed fat.",
  },
  {
    question: "// IS_$285_A_MONTH_WORTH_IT?",
    answer: "It assumes you value your time. You can spend the next 12 months trying to guess your way to a result, or you can spend $285 a month to have an expert hand you the exact roadmap, hold you accountable, and guarantee the outcome.",
  },
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
    question: "// WHAT_IS_THE_90-DAY_SYSTEM_GUARANTEE?",
    answer: "It's my way of putting skin in the game. If you maintain 90% protocol consistency and we don't hit your primary Phase 1 milestones within the first 90 days, I coach you for FREE until we do. You risk the effort; I risk my time and reputation.",
  },
  {
    question: "// WHY_ARE_THERE_LIMITED_SEATS?",
    answer: "For each client, I build a customized roadmap to ensure that it fits their unique environment. With a limited number of seats, I can focus on delivering the best possible experience for each client.",
  },
  {
    question: "// WHY_NOT_A_20_DOLLAR_APP?",
    answer: "Generic apps provide templates; EverCapable provides an engineered result. For the cost of a daily latte, you get a dedicated consultant, manual data audits, and a system that actually sticks when life gets chaotic. This is for the person who is tired of \"cheap\" failing them.",
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
