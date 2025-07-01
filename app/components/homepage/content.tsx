import { Button } from "~/components/ui/button";
import { Upload, Settings, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function ContentSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your CV",
      description: "Submit your existing CV for a free expert review."
    },
    {
      icon: Settings,
      title: "Choose Your Preferences",
      description: "Tell us your target roles, industries, and locations."
    },
    {
      icon: Send,
      title: "Expert Optimization & Distribution",
      description: "Our professionals enhance your CV and send it to 100–500 top-matching companies."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How CVReach Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your CV in front of the right people with our simple 3-step process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-muted-foreground/20"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">ATS & Recruiter Approved</h3>
            </div>
            <p className="text-muted-foreground">
              Every CV is checked by real hiring professionals for maximum impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
