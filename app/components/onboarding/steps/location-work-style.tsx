import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { MapPin, Monitor, Building, Users } from "lucide-react";

interface LocationWorkStyleProps {
  formData: { location: string; workStyle: string };
  updateFormData: (field: string, value: any) => void;
}

const workStyles = [
  {
    id: "remote",
    title: "Remote",
    description: "Work from anywhere",
    icon: Monitor,
  },
  {
    id: "hybrid",
    title: "Hybrid",
    description: "Mix of remote and office",
    icon: Building,
  },
  {
    id: "on-site",
    title: "On-site",
    description: "Work from the office",
    icon: Users,
  },
];

const popularLocations = [
  "Riyadh, Saudi Arabia",
  "Dubai, UAE",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Singapore",
  "Sydney, Australia",
];

export function LocationWorkStyle({ formData, updateFormData }: LocationWorkStyleProps) {
  return (
    <div className="space-y-8">
      {/* Location */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Where are you based?</h3>
          <p className="text-muted-foreground">
            This helps us find opportunities in your area
          </p>
        </div>

        <div className="space-y-3">
          <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {popularLocations.map((location) => (
                <SelectItem key={location} value={location}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">or</span>
          </div>

          <Input
            placeholder="Enter your location manually"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className="text-center"
          />
        </div>
      </div>

      {/* Work Style */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">How do you prefer to work?</h3>
          <p className="text-muted-foreground">
            Choose your preferred work arrangement
          </p>
        </div>

        <div className="grid gap-3">
          {workStyles.map((style) => {
            const Icon = style.icon;
            return (
              <Button
                key={style.id}
                variant={formData.workStyle === style.id ? "default" : "outline"}
                className={cn(
                  "h-auto p-4 justify-start text-left",
                  formData.workStyle === style.id && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={() => updateFormData("workStyle", style.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{style.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {style.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 