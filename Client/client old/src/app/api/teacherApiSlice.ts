import { apiSlice } from "./apiSlice";
import { TEACHER_URL } from "../constants";

// Define Teacher interface (you may need to update this based on your backend structure)
interface Teacher {
    _id: string;
    name: string;
    email: string;
    universityId: {
        _id: string;
        name: string;
    } | null;
    subjects: string[];
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface PaginatedTeachersResponse {
    teachers: Teacher[];
    currentPage: string;
    totalPages: number;
}

interface GetTeachersParams {
    page: number;
    limit: number;
}

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeachersPage: builder.query<PaginatedTeachersResponse, GetTeachersParams>({
            query: ({ page, limit }) => ({
                url: `${TEACHER_URL}?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        getTeacherById: builder.query<Teacher, string>({
            query: (id) => ({
                url: `${TEACHER_URL}/${id}`,
                method: "GET",
            }),
        }),
    })
});

export const { useGetTeacherByIdQuery, useGetTeachersPageQuery } = teacherApiSlice;
export type { Teacher, PaginatedTeachersResponse };
