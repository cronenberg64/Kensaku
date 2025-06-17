import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  file: File | null;
}

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export const FileUploadStep: React.FC<Props> = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return 'Only PDF and DOCX files are allowed';
    }

    if (!ALLOWED_TYPES.includes(file.type) && fileExtension !== '.docx') {
      return 'Invalid file type. Please upload a PDF or DOCX file';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          updateFormData({ file });
          toast.success('File uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    updateFormData({ file: null });
    setUploadProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleNext = () => {
    if (!formData.file) {
      toast.error('Please upload a file before continuing');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">Upload Your Paper</h3>
          <p className="text-slate-400">
            Upload your research paper in PDF or DOCX format (max 10MB)
          </p>
        </div>

        {!formData.file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-cyan-400 bg-cyan-400/10'
                : error
                ? 'border-red-400 bg-red-400/10'
                : 'border-slate-600 hover:border-slate-500'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                error ? 'bg-red-400/20' : 'bg-slate-700'
              }`}>
                {error ? (
                  <AlertCircle className="w-8 h-8 text-red-400" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-300" />
                )}
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">
                  {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
                </p>
                <p className="text-slate-400 text-sm mb-4">or</p>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Browse Files
                </Button>
              </div>
              
              <div className="text-xs text-slate-400">
                <p>Supported formats: PDF, DOCX</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{formData.file.name}</p>
                  <p className="text-slate-400 text-sm">
                    {formatFileSize(formData.file.size)} • {formData.file.type || 'Document'}
                  </p>
                  {isUploading && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-slate-400 hover:text-white hover:bg-slate-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* File Requirements */}
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">File Requirements</h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>File format must be PDF or DOCX</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>Maximum file size is 10MB</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>Ensure your document is properly formatted and readable</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>Include all figures, tables, and references in the document</span>
          </li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        <Button
          onClick={handleNext}
          disabled={!formData.file || isUploading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Continue to Review
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
