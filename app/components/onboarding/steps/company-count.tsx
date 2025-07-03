import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Building2, Target, Zap } from "lucide-react";

interface CompanyCountProps {
  formData: { companyCount: string; cvOptimization: string };
  updateFormData: (field: string, value: any) => void;
}

const companyCounts = [
  {
    id: "100",
    title: "100 Companies",
    description: "Perfect for focused job search",
    icon: Building2,
    features: [
      "Targeted distribution",
      "Faster processing",
      "Lower cost"
    ]
  },
  {
    id: "300",
    title: "300 Companies",
    description: "Balanced reach and precision",
    icon: Target,
    features: [
      "Wider reach",
      "Good balance",
      "Popular choice"
    ]
  },
  {
    id: "500",
    title: "500 Companies",
    description: "Maximum exposure and opportunities",
    icon: Zap,
    features: [
      "Maximum reach",
      "Best for active search",
      "Premium option"
    ]
  },
];

export function CompanyCount({ formData, updateFormData }: CompanyCountProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">How many companies should we send your CV to?</h3>
        <p className="text-muted-foreground">
          Choose the distribution size that fits your job search strategy
        </p>
      </div>

      <div className="grid gap-4">
        {companyCounts.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.id}
              variant={formData.companyCount === option.id ? "default" : "outline"}
              className={cn(
                "h-auto p-6 justify-start text-left",
                formData.companyCount === option.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => updateFormData("companyCount", option.id)}
            >
              <div className="flex items-start gap-4 w-full">
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-lg mb-2">{option.title}</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </div>
                  <ul className="space-y-1">
                    {option.features.map((feature, index) => (
                      <li key={index} className="text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="text-center">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <p className="text-sm text-muted-foreground">
            Once you complete this setup, our team will review your preferences, 
            {formData.cvOptimization === "yes" && " optimize your CV, and "}
            distribute it to {formData.companyCount || "your chosen number of"} companies 
            that match your criteria.
          </p>
        </div>
      </div>
    </div>
  );
} 