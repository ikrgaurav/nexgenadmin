"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Editor } from "@tinymce/tinymce-react";

export default function AddPostPage() {
  const isAuthenticated = useAuth();
  const [loading, setLoading] = useState(true);

  if (isAuthenticated === false && loading) {
    setLoading(false);
  }

  if (!loading && !isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleAddPost = async () => {
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN;
    try {
      await axios.post(
        "https://nexgen-068ea958c43a.herokuapp.com/api/blogs",
        { name: title, image, text: content, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Post added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding post.");
    }
  };

  const handleEditorChange = (content) => {
    setContent(content);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <br />
        <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
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

        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap",
              "preview", "anchor", "searchreplace", "visualblocks",
              "code", "fullscreen", "insertdatetime", "media", "table",
              "paste", "help", "wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image | removeformat | help",
            content_style: "body { font-family:Arial,Helvetica,sans-serif; font-size:14px }",
          }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input mb-4"
        />
        <button onClick={handleAddPost} className="btn">
          Add Post
        </button>
      </div>
    </div>
  );
}