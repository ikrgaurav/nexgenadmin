"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

export default function UpdatePostPage() {
  const isAuthenticated = useAuth();
  const [loading, setLoading] = useState(true);

  // Check if the authentication state is determined
  if (isAuthenticated === false && loading) {
    setLoading(false);
  }

  if (!loading && !isAuthenticated) {
    return <p>Redirecting...</p>; // Optional: Show a redirect message
  }
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleUpdatePost = async () => {
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN;
    try {
      await axios.patch(
        `https://nexgen-068ea958c43a.herokuapp.com/api/blogs/${postId}`,
        { name: title, image, text: content, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Post updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating post.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>
      <input
        type="text"
        placeholder="Enter Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        className="input mb-4"
      />
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input mb-4"
      />
      <input
        type="text"
        placeholder="Image Link"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="input mb-4"
      />
      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input mb-4 h-40"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input mb-4"
      />
      <button onClick={handleUpdatePost} className="btn">
        Update Post
      </button>
      </div>
    </div>
  );
}
