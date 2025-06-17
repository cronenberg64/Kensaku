import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, ChevronRight } from 'lucide-react';
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
}

export const PaperMetadataStep: React.FC<Props> = ({ formData, updateFormData, onNext }) => {
  const [newKeyword, setNewKeyword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addAuthor = () => {
    updateFormData({ authors: [...formData.authors, ''] });
  };

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      const newAuthors = formData.authors.filter((_, i) => i !== index);
      updateFormData({ authors: newAuthors });
    }
  };

  const updateAuthor = (index: number, value: string) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    updateFormData({ authors: newAuthors });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      updateFormData({ keywords: [...formData.keywords, newKeyword.trim()] });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    const newKeywords = formData.keywords.filter(k => k !== keyword);
    updateFormData({ keywords: newKeywords });
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title should be at least 10 characters';
    }

    if (!formData.abstract.trim()) {
      newErrors.abstract = 'Abstract is required';
    } else if (formData.abstract.length < 100) {
      newErrors.abstract = 'Abstract should be at least 100 characters';
    }

    const validAuthors = formData.authors.filter(author => author.trim() !== '');
    if (validAuthors.length === 0) {
      newErrors.authors = 'At least one author is required';
    }

    if (formData.keywords.length === 0) {
      newErrors.keywords = 'At least one keyword is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      toast.error('Please fix the validation errors before continuing');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-slate-200 font-medium">
          Paper Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="Enter your paper title..."
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title}</p>
        )}
        <p className="text-slate-400 text-sm">
          Choose a clear, descriptive title that accurately represents your research
        </p>
      </div>

      {/* Abstract */}
      <div className="space-y-2">
        <Label htmlFor="abstract" className="text-slate-200 font-medium">
          Abstract *
        </Label>
        <Textarea
          id="abstract"
          value={formData.abstract}
          onChange={(e) => updateFormData({ abstract: e.target.value })}
          placeholder="Provide a concise summary of your research, methodology, and key findings..."
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-32"
        />
        <div className="flex justify-between items-center">
          {errors.abstract ? (
            <p className="text-red-400 text-sm">{errors.abstract}</p>
          ) : (
            <p className="text-slate-400 text-sm">
              Summarize your research objectives, methods, results, and conclusions
            </p>
          )}
          <span className="text-slate-400 text-sm">
            {formData.abstract.length} characters
          </span>
        </div>
      </div>

      {/* Authors */}
      <div className="space-y-2">
        <Label className="text-slate-200 font-medium">
          Authors *
        </Label>
        <div className="space-y-3">
          {formData.authors.map((author, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
                placeholder={index === 0 ? "First author (you)" : "Additional author"}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
              {formData.authors.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeAuthor(index)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addAuthor}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Author
          </Button>
        </div>
        {errors.authors && (
          <p className="text-red-400 text-sm">{errors.authors}</p>
        )}
        <p className="text-slate-400 text-sm">
          List all contributing authors. The first author should be you.
        </p>
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-slate-200 font-medium">
          Keywords *
        </Label>
        <div className="flex gap-2">
          <Input
            id="keywords"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={handleKeywordKeyPress}
            placeholder="Add a keyword and press Enter..."
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
          <Button
            type="button"
            onClick={addKeyword}
            disabled={!newKeyword.trim()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Add
          </Button>
        </div>
        
        {formData.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="bg-slate-700 text-slate-200 hover:bg-slate-600 cursor-pointer"
                onClick={() => removeKeyword(keyword)}
              >
                {keyword}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
        
        {errors.keywords && (
          <p className="text-red-400 text-sm">{errors.keywords}</p>
        )}
        <p className="text-slate-400 text-sm">
          Add relevant keywords to help others discover your research
        </p>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleNext}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Continue to File Upload
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
