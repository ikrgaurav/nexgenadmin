"use client";
import { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase/config";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // List of allowed email addresses
  const allowedEmails = [
    "sonakshi.bajpai15@gmail.com",
    "allowedemail2@example.com",
  ];

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user's email is in the allowed list
      if (allowedEmails.includes(user.email)) {
        console.log("Authorized user:", user.email);
        // Redirect to the dashboard or home page
        router.push("/dashboard");
      } else {
        // Sign out the user if they are not allowed
        alert("Unauthorized access. Contact support for assistance.");
        auth.signOut();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Log In
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
