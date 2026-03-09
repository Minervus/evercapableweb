import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const applicationFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentGoal: z.string().min(1, "Please select your current goal"),
  biggestObstacle: z.string().min(10, "Please describe your biggest obstacle"),
  trainingExperience: z.string().min(1, "Please select your training experience"),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentGoal: "",
      biggestObstacle: "",
      trainingExperience: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams({
        "form-name": "pro-application",
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
            // INITIATE_PROTOCOL_APPLICATION
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Apply for The Protocol
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Selection is based on protocol alignment and current capacity.
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
                Application Received
              </h4>
              <p className="text-zinc-400">
                I will contact you via email within 24 hours regard next steps.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setIsSubmitted(false)}
                data-testid="button-send-another"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                name="pro-application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="pro-application" />
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
                  name="currentGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Current Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20">
                            <SelectValue placeholder="Select your primary goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="fat-loss" className="text-white focus:bg-zinc-800">Fat Loss</SelectItem>
                          <SelectItem value="muscle-gain" className="text-white focus:bg-zinc-800">Muscle Gain</SelectItem>
                          <SelectItem value="longevity" className="text-white focus:bg-zinc-800">Longevity</SelectItem>
                          <SelectItem value="recomposition" className="text-white focus:bg-zinc-800">Recomposition</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="biggestObstacle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Select your primary system bottleneck:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20">
                            <SelectValue placeholder="What is the #1 thing holding your biology back right now?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="recovery-sleep" className="text-white focus:bg-zinc-800">[01] Recovery & Sleep Quality</SelectItem>
                          <SelectItem value="pain-movement" className="text-white focus:bg-zinc-800">[02] Pain-Free Movement & Mobility</SelectItem>
                          <SelectItem value="energy-crash" className="text-white focus:bg-zinc-800">[03] Sustained Daily Energy (The 3PM Crash)</SelectItem>
                          <SelectItem value="strength-muscle" className="text-white focus:bg-zinc-800">[04] Strength & Lean Muscle Foundation</SelectItem>
                          <SelectItem value="travel-stress" className="text-white focus:bg-zinc-800">[05] Maintaining Progress During Travel/Stress</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Current Training Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black border-zinc-700 text-white focus:border-orange-500 focus:ring-orange-500/20">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="beginner" className="text-white focus:bg-zinc-800">Beginner</SelectItem>
                          <SelectItem value="intermediate" className="text-white focus:bg-zinc-800">Intermediate</SelectItem>
                          <SelectItem value="advanced" className="text-white focus:bg-zinc-800">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold tracking-wider px-12 py-7 text-lg rounded-none"
                  disabled={isSubmitting}
                  data-testid="button-submit-application"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT_APPLICATION"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
