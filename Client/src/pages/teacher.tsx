import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { selectCurrentTheme } from '@/store/slices/themeSlice'
import { selectCurrentLanguage } from '@/store/slices/languageSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TeacherPage() {
    const currentUser = useAppSelector(selectCurrentUser)
    const currentTheme = useAppSelector(selectCurrentTheme)
    const currentLanguage = useAppSelector(selectCurrentLanguage)

    const userRole = currentUser?.role

    return (
        <div className="min-h-screen bg-theme text-theme p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Page Header */}
                <header className="space-y-2">
                    <h1 className="text-4xl font-logo text-primary">Teaching Hub</h1>
                    <p className="text-lg font-body text-theme/80">
                        {currentLanguage === 'ar' ? 'مركز التدريس' : 'Your Teaching Dashboard'}
                    </p>
                </header>

                {/* Role-Based Content - Same page, different content based on role */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Teacher-Specific View */}
                    {userRole === 'TEACHER' && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">My Courses</CardTitle>
                                    <CardDescription>Manage your teaching courses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Create and manage course content, assignments, and student progress.
                                    </p>
                                    <Button variant="outline" size="sm">Manage Courses</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Students</CardTitle>
                                    <CardDescription>View and manage your students</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Monitor student enrollment, progress, and communication.
                                    </p>
                                    <Button variant="outline" size="sm">View Students</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Assignments</CardTitle>
                                    <CardDescription>Create and grade assignments</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Create assignments, set deadlines, and grade submissions.
                                    </p>
                                    <Button variant="outline" size="sm">Manage Assignments</Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Admin accessing teacher page - shows oversight view */}
                    {(userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Teacher Management</CardTitle>
                                    <CardDescription>Oversee teaching staff</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Monitor teacher performance and course management.
                                    </p>
                                    <Button variant="outline" size="sm">View Teachers</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Course Oversight</CardTitle>
                                    <CardDescription>Monitor all courses and curricula</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Review course content, standards, and quality metrics.
                                    </p>
                                    <Button variant="outline" size="sm">Course Analytics</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Institutional Reports</CardTitle>
                                    <CardDescription>Generate teaching reports</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Access comprehensive reports on teaching effectiveness.
                                    </p>
                                    <Button variant="outline" size="sm">View Reports</Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Student accessing teacher page - limited view */}
                    {userRole === 'STUDENT' && (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="font-body text-center">Access Restricted</CardTitle>
                                <CardDescription className="text-center">
                                    This page has limited access for students
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="font-body text-sm text-theme/70 mb-4">
                                    Students can view teacher contact information and office hours.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = '/student'}
                                >
                                    Return to Student Hub
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* User Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">User Information</CardTitle>
                        <CardDescription>Current user and system status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 font-body">
                        <p><strong>Name:</strong> {currentUser?.name}</p>
                        <p><strong>Role:</strong> {currentUser?.role}</p>
                        <p><strong>Email:</strong> {currentUser?.email}</p>
                        <p><strong>Theme:</strong> {String(currentTheme)}</p>
                        <p><strong>Language:</strong> {currentLanguage.toUpperCase()}</p>
                        <p><strong>Page:</strong> Teacher Hub (Unified Page with Role-Based Content)</p>
                    </CardContent>
                </Card>

                {/* Navigation Example */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">Quick Navigation</CardTitle>
                        <CardDescription>Test unified routing system</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/student'}
                            >
                                Student Page
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/admin'}
                            >
                                Admin Page
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/superadmin'}
                            >
                                Super Admin
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    window.location.href = '/login'
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                        <p className="text-xs text-theme/60 font-body">
                            Note: Global Router controls access and content based on your role.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
