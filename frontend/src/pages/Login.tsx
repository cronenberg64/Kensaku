import { SignInOrUpForm } from "app";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Kensaku</h1>
          <p className="text-slate-300 text-lg">Academic Publishing Made Simple</p>
        </div>
        
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to access your academic papers and research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInOrUpForm 
              signInOptions={{ 
                google: true,
                emailAndPassword: true
              }} 
            />
          </CardContent>
        </Card>
        
        <p className="text-center text-slate-400 text-sm mt-6">
          Join thousands of researchers sharing their work on Kensaku
        </p>
      </div>
    </div>
  );
}