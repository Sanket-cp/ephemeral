
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    user: {
      id: 'user2',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&auto=format',
    },
    post: {
      id: 'post1',
      content: 'Just finished a great book! Anyone looking for recommendations?'
    },
    time: '2h ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=256&auto=format',
    },
    post: {
      id: 'post1',
      content: 'Just finished a great book! Anyone looking for recommendations?'
    },
    comment: 'I would recommend "The Midnight Library"!',
    time: '5h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      id: 'user4',
      name: 'Sarah Williams',
      username: 'sarahw',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format',
    },
    time: '1d ago',
    isRead: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch notifications
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const markAllAsRead = () => {
    // In a real app, we would call an API to mark all as read
    // For now, just update the local state
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const renderNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case 'like':
        return (
          <>
            <span className="font-semibold">{notification.user.name}</span>
            {' liked your post: '}
            <span className="text-muted-foreground truncate">
              {notification.post.content.length > 50
                ? `${notification.post.content.substring(0, 50)}...`
                : notification.post.content}
            </span>
          </>
        );
      case 'comment':
        return (
          <>
            <span className="font-semibold">{notification.user.name}</span>
            {' commented on your post: '}
            <span className="text-muted-foreground">{notification.comment}</span>
          </>
        );
      case 'follow':
        return (
          <>
            <span className="font-semibold">{notification.user.name}</span>
            {' started following you'}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      <main className="container py-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 border rounded-lg bg-card animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-3 w-2/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg bg-card ${
                    !notification.isRead ? 'border-l-4 border-l-social' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {renderNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        {notification.user.avatar ? (
                          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                        ) : (
                          <AvatarFallback>
                            {notification.user.name[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{renderNotificationContent(notification)}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
