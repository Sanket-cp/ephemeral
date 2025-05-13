
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PostCard, { PostProps } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

// Mock data for posts
const mockPosts: PostProps[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format',
    },
    content: 'Just finished a great book! Anyone looking for recommendations?',
    isAnonymous: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    likesCount: 24,
    commentsCount: 5,
    isLiked: false,
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'John Doe',
      username: 'johndoe',
    },
    content: 'This is an anonymous post where I can share my thoughts without revealing my identity.',
    isAnonymous: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20), // 20 hours from now
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likesCount: 12,
    commentsCount: 3,
    isLiked: true,
  },
  {
    id: '3',
    author: {
      id: 'user3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&auto=format',
    },
    content: 'Check out this amazing sunset from my trip!',
    image: 'https://images.unsplash.com/photo-1533323905782-5a5209f28653?q=80&w=1470&auto=format',
    isAnonymous: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    likesCount: 89,
    commentsCount: 14,
    isLiked: true,
  },
];

const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch posts
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const refreshFeed = () => {
    setIsLoading(true);
    // Simulate API call to fetch new posts
    setTimeout(() => {
      // For demo, we'll just randomize the order
      const shuffledPosts = [...mockPosts].sort(() => Math.random() - 0.5);
      setPosts(shuffledPosts);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      <main className="container py-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Home</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={refreshFeed}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="post-card p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
