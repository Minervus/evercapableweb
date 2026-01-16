import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MessageCircle, Phone, Send, Loader2, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams({
        "form-name": "contact",
        ...data,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let's build your plan together!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question about training, nutrition, or which program fits you best? Reach out — we'll help you find your next step forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <a
                  href="mailto:hello@rachelstone.com"
                  className="flex items-start gap-4"
                  data-testid="link-contact-chat"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat directly with coach Rachel
                    </p>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <a
                  href="tel:+12025550147"
                  className="flex items-start gap-4"
                  data-testid="link-contact-call"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call us</h3>
                    <p className="text-sm text-muted-foreground">
                      Mon - Fri, 8:00 - 17:00 (EST)
                    </p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-6">
                  Send a Message
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8" data-testid="text-success-message">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground">
                      Rachel will get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <p className="hidden">
                        <label>
                          Don't fill this out if you're human: <input name="bot-field" />
                        </label>
                      </p>
                      
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                data-testid="input-fullname"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can Rachel help you?"
                                rows={4}
                                className="resize-none"
                                data-testid="input-message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                        data-testid="button-send-message"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
