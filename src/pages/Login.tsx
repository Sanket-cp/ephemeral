
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-social to-social-light bg-clip-text text-transparent">
              Ephemeral
            </h1>
            <p className="mt-2 text-muted-foreground">
              Share thoughts that fade away
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg p-6 border">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>
            
            <AuthForm type="login" />
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-social hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
