import { apiSlice } from "./apiSlice";
import { UNIVERSITY_URL } from "../constants";

// Define University interface (you may need to update this based on your backend structure)
interface University {
    _id: string;
    name: string;
    location: string;
    description?: string;
    establishedYear?: number;
    studentsCount?: number;
    teachersCount?: number;
    createdAt: string;
    updatedAt: string;
}

interface PaginatedUniversitiesResponse {
    universities: University[];
    currentPage: string;
    totalPages: number;
}

interface GetUniversitiesParams {
    page: number;
    limit: number;
}

export const universityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUniversitiesPage: builder.query<PaginatedUniversitiesResponse, GetUniversitiesParams>({
            query: ({ page, limit }) => ({
                url: `${UNIVERSITY_URL}?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        getUniversityById: builder.query<University, string>({
            query: (id) => ({
                url: `${UNIVERSITY_URL}/${id}`,
                method: "GET",
            }),
        }),
    })
});

export const { useGetUniversityByIdQuery, useGetUniversitiesPageQuery } = universityApiSlice;
export type { University, PaginatedUniversitiesResponse };
