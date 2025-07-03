import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Coffee, Zap, Palette, Heart } from "lucide-react";

interface TeamVibeProps {
  formData: { teamVibe: string };
  updateFormData: (field: string, value: any) => void;
}

const teamVibes = [
  {
    id: "calm",
    title: "Calm, focused, structured",
    description: "Methodical approach with clear processes",
    icon: Coffee,
  },
  {
    id: "fast",
    title: "Fast-moving and ambitious",
    description: "High energy with rapid iteration",
    icon: Zap,
  },
  {
    id: "creative",
    title: "Creative and open-ended",
    description: "Innovative thinking and experimentation",
    icon: Palette,
  },
  {
    id: "flexible",
    title: "I'm flexible",
    description: "I can adapt to different environments",
    icon: Heart,
  },
];

export function TeamVibe({ formData, updateFormData }: TeamVibeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">What kind of team vibe do you prefer?</h3>
        <p className="text-muted-foreground">
          This helps us match you with the right company culture
        </p>
      </div>

      <div className="grid gap-3">
        {teamVibes.map((vibe) => {
          const Icon = vibe.icon;
          return (
            <Button
              key={vibe.id}
              variant={formData.teamVibe === vibe.id ? "default" : "outline"}
              className={cn(
                "h-auto p-4 justify-start text-left",
                formData.teamVibe === vibe.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => updateFormData("teamVibe", vibe.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{vibe.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {vibe.description}
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