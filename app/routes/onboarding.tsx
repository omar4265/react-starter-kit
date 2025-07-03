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

export default function OnboardingPage() {
  const { isSignedIn } = useAuth();
  const subscriptionStatus = useQuery(api.subscriptions.checkUserSubscriptionStatus, {});
  const application = useQuery(api.applications.getApplication, {});

  // For debugging - show a simple message first
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Not Signed In</h1>
          <p>You need to be signed in to access onboarding.</p>
        </div>
      </div>
    );
  }

  // Show onboarding form for now (simplified)
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <OnboardingForm />
      </div>
    </div>
  );
} 