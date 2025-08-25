import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Zap, Play, Star, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SpeedToLeadTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const user = { name: "John Smith", email: "john@example.com" };

  const handleStartTest = () => {
    setIsActive(true);
    toast({
      title: "Test Session Started",
      description: "Speed to Lead agent is now active and ready to respond.",
    });
  };

  const handleStopTest = () => {
    setIsActive(false);
    toast({
      title: "Test Session Ended",
      description: "Thank you for testing! Your feedback helps improve our agents.",
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
      description: "Thank you for your valuable feedback!",
    });
    
    setRating(0);
    setFeedback("");
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
          <span className="text-primary font-medium">Speed to Lead Test</span>
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
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Speed to Lead Agent</h1>
              <p className="text-lg text-muted-foreground">Test instant lead response and qualification</p>
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
                  Testing Scenario
                </CardTitle>
                <CardDescription>
                  You're a potential customer who just filled out a contact form on a company website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-accent-lighter/20 p-4 rounded-lg border border-accent-lighter/30 mb-4">
                  <h3 className="font-semibold text-primary mb-2">Your Role:</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're Sarah Johnson, Marketing Director at TechFlow Solutions. You're looking for a CRM system 
                    to help manage your growing team's leads and want to schedule a demo.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Company:</strong> TechFlow Solutions<br/>
                      <strong>Role:</strong> Marketing Director<br/>
                      <strong>Team Size:</strong> 25 employees
                    </div>
                    <div>
                      <strong>Budget:</strong> $5,000-10,000/month<br/>
                      <strong>Timeline:</strong> Need solution in 30 days<br/>
                      <strong>Primary Need:</strong> Lead management
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-primary mb-3">Testing Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Click "Start Test Session" to activate the Speed to Lead agent</li>
                  <li>The agent should respond within 30 seconds of activation</li>
                  <li>Engage naturally - answer questions about your needs and timeline</li>
                  <li>Test the agent's ability to qualify you as a lead</li>
                  <li>See if it can successfully schedule a demo call</li>
                  <li>Provide feedback on the experience quality</li>
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
                    <h3 className="text-xl font-semibold text-primary mb-3">Ready to Start Testing</h3>
                    <p className="text-muted-foreground mb-6">
                      Click the button below to activate the Speed to Lead agent and begin your testing session.
                    </p>
                    <Button variant="hero" size="lg" onClick={handleStartTest}>
                      <Play className="w-5 h-5 mr-2" />
                      Start Test Session
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[400px] bg-secondary/30 border-2 border-dashed border-accent/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Zap className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Speed to Lead Agent Active</h3>
                      <p className="text-muted-foreground mb-4">The AI agent widget will be integrated here</p>
                      <div className="flex items-center gap-2 text-sm text-success justify-center mb-4">
                        <Clock className="w-4 h-4" />
                        Response Time: &lt; 30 seconds
                      </div>
                      <Button variant="outline" onClick={handleStopTest}>
                        End Test Session
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-primary">Live Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold text-success">24s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engagement Score</span>
                  <span className="font-semibold text-primary">8.5/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lead Quality</span>
                  <span className="font-semibold text-accent">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="font-semibold text-success">92%</span>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Feedback</CardTitle>
                <CardDescription>Rate your experience with the Speed to Lead agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Star Rating */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Overall Rating</Label>
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
                    Additional Comments
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts on the agent's performance, response quality, and overall experience..."
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
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedToLeadTest;