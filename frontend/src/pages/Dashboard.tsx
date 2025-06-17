import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Send, 
  CheckCircle, 
  Plus, 
  Search, 
  Settings, 
  User,
  BookOpen,
  PenTool,
  Eye,
  Edit3,
  Trash2,
  Upload
} from 'lucide-react';
import { useUserGuardContext } from 'app';
import { usePaperStore } from 'utils/paperStore';
import { PaperData } from 'utils/firestore';
import { useNavigate } from 'react-router-dom';
import { PaperCard } from 'components/PaperCard';
import { EmptyState } from 'components/EmptyState';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('drafts');
  const { user } = useUserGuardContext();
  const navigate = useNavigate();
  const { 
    papers, 
    isLoading, 
    error, 
    subscribeToUserPapers, 
    getDraftPapers, 
    getSubmittedPapers, 
    getPublishedPapers 
  } = usePaperStore();

  // Subscribe to real-time updates
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToUserPapers(user.uid);
      return unsubscribe;
    }
  }, [user, subscribeToUserPapers]);

  const draftPapers = getDraftPapers();
  const submittedPapers = getSubmittedPapers();
  const publishedPapers = getPublishedPapers();

  const getTabCount = (status: string) => {
    switch (status) {
      case 'drafts': return draftPapers.length;
      case 'submitted': return submittedPapers.length;
      case 'published': return publishedPapers.length;
      default: return 0;
    }
  };

  const renderPapers = (papers: PaperData[], emptyMessage: string, emptyDescription: string) => {
    if (isLoading) {
      return (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-700/30 h-32 rounded-lg"></div>
            </div>
          ))}
        </div>
      );
    }

    if (papers.length === 0) {
      return (
        <EmptyState
          message={emptyMessage}
          description={emptyDescription}
          action={
            activeTab === 'drafts' ? (
              <Button 
                onClick={() => navigate('/SubmitPaper')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Your First Paper
              </Button>
            ) : undefined
          }
        />
      );
    }

    return (
      <div className="grid gap-4">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 min-h-screen">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">
                  {user?.displayName || user?.email?.split('@')[0] || 'Researcher'}
                </h3>
                <p className="text-slate-400 text-sm">Academic Author</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-4">
                Research Management
              </div>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white"
                onClick={() => setActiveTab('drafts')}
              >
                <PenTool className="w-4 h-4 mr-3" />
                My Papers
                <Badge variant="secondary" className="ml-auto bg-slate-600 text-slate-200">
                  {papers.length}
                </Badge>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white"
                onClick={() => navigate('/Search')}
              >
                <Search className="w-4 h-4 mr-3" />
                Search Papers
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white"
                onClick={() => navigate('/SubmitPaper')}
              >
                <Plus className="w-4 h-4 mr-3" />
                Submit New Paper
              </Button>
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h4 className="text-white font-medium mb-3">Publication Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Drafts</span>
                  <span className="text-white font-medium">{draftPapers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Under Review</span>
                  <span className="text-white font-medium">{submittedPapers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Published</span>
                  <span className="text-cyan-400 font-medium">{publishedPapers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Research Dashboard</h1>
            <p className="text-slate-300">Manage your academic papers and track publication progress</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-slate-800/50 border border-slate-700">
              <TabsTrigger 
                value="drafts" 
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Drafts
                {draftPapers.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-slate-600 text-slate-200">
                    {draftPapers.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="submitted" 
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Under Review
                {submittedPapers.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-orange-600/20 text-orange-400">
                    {submittedPapers.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="published" 
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Published
                {publishedPapers.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-green-600/20 text-green-400">
                    {publishedPapers.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="drafts" className="space-y-6">
              {renderPapers(
                draftPapers,
                "No drafts yet",
                "Start your research journey by submitting your first paper. Your drafts will appear here for editing and submission."
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-6">
              {renderPapers(
                submittedPapers,
                "No papers under review",
                "Papers submitted for peer review will appear here. You can track their progress and communicate with reviewers."
              )}
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              {renderPapers(
                publishedPapers,
                "No published papers yet",
                "Your published research will be showcased here. These papers will be discoverable through our search platform."
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
