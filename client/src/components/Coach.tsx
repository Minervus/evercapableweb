import coachPhoto from "@assets/Gemini_Generated_Image_pyhkcmpyhkcmpyhk_copy_1768605875661.png";
import issaLogo from "@assets/images_1768606382552.png";
import pnLogo from "@assets/PN_coach_logo_1768606213043.jpeg";

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
              I'm Tony. I'm a certified nutrition coach and PT, but honestly? That's the least interesting thing about me. What matters is that I spent two decades as a human guinea pig, trying to "hack" my way to a body I could be proud of.
            </p>
            
            <p data-testid="text-coach-experiments">
              I've done it all. I've lived on nothing but meat (Carnivore), I've fasted until I was lightheaded, and I've cycled through Keto, Paleo, and Low-Carb. On the training side, I've beaten my joints to a pulp with Powerlifting, CrossFit, and traditional bodybuilding grinds.
            </p>
            
            <p data-testid="text-coach-chase" className="text-foreground font-medium">
              I chased the "3-plate squat" and the beach abs—and most of the time, I just ended up tired, hungry, and back where I started.
            </p>
            
            <p data-testid="text-coach-shift">
              The shift happened when I started a family. Suddenly, my "Why" changed. I didn't care about looking ripped for strangers at the beach as much as I cared about being able to pick up my kids without my back seizing up. I realized that if I didn't find something more sustainable, I was headed straight for the same heart conditions and diabetes that took my grandparents and multiple family members before their time.
            </p>
            
            <p data-testid="text-coach-training" className="text-foreground font-medium">
              I stopped training for the mirror and started training for the next 40 years.
            </p>
            
            <p data-testid="text-coach-evercapable">
              I realized that being <strong className="text-foreground">EverCapable</strong> meant more than being able to bench 2 plates; it meant being able to wipe my own ass when I'm 95. It's about functional strength and a nutritional approach that doesn't feel like a prison sentence.
            </p>
            
            <p data-testid="text-coach-mission">
              Now, my mission is to help other millennials and dads stop the guesswork. No more 2-hour gym grinds or crash diets.
            </p>
            
            <p data-testid="text-coach-goal" className="text-foreground font-medium">
              No guesswork, just the habit layering required to stay healthy, stay strong, and stay present. The 30-day challenges fail because they have an end date; my goal is to make sure you don't.
            </p>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center gap-4" data-testid="container-certifications">
              <img 
                src={issaLogo} 
                alt="ISSA Certified" 
                className="h-16 md:h-20 w-auto"
                data-testid="img-issa-logo"
              />
              <img 
                src={pnLogo} 
                alt="Precision Nutrition L1 Coach" 
                className="h-16 md:h-20 w-auto rounded-md"
                data-testid="img-pn-logo"
              />
            </div>
            <p 
              className="text-3xl md:text-4xl text-foreground italic text-right"
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
