
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Volume2, VolumeX, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data for reels
const mockReels = [
  {
    id: 'reel1',
    author: {
      id: 'user1',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format',
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-content-for-her-channel-42525-large.mp4',
    description: "Enjoying the weekend vibes! ✨ #weekendmood",
    likesCount: 245,
    commentsCount: 37,
  },
  {
    id: 'reel2',
    author: {
      id: 'user2',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&auto=format',
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-colored-lights-1241-large.mp4',
    description: "Dancing like nobody is watching 🕺 #dance #fun",
    likesCount: 583,
    commentsCount: 92,
  },
  {
    id: 'reel3',
    author: {
      id: 'user3',
      name: 'Maria Garcia',
      username: 'mariag',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format',
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-sunset-3128-large.mp4',
    description: "Nature's beauty is unmatched 🏞️ #sunset #travel",
    likesCount: 921,
    commentsCount: 45,
  },
];

const Reels = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, mockReels.length);
  }, []);

  // Handle intersection observer to auto-play the visible video
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target as HTMLVideoElement;
          const index = videoRefs.current.indexOf(videoElement);
          
          if (index !== -1) {
            // Pause all videos
            videoRefs.current.forEach((video, i) => {
              if (video && i !== index) {
                video.pause();
              }
            });

            // Play the current video
            if (videoElement) {
              videoElement.play().catch(error => {
                console.log('Autoplay was prevented:', error);
              });
              setActiveReelIndex(index);
            }
          }
        }
      });
    }, options);

    // Observe all video elements
    videoRefs.current.forEach(videoEl => {
      if (videoEl) observer.observe(videoEl);
    });

    return () => {
      videoRefs.current.forEach(videoEl => {
        if (videoEl) observer.unobserve(videoEl);
      });
    };
  }, []);

  // Toggle sound for all videos
  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach(video => {
      if (video) video.muted = !muted;
    });
  };

  // Handle like
  const handleLike = (reelId: string) => {
    setLikes(prev => {
      const isLiked = !prev[reelId];
      if (isLiked) {
        toast({
          description: "Reel liked!",
        });
      }
      return { ...prev, [reelId]: isLiked };
    });
  };

  // Handle comment
  const handleComment = (reelId: string) => {
    toast({
      description: "Comments feature coming soon!",
    });
  };

  // Handle share
  const handleShare = (reelId: string) => {
    toast({
      description: "Reel shared successfully!",
    });
  };

  // Handle download
  const handleDownload = (reelId: string) => {
    toast({
      description: "Downloading reel...",
    });
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background">
      <Navbar />
      
      <main className="max-w-md mx-auto relative">
        <div className="flex items-center justify-between px-4 py-2 border-b sticky top-16 bg-background/80 backdrop-blur-sm z-10">
          <h1 className="text-2xl font-bold">Reels</h1>
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="reels-container">
          {mockReels.map((reel, index) => (
            <div 
              key={reel.id} 
              className="reel-item h-[calc(100vh-8rem)] snap-center relative"
            >
              <video
                ref={el => videoRefs.current[index] = el}
                src={reel.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted={muted}
                playsInline
                preload="auto"
                onClick={() => {
                  const video = videoRefs.current[index];
                  if (video) {
                    video.paused ? video.play() : video.pause();
                  }
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={reel.author.avatar} 
                    alt={reel.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <p className="font-medium text-white">{reel.author.name}</p>
                    <p className="text-xs text-white/70">@{reel.author.username}</p>
                  </div>
                </div>
                <p className="text-white mb-2">{reel.description}</p>
              </div>
              
              <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className={`rounded-full bg-background/20 backdrop-blur-lg hover:bg-background/30 text-white ${likes[reel.id] ? 'text-red-500' : ''}`}
                    onClick={() => handleLike(reel.id)}
                  >
                    <Heart className={`h-6 w-6 ${likes[reel.id] ? 'fill-current' : ''}`} />
                  </Button>
                  <span className="text-xs text-white mt-1">{likes[reel.id] ? reel.likesCount + 1 : reel.likesCount}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="rounded-full bg-background/20 backdrop-blur-lg hover:bg-background/30 text-white"
                    onClick={() => handleComment(reel.id)}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                  <span className="text-xs text-white mt-1">{reel.commentsCount}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="rounded-full bg-background/20 backdrop-blur-lg hover:bg-background/30 text-white"
                    onClick={() => handleShare(reel.id)}
                  >
                    <Share className="h-6 w-6" />
                  </Button>
                  <span className="text-xs text-white mt-1">Share</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="rounded-full bg-background/20 backdrop-blur-lg hover:bg-background/30 text-white"
                    onClick={() => handleDownload(reel.id)}
                  >
                    <Download className="h-6 w-6" />
                  </Button>
                  <span className="text-xs text-white mt-1">Save</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reels;
