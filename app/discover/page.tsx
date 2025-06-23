'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search,
  TrendingUp,
  Sparkles,
  Filter,
  Users,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Brain,
  Database,
  Globe,
  Zap,
  Target,
  Clock,
  Award,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI-generated trending topics
  const trendingTopics = [
    {
      id: 1,
      title: "Quantum Computing Applications in Cryptography",
      field: "Computer Science",
      trendScore: 95,
      publications: 1247,
      growth: "+45%",
      description: "Exploring post-quantum cryptographic methods and their implementation in secure communication systems",
      keywords: ["Quantum Computing", "Cryptography", "Security", "Algorithms"],
      difficulty: "Advanced",
      timeframe: "12-18 months",
      collaborators: 23,
      region: "Kanto"
    },
    {
      id: 2,
      title: "AI-Enhanced Sustainable Agriculture in Japan",
      field: "Agricultural Science",
      trendScore: 88,
      publications: 892,
      growth: "+67%",
      description: "Leveraging machine learning for precision farming and crop optimization in Japanese agricultural systems",
      keywords: ["AI", "Agriculture", "Sustainability", "IoT"],
      difficulty: "Intermediate",
      timeframe: "8-12 months",
      collaborators: 31,
      region: "Kansai"
    },
    {
      id: 3,
      title: "Neuroplasticity in Aging Japanese Population",
      field: "Neuroscience",
      trendScore: 82,
      publications: 634,
      growth: "+38%",
      description: "Investigating brain adaptability and cognitive enhancement strategies for Japan's aging society",
      keywords: ["Neuroscience", "Aging", "Cognitive Health", "Brain Plasticity"],
      difficulty: "Advanced",
      timeframe: "18-24 months",
      collaborators: 18,
      region: "Tohoku"
    },
    {
      id: 4,
      title: "Renewable Energy Integration in Smart Cities",
      field: "Environmental Engineering",
      trendScore: 91,
      publications: 1156,
      growth: "+52%",
      description: "Optimizing renewable energy distribution and storage in urban environments using IoT and AI",
      keywords: ["Renewable Energy", "Smart Cities", "IoT", "Sustainability"],
      difficulty: "Intermediate",
      timeframe: "10-15 months",
      collaborators: 27,
      region: "Kyushu"
    },
    {
      id: 5,
      title: "Cultural Preservation Through Digital Humanities",
      field: "Digital Humanities",
      trendScore: 76,
      publications: 423,
      growth: "+29%",
      description: "Using AI and digital technologies to preserve and analyze traditional Japanese cultural artifacts",
      keywords: ["Digital Humanities", "Cultural Preservation", "AI", "Heritage"],
      difficulty: "Beginner",
      timeframe: "6-10 months",
      collaborators: 15,
      region: "Kansai"
    },
    {
      id: 6,
      title: "Biomedical Applications of CRISPR in Cancer Research",
      field: "Biomedical Science",
      trendScore: 94,
      publications: 1389,
      growth: "+41%",
      description: "Advanced gene editing techniques for targeted cancer therapy and personalized medicine",
      keywords: ["CRISPR", "Cancer Research", "Gene Editing", "Personalized Medicine"],
      difficulty: "Advanced",
      timeframe: "15-20 months",
      collaborators: 35,
      region: "Kanto"
    }
  ];

  // Mock emerging research areas
  const emergingAreas = [
    {
      title: "Quantum Machine Learning",
      growth: "+156%",
      papers: 234,
      trend: "Explosive"
    },
    {
      title: "Synthetic Biology",
      growth: "+89%",
      papers: 567,
      trend: "Rising"
    },
    {
      title: "Digital Therapeutics",
      growth: "+73%",
      papers: 445,
      trend: "Hot"
    },
    {
      title: "Space Agriculture",
      growth: "+124%",
      papers: 178,
      trend: "Emerging"
    }
  ];

  // Mock personalized recommendations
  const personalizedTopics = [
    {
      id: 1,
      title: "Machine Learning for Natural Language Processing in Japanese",
      matchScore: 96,
      reason: "Based on your interest in AI and linguistics",
      field: "Computer Science",
      collaborators: 12,
      region: "Kanto"
    },
    {
      id: 2,
      title: "Sustainable Urban Planning for Aging Societies",
      matchScore: 89,
      reason: "Matches your urban studies and demographics research",
      field: "Urban Planning",
      collaborators: 8,
      region: "Kansai"
    },
    {
      id: 3,
      title: "Cross-Cultural Communication in Global Business",
      matchScore: 84,
      reason: "Aligns with your international studies background",
      field: "International Studies",
      collaborators: 15,
      region: "Kanto"
    }
  ];

  const handleRefreshRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Explosive': return 'bg-red-500';
      case 'Hot': return 'bg-orange-500';
      case 'Rising': return 'bg-blue-500';
      case 'Emerging': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
            <Button variant="ghost" className="text-blue-600 bg-blue-50">
              Discover
            </Button>
            <Link href="/collaborate">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Collaborate
              </Button>
            </Link>
            <Link href="/publish">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Publish
              </Button>
            </Link>
          </nav>

          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Brain className="w-10 h-10 text-blue-600 mr-3" />
                AI Research Discovery
              </h1>
              <p className="text-xl text-gray-600">
                Explore trending topics and find your next breakthrough research opportunity
              </p>
            </div>
            <Button 
              onClick={handleRefreshRecommendations}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Refresh AI Insights
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search research topics, keywords, or fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Research Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="biomedical">Biomedical Science</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="social-sciences">Social Sciences</SelectItem>
                <SelectItem value="humanities">Humanities</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="kanto">Kanto</SelectItem>
                <SelectItem value="kansai">Kansai</SelectItem>
                <SelectItem value="kyushu">Kyushu</SelectItem>
                <SelectItem value="tohoku">Tohoku</SelectItem>
                <SelectItem value="chubu">Chubu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="trending" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="personalized" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>For You</span>
            </TabsTrigger>
            <TabsTrigger value="emerging" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Emerging</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Database</span>
            </TabsTrigger>
          </TabsList>

          {/* Trending Topics */}
          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Trending Research Topics</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Globe className="w-3 h-3 mr-1" />
                Live Data from 50+ Academic Sources
              </Badge>
            </div>

            <div className="grid gap-6">
              {trendingTopics.map((topic) => (
                <Card key={topic.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                            {topic.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            {topic.field}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <MapPin className="w-3 h-3 mr-1" />
                            {topic.region}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2 leading-relaxed">
                          {topic.description}
                        </CardDescription>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center space-x-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">{topic.growth}</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{topic.trendScore}</div>
                        <div className="text-xs text-gray-500">Trend Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Database className="w-4 h-4" />
                          <span>{topic.publications.toLocaleString()} papers</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{topic.collaborators} researchers</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{topic.timeframe}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          <Star className="w-4 h-4 mr-1" />
                          Start Research
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="w-4 h-4 mr-1" />
                          Find Collaborators
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Personalized Recommendations */}
          <TabsContent value="personalized" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Personalized for You</h2>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Matching
              </Badge>
            </div>

            <div className="grid gap-6">
              {personalizedTopics.map((topic) => (
                <Card key={topic.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-50 to-blue-50 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-purple-600 text-white">
                            {topic.matchScore}% Match
                          </Badge>
                          <Badge variant="outline" className="bg-white/80">
                            {topic.field}
                          </Badge>
                          <Badge variant="outline" className="bg-white/80">
                            <MapPin className="w-3 h-3 mr-1" />
                            {topic.region}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {topic.title}
                        </CardTitle>
                        <CardDescription className="text-purple-700 mt-2 font-medium">
                          {topic.reason}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{topic.matchScore}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{topic.collaborators} interested researchers</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Target className="w-4 h-4 mr-1" />
                          Explore Match
                        </Button>
                        <Button size="sm" variant="outline">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emerging Areas */}
          <TabsContent value="emerging" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Emerging Research Areas</h2>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Zap className="w-3 h-3 mr-1" />
                High Growth Potential
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergingAreas.map((area, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {area.title}
                      </CardTitle>
                      <Badge className={`text-white ${getTrendColor(area.trend)}`}>
                        {area.trend}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{area.growth}</div>
                        <div className="text-xs text-gray-500">Growth Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{area.papers}</div>
                        <div className="text-xs text-gray-500">Recent Papers</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Explore Opportunities
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Database Integration */}
          <TabsContent value="database" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Academic Database Integration</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Database className="w-3 h-3 mr-1" />
                Real-time Data
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>PubMed Integration</CardTitle>
                  <CardDescription>Access to 34M+ biomedical research papers</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">Connect to PubMed</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>arXiv Access</CardTitle>
                  <CardDescription>Latest preprints in physics, math, CS</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">Browse arXiv</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Google Scholar</CardTitle>
                  <CardDescription>Comprehensive academic search engine</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">Search Scholar</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}