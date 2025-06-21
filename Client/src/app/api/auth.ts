import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
    })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
