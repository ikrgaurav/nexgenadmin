"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../app/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center">
        <Image
          src="/darklogo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mr-2"
        />
        <Link href="/dashboard" className="text-xl font-bold">
          Dashboard
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/dashboard/add"><button className="btn">Add New Post</button></Link>
        <Link href="/dashboard/update"><button className="btn">Update Post</button></Link>
        <Link href="/dashboard/delete"><button className="btn">Delete Post</button></Link>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
