import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { GraduationCap, Briefcase, Award, Star } from "lucide-react";

interface ExperienceLevelProps {
  formData: { experienceLevel: string };
  updateFormData: (field: string, value: any) => void;
}

const experienceLevels = [
  {
    id: "0-1",
    title: "0–1 years",
    description: "Just starting out or recent graduate",
    icon: GraduationCap,
  },
  {
    id: "2-3",
    title: "2–3 years",
    description: "Some professional experience",
    icon: Briefcase,
  },
  {
    id: "4-6",
    title: "4–6 years",
    description: "Mid-level professional",
    icon: Award,
  },
  {
    id: "7+",
    title: "7+ years",
    description: "Senior or expert level",
    icon: Star,
  },
];

export function ExperienceLevel({ formData, updateFormData }: ExperienceLevelProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">How much experience do you have?</h3>
        <p className="text-muted-foreground">
          This helps us match you with appropriate opportunities
        </p>
      </div>

      <div className="grid gap-3">
        {experienceLevels.map((level) => {
          const Icon = level.icon;
          return (
            <Button
              key={level.id}
              variant={formData.experienceLevel === level.id ? "default" : "outline"}
              className={cn(
                "h-auto p-4 justify-start text-left",
                formData.experienceLevel === level.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => updateFormData("experienceLevel", level.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{level.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {level.description}
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