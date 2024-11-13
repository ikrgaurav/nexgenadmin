"use client";
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const isAuthenticated = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!isAuthenticated) return null; // Prevent rendering if not authenticated

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-semibold">
          Welcome to the Dashboard{user ? `, ${user.displayName}` : ""}!
        </h2>
        <p>Select an option from the navbar to manage posts.</p>
      </div>
    </div>
  );
}
