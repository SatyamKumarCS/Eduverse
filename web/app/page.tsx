"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };
  const handleClickSignup = () => {
    router.push("/sign-up");
  }
  return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Get started by logging in or creating a new account
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
          onClick={handleClick}>
            Log In
          </button>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
          onClick={handleClickSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

