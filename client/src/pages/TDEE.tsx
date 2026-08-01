import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TDEE() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activity, setActivity] = useState<string>("1.2");
  
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  const calculateTDEE = () => {
    if (!age || !weight || !height) return;

    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;
    
    const tdee = bmr * parseFloat(activity);
    
    setBmrResult(Math.round(bmr));
    setTdeeResult(Math.round(tdee));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 pt-24">
        <div className="space-y-8">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white">TDEE Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate your Total Daily Energy Expenditure to understand how many calories you burn per day.
            </p>
          </div>

          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader>
              <CardTitle>Enter your details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(val: "male" | "female") => setGender(val)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="e.g. 30" 
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="e.g. 70" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="e.g. 175" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activity} onValueChange={setActivity}>
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="1.375">Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="1.55">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="1.725">Very active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="1.9">Super active (very hard exercise, physical job, etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  onClick={calculateTDEE}
                  className="w-full text-lg h-12"
                  disabled={!age || !weight || !height}
                >
                  Calculate TDEE
                </Button>
              </div>

              {tdeeResult && bmrResult && (
                <div className="mt-8 p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center space-y-4">
                  <div className="space-y-1">
                    <div className="text-zinc-400 text-sm uppercase tracking-wider font-semibold">Your Maintenance Calories (TDEE)</div>
                    <div className="text-5xl font-bold text-primary">{tdeeResult}</div>
                    <div className="text-zinc-500 text-sm">calories per day</div>
                  </div>
                  <div className="pt-4 border-t border-zinc-800 flex justify-around">
                    <div className="space-y-1">
                      <div className="text-zinc-400 text-sm">Basal Metabolic Rate (BMR)</div>
                      <div className="text-2xl font-semibold">{bmrResult}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-8 text-zinc-300 mt-12 mb-20 bg-zinc-900/50 p-6 md:p-8 rounded-xl border border-zinc-800">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">What is TDEE?</h2>
              <p>
                <strong>Total Daily Energy Expenditure (TDEE)</strong> is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate, then multiplying that value by an activity multiplier.
              </p>
              <p>
                Since your BMR represents how many calories your body burns when at rest, it is necessary to adjust the numbers upwards to account for the calories you burn during the day. This is true even for those with a sedentary lifestyle.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">TDEE vs. BMR</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">BMR (Basal Metabolic Rate)</h3>
                  <p className="text-zinc-400">
                    BMR is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. This includes breathing, circulation, nutrient processing, and cell production. BMR does not include calories burned from normal daily activities or exercise.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">TDEE (Total Daily Energy Expenditure)</h3>
                  <p className="text-zinc-400">
                    TDEE is the total number of calories you burn in a given day. Your TDEE includes your BMR, plus the calories you burn through daily movement (like walking around the house) and any deliberate exercise. TDEE is the number you use to determine how much you should eat to maintain, lose, or gain weight.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center text-sm text-zinc-500 pb-12">
            <div>
              This tool provides estimates for informational purposes only and is not medical advice. Consult a healthcare provider before changing your diet or exercise routine.
            </div>
            <Dialog>
              <DialogTrigger className="text-primary hover:underline mt-2">
                Disclaimer
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-300 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">TDEE Calculator Disclaimer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4 text-sm leading-relaxed">
                  <div>
                    <strong className="text-zinc-200 block mb-1">General Information Only</strong>
                    The Total Daily Energy Expenditure (TDEE) calculator provided on tonynguyenfit.com is intended solely for informational and educational purposes. The estimates generated by this tool are based on standardized mathematical formulas (such as the Mifflin-St Jeor or Harris-Benedict equations) and average population data. Individual metabolic rates, body compositions, medical conditions, and daily activity levels vary significantly, meaning actual caloric needs may differ from the calculated results.
                  </div>
                  <div>
                    <strong className="text-zinc-200 block mb-1">Not Medical or Professional Advice</strong>
                    The outputs provided by this calculator do not constitute medical, nutritional, dietetic, or professional fitness advice, diagnosis, or treatment. You should not rely on this tool as a substitute for individualized advice from a qualified healthcare provider, registered dietitian, or certified medical professional.
                  </div>
                  <div>
                    <strong className="text-zinc-200 block mb-1">Consult a Professional</strong>
                    Before making any significant changes to your diet, caloric intake, or exercise routine—especially if you are pregnant, nursing, under 18, or have pre-existing health conditions (such as diabetes, metabolic disorders, or a history of eating disorders)—always consult with a physician or registered dietitian.
                  </div>
                  <div>
                    <strong className="text-zinc-200 block mb-1">No Liability</strong>
                    By using the TDEE calculator on tonynguyenfit.com, you acknowledge and agree that Tony Nguyen Fit and its owners, operators, or affiliates assume no liability or responsibility for any actions taken, injuries sustained, or health outcomes resulting from the use or misuse of the information provided by this tool. Use of this calculator is at your own risk.
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
