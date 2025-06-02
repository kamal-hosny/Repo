interface Student {
    _id: string;
    name: string;
    email: string;
    universityId: {
        _id: string;
        name: string;
    } | null;
    courses: string[];
    createdAt: string;
    updatedAt: string;    
}

interface loginInput {
    studentId: string;
    password: string;
}

export type { Student, loginInput };
