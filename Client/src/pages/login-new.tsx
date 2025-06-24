import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
// import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { PublicRoute } from '@/components/routing/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials, setError, setLoading } from '@/store/slices/authSlice'

// Login form validation schema
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage: React.FC = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    // Demo credentials quick login
    const [selectedDemo, setSelectedDemo] = useState<string>('')

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }, [isAuthenticated, router])

    const onSubmit = async (data: LoginFormData) => {
        try {
            dispatch(setLoading(true))
            dispatch(setError(''))

            // Mock authentication for demo - replace with real API call
            const mockUsers = {
                'student@uni.edu': {
                    id: '1',
                    email: 'student@uni.edu',
                    name: 'Ahmed Hassan',
                    role: 'STUDENT' as const,
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
                    profileData: {
                        university: 'Cairo University',
                        faculty: 'Computer Science',
                        year: 3,
                        gpa: 3.8
                    }
                },
                'teacher@uni.edu': {
                    id: '2',
                    email: 'teacher@uni.edu',
                    name: 'Dr. Sarah Mohamed',
                    role: 'TEACHER' as const,
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                    profileData: {
                        university: 'Cairo University',
                        department: 'Computer Science',
                        position: 'Associate Professor',
                        courses: ['CS101', 'CS201', 'CS301']
                    }
                },
                'admin@uni.edu': {
                    id: '3',
                    email: 'admin@uni.edu',
                    name: 'Omar Khaled',
                    role: 'ADMIN' as const,
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
                    profileData: {
                        university: 'Cairo University',
                        department: 'Administration',
                        permissions: ['manage_users', 'manage_courses', 'view_reports']
                    }
                },
                'superadmin@system.com': {
                    id: '4',
                    email: 'superadmin@system.com',
                    name: 'System Administrator',
                    role: 'SUPER_ADMIN' as const,
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=System',
                    profileData: {
                        permissions: ['all'],
                        systemAccess: true
                    }
                }
            }

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            const user = mockUsers[data.email as keyof typeof mockUsers]
            if (user && data.password === 'password') {
                const token = `mock-jwt-token-${user.id}-${Date.now()}`

                dispatch(setCredentials({
                    user,
                    token
                }))

                // Store in localStorage if remember me is checked
                if (data.rememberMe) {
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                }

                router.push('/dashboard')
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.'
            dispatch(setError(errorMessage))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleDemoLogin = (role: string) => {
        const demoCredentials = {
            STUDENT: { email: 'student@uni.edu', password: 'password' },
            TEACHER: { email: 'teacher@uni.edu', password: 'password' },
            ADMIN: { email: 'admin@uni.edu', password: 'password' },
            SUPER_ADMIN: { email: 'superadmin@system.com', password: 'password' }
        }

        const credentials = demoCredentials[role as keyof typeof demoCredentials]
        if (credentials) {
            setValue('email', credentials.email)
            setValue('password', credentials.password)
            setSelectedDemo(role)
        }
    }

    return (
        <PublicRoute>
            <div className="min-h-screen bg-theme flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header with controls */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-logo text-primary">{t('app.name')}</h1>
                        <div className="flex space-x-2">
                            {/* <LanguageSwitcher /> */}
                            <ThemeToggle />
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">{t('auth.loginTitle')}</CardTitle>
                            <CardDescription>{t('app.welcome')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Error display */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('auth.email')}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="student@university.edu"
                                        className="w-full"
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('auth.password')}</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="w-full"
                                        {...register('password')}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary"
                                            {...register('rememberMe')}
                                        />
                                        <Label htmlFor="remember" className="text-sm">{t('auth.rememberMe')}</Label>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {t('auth.forgotPassword')}
                                    </button>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
                                </Button>
                            </form>

                            {/* Demo credentials section */}
                            <div className="border-t pt-4">
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {t('auth.demoCredentials')}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { role: 'STUDENT', label: t('roles.student') },
                                        { role: 'TEACHER', label: t('roles.teacher') },
                                        { role: 'ADMIN', label: t('roles.admin') },
                                        { role: 'SUPER_ADMIN', label: t('roles.superAdmin') }
                                    ].map(({ role, label }) => (
                                        <Button
                                            key={role}
                                            type="button"
                                            variant={selectedDemo === role ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleDemoLogin(role)}
                                            className="text-xs"
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PublicRoute>
    )
}

export default LoginPage

// Add getServerSideProps to disable static optimization
export async function getServerSideProps() {
    return {
        props: {}
    }
}
