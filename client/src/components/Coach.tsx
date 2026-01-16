import coachPhoto from "@assets/Gemini_Generated_Image_pyhkcmpyhkcmpyhk_copy_1768605875661.png";

export function Coach() {
  return (
    <section id="coach" className="py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-coach-headline"
          >
            20 Years of Guessing. 6 Months of Science.
          </h2>
          <p className="text-lg text-primary font-medium" data-testid="text-coach-subtitle">
            Meet Your Coach
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 md:p-12 border border-border">
          <div className="flex justify-center mb-8">
            <img 
              src={coachPhoto} 
              alt="Tony Nguyen - EverCapable Coach" 
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-primary/20"
              data-testid="img-coach-photo"
            />
          </div>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p data-testid="text-coach-intro">
              I'm Tony. I'm a certified nutrition coach and PT, but more importantly, I'm a dad who spent two decades doing it wrong. I've tried it all: Keto, Paleo, Carnivore, Crossfit, and Powerlifting. I chased aesthetics and "three-plate squats" until I realized my priorities had shifted.
            </p>
            
            <p data-testid="text-coach-shift">
              I stopped training for the beach and started training for longevity.
            </p>
            
            <p data-testid="text-coach-change">
              I traded the 2-hour daily grinds for small, compounding habits. The goal changed from looking good with my shirt off to being able to lift my kids without throwing my back out—and staying independent until I'm 95.
            </p>
            
            <p data-testid="text-coach-mission">
              Now, my mission is helping millennial dads get ahead of the curve. No crash diets. No burnout. Just the objective data and sustainable habits you need to be the best version of yourself for the people who depend on you.
            </p>
          </div>

          <div className="mt-10 text-right">
            <p 
              className="text-3xl md:text-4xl text-foreground italic"
              style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
              data-testid="text-coach-signature"
            >
              Tony Nguyen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
