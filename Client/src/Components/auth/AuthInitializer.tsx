import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials, clearAuth } from '@/store/slices/authSlice'

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        // Check for stored authentication on app startup
        const initializeAuth = () => {
            // Only run on client side
            if (typeof window === 'undefined') return

            try {
                const storedToken = localStorage.getItem('token')
                const storedUser = localStorage.getItem('user')

                if (storedToken && storedUser) {
                    const user = JSON.parse(storedUser)

                    // Validate the token is not expired (mock validation)
                    // In a real app, you would validate with the server
                    if (storedToken.startsWith('mock-jwt-token-')) {
                        dispatch(setCredentials({
                            user,
                            token: storedToken
                        }))
                    } else {
                        // Token is invalid, clear storage
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        dispatch(clearAuth())
                    }
                }
            } catch (error) {
                // If there's an error parsing stored data, clear it
                console.error('Error initializing auth:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                dispatch(clearAuth())
            }
        }

        initializeAuth()
    }, [dispatch])

    return null // This component doesn't render anything
}

export default AuthInitializer
