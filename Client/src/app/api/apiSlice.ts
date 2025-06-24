import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", credentials: "include",
  prepareHeaders: (headers) => {
    // Add JWT token from localStorage if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Student", "Teacher", "University"],
  endpoints: () => ({}),
});
