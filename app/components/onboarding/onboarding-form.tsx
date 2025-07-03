"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, CheckCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Step components
import { GoalSelection } from "./steps/goal-selection";
import { LocationWorkStyle } from "./steps/location-work-style";
import { ExperienceLevel } from "./steps/experience-level";
import { StartupPreference } from "./steps/startup-preference";
import { TeamVibe } from "./steps/team-vibe";
import { TargetCountries } from "./steps/target-countries";
import { CVUpload } from "./steps/cv-upload";
import { CVAnalysis } from "./steps/cv-analysis";
import { CVOptimization } from "./steps/cv-optimization";
import { JobTitles } from "./steps/job-titles";
import { CompanyCount } from "./steps/company-count";

export interface OnboardingData {
  goal: string;
  location: string;
  workStyle: string;
  experienceLevel: string;
  startupPreference: string;
  teamVibe: string;
  targetCountries: string[];
  cvFile: File | null;
  cvOptimization: string;
  jobTitles: string[];
  companyCount: string;
}

const STEPS = [
  { id: 1, title: "Goal Selection", component: GoalSelection },
  { id: 2, title: "Location & Work Style", component: LocationWorkStyle },
  { id: 3, title: "Experience Level", component: ExperienceLevel },
  { id: 4, title: "Startup Preference", component: StartupPreference },
  { id: 5, title: "Team Vibe", component: TeamVibe },
  { id: 6, title: "Target Countries", component: TargetCountries },
  { id: 7, title: "CV Upload", component: CVUpload },
  { id: 8, title: "CV Analysis", component: CVAnalysis },
  { id: 9, title: "CV Optimization", component: CVOptimization },
  { id: 10, title: "Job Titles", component: JobTitles },
  { id: 11, title: "Company Count", component: CompanyCount },
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    goal: "",
    location: "",
    workStyle: "",
    experienceLevel: "",
    startupPreference: "",
    teamVibe: "",
    targetCountries: [],
    cvFile: null,
    cvOptimization: "",
    jobTitles: [],
    companyCount: "",
  });

  const progress = (currentStep / STEPS.length) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveApplication = useMutation(api.applications.saveApplication);

  const handleSubmit = async () => {
    try {
      // Save application data
      await saveApplication({
        goal: formData.goal,
        location: formData.location,
        workStyle: formData.workStyle,
        experienceLevel: formData.experienceLevel,
        startupPreference: formData.startupPreference,
        teamVibe: formData.teamVibe,
        targetCountries: formData.targetCountries,
        cvFileUrl: formData.cvFile ? formData.cvFile.name : undefined,
        cvOptimization: formData.cvOptimization,
        jobTitles: formData.jobTitles,
        companyCount: formData.companyCount,
        status: "submitted",
      });

      // Reload the page to show the paywall
      window.location.reload();
    } catch (error) {
      console.error("Failed to save application:", error);
      // Handle error - could show a toast notification
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
            CV
          </div>
          <span className="text-2xl font-bold">CVReach</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Let's Get Started</h1>
          <p className="text-muted-foreground">
            Tell us about your goals and preferences to find the perfect opportunities
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep} of {STEPS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">
            {STEPS[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
          />
          
          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep === STEPS.length ? (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
                size="lg"
              >
                Complete Setup
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
                size="lg"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 