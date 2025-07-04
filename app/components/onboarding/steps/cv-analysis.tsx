import { Card, CardContent } from "~/components/ui/card";
import { CheckCircle, AlertCircle, Star } from "lucide-react";

interface CVAnalysisProps {
  formData: { cvFile: File | null };
  updateFormData: (field: string, value: any) => void;
}

export function CVAnalysis({ formData }: CVAnalysisProps) {
  // Dummy analysis data - in a real app, this would come from the backend
  const analysis = {
    score: 6.5,
    feedback: "Lacks clear metrics and formatting."
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
        <h3 className="text-xl font-semibold">CV Analysis</h3>
        <p className="text-muted-foreground">
          Here's your CV score and feedback
        </p>
      </div>
      <div className="grid gap-4 max-w-md mx-auto">
        {/* Score Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Score</h4>
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
        {/* Feedback */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Feedback</h4>
            <p className="text-muted-foreground mb-2">{analysis.feedback}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 