'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Users, 
  Lightbulb, 
  MessageCircle, 
  Search,
  Plus,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Bell,
  Settings,
  User,
  LogOut,
  Globe,
  Filter,
  Sparkles
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const suggestedTopics = [
    {
      id: 1,
      title: "AI-Enhanced Learning Systems in Japanese Universities",
      field: "Educational Technology",
      trend: "Rising",
      collaborators: 12,
      description: "Exploring the integration of artificial intelligence in traditional Japanese pedagogical methods"
    },
    {
      id: 2,
      title: "Sustainable Urban Development in Tokyo Metropolitan Area",
      field: "Urban Planning",
      trend: "Hot",
      collaborators: 8,
      description: "Research on green infrastructure and sustainable city planning strategies"
    },
    {
      id: 3,
      title: "Cross-Cultural Communication in Global Business",
      field: "International Studies",
      trend: "Emerging",
      collaborators: 15,
      description: "Analyzing communication patterns between Japanese and international teams"
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: "Machine Learning Applications in Healthcare",
      members: 4,
      progress: 75,
      deadline: "March 15, 2025",
      status: "On Track"
    },
    {
      id: 2,
      title: "Climate Change Impact on Agriculture",
      members: 6,
      progress: 45,
      deadline: "April 20, 2025",
      status: "Behind"
    }
  ];

  const recentActivity = [
    {
      type: "collaboration",
      user: "Dr. Yuki Yamamoto",
      action: "invited you to join",
      project: "Neural Networks Research",
      time: "2 hours ago"
    },
    {
      type: "message",
      user: "Kenji Nakamura",
      action: "sent a message in",
      project: "Sustainable Energy Project",
      time: "4 hours ago"
    },
    {
      type: "update",
      user: "Prof. Maria Santos",
      action: "updated progress on",
      project: "Cross-Cultural Studies",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kensaku</h1>
                <p className="text-xs text-gray-500">研作</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-blue-600 bg-blue-50">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Projects
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Researchers
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Publications
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects, researchers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 h-10 border-gray-200"
              />
            </div>
            
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
                <AvatarFallback>HT</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Hiroshi Tanaka</p>
                <p className="text-xs text-gray-500">PhD Candidate</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Hiroshi! 👋
          </h1>
          <p className="text-gray-600">
            Ready to discover new research opportunities and collaborate with brilliant minds?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Collaborations</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <MessageCircle className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Publications</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <BookOpen className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Impact Score</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Suggested Topics */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span>AI-Recommended Topics</span>
                  </CardTitle>
                  <CardDescription>
                    Personalized research suggestions based on your interests
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedTopics.map((topic) => (
                  <div key={topic.id} className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <Badge variant={topic.trend === 'Hot' ? 'destructive' : topic.trend === 'Rising' ? 'default' : 'secondary'}>
                        {topic.trend}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{topic.field}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{topic.collaborators} interested</span>
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  View More Suggestions
                </Button>
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Active Projects</span>
                </CardTitle>
                <CardDescription>
                  Track progress on your ongoing research collaborations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{project.members} members</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due {project.deadline}</span>
                          </span>
                        </div>
                      </div>
                      <Badge variant={project.status === 'On Track' ? 'default' : 'destructive'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${project.progress >= 70 ? 'bg-green-500' : project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(project.members, 4))].map((_, i) => (
                          <Avatar key={i} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={`https://images.pexels.com/photos/${2379004 + i}/pexels-photo-${2379004 + i}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop`} />
                            <AvatarFallback>M{i + 1}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members > 4 && (
                          <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs text-gray-600">
                            +{project.members - 4}
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Research
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Find Collaborators
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Publications
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://images.pexels.com/photos/${2379004 + index}/pexels-photo-${2379004 + index}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop`} />
                      <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium text-blue-600">{activity.project}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Trending Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#AI Research</span>
                    <Badge variant="secondary" className="text-xs">Hot</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#Sustainability</span>
                    <Badge variant="secondary" className="text-xs">Rising</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#Biotech</span>
                    <Badge variant="secondary" className="text-xs">New</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#Quantum Computing</span>
                    <Badge variant="secondary" className="text-xs">Emerging</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}