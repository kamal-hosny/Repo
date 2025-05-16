interface Student {
    _id: string;
    name: string;
    email: string;
    universityId: {
        _id: string;
        name: string;
    } | null;
    createdAt: string;
    updatedAt: string;    
}

export type { Student };