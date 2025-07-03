import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle, AlertCircle, Star } from "lucide-react";

interface CVAnalysisProps {
  formData: { cvFile: File | null };
  updateFormData: (field: string, value: any) => void;
}

export function CVAnalysis({ formData }: CVAnalysisProps) {
  // Dummy analysis data - in a real app, this would come from the backend
  const analysis = {
    detectedRole: "Software Engineer",
    experienceLevel: "2–3 years",
    location: "Riyadh",
    score: 6.5,
    feedback: "Lacks clear metrics and formatting.",
    strengths: [
      "Good technical skills",
      "Relevant experience",
      "Clear project descriptions"
    ],
    improvements: [
      "Add quantifiable achievements",
      "Improve formatting consistency",
      "Include more keywords"
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 6) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">CV Analysis Complete</h3>
        <p className="text-muted-foreground">
          Here's what we found in your CV and how we can improve it
        </p>
      </div>

      <div className="grid gap-4">
        {/* Score Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Overall Score</h4>
              {getScoreIcon(analysis.score)}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">
                <span className={getScoreColor(analysis.score)}>
                  {analysis.score}/10
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(analysis.score)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detected Information */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Detected Information</h4>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <Badge variant="secondary">{analysis.detectedRole}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <Badge variant="secondary">{analysis.experienceLevel}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <Badge variant="secondary">{analysis.location}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Feedback</h4>
            <p className="text-muted-foreground mb-4">{analysis.feedback}</p>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                <ul className="space-y-1">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-orange-700 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 