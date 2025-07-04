import { memo } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";
import { ArrowRight, Upload, Target, Zap } from "lucide-react";

export default function IntegrationsSection({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription?: boolean };
}) {
  return (
    <section id="hero">
      <Navbar loaderData={loaderData} />
      <div className="bg-gradient-to-br from-background via-background to-primary/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 mt-[2rem]">
          <div className="grid items-center lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Reviewed by Real Hiring Experts
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Get Your CV to{" "}
                  <span className="text-primary">200M+ Companies</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Upload your CV once—our team of real hiring professionals will optimize it for ATS and send it to hundreds of relevant companies. No bots, just expert help.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  asChild 
                  className="text-lg px-8 py-6 animate-glow shadow-lg shadow-primary/30 relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 24px 4px var(--tw-shadow-color, #3b82f6)',
                  }}
                >
                  <Link
                    to="/onboarding"
                    prefetch="viewport"
                  >
                    Send My CV Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload CV</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Choose Companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Get Distributed</span>
                </div>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-2xl p-6 border shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Upload CV</h3>
                    <p className="text-sm text-muted-foreground">Simple drag & drop</p>
                  </div>
                  <div className="bg-background rounded-2xl p-6 border shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">200M+ Companies</h3>
                    <p className="text-sm text-muted-foreground">Global database</p>
                  </div>
                  <div className="bg-background rounded-2xl p-6 border shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">ATS Optimized</h3>
                    <p className="text-sm text-muted-foreground">AI enhancement</p>
                  </div>
                  <div className="bg-background rounded-2xl p-6 border shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl mb-4 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Get Distributed</h3>
                    <p className="text-sm text-muted-foreground">100-500 companies</p>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-background rounded-2xl p-4 border shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl p-4 border shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">ATS Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Keep the IntegrationCard component for potential future use
const IntegrationCard = memo(({
  children,
  className,
  borderClassName,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative flex size-20 rounded-xl dark:bg-transparent",
        className
      )}
    >
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25",
          borderClassName
        )}
      />
      <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
    </div>
  );
});
