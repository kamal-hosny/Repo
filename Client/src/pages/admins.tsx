import { useEffect } from 'react'
import { useRouter } from 'next/router'

// This file redirects to proper admin management route
export default function AdminsRedirect() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to the proper admins management route
        router.replace('/superadmin/admins')
    }, [router])

    return (
        <div className="min-h-screen bg-theme flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-theme/70">Redirecting to Admin Management...</p>
            </div>
        </div>
    )
}