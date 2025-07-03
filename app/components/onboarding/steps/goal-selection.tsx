import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Target, Globe, Home, Plane, Search } from "lucide-react";

interface GoalSelectionProps {
  formData: { goal: string };
  updateFormData: (field: string, value: any) => void;
}

const goals = [
  {
    id: "land-interviews",
    title: "Land interviews quickly",
    description: "Get your CV in front of hiring managers fast",
    icon: Target,
  },
  {
    id: "switch-industries",
    title: "Switch industries",
    description: "Transition to a new field or sector",
    icon: Globe,
  },
  {
    id: "remote-job",
    title: "Get a remote job",
    description: "Find work-from-anywhere opportunities",
    icon: Home,
  },
  {
    id: "work-abroad",
    title: "Work abroad",
    description: "Find international opportunities",
    icon: Plane,
  },
  {
    id: "exploring",
    title: "I'm just exploring",
    description: "See what opportunities are out there",
    icon: Search,
  },
];

export function GoalSelection({ formData, updateFormData }: GoalSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">What's your top goal right now?</h3>
        <p className="text-muted-foreground">
          This helps us target the right opportunities for you
        </p>
      </div>

      <div className="grid gap-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <Button
              key={goal.id}
              variant={formData.goal === goal.id ? "default" : "outline"}
              className={cn(
                "h-auto p-4 justify-start text-left",
                formData.goal === goal.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => updateFormData("goal", goal.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{goal.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {goal.description}
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