import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Globe, Check } from "lucide-react";

interface TargetCountriesProps {
  formData: { targetCountries: string[] };
  updateFormData: (field: string, value: any) => void;
}

const countries = [
  "Saudi Arabia",
  "UAE",
  "USA",
  "Germany",
  "UK",
  "Canada",
  "Australia",
  "Singapore",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Remote",
];

export function TargetCountries({ formData, updateFormData }: TargetCountriesProps) {
  const toggleCountry = (country: string) => {
    const current = formData.targetCountries;
    const updated = current.includes(country)
      ? current.filter(c => c !== country)
      : [...current, country];
    updateFormData("targetCountries", updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Which countries would you like to target?</h3>
        <p className="text-muted-foreground">
          Select multiple countries or choose "Remote" for worldwide opportunities
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {countries.map((country) => {
          const isSelected = formData.targetCountries.includes(country);
          return (
            <Button
              key={country}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-auto p-4 justify-start text-left relative",
                isSelected && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => toggleCountry(country)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{country}</div>
                </div>
                {isSelected && (
                  <div className="flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {formData.targetCountries.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Selected: {formData.targetCountries.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
} 