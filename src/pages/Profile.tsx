
import React from 'react';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';

// Mock user data
const currentUser = {
  id: 'user1',
  name: 'Jane Smith',
  username: 'janesmith',
  bio: 'Digital designer & photography enthusiast. Sharing thoughts that matter.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format',
  isCurrentUser: true,
  isFollowing: false,
  followersCount: 458,
  followingCount: 285,
  postsCount: 42,
};

const Profile = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      <main className="container py-4 max-w-2xl mx-auto">
        <UserProfile user={currentUser} />
      </main>
    </div>
  );
};

export default Profile;
