import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Upload, FileText, Users, Zap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "app";

export default function App() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-cyan-400 to-purple-500 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Kensaku
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const searchQuery = formData.get('search') as string;
                  if (searchQuery.trim()) {
                    navigate(`/Search?q=${encodeURIComponent(searchQuery.trim())}`);
                  } else {
                    navigate('/Search');
                  }
                }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="search"
                    placeholder="Search papers, authors, topics..."
                    className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/SubmitPaper')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium"
              >
                <Upload className="mr-2 h-4 w-4" />
                Submit Paper
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-700 text-slate-200">JS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" forceMount>
                  {user ? (
                    <>
                      <DropdownMenuItem 
                        onClick={() => navigate('/Dashboard')}
                        className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                      >
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => navigate('/Dashboard')}
                        className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                      >
                        My Papers
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-200 focus:bg-slate-700">
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem 
                        onClick={() => navigate('/Logout')}
                        className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                      >
                        Sign out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem 
                        onClick={() => navigate('/Login')}
                        className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                      >
                        Sign In
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => navigate('/Login')}
                        className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                      >
                        Create Account
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-100">Simplify Academic</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Publishing
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
            Transform your research into published work with our streamlined platform. 
            Just fill in a form, upload your paper, and get published. 
            <span className="text-cyan-400 font-medium">It's that simple.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/SubmitPaper')}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium px-8 py-3 text-lg"
            >
              <Upload className="mr-2 h-5 w-5" />
              Submit Your Paper
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/Search')}
              className="border-slate-600 text-slate-200 hover:bg-slate-800 px-8 py-3 text-lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Papers
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-cyan-400/20 to-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Simple Submission</h3>
              <p className="text-slate-400 leading-relaxed">
                Upload your research with our intuitive multi-step form. 
                No complex workflows or confusing interfaces.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Collaborative Platform</h3>
              <p className="text-slate-400 leading-relaxed">
                Connect with fellow researchers, discover new papers, 
                and build your academic network.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-pink-400/20 to-cyan-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Fast Publishing</h3>
              <p className="text-slate-400 leading-relaxed">
                Get your research published quickly with our streamlined 
                review and publication process.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">10,000+</div>
              <div className="text-slate-300">Papers Published</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">5,000+</div>
              <div className="text-slate-300">Active Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">95%</div>
              <div className="text-slate-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-cyan-400 to-purple-500 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-200">Kensaku</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 Kensaku. Empowering academic excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
