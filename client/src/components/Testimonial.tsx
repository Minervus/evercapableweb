import { Activity } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Testimonial() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0A0A0A] border border-zinc-800/60 rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden group">
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6600]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:bg-[#FF6600]/10 transition-colors duration-700"></div>

          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#FF6600] uppercase mb-12">
            // Member Perspective
          </p>

          <div className="grid md:grid-cols-[60%_1fr] gap-12 md:gap-20 items-start relative z-10">
            {/* Left Column: Narrative */}
            <div className="space-y-10">
              <div className="relative pl-6 md:pl-8">
                {/* The "Anchor" Line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#FF6600]"></div>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight tracking-tight">
                  "I feel <span className="font-bold text-white">more in control</span> of my health than ever before."
                </h2>
              </div>

              <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-[1.8] font-light pl-6 md:pl-8">
                <p>
                  Tony doesn't just tell you what to eat; he explains the science behind it in a way that's easy to understand and actually interesting.
                </p>
                <p>
                  Instead of overwhelming changes, we created small, achievable adjustments that <span className="font-bold text-white">fit my lifestyle</span>. No extremes—just consistency and knowledge.
                </p>
              </div>
            </div>

            {/* Right Column: Data */}
            <div className="flex flex-col gap-10 md:pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <Activity className="w-6 h-6 text-[#FF6600] stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-2">The Result</p>
                  <p className="font-mono text-sm md:text-base text-zinc-300">
                    // STATUS: <span className="text-white font-medium">DOWN 12LBS</span>
                    <br />
                    <span className="text-zinc-500">[90_DAY_MARK]</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Avatar className="w-16 h-16 border border-zinc-800">
                  <AvatarImage src="/christian.jpeg" alt="Christian K." className="object-cover" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 font-medium tracking-widest text-lg">CK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-2xl tracking-wide text-white">- Christian K.</p>
                  <p className="text-sm text-zinc-500">Finance Executive & Father</p>
                </div>
              </div>
            </div>
          </div>

          {/* Engineer's Note */}
          <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-800/50">
            <p className="text-sm text-zinc-500 max-w-3xl leading-relaxed">
              <span className="text-zinc-300 font-medium">Note:</span> 12 pounds is the byproduct. The 'control' is the result of building habits that don't break when life gets busy. This is why we commit to 24 weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
