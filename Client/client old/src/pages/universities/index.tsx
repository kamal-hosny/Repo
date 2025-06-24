"use client";

import { useGetUniversitiesPageQuery } from "@/app/api/UniversityApiSlice"; 
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, memo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, ArrowLeft, MapPin, Calendar, Users, GraduationCap, Globe } from "lucide-react";
import type { University } from "@/types/UniversityType";
import toast, { Toaster } from "react-hot-toast";

// Memoized University Card Component with enhanced design
const UniversityCard = memo(({ university, onView }: {
  university: University;
  onView: (id: string) => void;
}) => (
  <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group hover:-translate-y-1">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {university.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />

          </div>
        </div>
        {university.logo && (
          <img 
            src={university.logo} 
            alt={`${university.name} logo`}
            className="w-12 h-12 rounded-lg object-cover border"
          />
        )}
      </div>
    </CardHeader>
    
    <CardContent className="pt-0">
      <p className="text-sm text-gray-500 mb-4 line-clamp-3">
        {university.description || "No description available"}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {university.establishedYear && (
          <span className="inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium bg-gray-100 text-gray-700 border-gray-200">
            <Calendar className="h-3 w-3 mr-1" />
            Est. {university.establishedYear}
          </span>
        )}
        {university.students && (
          <span className="inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium bg-gray-100 text-gray-700 border-gray-200">
            <Users className="h-3 w-3 mr-1" />
            {university.students.length} Students
          </span>
        )}
        {university.courses && (
          <span className="inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium bg-gray-100 text-gray-700 border-gray-200">
            <GraduationCap className="h-3 w-3 mr-1" />
            {university.courses.length} Courses
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => onView(university._id)} 
          className="bg-blue-600 text-white hover:bg-blue-700 flex-1"
        >
          View Details
        </Button>
        {university.website && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(university.website, '_blank')}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Globe className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
));

UniversityCard.displayName = "UniversityCard";

// Loading Skeleton Component
const UniversityCardSkeleton = () => (
  <Card className="shadow-md overflow-hidden">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse"></div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
    </CardContent>
  </Card>
);

// Main Page Component
const UniversitiesPage = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const currentLimit = parseInt(router.query.limit as string) || 12;
  const [urlCorrected, setUrlCorrected] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { page, limit } = router.query;
      const hasPageParam = page !== undefined;
      const hasLimitParam = limit !== undefined;

      if (!hasPageParam || !hasLimitParam) {
        router.replace({
          pathname: '/universities',
          query: {
            page: hasPageParam ? page : 1,
            limit: hasLimitParam ? limit : 12
          }
        }, undefined, { shallow: true }).then(() => setUrlCorrected(true));
      } else {
        setUrlCorrected(true);
      }
    }
  }, [router]);

  const { data, isLoading, isError, error } = useGetUniversitiesPageQuery(
    { page: currentPage, limit: currentLimit },
    {
      refetchOnMountOrArgChange: true,
      skip: !router.isReady || !urlCorrected,
    }
  );

  const universities = Array.isArray(data) ? data : data?.universities ?? [];

  const totalPages = data?.totalPages ?? 0;

  const handleView = useCallback((id: string) => {
    router.push(`/universities/${id}`);
  }, [router]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage !== currentPage) {
      toast.success(`Loading page ${newPage}...`);
      router.push({
        pathname: "/universities",
        query: {
          page: newPage,
          limit: currentLimit,
        },
      });
    }
  }, [router, currentLimit, currentPage]);

  const handleLimitChange = useCallback((newLimit: number) => {
    toast.success(`Showing ${newLimit} universities per page`);
    router.push({
      pathname: "/universities",
      query: {
        page: 1, // Reset to first page when changing limit
        limit: newLimit,
      },
    });
  }, [router]);

  const renderPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    // Add first page if not in range
    if (start > 1) {
      pages.push(
        <Button
          key={1}
          variant="ghost"
          onClick={() => handlePageChange(1)}
          className="text-blue-600 hover:bg-blue-50"
        >
          1
        </Button>
      );
      if (start > 2) {
        pages.push(<span key="start-ellipsis" className="px-2 text-gray-400">...</span>);
      }
    }

    // Add page numbers in range
    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-blue-600 hover:bg-blue-50"}
        >
          {i}
        </Button>
      );
    }

    // Add last page if not in range
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2 text-gray-400">...</span>);
      }
      pages.push(
        <Button
          key={totalPages}
          variant="ghost"
          onClick={() => handlePageChange(totalPages)}
          className="text-blue-600 hover:bg-blue-50"
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <>
      <Head>
        <title>University Directory - Enterprise</title>
        <meta name="description" content="Explore our comprehensive university directory with detailed information about institutions worldwide." />
      </Head>

      <Toaster position="bottom-right" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Building2 className="h-6 w-6 text-blue-600" />
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">University Directory</h1>
                <p className="text-gray-600">
                  Discover and explore universities worldwide
                  {data && ` - ${universities.length} universities on page ${currentPage} of ${totalPages}`}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Universities per page:</span>
                <select 
                  value={currentLimit} 
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              {data && (
                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold">{universities.length * totalPages}</span> universities
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: currentLimit }).map((_, index) => (
                <UniversityCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-800 font-semibold mb-2">Failed to load universities</h3>
                <p className="text-red-600 text-sm mb-4">
                  {error && 'data' in error ? (error.data as any)?.message || 'An error occurred' : 'Network error'}
                </p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : universities.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-800 font-semibold mb-2">No Universities Found</h3>
                <p className="text-gray-600 text-sm">
                  There are no universities available at the moment.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Universities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {universities.map((university) => (
                  <UniversityCard 
                    key={university._id} 
                    university={university} 
                    onView={handleView} 
                  />
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {renderPageNumbers()}
                    </div>

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span> 
                    {data && (
                      <span className="mx-2">•</span>
                    )}
                    Showing <span className="font-semibold">{universities.length}</span> universities
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UniversitiesPage;