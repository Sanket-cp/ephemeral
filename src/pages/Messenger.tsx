
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Send, Phone, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Mock data for conversations
const mockConversations = [
  {
    id: 'conv1',
    user: {
      id: 'user1',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format',
      isOnline: true,
    },
    lastMessage: {
      text: 'Hey, how are you doing?',
      time: '2:35 PM',
      isRead: true,
      isSender: false,
    },
    unreadCount: 0,
  },
  {
    id: 'conv2',
    user: {
      id: 'user2',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&auto=format',
      isOnline: true,
    },
    lastMessage: {
      text: 'Did you see that new movie?',
      time: '1:05 PM',
      isRead: false,
      isSender: false,
    },
    unreadCount: 3,
  },
  {
    id: 'conv3',
    user: {
      id: 'user3',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format',
      isOnline: false,
    },
    lastMessage: {
      text: 'Thanks for your help!',
      time: 'Yesterday',
      isRead: true,
      isSender: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv4',
    user: {
      id: 'user4',
      name: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format',
      isOnline: false,
    },
    lastMessage: {
      text: "Let me know when you are free",
      time: 'Yesterday',
      isRead: true,
      isSender: true,
    },
    unreadCount: 0,
  },
];

// Mock data for active conversation messages
const mockMessages = [
  {
    id: 'msg1',
    text: 'Hey there! How are you doing?',
    time: '2:30 PM',
    isReceived: false,
  },
  {
    id: 'msg2',
    text: "Hi! I am doing great, thanks for asking. Just been busy with work lately.",
    time: '2:32 PM',
    isReceived: true,
  },
  {
    id: 'msg3',
    text: 'I was wondering if you wanted to grab coffee this weekend?',
    time: '2:33 PM',
    isReceived: false,
  },
  {
    id: 'msg4',
    text: "That sounds great! I would love to catch up.",
    time: '2:34 PM',
    isReceived: true,
  },
  {
    id: 'msg5',
    text: 'Perfect! How about Saturday around 2pm at that new place downtown?',
    time: '2:35 PM',
    isReceived: false,
  },
  {
    id: 'msg6',
    text: 'Hey, how are you doing?',
    time: '2:35 PM',
    isReceived: true,
  },
];

const Messenger = () => {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const navigate = useNavigate();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: `msg${messages.length + 1}`,
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isReceived: false,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    toast({
      description: "Message sent successfully!",
    });
  };

  const startVideoCall = () => {
    navigate('/video-call');
    toast({
      description: "Starting video call...",
    });
  };
  
  const startAudioCall = () => {
    toast({
      description: "Starting audio call...",
    });
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold mb-2">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations" 
                className="pl-9"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full justify-start px-4 pt-2">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              <TabsTrigger value="online" className="flex-1">Online</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                {mockConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.user.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                      </div>
                      <p className={`text-sm truncate ${
                        !conversation.lastMessage.isRead && !conversation.lastMessage.isSender ? 'font-semibold' : 'text-muted-foreground'
                      }`}>
                        {conversation.lastMessage.isSender && 'You: '}
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-social rounded-full flex items-center justify-center text-white text-xs">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                {mockConversations.filter(c => c.unreadCount > 0).map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                      </div>
                      <p className="text-sm truncate font-semibold">
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                    <span className="w-5 h-5 bg-social rounded-full flex items-center justify-center text-white text-xs">
                      {conversation.unreadCount}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="online" className="mt-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                {mockConversations.filter(c => c.user.isOnline).map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                      </div>
                      <p className="text-sm truncate text-muted-foreground">
                        {conversation.lastMessage.isSender && 'You: '}
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Chat Window */}
        <div className="hidden md:flex md:flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeConversation.user.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.user.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={startVideoCall}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={startAudioCall}
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isReceived ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      message.isReceived 
                        ? 'bg-accent text-accent-foreground rounded-tl-none' 
                        : 'bg-social text-social-foreground rounded-tr-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isReceived ? 'text-muted-foreground' : 'text-social-foreground/80'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input 
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
