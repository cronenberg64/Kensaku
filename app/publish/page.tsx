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

export default function PublishPage() {
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
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Discover
              </Button>
            </Link>
            <Link href="/collaborate">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Collaborate
              </Button>
            </Link>
            <Button variant="ghost" className="text-blue-600 bg-blue-50">
              Publish
            </Button>
          </nav>

          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            New Publication
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="w-10 h-10 text-blue-600 mr-3" />
            Publishing Support Center
          </h1>
          <p className="text-xl text-gray-600">
            Complete toolkit for research publication - from templates to journal submission
          </p>
        </div>

        <Tabs defaultValue="publications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="publications" className="flex items-center space-x-2">
              <BookMarked className="w-4 h-4" />
              <span>My Work</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <PenTool className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="journals" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Journals</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Microscope className="w-4 h-4" />
              <span>Tools</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* My Publications */}
          <TabsContent value="publications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Publications</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Start New Paper
              </Button>
            </div>

            <div className="grid gap-6">
              {myPublications.map((publication) => (
                <Card key={publication.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getStatusColor(publication.status)}>
                            {getStatusIcon(publication.status)}
                            <span className="ml-1">{publication.status}</span>
                          </Badge>
                          <Badge variant="outline">{publication.field}</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          {publication.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{publication.journal}</span>
                          </span>
                          {publication.impactFactor > 0 && (
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4" />
                              <span>IF: {publication.impactFactor}</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{publication.coAuthors.length + 1} authors</span>
                          </span>
                          {publication.citations > 0 && (
                            <span className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{publication.citations} citations</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm text-gray-600">Co-authors:</span>
                          {publication.coAuthors.map((author, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {author}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">Progress</div>
                        <div className="w-20">
                          <Progress value={publication.progress} className="h-2" />
                          <div className="text-xs text-center mt-1">{publication.progress}%</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        {publication.status === 'Draft' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Send className="w-4 h-4 mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {publication.publishDate !== 'Pending' && publication.publishDate !== 'In Progress' 
                          ? `Published: ${publication.publishDate}`
                          : publication.publishDate
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Publication Templates</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="life-sciences">Life Sciences</SelectItem>
                    <SelectItem value="social-sciences">Social Sciences</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {template.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{template.type}</Badge>
                          <Badge variant="secondary">{template.field}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journal Recommendations */}
          <TabsContent value="journals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">AI-Recommended Journals</h2>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Sparkles className="w-3 h-3 mr-1" />
                Personalized for Your Research
              </Badge>
            </div>

            <div className="grid gap-6">
              {journalRecommendations.map((journal) => (
                <Card key={journal.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-purple-600 text-white">
                            {journal.matchScore}% Match
                          </Badge>
                          <Badge variant="outline">{journal.field}</Badge>
                          {journal.openAccess && (
                            <Badge className="bg-green-600 text-white">Open Access</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {journal.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {journal.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{journal.impactFactor}</div>
                        <div className="text-xs text-gray-500">Impact Factor</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{journal.acceptanceRate}</div>
                        <div className="text-xs text-gray-500">Acceptance Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{journal.avgReviewTime}</div>
                        <div className="text-xs text-gray-500">Review Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{journal.fee}</div>
                        <div className="text-xs text-gray-500">Publication Fee</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Target className="w-4 h-4 mr-1" />
                          Submit Here
                        </Button>
                        <Button size="sm" variant="outline">
                          <Globe className="w-4 h-4 mr-1" />
                          Visit Journal
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        View Guidelines
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Publishing Tools */}
          <TabsContent value="tools" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Publishing Tools</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Plagiarism Checker</CardTitle>
                  <CardDescription>Advanced AI-powered plagiarism detection</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Check Document
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Citation Manager</CardTitle>
                  <CardDescription>Organize and format your references</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <Database className="w-4 h-4 mr-2" />
                    Manage Citations
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PenTool className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Writing Assistant</CardTitle>
                  <CardDescription>AI-powered writing and grammar checker</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Improve Writing
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Journal Finder</CardTitle>
                  <CardDescription>Find the perfect journal for your research</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
                    <Search className="w-4 h-4 mr-2" />
                    Find Journals
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Impact Predictor</CardTitle>
                  <CardDescription>Predict potential impact and citations</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyze Impact
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Peer Review</CardTitle>
                  <CardDescription>Get feedback from expert reviewers</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Request Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Publication Analytics</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Publications</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Citations</p>
                      <p className="text-3xl font-bold">247</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">H-Index</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Avg Impact Factor</p>
                      <p className="text-3xl font-bold">3.2</p>
                    </div>
                    <Star className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
              <p className="text-gray-600">Advanced publication metrics and insights will be available here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}