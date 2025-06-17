import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, FileText, Users, Hash, Upload, Loader2 } from 'lucide-react';

interface FormData {
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  file: File | null;
}

interface Props {
  formData: FormData;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export const ReviewStep: React.FC<Props> = ({ formData, onSubmit, onPrevious, isSubmitting }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validAuthors = formData.authors.filter(author => author.trim() !== '');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-2">Review Your Submission</h3>
        <p className="text-slate-400">
          Please review all the information below before submitting your paper
        </p>
      </div>

      <div className="space-y-4">
        {/* Paper Details */}
        <Card className="bg-slate-700/30 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Paper Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-1">Title</h4>
              <p className="text-white">{formData.title}</p>
            </div>
            
            <Separator className="bg-slate-600" />
            
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Abstract</h4>
              <div className="bg-slate-800/50 p-3 rounded border border-slate-600">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {formData.abstract}
                </p>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                {formData.abstract.length} characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Authors */}
        <Card className="bg-slate-700/30 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Authors ({validAuthors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validAuthors.map((author, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-white">{author}</span>
                  {index === 0 && (
                    <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30">
                      First Author
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card className="bg-slate-700/30 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              Keywords ({formData.keywords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="bg-slate-600 text-slate-200"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File */}
        {formData.file && (
          <Card className="bg-slate-700/30 border-slate-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                Uploaded File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{formData.file.name}</p>
                  <p className="text-slate-400 text-sm">
                    {formatFileSize(formData.file.size)} • {formData.file.type || 'Document'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Submission Notice */}
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">What happens next?</h4>
        <ul className="space-y-1 text-sm text-blue-200">
          <li>• Your paper will be saved as a draft in your dashboard</li>
          <li>• You can edit or update your submission at any time</li>
          <li>• The file will be securely stored and associated with your account</li>
          <li>• You'll be able to submit your paper for review when ready</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={isSubmitting}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-cyan-600 hover:bg-cyan-700 text-white min-w-32"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Paper'
          )}
        </Button>
      </div>
    </div>
  );
};
