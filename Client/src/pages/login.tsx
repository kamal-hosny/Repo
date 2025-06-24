"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useLoginMutation } from "@/app/api/auth";
import type { loginInput } from "@/types/StudentType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, GraduationCap, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [studentDetails, setStudentDetails] = useState<loginInput>({
    studentId: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(studentDetails).unwrap();
      toast.success("Welcome back! Login successful");
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("student", JSON.stringify(res.student));
      router.push(`/students/${res.student._id}`);
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Head>
        <title>Student Portal Login - Enterprise University</title>
        <meta name="description" content="Access your Enterprise University student portal to view courses, grades, and academic information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="font-serif text-xl font-semibold text-gray-900">
                  Enterprise University
                </span>
              </Link>
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Student Portal</h1>
              <p className="text-gray-600">Sign in to access your academic dashboard</p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-serif font-bold text-gray-900">
                  Welcome Back
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-gray-700 font-medium">
                      Student ID
                    </Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your Student ID"
                      value={studentDetails.studentId}
                      onChange={(e) =>
                        setStudentDetails({
                          ...studentDetails,
                          studentId: e.target.value,
                        })
                      }
                      className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={studentDetails.password}
                      onChange={(e) =>
                        setStudentDetails({
                          ...studentDetails,
                          password: e.target.value,
                        })
                      }
                      className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Need help accessing your account?{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                      Contact Support
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Not a student yet?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Learn about our programs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
