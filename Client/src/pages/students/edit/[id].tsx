"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditStudentMutation,
  useGetStudentByIdQuery,
} from "@/app/api/studentApiSlice";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  Save,
  GraduationCap,
  Users,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const StudentEditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [editStudent, { error, isSuccess }] = useEditStudentMutation();

  // get student data
  const {
    data: student,
    isLoading,
    isError,
  } = useGetStudentByIdQuery(id as string, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store the default form values when student data is available
  // This avoids recalculating the object on every render
  const memoizedDefaultValues = useMemo(() => {
    if (!student) return;
    return {
      name: student.name || "",
      email: student.email || "",
      password: "",
    };
  }, [student]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: memoizedDefaultValues,
  });

  // When student data is loaded, update the form with it
  // This makes sure the form shows the correct data
  useEffect(() => {
    if (memoizedDefaultValues) {
      reset(memoizedDefaultValues);
    }
  }, [memoizedDefaultValues, reset]);

  const onSubmit = async (data: FormData) => {
    if (!student?._id) return;

    // Create the data object to send, without password if it's empty
    const updatedData: {
      name: string;
      email: string;
      password: string | undefined;
    } = {
      name: data.name,
      email: data.email,
      password: data.password.trim() !== "" ? data.password : undefined,
    };

    try {
      await editStudent({
        id: student._id,
        data: updatedData,
      }).unwrap();
      toast.success("Approval request has been sent successfully ");
    } catch (error) {
      toast.error(`Edit failed ${error}`);
      console.error("Edit failed", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <div className="h-6 bg-gray-200 rounded w-40" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded w-32" />
                <div className="h-10 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Form Card Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className=" bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="h-6 bg-blue-400 rounded w-56 mx-auto" />
              </div>

              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Name Field Skeleton */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                      </div>
                      <div className="w-full h-12 bg-gray-100 rounded-lg" />
                    </div>
                  </div>

                  {/* Email Field Skeleton */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                      </div>
                      <div className="w-full h-12 bg-gray-100 rounded-lg" />
                    </div>
                  </div>

                  {/* Password Field Skeleton */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                      </div>
                      <div className="w-full h-12 bg-gray-100 rounded-lg" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="mt-8 flex flex-col sm:flex-row justify-start gap-4">
                  <div className="flex gap-4">
                    <div className="h-10 bg-gray-200 rounded w-24" />
                    <div className="h-10 bg-blue-200 rounded w-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-rose-500">Error loading student profile</p>;
  }

  return (
    <>
      <Head>
        <title>Edit Student - Enterprise</title>
        <meta
          name="description"
          content={`View and edit the academic profile of ${
            student?.name || "a student"
          } at Enterprise University`}
        />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="font-serif text-xl font-semibold text-gray-900">
                  Enterprise University
                </span>
              </Link>
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/students" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    All Students
                  </Link>
                </Button>
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <p className="text-xl font-bold text-white text-center">
                  Edit Student Information
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full px-4 py-3 pl-11 border ${
                          errors.name ? "border-rose-300" : "border-blue-100"
                        } rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500`}
                        placeholder="Enter your full name"
                        {...register("name", { required: "Name is required" })}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-rose-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-blue-500" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className={`w-full px-4 py-3 pl-11 border ${
                          errors.email ? "border-rose-300" : "border-blue-100"
                        } rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500`}
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-rose-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-blue-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full px-4 py-3 pl-11 bg-blue-50 border border-blue-100 rounded-lg text-gray-600"
                        placeholder="••••••••"
                        {...register("password")}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center shadow-md shadow-blue-100 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" /> Wait For Approval
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEditPage;
