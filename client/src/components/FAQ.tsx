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
    question: "How much time do I need?",
    answer: "Only 3 to 4 days a week, about 45 minutes a session. We build the plan around the time you actually have, not the time you wish you had. No 2-hour workouts required.",
  },
  {
    question: "What if I haven't lifted in years?",
    answer: "Perfect. Whether you haven't touched a barbell in 5 years or you currently train inconsistently, we adapt the plan to your exact starting level so you progress safely and with confidence.",
  },
  {
    question: "Am I going to be starving?",
    answer: "No starvation. No endless chicken and broccoli. You will learn how to eat foods you actually like, go out to dinner with your family or clients, and still lose fat.",
  },
  {
    question: "Is it worth the investment?",
    answer: "It depends on how you value your time. You can spend the next 12 months guessing your way to a result, or you can invest in a proven plan with a dedicated coach, real accountability, and a guaranteed outcome.",
  },
  {
    question: "What is habit layering?",
    answer: "It's how we make sure you actually stick to the plan when life gets chaotic. Instead of dumping a list of tasks on you, we introduce one specific habit every two weeks. This gives your brain and body time to adapt before we layer on the next piece, so your progress is built on a foundation that doesn't crumble during a busy work week.",
  },
  {
    question: "How is this different from other programs?",
    answer: "Most programs rely on guesswork and willpower. We look at objective data and your feedback. By reviewing your real-time metrics (from a Whoop, Oura, or Apple Watch), we can see exactly how your body is responding to both your career stress and your training. You're not following a generic PDF. You're following a tailored roadmap that adjusts based on what your body is actually telling us.",
  },
  {
    question: "Do I need a wearable?",
    answer: "Ideally, yes. To get the best results, we want to move past guessing and look at objective data. However, if you don't have a Whoop or Oura yet, we can start with basic step tracking on your phone. It's not the ideal setup, but it's absolutely doable to get started.",
  },
  {
    question: "What is the 90-day guarantee?",
    answer: "Follow the plan with 90% consistency. If you don't hit your goals in 90 days, I coach you for free until you do. You risk the effort. I risk my time.",
  },
  {
    question: "Why are there limited spots?",
    answer: "For each client, I build a customized roadmap to ensure it fits their unique situation. With a limited number of spots, I can focus on delivering the best possible experience for each person.",
  },
  {
    question: "Why not a $20 app?",
    answer: "Generic apps provide templates. Tony Nguyen Fit provides an engineered result. For the cost of a daily latte, you get a dedicated coach, real data analysis, and a system that actually sticks when life gets chaotic. This is for the person who is tired of cheap solutions failing them.",
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
              Everything you need to know about working with Tony and the approach to lasting transformation.
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
