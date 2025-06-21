interface Student {
    _id: string;
    name: string;
    email: string;
    universityId: {
        _id: string;
        name: string;
    } | null;
    courses: Course[]; // Changed from string[]
    createdAt: string;
    updatedAt: string;    
}

interface loginInput {
    studentId: string;
    password: string;
}

export interface Course {
  _id: string;
  name: string;
  // description?: string; 
  // hours?: number;       
}

export interface PaginatedStudentsResponse {
  students: Student[];
  currentPage: number;
  totalPages: number;
  // totalItems: number; // Let's add this if confirmed later
}

export type { Student, loginInput };
