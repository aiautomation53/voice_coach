import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Phone, Play, Star, MessageSquare, Clock, CheckCircle, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InboundTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const user = { name: "John Smith", email: "john@example.com" };

  const handleStartTest = () => {
    setIsActive(true);
    toast({
      title: "Inbound Agent Activated",
      description: "AI agent is now ready to handle incoming calls professionally.",
    });
  };

  const handleStopTest = () => {
    setIsActive(false);
    toast({
      title: "Test Session Ended",
      description: "Thank you for testing the Inbound agent!",
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
      description: "Your feedback helps improve our AI agents!",
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
          <span className="text-primary font-medium">Inbound Agent Test</span>
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
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Inbound Sales Agent</h1>
              <p className="text-lg text-muted-foreground">Test professional call handling and sales expertise</p>
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
                  Call Scenario
                </CardTitle>
                <CardDescription>
                  You're a potential customer calling about pricing and implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mb-4">
                  <h3 className="font-semibold text-primary mb-2">Your Role:</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're Michael Rodriguez, IT Director at GrowthTech Inc. You're calling to learn about 
                    enterprise software solutions, pricing tiers, and implementation timelines.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Company:</strong> GrowthTech Inc.<br/>
                      <strong>Role:</strong> IT Director<br/>
                      <strong>Employees:</strong> 150 users
                    </div>
                    <div>
                      <strong>Budget:</strong> $15,000-25,000/year<br/>
                      <strong>Timeline:</strong> Q1 implementation<br/>
                      <strong>Concerns:</strong> Security & scalability
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-primary mb-3">Test Objectives:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Start the test session to activate the inbound agent</li>
                  <li>Simulate calling about enterprise pricing and features</li>
                  <li>Ask technical questions about security and compliance</li>
                  <li>Raise common objections (price, timeline, complexity)</li>
                  <li>Test the agent's ability to schedule a technical demo</li>
                  <li>Evaluate professionalism and product knowledge</li>
                </ol>
              </CardContent>
            </Card>

            {/* Agent Interface */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <PhoneCall className="w-5 h-5" />
                  Inbound Call Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isActive ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Phone className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Ready to Handle Calls</h3>
                    <p className="text-muted-foreground mb-6">
                      Activate the Inbound agent to start testing professional call handling and sales conversations.
                    </p>
                    <Button variant="hero" size="lg" onClick={handleStartTest}>
                      <Phone className="w-5 h-5 mr-2" />
                      Start Call Session
                    </Button>
                  </div>
                ) : (
                  <div className="min-h-[400px] bg-secondary/30 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Phone className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Inbound Agent Active</h3>
                      <p className="text-muted-foreground mb-4">Voice interface will be integrated here</p>
                      <div className="flex items-center gap-2 text-sm text-primary justify-center mb-4">
                        <Clock className="w-4 h-4" />
                        Available 24/7 • Professional Support
                      </div>
                      <Button variant="outline" onClick={handleStopTest}>
                        End Call Session
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Metrics & Feedback */}
          <div className="space-y-6">
            {/* Call Metrics */}
            <Card className="bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-primary">Call Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Answer Time</span>
                  <span className="font-semibold text-success">2 rings</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Call Duration</span>
                  <span className="font-semibold text-primary">8m 32s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Objections Handled</span>
                  <span className="font-semibold text-accent">4/4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Demo Scheduled</span>
                  <span className="font-semibold text-success">✓ Yes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                  <span className="font-semibold text-success">9.2/10</span>
                </div>
              </CardContent>
            </Card>

            {/* Key Features Tested */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Features Tested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Professional greeting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Product knowledge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Objection handling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Calendar booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Human handoff</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="bg-gradient-card border-card-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-primary">Rate This Call</CardTitle>
                <CardDescription>How was your experience with the Inbound agent?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Star Rating */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Call Quality Rating</Label>
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
                    Call Experience Notes
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="How did the agent handle your questions? Was the information accurate? Any suggestions for improvement..."
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
                  Submit Call Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboundTest;