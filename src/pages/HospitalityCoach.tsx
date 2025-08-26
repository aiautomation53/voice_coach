import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Headphones, Play, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Headphones, Play, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const HospitalityCoach = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setIsAuthenticated(false);
        setUser(null);
      } else if (data?.user) {
        setUser({ name: data.user.email, email: data.user.email });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({ name: session.user.email, email: session.user.email });
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleStopTest = () => {
    toast({
      title: "Training Session Ended",
      description: "Great practice! Keep improving your customer service skills.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
      <Navigation 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("Error signing out:", error.message);
            toast({
              title: "Logout Failed",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Logged Out",
              description: "You have been successfully logged out.",
            });
          }
        }}
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
                <div className="min-h-[400px] bg-secondary/30 border-2 border-dashed border-accent/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Headphones className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Hospitality Coach Active</h3>
                    <p className="text-muted-foreground mb-4">The AI voice training session is now active</p>
                    
                  </div>
                  <vapi-widget  public-key="20234fe3-f02a-4cd7-9cf3-addcf5935775"  assistant-id="5fe73bc9-a36a-4bdc-b6d2-e84bc3874497"  mode="voice"  theme="dark"  base-bg-color="#000000"  accent-color="#14B8A6"  cta-button-color="#000000"  cta-button-text-color="#ffffff"  border-radius="large"  size="full"  position="bottom-right"  title="TALK WITH AI"  start-button-text="Start"  end-button-text="End Call"  chat-first-message="Hey, How can I help you today?"  chat-placeholder="Type your message..."  voice-show-transcript="true"  consent-required="true"  consent-title="Terms and conditions"  consent-content="By clicking \"Agree,\" and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."  consent-storage-key="vapi_widget_consent"></vapi-widget><script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async type="text/javascript"></script>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalityCoach;