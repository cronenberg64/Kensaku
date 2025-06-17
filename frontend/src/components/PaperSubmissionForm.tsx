import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, FileText, Upload, Eye, CheckCircle } from 'lucide-react';
import { PaperMetadataStep } from './PaperMetadataStep';
import { FileUploadStep } from './FileUploadStep';
import { ReviewStep } from './ReviewStep';
import { SuccessStep } from './SuccessStep';
import { useUserGuardContext } from 'app';
import { usePaperStore } from 'utils/paperStore';
import { PaperData } from 'utils/firestore';

interface FormData {
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  file: File | null;
}

const STEPS = [
  { id: 1, title: 'Paper Details', icon: FileText, description: 'Enter your paper metadata' },
  { id: 2, title: 'Upload File', icon: Upload, description: 'Upload your PDF or DOCX' },
  { id: 3, title: 'Review', icon: Eye, description: 'Review your submission' },
  { id: 4, title: 'Complete', icon: CheckCircle, description: 'Submission successful' }
];

export const PaperSubmissionForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    abstract: '',
    authors: [''],
    keywords: [],
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPaperId, setSubmittedPaperId] = useState<string | null>(null);
  
  const { user } = useUserGuardContext();
  const { createPaper, uploadPaperFile } = usePaperStore();

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Create the paper in Firestore
      const paperId = await createPaper(
        {
          title: formData.title,
          abstract: formData.abstract,
          authors: formData.authors.filter(author => author.trim() !== ''),
          keywords: formData.keywords,
          status: 'draft'
        },
        user.uid
      );

      // Upload the file if provided
      if (formData.file) {
        await uploadPaperFile(formData.file, paperId, user.uid);
      }

      setSubmittedPaperId(paperId);
      setCurrentStep(4);
    } catch (error) {
      console.error('Failed to submit paper:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PaperMetadataStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <FileUploadStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
          />
        );
      case 4:
        return (
          <SuccessStep paperId={submittedPaperId} />
        );
      default:
        return null;
    }
  };

  const currentStepData = STEPS[currentStep - 1];
  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Submit Your Paper</h1>
          <p className="text-slate-300 text-lg">Share your research with the academic community</p>
        </div>

        {/* Progress Indicator */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">
                  Step {currentStep} of {STEPS.length}
                </span>
                <span className="text-sm text-slate-400">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center flex-1 ${
                      index < STEPS.length - 1 ? 'border-r border-slate-600' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? 'bg-cyan-500 text-white'
                          : isActive
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-medium ${
                          isActive ? 'text-cyan-400' : 'text-slate-300'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-400 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <currentStepData.icon className="w-6 h-6 text-cyan-400" />
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
