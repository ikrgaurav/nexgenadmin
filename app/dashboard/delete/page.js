// app/dashboard/delete/page.js
"use client"
import Navbar from '../../../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

export default function DeletePost() {
  const isAuthenticated = useAuth();
  const [loading, setLoading] = useState(true);

  // Check if the authentication state is determined
  if (isAuthenticated === false && loading) {
    setLoading(false);
  }

  if (!loading && !isAuthenticated) {
    return <p>Redirecting...</p>; // Optional: Show a redirect message
  }
  const [postId, setPostId] = useState('');

  const handleDelete = async () => {
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN;

    try {
      await axios.delete(`https://nexgen-068ea958c43a.herokuapp.com/api/blogs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-semibold">Delete Post</h2>
        <input value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="Enter Post ID" className="input" required />
        <button onClick={handleDelete} className="btn">Delete Post</button>
      </div>
    </div>
  );
}
