import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Headphones, Play, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceCoach = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const user = { name: "John Smith", email: "john@example.com" };

  const handleStartTest = () => {
    setIsActive(true);
    toast({
      title: "Hospitality Training Started",
      description: "Hospitality Coach is now ready for training.",
    });
  };

  const handleStopTest = () => {
    setIsActive(false);
    toast({
      title: "Training Session Ended",
      description: "Great practice! Keep improving your customer service skills.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
      <Navigation 
        isAuthenticated={true} 
        user={user} 
        onLogout={() => console.log("Logout")}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 animate-fade-in">
          <Link to="/dashboard" className="text-accent hover:text-accent-light transition-colors">
            Dashboard
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-medium">Hospitality Coach Training</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-medium">
              <Headphones className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Hospitality Coach</h1>
              <p className="text-lg text-muted-foreground">Practice hospitality customer service scenarios</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            {/* Testing Instructions */}
            <Card className="bg-gradient-card border-card-border shadow-soft animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Phone className="w-5 h-5" />
                  Training Instructions
                </CardTitle>
                <CardDescription>
                  Follow these steps to practice hospitality customer service scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-primary mb-3">How to Practice:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Click 'Talk with AI' button to start the voice training session</li>
                  <li>Give your verification code when prompted</li>
                  <li>Practice the hospitality customer service scenario</li>
                  <li>Say 'goodbye' or 'bye' to end the call</li>
                </ol>
              </CardContent>
            </Card>

            {/* Agent Widget Container */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-5 h-5" />
                  AI Agent Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isActive ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Ready to Start Training</h3>
                    <p className="text-muted-foreground mb-6">
                      Click the button below to start your voice coaching session and practice hospitality scenarios.
                    </p>
                    <Button variant="hero" size="lg" onClick={handleStartTest}>
                      <Phone className="w-5 h-5 mr-2" />
                      Talk with AI
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[400px] bg-secondary/30 border-2 border-dashed border-accent/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Headphones className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Hospitality Coach Active</h3>
                      <p className="text-muted-foreground mb-4">The AI voice training session is now active</p>
                      <Button variant="outline" onClick={handleStopTest}>
                        End Training Session
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceCoach;