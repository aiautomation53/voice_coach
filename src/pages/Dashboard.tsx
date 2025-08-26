import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Headphones, Phone, Target, ArrowRight, Activity, TrendingUp, Users, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const user = { name: "John Smith", email: "john@example.com" };

  const stats = [
    { label: "Tests Completed", value: "12", icon: Activity, color: "text-accent" },
    { label: "Success Rate", value: "87%", icon: TrendingUp, color: "text-success" },
    { label: "Active Agents", value: "3", icon: Users, color: "text-primary" },
    { label: "Total Sessions", value: "45m", icon: Clock, color: "text-muted-foreground" },
  ];

  const agents = [
    {
      id: "voice-coach",
      title: "Voice Coach",
      description: "Practice hospitality customer service scenarios with AI voice training.",
      features: [
        "Realistic hospitality scenarios",
        "Voice-based interaction training",
        "Customer service skill development",
        "Instant feedback and coaching"
      ],
      scenario: "Perfect for training hotel staff in customer service excellence and handling various guest situations.",
      icon: Headphones,
      color: "from-accent to-accent-light",
      testUrl: "/test/speed-to-lead"
    },
    {
      id: "inbound",
      title: "Inbound Sales Agent",
      description: "Handle incoming calls with professional AI sales expertise and advanced objection handling.",
      features: [
        "24/7 professional call handling",
        "Advanced objection handling",
        "Product knowledge database",
        "Seamless human handoff"
      ],
      scenario: "Ideal for businesses receiving high volumes of sales inquiries and support calls.",
      icon: Phone,
      color: "from-primary to-primary-light",
      testUrl: "/test/inbound"
    },
    {
      id: "dead-lead-reactivation",
      title: "Dead Lead Reactivation",
      description: "Revive dormant leads with personalized reactivation campaigns and intelligent timing.",
      features: [
        "Personalized outreach campaigns",
        "Intelligent timing optimization",
        "Multi-channel engagement",
        "High conversion recovery"
      ],
      scenario: "Transform your inactive lead database into a revenue-generating asset.",
      icon: Target,
      color: "from-accent-light to-primary-lighter",
      testUrl: "/test/dead-lead-reactivation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
      <Navigation 
        isAuthenticated={true} 
        user={user} 
        onLogout={() => console.log("Logout")}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to test your AI voice agents? Choose an agent below to start your testing session.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="bg-gradient-card border-card-border hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agent Testing Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-6">AI Agent Testing Suite</h2>
          
          {agents.map((agent, index) => (
            <Card key={agent.id} className="bg-gradient-card border-card-border hover-lift hover-glow shadow-soft animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Agent Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-medium`}>
                        <agent.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary">{agent.title}</h3>
                        <p className="text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>

                    {/* Scenario */}
                    <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-card-border">
                      <h4 className="font-semibold text-primary mb-2">Use Case Scenario:</h4>
                      <p className="text-sm text-muted-foreground">{agent.scenario}</p>
                    </div>

                    {/* Test Button */}
                    <Link to={agent.testUrl}>
                      <Button variant="hero" size="lg" className="w-full sm:w-auto">
                        Test This Agent <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="font-semibold text-primary mb-4">Key Features:</h4>
                    <ul className="space-y-3">
                      {agent.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-accent/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-primary">Testing Tips</CardTitle>
            <CardDescription>Get the most out of your AI agent testing sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-6 h-6 text-accent" />
                </div>
                <h5 className="font-semibold text-primary mb-2">Be Natural</h5>
                <p className="text-sm text-muted-foreground">Interact with agents as you would in real scenarios</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold text-primary mb-2">Test Edge Cases</h5>
                <p className="text-sm text-muted-foreground">Try challenging scenarios to test limits</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <h5 className="font-semibold text-primary mb-2">Leave Feedback</h5>
                <p className="text-sm text-muted-foreground">Your feedback helps improve agent performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;