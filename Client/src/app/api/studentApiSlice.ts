import { apiSlice } from "./apiSlice";
import type { Student, PaginatedStudentsResponse } from "../../types/StudentType";
import { STUDENT_URL } from "../constants";


export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStudentsPage: builder.query<PaginatedStudentsResponse, number>({
            query: (page) => ({
                url: `${STUDENT_URL}?page=${page}`,
                method: "GET",
            }),
        }),
        getStudentById: builder.query<Student, string>({
            query: (id) => ({
                url: `${STUDENT_URL}/${id}`,
                method: "GET",
            }),
        }),
        editStudent: builder.mutation<Student, { id: string; data: {name: string; email: string; password: string | undefined} }>({
            query: ({ id, data  }) => ({
                url: `${STUDENT_URL}/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteStudent: builder.mutation<{ id: string; message: string }, string>({
            query: (id) => ({
                url: `${STUDENT_URL}/${id}`,
                method: "DELETE",
            })
        })
    }),


});
export const { useGetStudentByIdQuery, useGetStudentsPageQuery, useEditStudentMutation, useDeleteStudentMutation } = studentApiSlice;
