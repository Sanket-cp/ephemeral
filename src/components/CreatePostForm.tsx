
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Image, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please add some content to your post",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, we would send this to an API
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your post has been created and will expire in 24 hours",
      });
      
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-32 resize-none"
        />
        
        {image && (
          <div className="relative mt-2 rounded-md overflow-hidden">
            <img
              src={image}
              alt="Upload preview"
              className="max-h-64 w-full object-contain"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="anonymous-mode"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="anonymous-mode">Post anonymously</Label>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <Label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Image className="h-4 w-4" />
              <span>Add Image</span>
            </Label>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Posting...
              </span>
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        This post will automatically expire after 24 hours
      </div>
    </form>
  );
};

export default CreatePostForm;
