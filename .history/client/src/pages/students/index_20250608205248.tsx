"use client";

import { useGetStudentsPageQuery } from "@/app/api/studentApiSlice";
import { useState, useCallback, memo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import type { Student } from "@/types/StudentType";
import { GraduationCap, Users, Building, ArrowLeft, ExternalLink } from "lucide-react";

// Memoized Student Card Component for better performance
const StudentCard = memo(({ student, onViewUniversity }: {
  student: Student;
  onViewUniversity: (universityId: string) => void;
}) => (
  <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
    <CardContent className="p-0">
      {/* Card Header with University Badge */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 relative">
        <div className="flex justify-between items-start">
          <div className="bg-white/20 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewUniversity(student.universityId?._id ?? "*")}
            className="text-white hover:bg-white/20 p-2 h-auto"
            title="View University"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {student.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{student.email}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <Building className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {student.universityId?.name ?? "University not specified"}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
));

StudentCard.displayName = 'StudentCard';

const StudentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetStudentsPageQuery(
    currentPage,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const router = useRouter();

  const students = data?.students ?? [];
  const totalPages = Math.ceil((data?.totalStudents ?? 0) / 10);
  const totalStudents = data?.totalStudents ?? 0;
  // Memoized callbacks for better performance
  const handleViewProfile = useCallback((id: string) => {
    router.push(`/students/${id}`);
  }, [router]);

  const handleViewUniversity = useCallback((universityId: string) => {
    router.push(`/universities/${universityId}`);
  }, [router]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);
  const renderPageNumbers = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, currentPage + 3);

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <>
      <Head>
        <title>Student Directory - Enterprise University</title>
        <meta name="description" content="Browse the student directory at Enterprise University" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Student Directory</h1>
                <p className="text-gray-600">Browse our vibrant student community</p>
              </div>
            </div>
              {!isLoading && !isError && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <span className="font-semibold">Total Students:</span> {totalStudents} • 
                  <span className="font-semibold ml-2">Page:</span> {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading students...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-800 font-semibold mb-2">Unable to load students</p>
                <p className="text-red-600 text-sm">Please try refreshing the page or contact support if the problem persists.</p>
              </div>
            </div>
          ) : (            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {students.map((student: Student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onViewProfile={handleViewProfile}
                    onViewUniversity={handleViewUniversity}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-wrap justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Previous
                  </Button>

                  {renderPageNumbers()}

                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Next
                  </Button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Showing page {currentPage} of {totalPages} ({totalStudents} total students)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};export default StudentsPage;
