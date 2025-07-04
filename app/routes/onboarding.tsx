import { useState } from "react";
import { getAuth } from "@clerk/react-router/ssr.server";
import { redirect } from "react-router";
import OnboardingForm from "~/components/onboarding/onboarding-form";
import { SubscriptionPaywall } from "~/components/onboarding/subscription-paywall";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/react-router";

// Temporarily commented out for debugging
// export async function loader(args: any) {
//   const { userId } = await getAuth(args);
//   if (!userId) {
//     throw redirect("/sign-in");
//   }
//   return { userId };
// }

// Placeholder for sign-up step/modal
function SignupComponent({ onSuccess }: { onSuccess: () => void }) {
  // You would use Clerk's <SignUp /> component or a modal here
  // For now, just a button to simulate sign-up
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-2xl font-bold mb-4">Create your account to continue</h2>
      {/* Replace with Clerk <SignUp /> or social login */}
      <button
        className="bg-primary text-white px-6 py-3 rounded-lg text-lg"
        onClick={onSuccess}
      >
        Simulate Sign Up
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  const { isSignedIn } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  // If signed in, redirect to dashboard
  if (isSignedIn) {
    window.location.href = "/dashboard";
    return null;
  }

  // After sign-up, show paywall
  if (showPaywall && onboardingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <SubscriptionPaywall formData={onboardingData} />
        </div>
      </div>
    );
  }

  // If onboarding is complete but not signed up, show sign-up
  if (showSignup && onboardingData) {
    return (
      <SignupComponent
        onSuccess={() => setShowPaywall(true)}
      />
    );
  }

  // Otherwise, show onboarding form
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <OnboardingForm
          onComplete={(data: any) => {
            setOnboardingData(data);
            setShowSignup(true);
          }}
        />
      </div>
    </div>
  );
} 