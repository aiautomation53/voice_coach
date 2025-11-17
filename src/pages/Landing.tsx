import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { Bot, Headphones, Phone, Target, ArrowRight, CheckCircle, Star, FileX2, MessageSquare } from "lucide-react";

const allAgents = [
  {
    id: "hospitality-coach",
    title: "Hospitality Coach",
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
    testUrl: "/test/hospitality-coach",
    productId: "", // This will be fetched
  },
  {
    id: "missing-documents",
    title: "Missing Documents",
    description: "Identify and request missing documents from clients.",
    features: [
      "Automated document collection",
      "Client communication templates",
      "Document tracking and status updates",
      "Secure document upload portal"
    ],
    scenario: "Ideal for onboarding new clients and ensuring all required paperwork is collected efficiently.",
    icon: FileX2,
    color: "from-blue-500 to-blue-400",
    testUrl: "/test/missing-documents",
    productId: "", // This will be fetched
  },
  {
    id: "rag-chatbot",
    title: "RAG Chatbot",
    description: "Engage in intelligent conversations with a RAG-powered chatbot.",
    features: [
      "Natural language understanding",
      "Context-aware responses",
      "Answers questions from a knowledge base",
      "Scalable and customizable"
    ],
    scenario: "Perfect for providing instant support, answering FAQs, and engaging users with dynamic content.",
    icon: MessageSquare,
    color: "from-green-500 to-green-400",
    testUrl: "/test/rag-chatbot",
    productId: "", // This will be fetched
  }
];

const Landing = () => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [headache, setHeadache] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhoneNumber = (phone: string) => {
    // Regex for international phone numbers, allowing + and digits, min 7 digits
    const phoneRegex = /^\+?[0-9]{7,15}$/; 
    if (!phoneRegex.test(phone)) {
      setPhoneNumberError('Please enter a valid phone number, including country code (e.g., +11234567890).');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    validatePhoneNumber(newPhoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

    if (!isEmailValid || !isPhoneNumberValid) {
      alert('Please correct the errors in the form.');
      return;
    }

    const formData = { fullName, businessName, industry, headache, email, phoneNumber };
    console.log(formData);

    try {
      const response = await fetch('https://n8n.srv856353.hstgr.cloud/webhook/3b8469ac-d4e8-424f-8f78-6f5d85daa463', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your submission! We will be in touch shortly.');
        setFullName('');
        setBusinessName('');
        setIndustry('');
        setHeadache('');
        setEmail('');
        setPhoneNumber('');
        setEmailError('');
        setPhoneNumberError('');
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Apex Meridian Sandbox
              <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent"> Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Unlock unparalleled efficiency with Apex Meridian Sandbox. Discover innovative AI solutions designed to automate your most tedious tasks, streamline operations, and drive significant growth across every aspect of your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              
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
              Powerful AI Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of AI solutions designed to automate tedious daily activities, streamline operations, and enhance efficiency across various domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allAgents.map((agent, index) => (
              <Card key={agent.id} className="group hover-lift hover-glow bg-gradient-card border-card-border shadow-soft animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <agent.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{agent.title}</CardTitle>
                  <CardDescription className="text-base">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-card-border">
                    <h4 className="font-semibold text-primary mb-2">Use Case Scenario:</h4>
                    <p className="text-sm text-muted-foreground">{agent.scenario}</p>
                  </div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Elevate Your Operations?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join forward-thinking organizations leveraging AI to automate workflows, boost productivity, and achieve unprecedented operational excellence. Start your journey to smarter business today.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-lg mx-auto">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-primary-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-input border-card-border focus:ring-accent focus:border-accent text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-primary-foreground">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Apex Innovations"
                  className="bg-input border-card-border focus:ring-accent focus:border-accent text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="john.doe@example.com"
                  className={`bg-input border-card-border focus:ring-accent focus:border-accent text-foreground ${emailError ? 'border-red-500' : ''}`}
                  required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-primary-foreground">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="+1 (123) 456-7890"
                  className={`bg-input border-card-border focus:ring-accent focus:border-accent text-foreground ${phoneNumberError ? 'border-red-500' : ''}`}
                  required
                />
                {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-primary-foreground">Industry</Label>
                <Input
                  id="industry"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Technology, Healthcare, Finance, etc."
                  className="bg-input border-card-border focus:ring-accent focus:border-accent text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headache" className="text-primary-foreground">What is the single biggest, most profit-draining operational headache you are currently facing?</Label>
                <Textarea
                  id="headache"
                  value={headache}
                  onChange={(e) => setHeadache(e.target.value)}
                  placeholder="Describe your biggest operational challenge..."
                  className="bg-input border-card-border focus:ring-accent focus:border-accent text-foreground"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow">
                Submit Inquiry <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground border-t border-card-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-6 h-6" />
            <span className="font-bold text-lg">Apex Meridian Sandbox</span>
          </div>
          <p className="text-primary-foreground/70">
            © 2024 Apex Meridian LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;