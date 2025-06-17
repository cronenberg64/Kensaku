import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Send, CheckCircle, BookOpen } from 'lucide-react';

interface Props {
  message: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = ({ 
  message, 
  description, 
  action,
  icon = <BookOpen className="w-12 h-12 text-slate-400" />
}) => {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3">
          {message}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
          {description}
        </p>
        
        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
