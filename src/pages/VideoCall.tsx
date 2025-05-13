
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, MicOff, Video, VideoOff, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const VideoCall = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Mock data for call
  const callPartner = {
    id: 'user1',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format'
  };

  // Set up mock call connection
  useEffect(() => {
    // Simulate connecting to call
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
      
      toast({
        title: "Call connected",
        description: `You are now in a call with ${callPartner.name}`,
      });
      
      // Get user media for local video stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
              
              // For demo purposes, we'll use the same stream for remote video
              // In a real app, this would be the stream from the other user
              setTimeout(() => {
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = stream;
                }
              }, 1000);
            }
          })
          .catch(error => {
            console.error('Could not get user media:', error);
            toast({
              variant: "destructive",
              title: "Camera access denied",
              description: "Please allow camera and microphone access to use video calling",
            });
          });
      }
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      
      // Clean up media streams when component unmounts
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        const stream = remoteVideoRef.current.srcObject as MediaStream;
        if (stream !== localVideoRef.current?.srcObject) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, []);
  
  // Toggle microphone
  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => track.enabled = isMicMuted);
    }
  };
  
  // Toggle camera
  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => track.enabled = isCameraOff);
    }
  };
  
  // End call and navigate back
  const endCall = () => {
    // Stop all media tracks
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    toast({
      title: "Call ended",
      description: "The call has been ended",
    });
    
    navigate(-1);
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      {/* Remote Video (Full Screen) */}
      {isCallActive ? (
        <div className="flex-1 relative w-full h-full bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* User info when connecting */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${isConnecting ? '' : 'hidden'}`}>
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={callPartner.avatar} alt={callPartner.name} />
              <AvatarFallback>{callPartner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white mb-2">{callPartner.name}</h2>
            <p className="text-white/80">Connecting...</p>
          </div>
          
          {/* Local Video (Picture-in-Picture) */}
          <div className={`absolute ${isMobile ? 'top-4 right-4' : 'bottom-4 right-4'} w-1/4 max-w-[200px] aspect-video rounded-lg overflow-hidden border-2 border-white/20 shadow-lg`}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraOff ? 'hidden' : ''}`}
            />
            {isCameraOff && (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          
          {/* Call Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${isMicMuted ? 'bg-muted/20 text-white border-white/20' : 'bg-white/10 text-white border-white/20'}`}
              onClick={toggleMic}
            >
              {isMicMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${isCameraOff ? 'bg-muted/20 text-white border-white/20' : 'bg-white/10 text-white border-white/20'}`}
              onClick={toggleCamera}
            >
              {isCameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-14 w-14"
              onClick={endCall}
            >
              <Phone className="h-6 w-6 rotate-135" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-white/10 text-white border-white/20"
              onClick={() => navigate('/messenger')}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-black">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={callPartner.avatar} alt={callPartner.name} />
            <AvatarFallback>{callPartner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-white mb-2">{callPartner.name}</h2>
          <p className="text-white/80 mb-6">Calling...</p>
          
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full"
            onClick={endCall}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
