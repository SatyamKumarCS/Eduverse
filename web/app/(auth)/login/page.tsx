"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { loginApi } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      toast.error(
        "Password must contain uppercase, lowercase letters, and numbers"
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    const result=await loginApi({email,password});
    console.log(result);
    if (result.message=="Login successful"){
     toast.success("Logged in successfully!")

      setTimeout(()=>{
        router.push("/dashboard");
      },800)}
    else{
       console.log(result.message)
      toast.error("Login failed");
    }
    setLoading(false);
      // Redirect or show success message
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Link href="/" className="absolute top-6 left-6">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-md">

        <Card className="border-primary/10 shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text":"password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-10"
              >{loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                className="w-full border-border hover:bg-secondary/50 text-foreground bg-transparent"
              >
                <FcGoogle className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
