import React from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hooks'
import { selectIsAuthenticated } from '@/store/slices/authSlice'
import { useEffect } from 'react'

interface GlobalRouterProps {
    children: React.ReactNode
}

export const GlobalRouter: React.FC<GlobalRouterProps> = ({ children }) => {
    const router = useRouter()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    useEffect(() => {
        // Only redirect if we're on protected routes (client-side only)
        if (typeof window === 'undefined') return

        const publicRoutes = ['/', '/login']
        const currentPath = router.pathname

        // If not authenticated and trying to access protected route, redirect to login
        if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
            router.push('/login')
            return
        }

        // If authenticated and on login page, redirect to home
        if (isAuthenticated && currentPath === '/login') {
            router.push('/')
            return
        }
    }, [isAuthenticated, router])

    // Don't render anything while redirecting
    if (!isAuthenticated && router.pathname !== '/' && router.pathname !== '/login') {
        return (
            <div className="min-h-screen bg-theme flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-theme/70 text-lg">Redirecting...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default GlobalRouter
