import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectIsAuthenticated, selectCurrentUser } from '@/store/slices/authSlice'
import { selectCurrentTheme, toggleTheme } from '@/store/slices/themeSlice'
import { selectCurrentLanguage, setLanguage } from '@/store/slices/languageSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function IndexPage() {
    const dispatch = useAppDispatch()

    // Redux state
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const currentUser = useAppSelector(selectCurrentUser)
    const currentTheme = useAppSelector(selectCurrentTheme)
    const currentLanguage = useAppSelector(selectCurrentLanguage)

    const handleThemeToggle = () => {
        dispatch(toggleTheme())
    }

    const handleLanguageToggle = () => {
        dispatch(setLanguage(currentLanguage === 'en' ? 'ar' : 'en'))
    }

    return (
        <div className="min-h-screen bg-theme text-theme p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <header className="text-center space-y-2">
                    <h1 className="text-4xl font-logo text-primary">Task-Flow LMS</h1>
                    <p className="text-lg font-body text-theme/80">Infrastructure Test Page</p>
                </header>

                {/* Control Panel */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">Controls</CardTitle>
                        <CardDescription className="font-body">Test Redux, Theme, and Language features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 flex-wrap">
                            <Button onClick={handleThemeToggle} variant="outline">
                                Toggle Theme ({String(currentTheme)})
                            </Button>
                            <Button onClick={handleLanguageToggle} variant="outline">
                                Toggle Language ({currentLanguage.toUpperCase()})
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Redux State Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-body">Authentication State</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 font-body">
                            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                            {currentUser && (
                                <>
                                    <p><strong>User:</strong> {currentUser.name}</p>
                                    <p><strong>Role:</strong> {currentUser.role}</p>
                                    <p><strong>Email:</strong> {currentUser.email}</p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-body">System State</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 font-body">
                            <p><strong>Theme:</strong> {String(currentTheme)}</p>
                            <p><strong>Language:</strong> {currentLanguage.toUpperCase()}</p>
                            <p><strong>Direction:</strong> {currentLanguage === 'ar' ? 'RTL' : 'LTR'}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Font Demonstration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">Font Demonstration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-signature text-2xl text-primary">Dancing Script - For signatures</p>
                            <p className="font-logo text-xl text-primary">Edu NSW ACT Hand - For logos</p>
                            <p className="font-body text-theme">Lora - For body text</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 flex-wrap">
                            {!isAuthenticated ? (
                                <Button onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        window.location.href = '/login'
                                    }
                                }}>
                                    Login
                                </Button>
                            ) : (
                                <Button onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        localStorage.removeItem('token')
                                        window.location.reload()
                                    }
                                }}>
                                    Logout
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
