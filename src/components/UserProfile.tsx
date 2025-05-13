
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    bio?: string;
    avatar?: string;
    isCurrentUser: boolean;
    isFollowing: boolean;
    followersCount: number;
    followingCount: number;
    postsCount: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const { toast } = useToast();

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
      toast({
        description: `Unfollowed ${user.name}`,
      });
    } else {
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
      toast({
        description: `Following ${user.name}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
        
        {user.bio && (
          <p className="text-center max-w-md">{user.bio}</p>
        )}
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="font-semibold">{user.postsCount}</p>
            <p className="text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{followersCount}</p>
            <p className="text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{user.followingCount}</p>
            <p className="text-muted-foreground">Following</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {user.isCurrentUser ? (
            <>
              <Link to="/settings">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </Link>
              <Link to="/edit-profile">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </Link>
            </>
          ) : (
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4 mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>Posts will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="media" className="space-y-4 mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>Media posts will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
