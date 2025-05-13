
import React from 'react';
import Navbar from '@/components/Navbar';
import CreatePostForm from '@/components/CreatePostForm';

const CreatePost = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      <main className="container py-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Post</h1>
          <p className="text-muted-foreground">
            Share something that will disappear in 24 hours
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm p-4 border">
          <CreatePostForm />
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
