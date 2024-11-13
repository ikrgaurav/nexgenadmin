"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        src="/logo.png"
        alt="Logo"
        width={300}
        height={300}
        className="mb-8"
      />
      <button
        onClick={handleGoToLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
}
