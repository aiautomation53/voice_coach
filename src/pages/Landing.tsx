import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Bot, Headphones, Phone, Target, ArrowRight, CheckCircle, Star } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Voice Coach
              <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"> Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Experience the power of AI-driven sales automation. Test three specialized voice agents designed to convert, engage, and reactivate your leads with human-like conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="xl" className="shadow-glow">
                  Start Testing Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-light/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Three Powerful AI Agents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each agent is specialized for different stages of your sales funnel, powered by advanced AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Hospitality Coach */}
            <Card className="group hover-lift hover-glow bg-gradient-card border-card-border shadow-soft animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Headphones className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Hospitality Coach</CardTitle>
                <CardDescription className="text-base">
                  Practice hospitality customer service scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Realistic hospitality role-playing scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Instant feedback on communication skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Improved guest satisfaction ratings</span>
                  </li>
                </ul>
                <vapi-widget
                  public-key="20234fe3-f02a-4cd7-9cf3-addcf5935775"
                  assistant-id="5fe73bc9-a36a-4bdc-b6d2-e84bc3874497"
                  mode="voice"
                  theme="dark"
                  base-bg-color="#000000"
                  accent-color="#14B8A6"
                  cta-button-color="#000000"
                  cta-button-text-color="#ffffff"
                  border-radius="large"
                  size="full"
                  title="TALK WITH AI"
                  start-button-text="Start"
                  end-button-text="End Call"
                  chat-first-message="Hey, How can I help you today?"
                  chat-placeholder="Type your message..."
                  voice-show-transcript="true"
                  consent-required="true"
                  consent-title="Terms and conditions"
                  consent-content="By clicking 'Agree,' and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
                  consent-storage-key="vapi_widget_consent"
                ></vapi-widget>
                <script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async type="text/javascript"></script>
                
                <Link to="/test/hospitality-coach" className="w-full block">
                  <Button className="w-full" variant="primary">
                    Test Hospitality Coach
                  </Button>
                </Link>
              </CardContent>
            </Card>

            

            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Sales Process?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join thousands of businesses using AI voice agents to increase conversions and streamline their sales operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow">
                  Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground border-t border-card-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-6 h-6" />
            <span className="font-bold text-lg">Voice Coach</span>
          </div>
          <p className="text-primary-foreground/70">
            © 2024 Voice Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;