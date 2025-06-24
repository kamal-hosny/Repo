import { apiSlice } from "./apiSlice";
import { UNIVERSITY_URL } from "../constants";
import type { University, PaginatedUniversitiesResponse , GetUniversitiesParams  } from "@/types/UniversityType";


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
        postUniversity: builder.mutation<University, Omit<University, '_id'>>({
            query: (newUniversity) => ({
                url: `${UNIVERSITY_URL}`,
                method: "POST",
                body: newUniversity,
            }),
        })
    })
});

export const { useGetUniversityByIdQuery, useGetUniversitiesPageQuery, usePostUniversityMutation } = universityApiSlice;
