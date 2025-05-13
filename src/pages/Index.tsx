
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, MessageCircle, Play, Image } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-br from-social to-social-light relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-white space-y-6 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Share moments that <span className="text-white">matter</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              Connect with friends, share your thoughts, and watch them fade away after 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-social hover:bg-white/90"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-lg p-3 transform rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format" 
                    alt="Friends enjoying time together" 
                    className="rounded w-full aspect-square object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-lg p-3 transform -rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=400&auto=format" 
                    alt="Basketball player" 
                    className="rounded w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-lg shadow-lg p-3 transform -rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1581824043583-6904b080a19c?q=80&w=400&auto=format" 
                    alt="Travel photo" 
                    className="rounded w-full aspect-square object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-lg p-3 transform rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400&auto=format" 
                    alt="Nature landscape" 
                    className="rounded w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience social media in a new way</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-social/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-social" />
                </div>
                <h3 className="text-xl font-bold mb-2">Temporary Posts</h3>
                <p className="text-muted-foreground">
                  Share your thoughts freely knowing they'll disappear after 24 hours, giving you the freedom to express yourself without permanence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-social/10 flex items-center justify-center mb-4">
                  <Play className="h-8 w-8 text-social" />
                </div>
                <h3 className="text-xl font-bold mb-2">Engaging Reels</h3>
                <p className="text-muted-foreground">
                  Create and browse short-form videos that capture moments, tell stories, and connect you with trending content around the world.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-social/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-social" />
                </div>
                <h3 className="text-xl font-bold mb-2">Private Messaging</h3>
                <p className="text-muted-foreground">
                  Connect with friends through private chats, voice calls, and video calls to stay connected no matter where you are.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* App Preview Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See what's trending right now</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover popular posts, connect with new friends, and join conversations that matter to you.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    title: "Discover trending topics", 
                    description: "Find what people are talking about right now"
                  },
                  { 
                    title: "Connect with like-minded people", 
                    description: "Build your community around shared interests"
                  },
                  { 
                    title: "Express yourself with multimedia", 
                    description: "Share photos, videos, and more"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-social flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="mt-8 bg-social hover:bg-social-dark" 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-background rounded-xl shadow-2xl overflow-hidden border border-border">
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Maria Garcia</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <img 
                  src="https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?q=80&w=1080&auto=format" 
                  alt="Beautiful sunset" 
                  className="w-full aspect-video object-cover"
                />
                
                <div className="p-4">
                  <p className="mb-4">Just witnessed the most incredible sunset at the beach today! 🌅 #nofilter #beachvibes</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>243</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>42</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-social text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join Ephemeral?</h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-8">
            Create an account today and connect with friends, share memories, and experience a new way of social media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-social hover:bg-white/90"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ephemeral</h2>
              <p className="text-muted-foreground">Share thoughts that fade away</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0 justify-center">
              <Button variant="link" className="text-muted-foreground">About</Button>
              <Button variant="link" className="text-muted-foreground">Privacy</Button>
              <Button variant="link" className="text-muted-foreground">Terms</Button>
              <Button variant="link" className="text-muted-foreground">Help</Button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">© 2025 Ephemeral. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
