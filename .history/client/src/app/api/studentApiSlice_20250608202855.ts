import { apiSlice } from "./apiSlice";
import type { Student, PaginatedStudentsResponse } from "../../types/StudentType";
import { STUDENT_URL } from "../constants";


export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStudentsPage: builder.query<PaginatedStudentsResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `${STUDENT_URL}?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        getStudentById: builder.query<Student, string>({
            query: (id) => ({
                url: `${STUDENT_URL}/${id}`,
                method: "GET",
            }),

        }),
    })


});
export const {useGetStudentByIdQuery, useGetStudentsPageQuery} = studentApiSlice;
