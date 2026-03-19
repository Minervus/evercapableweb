import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const inquiryFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(5, "Please enter at least 5 characters"),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams({
        "form-name": "system-inquiry",
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
    <section id="contact" className="py-16 md:py-24 bg-black scroll-mt-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-orange-500 mb-2 font-mono uppercase tracking-wider">
            // SYSTEM_DIAGNOSTIC_INQUIRY
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            General System Inquiry
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Have a specific question? Drop a note below for a direct response within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-lg"
        >
          {isSubmitted ? (
            <div className="text-center py-8" data-testid="text-success-message">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Inquiry Received
              </h4>
              <p className="text-zinc-400">
                I'll get back to you via email within 24 hours.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setIsSubmitted(false)}
                data-testid="button-send-another"
              >
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                name="system-inquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="system-inquiry" />
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
                      <FormLabel className="text-zinc-300">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20"
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
                      <FormLabel className="text-zinc-300">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20"
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
                      <FormLabel className="text-zinc-300">How can I help you optimize?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your question or message..."
                          className="min-h-[150px] bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20"
                          data-testid="textarea-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold tracking-wider px-12 py-7 text-lg rounded-none"
                    disabled={isSubmitting}
                    data-testid="button-submit-inquiry"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "SENDING..." : "REQUEST_INFORMATION"}
                  </Button>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-mono text-center">
                    {">"} Note: This is a general inquiry, not a formal protocol application.
                  </p>
                </div>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
