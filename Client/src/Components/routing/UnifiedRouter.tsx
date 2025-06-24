import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUserRole } from '@/store/slices/authSlice'
import { routes } from '@/lib/routes'

interface UnifiedRouterProps {
    children: React.ReactNode
}

export const UnifiedRouter: React.FC<UnifiedRouterProps> = ({ children }) => {
    const router = useRouter()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const userRole = useSelector(selectUserRole)

    useEffect(() => {
        const handleRouting = () => {
            const currentPath = router.pathname

            // Skip routing logic for public routes (landing, login)
            if (routes.public.includes(currentPath)) {
                return
            }

            // If not authenticated and trying to access protected route, redirect to login
            if (!isAuthenticated) {
                if (currentPath !== '/login' && currentPath !== '/') {
                    router.replace('/login')
                }
                return
            }

            // If authenticated, handle role-based routing
            if (userRole) {
                const roleBasedRoute = routes.roleMap[userRole]
                const allowedRoutes = routes.protected[userRole]

                // Only redirect from login page to role-based dashboard, not from landing page
                if (currentPath === '/login') {
                    router.replace(roleBasedRoute)
                    return
                }

                // Check if current route is allowed for this role
                const isRouteAllowed = allowedRoutes.some(route =>
                    currentPath.startsWith(route.replace('*', ''))
                )

                // If route not allowed, redirect to role dashboard
                if (!isRouteAllowed) {
                    router.replace(roleBasedRoute)
                }
            }
        }

        handleRouting()
    }, [router.pathname, isAuthenticated, userRole, router])

    return <>{children}</>
}

export default UnifiedRouter
