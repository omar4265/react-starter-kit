import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Sparkles, Check } from "lucide-react";

interface CVOptimizationProps {
  formData: { cvOptimization: string };
  updateFormData: (field: string, value: any) => void;
}

const optimizationOptions = [
  {
    id: "yes",
    title: "Yes, optimize my CV",
    description: "Our experts will improve your CV for better ATS performance and readability",
    benefits: [
      "ATS-optimized formatting",
      "Enhanced keyword placement",
      "Improved readability",
      "Professional layout"
    ]
  },
  {
    id: "no",
    title: "No, keep as is",
    description: "Use your CV in its current form",
    benefits: [
      "No changes to your CV",
      "Faster processing",
      "Keep your original format"
    ]
  },
];

export function CVOptimization({ formData, updateFormData }: CVOptimizationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Would you like us to improve your CV?</h3>
        <p className="text-muted-foreground">
          Our experts can optimize your CV for better results
        </p>
      </div>

      <div className="grid gap-4">
        {optimizationOptions.map((option) => (
          <Button
            key={option.id}
            variant={formData.cvOptimization === option.id ? "default" : "outline"}
            className={cn(
              "h-auto p-6 justify-start text-left",
              formData.cvOptimization === option.id && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => updateFormData("cvOptimization", option.id)}
          >
            <div className="flex items-start gap-4 w-full">
              <div className="flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-lg mb-2">{option.title}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {option.description}
                </div>
                <ul className="space-y-1">
                  {option.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-3 h-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Button>
        ))}
      </div>

      {formData.cvOptimization === "yes" && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-1">Optimization Included</h4>
              <p className="text-sm text-muted-foreground">
                Your CV will be professionally optimized by our team of experts before distribution.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 