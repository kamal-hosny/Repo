"use client";

import { useGetStudentByIdQuery } from "@/app/api/studentApiSlice";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const StudentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useGetStudentByIdQuery(id as string, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const student = useMemo(() => data ?? null, [data]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-red-500 text-lg">Failed to load student details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">{student.name}</h1>
        <p className="text-muted-foreground text-sm">{student.email}</p>
        <Badge variant="outline" className="mt-2">
          University ID: {student?.universityId?.name ?? "N/A"}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6 space-y-2">
          <p className="text-lg font-medium">Courses</p>
          {student?.courses?.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {student?.courses.map((course: string, index: number) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No courses enrolled.
            </p>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default StudentDetailsPage;
