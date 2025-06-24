import { apiSlice } from './apiSlice'
import type { User } from '../slices/authSlice'
import { mockLogin, mockLogout, mockRefreshToken } from '@/lib/mockAuth'

interface LoginRequest {
    email: string
    password: string
}

interface LoginResponse {
    user: User
    token: string
    refreshToken: string
}

interface RegisterRequest {
    email: string
    password: string
    name: string
    role: User['role']
    universityId: string
}

// Development flag to use mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            queryFn: async (credentials) => {
                try {
                    if (USE_MOCK_API) {                        // Use mock authentication in development
                        const data = await mockLogin(credentials) as LoginResponse
                        return { data }
                    } else {
                        // Use real API
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(credentials),
                        })

                        if (!response.ok) {
                            throw new Error('Login failed')
                        }

                        const data = await response.json()
                        return { data }
                    }
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: { message: error instanceof Error ? error.message : 'Login failed' },
                            error: error instanceof Error ? error.message : 'Login failed'
                        }
                    }
                }
            },
        }),

        register: builder.mutation<LoginResponse, RegisterRequest>({
            queryFn: async (userData) => {
                try {
                    if (USE_MOCK_API) {
                        // Mock registration - in a real app, this would create a new user
                        throw new Error('Registration not available in demo mode')
                    } else {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify(userData),
                        })

                        if (!response.ok) {
                            throw new Error('Registration failed')
                        } const data = await response.json() as LoginResponse
                        return { data }
                    }
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: { message: error instanceof Error ? error.message : 'Registration failed' },
                            error: error instanceof Error ? error.message : 'Registration failed'
                        }
                    }
                }
            },
        }),

        logout: builder.mutation<void, void>({
            queryFn: async () => {
                try {
                    if (USE_MOCK_API) {
                        await mockLogout()
                        return { data: undefined }
                    } else {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/logout`, {
                            method: 'POST',
                        })

                        if (!response.ok) {
                            throw new Error('Logout failed')
                        }

                        return { data: undefined }
                    }
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: { message: error instanceof Error ? error.message : 'Logout failed' },
                            error: error instanceof Error ? error.message : 'Logout failed'
                        }
                    }
                }
            },
        }),

        refreshToken: builder.mutation<{ token: string }, { refreshToken: string }>({
            queryFn: async ({ refreshToken }) => {
                try {
                    if (USE_MOCK_API) {
                        const data = await mockRefreshToken(refreshToken)
                        return { data }
                    } else {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/refresh`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify({ refreshToken }),
                        })

                        if (!response.ok) {
                            throw new Error('Token refresh failed')
                        } const data = await response.json() as { token: string }
                        return { data }
                    }
                } catch (error) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: { message: error instanceof Error ? error.message : 'Token refresh failed' },
                            error: error instanceof Error ? error.message : 'Token refresh failed'
                        }
                    }
                }
            },
        }),

        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        updateProfile: builder.mutation<User, Partial<User>>({
            query: (profileData) => ({
                url: '/auth/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['User'],
        }),

        changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
            query: (passwordData) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: passwordData,
            }),
        }),

        requestPasswordReset: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
            query: (resetData) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: resetData,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
} = authApiSlice
