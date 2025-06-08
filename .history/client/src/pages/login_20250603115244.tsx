"use client";

import { useState } from "react";
import { useLoginMutation } from "@/app/api/auth";
import type { loginInput } from "@/types/StudentType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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
      toast.success("Login successful");
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("student", JSON.stringify(res.student));
      router.push(`/students/${res.student._id}`);
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-4xl text-center ">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
