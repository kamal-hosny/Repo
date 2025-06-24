import React from 'react'
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
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setError, setLoading, selectIsAuthenticated } from '@/store/slices/authSlice'

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
    const { isLoading, error } = useAppSelector((state) => state.auth)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])

    const onSubmit = async (data: LoginFormData) => {
        console.log('Login attempt with:', data.email) // TODO: Remove when implementing real auth
        dispatch(setLoading(true))

        try {
            // TODO: Replace with actual API call
            // const response = await authAPI.login(data)
            // dispatch(setCredentials(response))

            // For now, show error message that backend is not connected
            dispatch(setError('Backend not connected. Please implement authentication API.'))
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Login failed'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="min-h-screen bg-theme flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Header with theme controls */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-logo text-primary">Task-Flow</h1>
                    <div className="flex gap-2">
                        {/* <LanguageSwitcher /> */}
                        <ThemeToggle />
                    </div>
                </div>

                {/* Login Form */}
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-body">{t('auth.loginTitle')}</CardTitle>
                        <CardDescription className="font-body">
                            {t('auth.loginRequired')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-body">{t('auth.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="font-body"
                                    placeholder="student@uni.edu"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 font-body">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="font-body">{t('auth.password')}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className="font-body"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 font-body">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                    className="rounded border-primary focus:ring-primary"
                                />
                                <Label htmlFor="rememberMe" className="text-sm font-body">
                                    {t('auth.rememberMe')}
                                </Label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm text-center font-body">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full font-body"
                                disabled={isLoading}
                            >
                                {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
                            </Button>

                            {/* Development Note */}
                            <div className="text-center text-sm text-theme/60 font-body">
                                <p>Infrastructure ready for authentication integration</p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>    )
}

export default LoginPage

// Add getServerSideProps to disable static optimization
export async function getServerSideProps() {
    return {
        props: {}
    }
}
