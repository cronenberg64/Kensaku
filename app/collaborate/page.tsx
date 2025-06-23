'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Search,
  Users,
  MapPin,
  Star,
  MessageCircle,
  Video,
  Calendar,
  Award,
  GraduationCap,
  Building,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  Clock,
  UserPlus,
  Filter,
  Zap,
  Target,
  Heart,
  Send,
  ArrowRight
} from 'lucide-react';

export default function CollaboratePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedField, setSelectedField] = useState('all');

  // Mock researcher data
  const researchers = [
    {
      id: 1,
      name: "Dr. Yuki Yamamoto",
      role: "Associate Professor",
      university: "University of Tokyo",
      department: "Computer Science",
      region: "Kanto",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
      rating: 4.9,
      collaborations: 23,
      publications: 47,
      specialties: ["Machine Learning", "Natural Language Processing", "AI Ethics"],
      currentProjects: 3,
      availability: "Available",
      matchScore: 95,
      bio: "Passionate about developing ethical AI systems that benefit society. Looking for collaborators in ML and NLP research.",
      languages: ["Japanese", "English", "Mandarin"],
      responseTime: "< 2 hours"
    },
    {
      id: 2,
      name: "Prof. Kenji Nakamura",
      role: "Professor",
      university: "Kyoto University",
      department: "Biomedical Engineering",
      region: "Kansai",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
      rating: 4.8,
      collaborations: 31,
      publications: 89,
      specialties: ["Biomedical Devices", "Neural Interfaces", "Rehabilitation Technology"],
      currentProjects: 5,
      availability: "Busy",
      matchScore: 87,
      bio: "Leading research in neural interfaces and rehabilitation technology. Open to interdisciplinary collaborations.",
      languages: ["Japanese", "English"],
      responseTime: "< 1 day"
    },
    {
      id: 3,
      name: "Dr. Maria Santos",
      role: "Postdoctoral Researcher",
      university: "Osaka University",
      department: "Environmental Science",
      region: "Kansai",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
      rating: 4.7,
      collaborations: 15,
      publications: 28,
      specialties: ["Climate Change", "Sustainable Energy", "Environmental Policy"],
      currentProjects: 2,
      availability: "Available",
      matchScore: 82,
      bio: "International researcher focused on climate solutions. Seeking collaborations in sustainability and policy research.",
      languages: ["English", "Spanish", "Japanese"],
      responseTime: "< 4 hours"
    },
    {
      id: 4,
      name: "Hiroshi Tanaka",
      role: "PhD Candidate",
      university: "Tokyo Institute of Technology",
      department: "Materials Science",
      region: "Kanto",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
      rating: 4.6,
      collaborations: 8,
      publications: 12,
      specialties: ["Nanomaterials", "Quantum Dots", "Solar Cells"],
      currentProjects: 1,
      availability: "Available",
      matchScore: 78,
      bio: "PhD student working on next-generation solar cell materials. Looking for interdisciplinary research opportunities.",
      languages: ["Japanese", "English"],
      responseTime: "< 6 hours"
    }
  ];

  // Mock collaboration requests
  const collaborationRequests = [
    {
      id: 1,
      from: "Dr. Sarah Kim",
      university: "Seoul National University",
      project: "Cross-Cultural AI Ethics Study",
      message: "I'd love to collaborate on AI ethics research with a Japanese perspective. Your work on cultural considerations in AI is fascinating.",
      timestamp: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      from: "Prof. Chen Wei",
      university: "Tsinghua University",
      project: "Sustainable Urban Development",
      message: "Your research on smart cities aligns perfectly with our sustainability project. Would you be interested in a joint publication?",
      timestamp: "1 day ago",
      status: "pending"
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Unavailable': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
            <Button variant="ghost" className="text-blue-600 bg-blue-50">
              Collaborate
            </Button>
            <Link href="/publish">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Publish
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="relative">
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="w-10 h-10 text-blue-600 mr-3" />
            Research Collaboration Hub
          </h1>
          <p className="text-xl text-gray-600">
            Connect with researchers, join projects, and build meaningful academic partnerships
          </p>
        </div>

        <Tabs defaultValue="discover" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="discover" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Discover</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Requests</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Discover Researchers */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search researchers by name, expertise, or university..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
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
                </SelectContent>
              </Select>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Academic Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="associate">Associate Professor</SelectItem>
                  <SelectItem value="assistant">Assistant Professor</SelectItem>
                  <SelectItem value="postdoc">Postdoc</SelectItem>
                  <SelectItem value="phd">PhD Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Researcher Cards */}
            <div className="grid gap-6">
              {researchers.map((researcher) => (
                <Card key={researcher.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={researcher.avatar} />
                            <AvatarFallback>{researcher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {researcher.verified && (
                            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">{researcher.name}</h3>
                            <Badge className="bg-blue-600 text-white">
                              {researcher.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 mb-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>{researcher.role}</span>
                            <span>•</span>
                            <Building className="w-4 h-4" />
                            <span>{researcher.university}</span>
                            <span>•</span>
                            <MapPin className="w-4 h-4" />
                            <span>{researcher.region}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{researcher.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {researcher.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getAvailabilityColor(researcher.availability)}>
                          {researcher.availability}
                        </Badge>
                        <div className="mt-2 text-sm text-gray-500">
                          Responds {researcher.responseTime}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{researcher.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{researcher.collaborations} collaborations</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{researcher.publications} publications</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{researcher.currentProjects} active projects</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <Send className="w-4 h-4 mr-1" />
                              Send Request
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Send Collaboration Request</DialogTitle>
                              <DialogDescription>
                                Send a personalized message to {researcher.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Subject</label>
                                <Input placeholder="Research collaboration opportunity" />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Message</label>
                                <textarea 
                                  className="w-full p-3 border rounded-lg resize-none h-24"
                                  placeholder="Hi! I'm interested in collaborating on..."
                                />
                              </div>
                              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                                Send Request
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4 mr-1" />
                          Video Call
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        View Profile
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Collaboration Requests */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Collaboration Requests</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {collaborationRequests.length} Pending
              </Badge>
            </div>

            <div className="grid gap-4">
              {collaborationRequests.map((request) => (
                <Card key={request.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{request.project}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-1">
                          <span>From {request.from}</span>
                          <span>•</span>
                          <span>{request.university}</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{request.timestamp}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{request.message}</p>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Projects */}
          <TabsContent value="projects" className="space-y-6">
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Projects</h3>
              <p className="text-gray-600 mb-4">Start collaborating to see your projects here</p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Find Collaborators
              </Button>
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-6">
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages</h3>
              <p className="text-gray-600 mb-4">Your conversations will appear here</p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Send className="w-4 h-4 mr-2" />
                Start Conversation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}