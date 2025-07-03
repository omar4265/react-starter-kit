import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Link } from "react-router";
import { CheckCircle, Star, Zap, Target, Building2 } from "lucide-react";

interface SubscriptionPaywallProps {
  formData: {
    goal: string;
    location: string;
    workStyle: string;
    experienceLevel: string;
    startupPreference: string;
    teamVibe: string;
    targetCountries: string[];
    cvOptimization: string;
    jobTitles: string[];
    companyCount: string;
  };
}

const plans = [
  {
    id: "100",
    title: "Starter",
    price: "$49",
    description: "Perfect for focused job search",
    features: [
      "100 companies",
      "CV optimization",
      "Email support",
      "30-day results"
    ],
    icon: Building2,
    popular: false
  },
  {
    id: "300",
    title: "Professional",
    price: "$99",
    description: "Most popular choice",
    features: [
      "300 companies",
      "Priority CV optimization",
      "Priority support",
      "14-day results",
      "Application tracking"
    ],
    icon: Target,
    popular: true
  },
  {
    id: "500",
    title: "Premium",
    price: "$149",
    description: "Maximum exposure",
    features: [
      "500 companies",
      "Premium CV optimization",
      "24/7 support",
      "7-day results",
      "Application tracking",
      "Interview coaching"
    ],
    icon: Star,
    popular: false
  }
];

export function SubscriptionPaywall({ formData }: SubscriptionPaywallProps) {
  const selectedPlan = plans.find(plan => plan.id === formData.companyCount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            CV
          </div>
          <span className="text-3xl font-bold">CVReach</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">Ready to Launch Your Career?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your application is ready! Subscribe to start distributing your CV to {formData.companyCount} companies.
          </p>
        </div>
      </div>

      {/* Application Summary */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Your Application Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Goal:</span>
              <p className="font-medium">{formData.goal}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">{formData.location}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Experience:</span>
              <p className="font-medium">{formData.experienceLevel} years</p>
            </div>
            <div>
              <span className="text-muted-foreground">Target Companies:</span>
              <p className="font-medium">{formData.companyCount}</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Job Titles:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.jobTitles.map((title, index) => (
                  <Badge key={index} variant="secondary">{title}</Badge>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Target Countries:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.targetCountries.map((country, index) => (
                  <Badge key={index} variant="outline">{country}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-muted-foreground">
            Select the plan that matches your application preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = plan.id === formData.companyCount;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={isSelected ? "default" : "outline"}
                    asChild
                  >
                    <Link to={`/pricing?plan=${plan.id}`}>
                      {isSelected ? "Selected Plan" : "Choose Plan"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-muted/30 rounded-lg p-8 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Why Choose CVReach?</h3>
          <p className="text-muted-foreground">
            Get your CV in front of the right people with our proven approach
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 mx-auto flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Targeted Distribution</h4>
            <p className="text-sm text-muted-foreground">
              We match your CV with companies that fit your criteria
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 mx-auto flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">ATS Optimized</h4>
            <p className="text-sm text-muted-foreground">
              Your CV is optimized to pass through applicant tracking systems
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 mx-auto flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Expert Review</h4>
            <p className="text-sm text-muted-foreground">
              Real hiring professionals review and optimize your CV
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Ready to start your job search? Subscribe now and get your CV distributed within 24 hours.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to={`/pricing?plan=${formData.companyCount}`}>
              Subscribe Now
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/dashboard">
              View Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 