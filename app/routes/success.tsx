"use client";
import { useQuery, useMutation } from "convex/react";
import { useAuth } from "@clerk/react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

// Interface for onboarding data
interface OnboardingData {
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

// Utility function to load onboarding data from localStorage
function loadOnboardingData(): OnboardingData | null {
  const raw = localStorage.getItem("cvreach_onboarding_data");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function Success() {
  const { isSignedIn } = useAuth();
  const subscription = useQuery(api.subscriptions.fetchUserSubscription);
  const upsertUser = useMutation(api.users.upsertUser);
  const saveApplication = useMutation(api.applications.saveApplication);
  const [applicationSaved, setApplicationSaved] = useState(false);
  const [savingApplication, setSavingApplication] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      upsertUser();
    }
  }, [isSignedIn, upsertUser]);

  // Save onboarding data to Convex when user is signed in and has a subscription
  useEffect(() => {
    if (isSignedIn && subscription && !applicationSaved && !savingApplication) {
      const onboardingData = loadOnboardingData();
      if (onboardingData) {
        setSavingApplication(true);
        
        // Prepare the application data for Convex
        const applicationData = {
          goal: onboardingData.goal,
          location: onboardingData.currentLocation || onboardingData.location,
          workStyle: onboardingData.workStyle,
          experienceLevel: onboardingData.experienceLevel,
          startupPreference: onboardingData.startupPreference,
          teamVibe: onboardingData.teamVibe,
          targetCountries: onboardingData.targetCountries,
          cvFileUrl: "", // We'll handle file upload separately if needed
          cvOptimization: onboardingData.cvOptimization,
          jobTitles: onboardingData.jobTitles,
          companyCount: onboardingData.companyCount,
          status: "submitted", // Set initial status
        };

        saveApplication(applicationData)
          .then(() => {
            console.log("Application saved successfully");
            setApplicationSaved(true);
            // Clear localStorage after successful save
            localStorage.removeItem("cvreach_onboarding_data");
          })
          .catch((error) => {
            console.error("Failed to save application:", error);
          })
          .finally(() => {
            setSavingApplication(false);
          });
      }
    }
  }, [isSignedIn, subscription, applicationSaved, savingApplication, saveApplication]);

  if (!isSignedIn) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              Please sign in to view your purchase details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!subscription) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading your purchase details...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader className="pb-6">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Purchase Successful!
          </CardTitle>
          <CardDescription className="text-lg">
            Your payment was successful and your purchase is now complete.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg mb-4">Purchase Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium capitalize">{subscription.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">
                  ${subscription.amount ? (subscription.amount / 100).toFixed(2) : '0.00'} {subscription.currency ? subscription.currency.toUpperCase() : 'USD'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date:</span>
                <span className="font-medium">
                  {subscription.currentPeriodStart ? new Date(subscription.currentPeriodStart).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Application Status */}
          {savingApplication && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving your application...</span>
              </div>
            </div>
          )}
          
          {applicationSaved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span>Your application has been saved successfully!</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What's Next?</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Button asChild className="w-full">
                <Link to={subscription?.status === 'active' ? "/dashboard" : "/pricing"}>
                  {subscription?.status === 'active' ? (
                    <>
                      Access Your Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "View Pricing"
                  )}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              {subscription?.status === 'active'
                ? "You'll receive a confirmation email shortly. If you have any questions, feel free to contact our support team."
                : "Your payment is processing. It may take a few minutes for your purchase to activate. Please refresh the page or try again shortly."}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}