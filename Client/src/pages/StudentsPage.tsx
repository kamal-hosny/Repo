import { useGetStudentsPageQuery } from "@/app/api/studentApiSlice";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Student } from "@/types/StudentType";

const StudentsPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetStudentsPageQuery(page);
  const navigate = useNavigate();

  const students = useMemo(() => data ?? [], [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold mb-4">Students</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {students.map((student: Student) => (
          <Card key={student._id} className="relative">
            <div
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 cursor-pointer"
              onClick={() =>
                navigate(`/universities/${student.universityId?._id ?? "*"}`)
              }
              title="Go to University"
            />
            <CardContent className="space-y-2 p-4">
              <p className="text-lg font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <p className="text-sm text-muted-foreground">
                University: {student.universityId?.name ?? "*"}
              </p>
              <Button
                onClick={() => navigate(`/students/${student._id}`)}
                variant="outline"
                className="mt-2"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button
          variant="ghost"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span className="self-center">Page {page}</span>
        <Button variant="ghost" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudentsPage;
