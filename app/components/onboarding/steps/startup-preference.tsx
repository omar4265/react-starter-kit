import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Rocket, Building2 } from "lucide-react";

interface StartupPreferenceProps {
  formData: { startupPreference: string };
  updateFormData: (field: string, value: any) => void;
}

const startupOptions = [
  {
    id: "yes",
    title: "Yes, I'm open to startups",
    description: "Fast-paced environment with growth opportunities",
    icon: Rocket,
  },
  {
    id: "no",
    title: "No, I prefer established companies",
    description: "Stable environment with established processes",
    icon: Building2,
  },
];

export function StartupPreference({ formData, updateFormData }: StartupPreferenceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Do you mind working at a startup?</h3>
        <p className="text-muted-foreground">
          This helps us understand your company size preferences
        </p>
      </div>

      <div className="grid gap-3">
        {startupOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.id}
              variant={formData.startupPreference === option.id ? "default" : "outline"}
              className={cn(
                "h-auto p-4 justify-start text-left",
                formData.startupPreference === option.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => updateFormData("startupPreference", option.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
} 