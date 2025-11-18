import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Headphones, Phone, Target, ArrowRight, Activity, TrendingUp, Users, Clock, FileX2, MessageSquare, User, Bot, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserPermissions from "@/components/UserPermissions";
import CreateUserDialog from "@/components/CreateUserDialog";

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

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [availableAgents, setAvailableAgents] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const { data: users, error: usersError } = await supabase.rpc('get_all_users');
    if (usersError) {
        console.error("Error fetching all users:", usersError.message);
    } else {
        setAllUsers(users);
    }
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  useEffect(() => {
    const getSessionAndPermissions = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error("Error getting session:", error?.message);
        navigate("/login");
        return;
      }
      setUser(session.user);

      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('roles(name)')
        .eq('user_id', session.user.id);

      let isAdminUser = false;
      if (roleError) {
        console.error("Error fetching user roles:", roleError.message);
      } else {
        isAdminUser = userRoles.some((r: any) => r.roles && r.roles.name === 'admin');
        setIsAdmin(isAdminUser);
      }

      if (isAdminUser) {
        fetchUsers();
      }

      const { data: products, error: productsError } = await supabase.from('products').select('id, name');
      if (productsError) {
        console.error("Error fetching products:", productsError.message);
        return;
      }

      const agentsWithProductIds = allAgents.map(agent => ({
        ...agent,
        productId: products.find(p => p.name === agent.title)?.id || ''
      }));

      if (isAdminUser) {
        setAvailableAgents(agentsWithProductIds);
      } else {
        const { data: permissions, error: permissionsError } = await supabase
          .from('user_product_permissions')
          .select('product_id')
          .eq('user_id', session.user.id);

        if (permissionsError) {
          console.error("Error fetching user permissions:", permissionsError.message);
        } else {
          const allowedProductIds = new Set(permissions.map(p => p.product_id));
          const filteredAgents = agentsWithProductIds.filter(agent => allowedProductIds.has(agent.productId));
          setAvailableAgents(filteredAgents);
        }
      }
    };

    getSessionAndPermissions();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);



  const handleUserDeleted = (userId: string) => {
    setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/login");
    }
  };



  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent-lighter/10">
      <Navigation 
        isAuthenticated={!!user} 
        user={user ? { name: user.user_metadata?.full_name || user.email, email: user.email } : null} 
        onLogout={handleLogout}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to test your AI voice agents? Choose an agent below to start your testing session.
          </p>
        </div>



        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-6">AI Agent Testing Suite</h2>
          
          {availableAgents.map((agent, index) => (
            <Card key={agent.id} className="bg-gradient-card border-card-border hover-lift hover-glow shadow-soft animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
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
                    <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-card-border">
                      <h4 className="font-semibold text-primary mb-2">Use Case Scenario:</h4>
                      <p className="text-sm text-muted-foreground">{agent.scenario}</p>
                    </div>
                    <Link to={agent.testUrl}>
                      <Button variant="hero" size="lg" className="w-full sm:w-auto">
                        Test This Agent <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                  <div>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>



        {isAdmin && (
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-primary mb-6">User Management</h2>
                <Card className="bg-gradient-card border-card-border animate-fade-in">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-primary">Application Users</CardTitle>
                            <CardDescription>Manage user access to AI agents.</CardDescription>
                        </div>
                        <CreateUserDialog onUserCreated={refreshUsers} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {allUsers.length > 0 ? allUsers.filter(appUser => appUser.email !== user.email).map(appUser => (
                                <UserPermissions key={appUser.id} user={appUser} allAgents={availableAgents} onUserDeleted={handleUserDeleted} />
                            )) : <p className="text-sm text-muted-foreground">No users found.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

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
