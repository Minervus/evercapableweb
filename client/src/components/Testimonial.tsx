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
            // SYSTEM_CASE_STUDY
          </p>

          <div className="grid md:grid-cols-[40%_1fr] gap-12 md:gap-20 items-start relative z-10">
            {/* Left Column: User Profile & Quote */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <Avatar className="w-24 h-24 border border-zinc-800">
                  <AvatarImage src="/christian.jpeg" alt="Christian K." className="object-cover" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 font-medium tracking-widest text-lg">CK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-serif text-3xl tracking-wide text-white mb-2">Christian K.</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF6600] uppercase">
                    Finance Exec & Dad
                  </p>
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#FF6600]"></div>
                <p className="font-serif text-xl md:text-2xl text-white leading-relaxed">
                  "I feel <span className="font-bold">more in control</span> of my health than ever before."
                </p>
              </div>
            </div>

            {/* Right Column: Metrics */}
            <div className="space-y-10 relative">
              <div className="absolute left-[-24px] top-2 bottom-2 w-[2px] bg-zinc-800 hidden md:block"></div>

              <div className="relative pl-0 md:pl-6">
                <h3 className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                  [ BEFORE_PROTOCOL ]
                </h3>
                <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed italic">
                  "Weight fluctuations, 3 PM energy crashes, low control."
                </p>
              </div>

              <div className="relative pl-0 md:pl-6">
                <h3 className="font-mono text-[10px] md:text-xs text-green-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                  [ AFTER_90_DAYS ]
                </h3>
                <p className="text-white text-lg md:text-2xl leading-relaxed font-medium">
                  12 lbs down, maintaining weight, consistent energy despite 60+ hour weeks.
                </p>
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
