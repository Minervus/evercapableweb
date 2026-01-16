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
    question: "What should I expect during my first session?",
    answer: "Your first session is all about getting to know you — your goals, challenges, and lifestyle. We'll discuss your fitness history, current routine, and what you're hoping to achieve. From there, I'll create a personalized plan that fits your needs.",
  },
  {
    question: "Do I need a gym membership?",
    answer: "Not necessarily! Many of my programs can be done at home with minimal equipment. If you prefer gym workouts, I'll design your plan around the equipment you have access to. We'll find what works best for your situation.",
  },
  {
    question: "How often should I train each week?",
    answer: "It depends on your goals and current fitness level, but most clients train 3-4 times per week. Quality matters more than quantity — I focus on sustainable routines that fit into your life rather than overwhelming schedules.",
  },
  {
    question: "Is nutrition coaching included?",
    answer: "Yes! All my programs include nutrition guidance tailored to your training goals and lifestyle. I believe that nutrition and exercise work together for the best results. You'll receive personalized meal suggestions and strategies.",
  },
  {
    question: "Can I cancel or pause my plan anytime?",
    answer: "Absolutely. I understand life happens. You can pause or cancel your plan with 30 days notice. I also offer a 30-day money-back guarantee for new clients who feel the program isn't right for them.",
  },
  {
    question: "How long will it take to see results?",
    answer: "Most clients start feeling stronger and more energized within the first 2-3 weeks. Visible physical changes typically appear around 6-8 weeks. Remember, sustainable transformation takes time — we're building lasting habits, not quick fixes.",
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
              If you're new here or wondering what to expect, these answers will guide you through how coaching works, what's included, and how we tailor every plan to your needs.
            </p>
            <Button
              variant="outline"
              asChild
              data-testid="button-faq-email"
            >
              <a href="mailto:hello@rachelstone.com" className="gap-2">
                <Mail className="w-4 h-4" />
                Send e-mail
              </a>
            </Button>
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
