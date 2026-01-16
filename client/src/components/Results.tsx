import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import beforeImage from "@assets/stock_images/woman_fitness_transf_e54a1f2d.jpg";
import afterImage from "@assets/stock_images/woman_fitness_transf_033db1b3.jpg";
import clientImage from "@assets/stock_images/happy_woman_fitness__b34f9200.jpg";

export function Results() {
  return (
    <section id="results" className="py-16 md:py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Results
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Progress you can see
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every transformation tells a story. These programs are built to help you move better, feel stronger, and see steady progress — without extremes, burnout, or quick fixes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="bg-background rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-14 h-14">
                <AvatarImage src={clientImage} alt="Sophie Lammers" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">Sophie Lammers</p>
                <p className="text-sm text-muted-foreground italic">
                  12-Week Transformation Program
                </p>
              </div>
            </div>

            <blockquote className="text-muted-foreground leading-relaxed">
              "I used to feel drained and frustrated no matter how much I tried. Rachel helped me reconnect with my body and rebuild strength without burnout.
              <br /><br />
              For the first time, I actually enjoy moving again — and the changes haven't just been physical, they've been mental too."
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute top-4 left-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded">
                Before
              </div>
              <img
                src={beforeImage}
                alt="Client before transformation"
                className="w-full rounded-lg object-cover aspect-[3/4]"
              />
            </div>
            <div className="relative">
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded">
                After
              </div>
              <img
                src={afterImage}
                alt="Client after transformation"
                className="w-full rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
