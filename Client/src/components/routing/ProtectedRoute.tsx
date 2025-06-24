import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectIsAuthenticated, selectUserRole } from '@/store/slices/authSlice'

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles?: Array<'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN'>
    fallbackUrl?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
    fallbackUrl = '/login'
}) => {
    const router = useRouter()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const userRole = useAppSelector(selectUserRole)

    useEffect(() => {
        // If not authenticated, redirect to login
        if (!isAuthenticated) {
            router.push(fallbackUrl)
            return
        }

        // If user role is not in allowed roles, redirect to appropriate dashboard
        if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
            const roleDashboards = {
                STUDENT: '/student',
                TEACHER: '/teacher',
                ADMIN: '/admin',
                SUPER_ADMIN: '/superadmin'
            }
            router.push(roleDashboards[userRole])
            return
        }
    }, [isAuthenticated, userRole, allowedRoles, router, fallbackUrl])

    // Show loading or nothing while redirecting
    if (!isAuthenticated || (allowedRoles && userRole && !allowedRoles.includes(userRole))) {
        return (
            <div className="min-h-screen bg-theme flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-theme/70">Redirecting...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

// Role-specific route guards
export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute allowedRoles={['STUDENT']}>{children}</ProtectedRoute>
)

export const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute allowedRoles={['TEACHER']}>{children}</ProtectedRoute>
)

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>{children}</ProtectedRoute>
)

export const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>{children}</ProtectedRoute>
)

// Public route guard (redirects authenticated users to their dashboard)
export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const userRole = useAppSelector(selectUserRole)

    useEffect(() => {
        if (isAuthenticated && userRole) {
            const roleDashboards = {
                STUDENT: '/student',
                TEACHER: '/teacher',
                ADMIN: '/admin',
                SUPER_ADMIN: '/superadmin'
            }
            router.push(roleDashboards[userRole])
        }
    }, [isAuthenticated, userRole, router])

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-theme flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>                    <p className="text-theme/70">Redirecting to dashboard...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default ProtectedRoute
