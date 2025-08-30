import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, User, LogOut } from "lucide-react";

interface NavigationProps {
  isAuthenticated?: boolean;
  user?: { name: string; email: string };
  onLogout?: () => void;
}

const Navigation = ({ isAuthenticated = false, user, onLogout }: NavigationProps) => {
  return (
    <header className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl text-primary hover:text-primary-light transition-colors">
            <div className="p-2 bg-gradient-accent rounded-xl shadow-soft">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            Voice Coach
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;