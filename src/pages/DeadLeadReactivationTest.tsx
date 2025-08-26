import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Target, Play, Star, MessageSquare, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DeadLeadReactivationTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
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
        setUser({ name: data.user.user_metadata?.full_name || data.user.email, email: data.user.email });
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
          setUser({ name: session.user.user_metadata?.full_name || session.user.email, email: session.user.email });
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

  const handleStartTest = () => {
    setIsActive(true);
    toast({
      title: "Reactivation Campaign Started",
      description: "Dead Lead Reactivation agent is now engaging dormant leads.",
    });
  };

  const handleStopTest = () => {
    setIsActive(false);
    toast({
      title: "Campaign Paused",
      description: "Thank you for testing the reactivation agent!",
    });
  };

  const handleSubmitFeedback = () => {
    if (!rating) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting feedback.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Your insights help optimize our reactivation strategies!",
    });
    
    setRating(0);
    setFeedback("");
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
          <span className="text-primary font-medium">Dead Lead Reactivation Test</span>
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
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Dead Lead Reactivation</h1>
              <p className="text-lg text-muted-foreground">Test intelligent lead revival and re-engagement</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Testing Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scenario Setup */}
            <Card className="bg-gradient-card border-card-border shadow-soft animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  Reactivation Scenario
                </CardTitle>
                <CardDescription>
                  You're a dormant lead from 6 months ago receiving a personalized reactivation outreach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mb-4">
                  <h3 className="font-semibold text-primary mb-2">Your Lead Profile:</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're Lisa Park, Operations Manager at InnovateCorp. You downloaded a whitepaper about 
                    process automation 6 months ago but never moved forward due to budget constraints.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Original Interest:</strong> Process automation<br/>
                      <strong>Role:</strong> Operations Manager<br/>
                      <strong>Last Activity:</strong> 6 months ago
                    </div>
                    <div>
                      <strong>Previous Concern:</strong> Budget limitations<br/>
                      <strong>Company Size:</strong> 75 employees<br/>
                      <strong>Status:</strong> Budget now available
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-primary mb-3">Reactivation Test Goals:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Activate the reactivation agent to start personalized outreach</li>
                  <li>Respond as someone who had previous interest but went cold</li>
                  <li>Test how well the agent recalls your previous interactions</li>
                  <li>See if it addresses your original concerns (budget constraints)</li>
                  <li>Evaluate the personalization and timing of the approach</li>
                  <li>Assess if the agent can successfully re-engage your interest</li>
                </ol>
              </CardContent>
            </Card>

            {/* Reactivation Interface */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <RefreshCw className="w-5 h-5" />
                  Lead Reactivation Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isActive ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Ready to Reactivate Leads</h3>
                    <p className="text-muted-foreground mb-6">
                      Start the reactivation campaign to test how the AI agent re-engages dormant leads with personalized messaging.
                    </p>
                    <Button variant="hero" size="lg" onClick={handleStartTest}>
                      <Target className="w-5 h-5 mr-2" />
                      Start Reactivation Campaign
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[400px] bg-secondary/30 border-2 border-dashed border-accent/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Target className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Reactivation Agent Active</h3>
                      <p className="text-muted-foreground mb-4">Personalized outreach interface will appear here</p>
                      <div className="flex items-center gap-2 text-sm text-accent justify-center mb-4">
                        <Clock className="w-4 h-4" />
                        Intelligent Timing • Personalized Messages
                      </div>
                      <Button variant="outline" onClick={handleStopTest}>
                        Pause Campaign
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Campaign Analytics & Feedback */}
          <div className="space-y-6">
            {/* Reactivation Metrics */}
            <Card className="bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-primary">Campaign Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Leads Contacted</span>
                  <span className="font-semibold text-primary">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <span className="font-semibold text-success">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Re-engagement Rate</span>
                  <span className="font-semibold text-accent">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="font-semibold text-success">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-semibold text-success">340%</span>
                </div>
              </CardContent>
            </Card>

            {/* Reactivation Tactics */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Tactics Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Personalized messaging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Previous interaction recall</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Objection addressing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Value proposition refresh</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Optimal timing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Reactivation Feedback</CardTitle>
                <CardDescription>Rate the effectiveness of the lead reactivation approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Star Rating */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Reactivation Quality</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-colors"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-muted-foreground hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Written Feedback */}
                <div>
                  <Label htmlFor="feedback" className="text-sm font-medium text-foreground">
                    Campaign Effectiveness
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="How effective was the personalization? Did the agent address previous concerns well? Suggestions for improving reactivation strategy..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-2 min-h-[100px] bg-input border-card-border focus:ring-accent focus:border-accent"
                  />
                </div>

                <Button 
                  onClick={handleSubmitFeedback}
                  className="w-full" 
                  variant="primary"
                >
                  Submit Campaign Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadLeadReactivationTest;