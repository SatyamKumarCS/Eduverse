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
import {
  Mail,
  Lock,
  User,
  ArrowLeft,
  GraduationCap,
  Award,
  Eye,
  EyeOff,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signupApi } from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      toast.error(
        "Password must contain uppercase, lowercase letters, and numbers"
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    const result = await signupApi(formData);
    console.log(result);

    if (result?.message === "User created successfully") {
      router.push("/login");
      setTimeout(() => {
        toast.success("Account created successfully! Please log in.");
      }, 400);
    } else {
      toast.error(result?.message || "Signup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-2 py-4">
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
        {/* Logo/Branding */}

        <Card className="border-primary/10 shadow-xl">
          <CardHeader className="space-y-1 ">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join thousands of learners worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-3 pb-3 border-b border-border">
                <label className="text-sm font-medium text-foreground">
                  I am a
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        formData.role === "student"
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-medium">Student</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="instructor"
                      checked={formData.role === "instructor"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="hidden"
                    />
                    <div
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        formData.role === "instructor"
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="font-medium">Instructor</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
                <p className="text-xs text-muted-foreground mt-1">
                  At least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswordConfirm ? "text":"password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-10 bg-background border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-border cursor-pointer"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-10 mt-4"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card text-muted-foreground">
                  Or sign up with
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
