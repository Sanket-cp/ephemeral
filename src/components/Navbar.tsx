
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Bell, PlusSquare, LogOut, Film, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // In a real app, we would clear auth tokens
    localStorage.removeItem('authToken');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-social to-social-light bg-clip-text text-transparent">
            Ephemeral
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/reels" className={`nav-link ${isActive('/reels') ? 'active' : ''}`}>
            <Film className="h-5 w-5" />
            <span>Reels</span>
          </Link>
          <Link to="/messenger" className={`nav-link ${isActive('/messenger') ? 'active' : ''}`}>
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link to="/notifications" className={`nav-link ${isActive('/notifications') ? 'active' : ''}`}>
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </Link>
          <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
            <PlusSquare className="h-5 w-5" />
            <span>Create</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-10">
        <div className="flex items-center justify-around h-16">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home className="h-5 w-5" />
          </Link>
          <Link to="/reels" className={`nav-link ${isActive('/reels') ? 'active' : ''}`}>
            <Film className="h-5 w-5" />
          </Link>
          <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
            <PlusSquare className="h-5 w-5" />
          </Link>
          <Link to="/messenger" className={`nav-link ${isActive('/messenger') ? 'active' : ''}`}>
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            <User className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
