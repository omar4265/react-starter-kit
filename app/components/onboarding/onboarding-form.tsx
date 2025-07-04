"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Loader2 } from "lucide-react";
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
import { NameLocationStep } from "./steps/name-location";

export interface OnboardingData {
  goal: string;
  location: string;
  workStyle: string;
  firstName: string;
  lastName: string;
  currentLocation: string;
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
  { id: 1, title: "Your Name & Current Location", component: NameLocationStep },
  { id: 2, title: "Goal Selection", component: GoalSelection },
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

function isStepValid(step: number, formData: OnboardingData): boolean {
  switch (step) {
    case 1:
      return !!formData.firstName && !!formData.lastName && !!formData.currentLocation;
    case 2:
      return !!formData.goal;
    case 3:
      return !!formData.experienceLevel;
    case 4:
      return !!formData.startupPreference;
    case 5:
      return !!formData.teamVibe;
    case 6:
      return formData.targetCountries.length > 0;
    case 7:
      return !!formData.cvFile;
    case 8:
      return true; // CV analysis is just a display step
    case 9:
      return !!formData.cvOptimization;
    case 10:
      return formData.jobTitles.length > 0;
    case 11:
      return !!formData.companyCount;
    default:
      return true;
  }
}

// Utility functions for localStorage
const LOCAL_STORAGE_KEY = "cvreach_onboarding_data";
function saveToLocalStorage(data: OnboardingData) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
function loadFromLocalStorage(): OnboardingData | null {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function clearLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(() => loadFromLocalStorage() || {
    goal: "",
    location: "",
    workStyle: "",
    firstName: "",
    lastName: "",
    currentLocation: "",
    experienceLevel: "",
    startupPreference: "",
    teamVibe: "",
    targetCountries: [],
    cvFile: null,
    cvOptimization: "",
    jobTitles: [],
    companyCount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = (currentStep / STEPS.length) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      saveToLocalStorage(updated);
      return updated;
    });
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Save latest data to localStorage (just in case)
      saveToLocalStorage(formData);
      // Redirect to Clerk sign-up with redirect to /pricing
      window.location.href = "/sign-up?redirect_url=/pricing";
    } catch (error) {
      setError("Failed to save application locally. Please try again.");
      console.error("Failed to save application locally:", error);
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="space-y-8 px-2 sm:px-0">
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
      <Card className="max-w-2xl mx-auto w-full sm:rounded-xl rounded-lg border py-4 sm:py-6 shadow-sm">
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
          
          {/* Error message */}
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          {/* Navigation */}
          <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || loading}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            {currentStep === STEPS.length ? (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2 w-full sm:w-auto"
                size="lg"
                disabled={!isStepValid(currentStep, formData) || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 w-full sm:w-auto"
                size="lg"
                disabled={!isStepValid(currentStep, formData) || loading}
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