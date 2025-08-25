import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Bot, Zap, Phone, Target, ArrowRight, CheckCircle, Star } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Test Your AI Voice
              <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"> Agents</span>
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
            {/* Speed to Lead */}
            <Card className="group hover-lift hover-glow bg-gradient-card border-card-border shadow-soft animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Speed to Lead</CardTitle>
                <CardDescription className="text-base">
                  Convert website visitors into qualified leads instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Instant response to form submissions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Intelligent lead qualification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Seamless calendar booking</span>
                  </li>
                </ul>
                <Link to="/register" className="w-full block">
                  <Button className="w-full" variant="primary">
                    Test Speed to Lead
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Inbound */}
            <Card className="group hover-lift hover-glow bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Inbound</CardTitle>
                <CardDescription className="text-base">
                  Handle incoming calls with AI sales expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">24/7 professional call handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced objection handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">CRM integration & follow-up</span>
                  </li>
                </ul>
                <Link to="/register" className="w-full block">
                  <Button className="w-full" variant="primary">
                    Test Inbound Agent
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Dead Lead Reactivation */}
            <Card className="group hover-lift hover-glow bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary">Dead Lead Reactivation</CardTitle>
                <CardDescription className="text-base">
                  Revive and re-engage dormant leads effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Personalized reactivation campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Intelligent timing optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">High conversion recovery rates</span>
                  </li>
                </ul>
                <Link to="/register" className="w-full block">
                  <Button className="w-full" variant="primary">
                    Test Reactivation
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
            <span className="font-bold text-lg">AI Voice Tester</span>
          </div>
          <p className="text-primary-foreground/70">
            © 2024 AI Voice Tester. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;