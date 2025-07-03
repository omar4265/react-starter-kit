import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Briefcase, Plus, X } from "lucide-react";

interface JobTitlesProps {
  formData: { jobTitles: string[] };
  updateFormData: (field: string, value: any) => void;
}

const popularJobTitles = [
  "Backend Developer",
  "Full-stack Engineer",
  "DevOps Engineer",
  "Product Manager",
  "Data Analyst",
  "UI/UX Designer",
  "Frontend Developer",
  "Mobile Developer",
  "QA Engineer",
  "System Administrator",
  "Cloud Engineer",
  "Data Scientist",
];

export function JobTitles({ formData, updateFormData }: JobTitlesProps) {
  const [customTitle, setCustomTitle] = useState("");

  const toggleJobTitle = (title: string) => {
    const current = formData.jobTitles;
    const updated = current.includes(title)
      ? current.filter(t => t !== title)
      : current.length < 3
      ? [...current, title]
      : current;
    updateFormData("jobTitles", updated);
  };

  const addCustomTitle = () => {
    if (customTitle.trim() && formData.jobTitles.length < 3) {
      const updated = [...formData.jobTitles, customTitle.trim()];
      updateFormData("jobTitles", updated);
      setCustomTitle("");
    }
  };

  const removeJobTitle = (title: string) => {
    const updated = formData.jobTitles.filter(t => t !== title);
    updateFormData("jobTitles", updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Select up to 3 job titles you'd like to target</h3>
        <p className="text-muted-foreground">
          Choose from popular titles or add your own custom title
        </p>
      </div>

      {/* Selected Titles */}
      {formData.jobTitles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Selected Titles ({formData.jobTitles.length}/3)</h4>
          <div className="flex flex-wrap gap-2">
            {formData.jobTitles.map((title) => (
              <div
                key={title}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
              >
                <Briefcase className="w-3 h-3" />
                {title}
                <button
                  onClick={() => removeJobTitle(title)}
                  className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Titles */}
      <div className="space-y-3">
        <h4 className="font-medium">Popular Job Titles</h4>
        <div className="grid grid-cols-2 gap-3">
          {popularJobTitles.map((title) => {
            const isSelected = formData.jobTitles.includes(title);
            const isDisabled = !isSelected && formData.jobTitles.length >= 3;
            
            return (
              <Button
                key={title}
                variant={isSelected ? "default" : "outline"}
                disabled={isDisabled}
                className={cn(
                  "h-auto p-3 justify-start text-left",
                  isSelected && "ring-2 ring-primary ring-offset-2",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => toggleJobTitle(title)}
              >
                <div className="flex items-center gap-2 w-full">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{title}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Custom Title */}
      {formData.jobTitles.length < 3 && (
        <div className="space-y-3">
          <h4 className="font-medium">Add Custom Title</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom job title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomTitle()}
              className="flex-1"
            />
            <Button
              onClick={addCustomTitle}
              disabled={!customTitle.trim()}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {formData.jobTitles.length >= 3 && (
        <div className="text-center text-sm text-muted-foreground">
          You've selected the maximum of 3 job titles
        </div>
      )}
    </div>
  );
} 