
import React, { useState } from 'react';
import { Heart, MessageCircle, Clock, Share, MoreHorizontal, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  isAnonymous: boolean;
  expiresAt: Date;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

interface PostCardProps {
  post: PostProps;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const { toast } = useToast();

  // Calculate time remaining until expiration
  const now = new Date();
  const expiresAt = new Date(post.expiresAt);
  const timeRemaining = expiresAt.getTime() - now.getTime();
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
  const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

  // Format the creation date
  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      toast({
        description: "Post liked!",
      });
    }
  };
  
  const handleComment = () => {
    toast({
      description: "Comments feature coming soon!",
    });
  };
  
  const handleShare = () => {
    toast({
      description: "Post shared successfully!",
    });
  };
  
  const handleDownload = () => {
    if (post.image) {
      toast({
        description: "Downloading image...",
      });
    } else {
      toast({
        description: "No image to download.",
      });
    }
  };

  return (
    <Card className="post-card overflow-hidden mb-4 animate-fade-in">
      <CardHeader className="p-4 pb-2 space-y-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {post.isAnonymous ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    ANON
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Anonymous</p>
                </div>
              </div>
            ) : (
              <Link to={`/profile/${post.author.id}`} className="flex items-center gap-2">
                <Avatar>
                  {post.author.avatar ? (
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  ) : (
                    <AvatarFallback>
                      {post.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">@{post.author.username}</p>
                </div>
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {hoursRemaining > 0 || minutesRemaining > 0 ? (
                <span>{hoursRemaining}h {minutesRemaining}m left</span>
              ) : (
                <span>Expired</span>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="whitespace-pre-wrap mb-2">{post.content}</p>
        {post.image && (
          <div className="relative rounded-lg overflow-hidden mt-2">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
            onClick={toggleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleComment}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline-block">Share</span>
          </Button>
          
          {post.image && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">Save</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
