'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  FileText,
  Search,
  Download,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Eye,
  Edit,
  Send,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Filter,
  Plus,
  ArrowRight,
  Sparkles,
  Database,
  BookMarked,
  PenTool,
  Microscope
} from 'lucide-react';

export default function PublishClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('all');

  // Mock publication data
  const myPublications = [
    {
      id: 1,
      title: "Machine Learning Applications in Natural Language Processing for Japanese Text Analysis",
      status: "Published",
      journal: "Journal of AI Research",
      impactFactor: 4.2,
      citations: 23,
      publishDate: "2024-01-15",
      coAuthors: ["Dr. Yuki Yamamoto", "Prof. Kenji Nakamura"],
      field: "Computer Science",
      progress: 100
    },
    {
      id: 2,
      title: "Sustainable Urban Development Strategies for Aging Japanese Cities",
      status: "Under Review",
      journal: "Urban Planning International",
      impactFactor: 3.8,
      citations: 0,
      publishDate: "Pending",
      coAuthors: ["Dr. Maria Santos"],
      field: "Urban Planning",
      progress: 85
    },
    {
      id: 3,
      title: "Cross-Cultural Communication Patterns in Global Business Environments",
      status: "Draft",
      journal: "TBD",
      impactFactor: 0,
      citations: 0,
      publishDate: "In Progress",
      coAuthors: ["Prof. Sarah Kim"],
      field: "International Studies",
      progress: 45
    }
  ];

  // Mock journal recommendations
  const journalRecommendations = [
    {
      id: 1,
      name: "Nature Machine Intelligence",
      impactFactor: 25.8,
      acceptanceRate: "15%",
      avgReviewTime: "3-4 months",
      field: "AI/ML",
      matchScore: 94,
      openAccess: false,
      fee: "$11,390",
      description: "Premier journal for machine intelligence research with global reach"
    },
    {
      id: 2,
      name: "IEEE Transactions on Neural Networks",
      impactFactor: 14.2,
      acceptanceRate: "22%",
      avgReviewTime: "4-6 months",
      field: "Neural Networks",
      matchScore: 89,
      openAccess: false,
      fee: "$1,750",
      description: "Leading publication for neural network and learning systems research"
    },
    {
      id: 3,
      name: "Journal of Machine Learning Research",
      impactFactor: 6.0,
      acceptanceRate: "25%",
      avgReviewTime: "2-3 months",
      field: "Machine Learning",
      matchScore: 85,
      openAccess: true,
      fee: "Free",
      description: "Open access journal with rigorous peer review process"
    }
  ];

  // Mock templates
  const templates = [
    {
      id: 1,
      name: "IEEE Conference Paper Template",
      type: "Conference Paper",
      field: "Computer Science",
      downloads: 1247,
      rating: 4.8,
      description: "Standard IEEE format for conference submissions"
    },
    {
      id: 2,
      name: "Nature Research Article Template",
      type: "Research Article",
      field: "Life Sciences",
      downloads: 892,
      rating: 4.9,
      description: "Nature journal format for research articles"
    },
    {
      id: 3,
      name: "APA Research Proposal Template",
      type: "Research Proposal",
      field: "Social Sciences",
      downloads: 634,
      rating: 4.7,
      description: "APA style research proposal template"
    },
    {
      id: 4,
      name: "Thesis Dissertation Template",
      type: "Thesis",
      field: "General",
      downloads: 1156,
      rating: 4.6,
      description: "Comprehensive thesis template for graduate students"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700 border-green-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Draft': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published': return <CheckCircle className="w-4 h-4" />;
      case 'Under Review': return <Clock className="w-4 h-4" />;
      case 'Draft': return <Edit className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kensaku</h1>
              <p className="text-xs text-gray-500">研作</p>
            </div>
          </Link>
        </div>
      </header>
      {/* ...rest of your JSX from the original PublishPage... */}
    </div>
  );
} 