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
    question: "What is Habit Layering?",
    answer: "It is the process of building one sustainable skill (like protein timing or sleep hygiene) until it becomes automatic, before adding the next. This prevents burnout and ensures permanent results.",
  },
  {
    question: "Is this a diet?",
    answer: "No. We focus on objective data and metabolic health. You will eat real food and learn how to manage your own nutrition for life.",
  },
  {
    question: "How is this different from other coaching programs?",
    answer: "Most programs focus on meal plans and workouts. We focus on building the habits and mindset that make results permanent. Our approach uses objective data to customize everything to your metabolism and lifestyle.",
  },
  {
    question: "What if I've tried everything before?",
    answer: "That's exactly who we work with. If traditional approaches haven't worked, it's usually because they weren't personalized to your data or they tried to change too much too fast. Our habit layering approach is designed for people who are done with quick fixes.",
  },
  {
    question: "How long until I see results?",
    answer: "Most clients notice improved energy and better relationship with food within 2-3 weeks. Physical changes typically become visible around 6-8 weeks. But more importantly, you'll build skills that last a lifetime.",
  },
  {
    question: "What's included in The Forever Guarantee?",
    answer: "If you follow your habit protocols with 90% consistency and don't reach your 6-month milestone, we'll continue coaching you for free until you do. We're that confident in the system.",
  },
  {
    question: "Do I need a wearable (Whoop/Oura/Apple Watch)?",
    answer: "Not required, but highly encouraged for the Pro Tier. We leverage your existing heart rate variability (HRV) and sleep latency data to refine your recovery blocks. For the DIY Blueprint, our in-app telemetry covers the essential metrics.",
  },
  {
    question: "What happens after the 6-month protocol ends?",
    answer: "You can graduate to the Maintenance track or pivot to a new equipment-based protocol to continue driving skeletal density and lean mass.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-6">
              Everything you need to know about working with EverCapable and our approach to lasting transformation.
            </p>
          </div>

          <Accordion type="single" collapsible data-testid="accordion-faq">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-foreground" data-testid={`button-faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
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
