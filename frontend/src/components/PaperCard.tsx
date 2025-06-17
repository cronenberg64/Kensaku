import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Hash, 
  Eye, 
  Edit3, 
  Trash2, 
  Send, 
  Download,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { PaperData } from 'utils/firestore';
import { usePaperStore } from 'utils/paperStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props {
  paper: PaperData;
}

export const PaperCard: React.FC<Props> = ({ paper }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updatePaper, deletePaper } = usePaperStore();
  const navigate = useNavigate();

  const getStatusColor = (status: PaperData['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-600 text-slate-200';
      case 'submitted':
        return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      case 'published':
        return 'bg-green-600/20 text-green-400 border-green-600/30';
      default:
        return 'bg-slate-600 text-slate-200';
    }
  };

  const getStatusIcon = (status: PaperData['status']) => {
    switch (status) {
      case 'draft':
        return <Edit3 className="w-3 h-3" />;
      case 'submitted':
        return <Send className="w-3 h-3" />;
      case 'published':
        return <Eye className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown date';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (newStatus: PaperData['status']) => {
    if (!paper.id) return;
    
    setIsLoading(true);
    try {
      await updatePaper(paper.id, { status: newStatus });
      toast.success(`Paper moved to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update paper status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!paper.id) return;
    
    if (confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await deletePaper(paper.id);
        toast.success('Paper deleted successfully');
      } catch (error) {
        toast.error('Failed to delete paper');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = () => {
    // TODO: Navigate to edit form
    toast.info('Edit functionality coming soon');
  };

  const handleView = () => {
    // TODO: Navigate to paper view
    toast.info('View functionality coming soon');
  };

  const handleDownload = () => {
    if (paper.fileUrl) {
      window.open(paper.fileUrl, '_blank');
    } else {
      toast.error('No file available for download');
    }
  };

  const getNextStatus = () => {
    switch (paper.status) {
      case 'draft':
        return 'submitted';
      case 'submitted':
        return 'published';
      default:
        return null;
    }
  };

  const getNextStatusLabel = () => {
    switch (paper.status) {
      case 'draft':
        return 'Submit for Review';
      case 'submitted':
        return 'Mark as Published';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();
  const nextStatusLabel = getNextStatusLabel();

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(paper.status)} border`}
              >
                {getStatusIcon(paper.status)}
                <span className="ml-1 capitalize">{paper.status}</span>
              </Badge>
              {paper.fileUrl && (
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  <FileText className="w-3 h-3 mr-1" />
                  {paper.fileType?.toUpperCase() || 'FILE'}
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              {paper.title}
            </h3>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-white hover:bg-slate-700"
                disabled={isLoading}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              <DropdownMenuItem 
                onClick={handleView}
                className="text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleEdit}
                className="text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Paper
              </DropdownMenuItem>
              {paper.fileUrl && (
                <DropdownMenuItem 
                  onClick={handleDownload}
                  className="text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Paper
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Abstract */}
        <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
          {paper.abstract}
        </p>
        
        {/* Metadata */}
        <div className="space-y-2">
          {/* Authors */}
          <div className="flex items-center text-sm text-slate-400">
            <Users className="w-4 h-4 mr-2" />
            <span>{paper.authors.join(', ')}</span>
          </div>
          
          {/* Date */}
          <div className="flex items-center text-sm text-slate-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {paper.status === 'published' && paper.publishedAt
                ? `Published ${formatDate(paper.publishedAt)}`
                : `Created ${formatDate(paper.createdAt)}`
              }
            </span>
          </div>
          
          {/* Keywords */}
          {paper.keywords.length > 0 && (
            <div className="flex items-start text-sm text-slate-400">
              <Hash className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {paper.keywords.slice(0, 3).map((keyword) => (
                  <Badge 
                    key={keyword} 
                    variant="outline" 
                    className="border-slate-600 text-slate-400 text-xs"
                  >
                    {keyword}
                  </Badge>
                ))}
                {paper.keywords.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="border-slate-600 text-slate-400 text-xs"
                  >
                    +{paper.keywords.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          {nextStatus && nextStatusLabel && (
            <Button
              size="sm"
              onClick={() => handleStatusChange(nextStatus)}
              disabled={isLoading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {nextStatus === 'submitted' ? (
                <Send className="w-4 h-4 mr-1" />
              ) : (
                <Eye className="w-4 h-4 mr-1" />
              )}
              {nextStatusLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
