"use client";

import { useDeleteStudentMutation, useGetStudentByIdQuery } from "@/app/api/studentApiSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import {
  GraduationCap,
  ArrowLeft,
  Mail,
  Building,
  BookOpen,
  User,
  Calendar,
  Users,
  Trash2,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const StudentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // delete and close delete dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, isError } = useGetStudentByIdQuery(id as string, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const student = useMemo(() => data ?? null, [data]);


  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Student Profile - Enterprise University</title>
        </Head>

        <div className="min-h-screen bg-gray-50">
          {/* Header Skeleton */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-6 w-60" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError || !student) {
    return (
      <>
        <Head>
          <title>Student Not Found - Enterprise University</title>
        </Head>

        <div className="min-h-screen bg-gray-50">
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
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <User className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-serif font-bold text-red-800 mb-2">
                  Student Not Found
                </h1>
                <p className="text-red-600">
                  The student profile you are looking for could not be found or
                  may have been removed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{student.name} - Student Profile - Enterprise University</title>
        <meta
          name="description"
          content={`View the academic profile of ${student.name} at Enterprise University`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-serif font-bold mb-2">
                    {student.name}
                  </h1>
                  <div className="flex items-center gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{student.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  Student Profile
                </Badge>

                <div className="flex items-center space-x-3 mt-4">
  <Button
    asChild
    className="
      bg-white text-blue-600 hover:bg-blue-50  rounded p-2 h-9 w-9 cursor-pointer
    "
  >
    <Link href={`/students/edit/${student._id}`}>
      <Pencil className="h-4 w-4" />
    </Link>
  </Button>
  
  <Button
    className="
      bg-red-500 text-white hover:bg-red-600 rounded p-2 h-9 w-9 cursor-pointer

    "
    onClick={() => setIsDeleteOpen(true)}
  >
    <Trash2 className="h-4 w-4" />
  </Button>
</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* University Information */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900">
                      University Information
                    </h2>
                    <p className="text-gray-600">
                      Academic institution details
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {student?.universityId?.name ??
                            "University Not Specified"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Primary Institution
                        </p>
                      </div>
                      <div className="bg-blue-100 p-2 rounded">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Student Status
                        </h3>
                        <p className="text-sm text-gray-600">
                          Active Enrollment
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900">
                      Academic Program
                    </h2>
                    <p className="text-gray-600">
                      Enrolled courses and curriculum
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {student?.courses?.length > 0 ? (
                    <>
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Enrolled Courses ({student.courses.length})
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {student.courses.map((course) => (
                          <div
                            key={course._id}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {course.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Course ID: {course._id}
                                </p>
                              </div>
                              <div className="bg-blue-100 p-2 rounded">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Courses Enrolled
                      </h3>
                      <p className="text-gray-500">
                        This student is not currently enrolled in any courses.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information Card */}
          <Card className="border-0 shadow-lg mt-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Academic Summary
                  </h2>
                  <p className="text-gray-600">
                    Quick overview of academic standing
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {student?.courses?.length ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Enrolled Courses</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    Active
                  </div>
                  <div className="text-sm text-gray-600">Enrollment Status</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">Academic Year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>

            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/students">
                <Users className="h-4 w-4 mr-2" />
                View All Students
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <DeleteStudentDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        studentName={student.name}
        studentId={student._id}
      />
    </>
  );
};

export default StudentDetailsPage;

// DeleteStudentDialog component

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  studentId: string;
}

const DeleteStudentDialog = ({
  open,
  onOpenChange,
  studentName,
  studentId,
}: Props) => {

  const router = useRouter();

  const [deleteStudent, { isLoading }] = useDeleteStudentMutation();

  const handleDeleteStudent = async () => {
    try {
      console.log("Deleting student:", studentId);
      const res = await deleteStudent(studentId).unwrap();
      onOpenChange(false);
      router.push("/students");
      toast.success(res.message || "Student deleted successfully!");
      
      
    } catch (error) {
      toast.error(`Failed to delete student. ${error}`);
      console.log(`Failed to delete student. ${error}`);

    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Confirm Deletion</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{studentName}</strong>'s
            profile? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" className="cursor-pointer" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>

          <Button variant="destructive" className="text-white cursor-pointer" onClick={handleDeleteStudent}>
          {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
