import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Bot, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password', // You might need a dedicated page for password update
    });

    if (error) {
      toast({
        title: "Password Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
    }

    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
        <Navigation />
        
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Check Your Email</h1>
              <p className="text-muted-foreground">We've sent password reset instructions to your email</p>
            </div>

            <Card className="bg-gradient-card border-card-border shadow-strong animate-slide-up">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We've sent a password reset link to <strong>{email}</strong>.
                  <br />
                  Please check your email and follow the instructions to reset your password.
                </p>
                
                <div className="space-y-4">
                  <Link to="/login" className="w-full block">
                    <Button variant="hero" size="lg" className="w-full">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Login
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setEmailSent(false)}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    Try a different email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
            <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
          </div>

          {/* Reset Form */}
          <Card className="bg-gradient-card border-card-border shadow-strong animate-slide-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-primary">Forgot Password?</CardTitle>
              <CardDescription>
                No worries! Enter your email and we'll send you reset instructions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input border-card-border focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Reset Email..." : "Send Reset Instructions"}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center border-t border-card-border pt-6">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm text-accent hover:text-accent-light font-medium transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;