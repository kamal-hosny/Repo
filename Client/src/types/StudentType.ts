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

export type { Student };