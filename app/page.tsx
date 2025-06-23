'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Star,
  Search,
  MessageCircle,
  FileText,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'ja'>('en');

  const content = {
    en: {
      hero: {
        title: "Kensaku",
        subtitle: "研作 - Academic Research Collaboration",
        description: "Connect. Collaborate. Create groundbreaking research.",
        tagline: "The premier platform for Japanese university research collaboration",
        cta: "Start Your Research Journey",
        login: "Sign In"
      },
      features: {
        title: "Revolutionize Your Research Experience",
        subtitle: "Everything you need to excel in academic collaboration",
        items: [
          {
            icon: Lightbulb,
            title: "AI-Powered Topic Discovery",
            description: "Get personalized research topic suggestions based on trending areas and your academic interests"
          },
          {
            icon: Users,
            title: "Smart Researcher Matching",
            description: "Connect with like-minded researchers through our advanced matching algorithms"
          },
          {
            icon: FileText,
            title: "Publication Support",
            description: "Comprehensive guidance from research proposal to journal submission"
          },
          {
            icon: MessageCircle,
            title: "Integrated Communication",
            description: "Real-time messaging and video calls for seamless team collaboration"
          }
        ]
      },
      stats: {
        title: "Join Thousands of Researchers",
        items: [
          { number: "2,500+", label: "Active Researchers" },
          { number: "850+", label: "Research Projects" },
          { number: "320+", label: "Published Papers" },
          { number: "45+", label: "Universities" }
        ]
      },
      process: {
        title: "Your Research Journey, Simplified",
        steps: [
          {
            step: "01",
            title: "Discover Topics",
            description: "Get AI-powered research topic suggestions tailored to your interests and current trends"
          },
          {
            step: "02", 
            title: "Find Collaborators",
            description: "Connect with researchers who complement your skills and share your passion"
          },
          {
            step: "03",
            title: "Collaborate & Create",
            description: "Work together using our integrated tools to produce outstanding research"
          },
          {
            step: "04",
            title: "Publish & Share",
            description: "Get support through the publication process and share your discoveries"
          }
        ]
      }
    },
    ja: {
      hero: {
        title: "Kensaku",
        subtitle: "研作 - 学術研究コラボレーション",
        description: "つながり、協力し、画期的な研究を創造する。",
        tagline: "日本の大学研究協力のための最高のプラットフォーム",
        cta: "研究の旅を始める",
        login: "サインイン"
      },
      features: {
        title: "研究体験を革新する",
        subtitle: "学術協力で優秀になるために必要なすべて",
        items: [
          {
            icon: Lightbulb,
            title: "AI駆動トピック発見",
            description: "トレンド分野とあなたの学術的興味に基づいてパーソナライズされた研究トピック提案を取得"
          },
          {
            icon: Users,
            title: "スマート研究者マッチング",
            description: "高度なマッチングアルゴリズムを通じて同じ志を持つ研究者とつながる"
          },
          {
            icon: FileText,
            title: "出版サポート",
            description: "研究提案からジャーナル投稿まで包括的なガイダンス"
          },
          {
            icon: MessageCircle,
            title: "統合コミュニケーション",
            description: "シームレスなチーム協力のためのリアルタイムメッセージングとビデオ通話"
          }
        ]
      },
      stats: {
        title: "何千人もの研究者に参加",
        items: [
          { number: "2,500+", label: "アクティブ研究者" },
          { number: "850+", label: "研究プロジェクト" },
          { number: "320+", label: "出版論文" },
          { number: "45+", label: "大学" }
        ]
      },
      process: {
        title: "あなたの研究の旅、簡素化",
        steps: [
          {
            step: "01",
            title: "トピックを発見",
            description: "あなたの興味と現在のトレンドに合わせたAI駆動の研究トピック提案を取得"
          },
          {
            step: "02",
            title: "協力者を見つける", 
            description: "あなたのスキルを補完し、情熱を共有する研究者とつながる"
          },
          {
            step: "03",
            title: "協力と創造",
            description: "統合ツールを使用して一緒に働き、優れた研究を生み出す"
          },
          {
            step: "04",
            title: "出版と共有",
            description: "出版プロセスを通じてサポートを受け、あなたの発見を共有"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kensaku</h1>
              <p className="text-xs text-gray-500">研作</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ja')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === 'ja' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                日本語
              </button>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                {t.hero.login}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <Star className="w-3 h-3 mr-1" />
            {t.hero.tagline}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            {t.hero.subtitle}
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/explore">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300">
                <Search className="w-5 h-5 mr-2" />
                Explore Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {t.process.title}
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {t.process.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers already using Kensaku to accelerate their academic success.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kensaku</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering Japanese universities with cutting-edge research collaboration tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/universities" className="hover:text-white transition-colors">Universities</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kensaku. Made with ❤️ for Japanese academia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}