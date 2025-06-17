import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, FileText, Eye, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  paperId: string | null;
}

export const SuccessStep: React.FC<Props> = ({ paperId }) => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/Dashboard');
  };

  const handleSubmitAnother = () => {
    window.location.reload(); // Simple way to reset the form
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Paper Submitted Successfully!</h3>
        <p className="text-slate-300 text-lg">
          Your research paper has been saved to your dashboard as a draft.
        </p>
        {paperId && (
          <p className="text-slate-400 text-sm mt-2">
            Paper ID: <span className="font-mono">{paperId}</span>
          </p>
        )}
      </div>

      {/* Next Steps */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">Review and Edit</h4>
                <p className="text-slate-400 text-sm">
                  You can review, edit, or update your paper anytime from your dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">Submit for Review</h4>
                <p className="text-slate-400 text-sm">
                  When you're ready, you can submit your paper for peer review and publication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Share2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-medium">Share Your Research</h4>
                <p className="text-slate-400 text-sm">
                  Once published, your paper will be discoverable through our search platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
        <Button
          onClick={handleGoToDashboard}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={handleSubmitAnother}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          Submit Another Paper
        </Button>
      </div>

      {/* Additional Information */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-left max-w-2xl mx-auto">
        <h4 className="text-white font-medium mb-2">What's Next?</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>• Your paper is now safely stored in your account</li>
          <li>• You can access it anytime from the "Drafts" section of your dashboard</li>
          <li>• Edit the metadata or upload a new version whenever needed</li>
          <li>• When ready, use the submission workflow to send for peer review</li>
          <li>• Track the status of your submissions in real-time</li>
        </ul>
      </div>
    </div>
  );
};
