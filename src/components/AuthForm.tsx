
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!email || !password || (type === 'register' && !username)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // In a real app, we would connect to an API
    // For now, simulate a successful login/registration
    setTimeout(() => {
      // Store fake auth token
      localStorage.setItem('authToken', 'dummy-auth-token');
      
      toast({
        title: type === 'login' ? "Logged in" : "Account created",
        description: type === 'login' 
          ? "Welcome back!" 
          : "Your account has been created successfully.",
      });
      
      // Redirect to home page
      window.location.href = '/';
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      {type === 'register' && (
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-social" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {type === 'login' ? 'Logging in...' : 'Creating account...'}
          </span>
        ) : (
          type === 'login' ? 'Login' : 'Create Account'
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
