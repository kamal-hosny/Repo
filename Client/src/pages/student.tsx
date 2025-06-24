import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { selectCurrentTheme } from '@/store/slices/themeSlice'
import { selectCurrentLanguage } from '@/store/slices/languageSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function StudentPage() {
    const currentUser = useAppSelector(selectCurrentUser)
    const currentTheme = useAppSelector(selectCurrentTheme)
    const currentLanguage = useAppSelector(selectCurrentLanguage)

    const userRole = currentUser?.role

    return (
        <div className="min-h-screen bg-theme text-theme p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Page Header */}
                <header className="space-y-2">
                    <h1 className="text-4xl font-logo text-primary">Academic Hub</h1>
                    <p className="text-lg font-body text-theme/80">
                        {currentLanguage === 'ar' ? 'مركز الأكاديمي' : 'Your Academic Dashboard'}
                    </p>
                </header>

                {/* Role-Based Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Student-Specific View */}
                    {userRole === 'STUDENT' && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">My Courses</CardTitle>
                                    <CardDescription>View and manage your enrolled courses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        You have access to view your enrolled courses, assignments, and grades.
                                    </p>
                                    <Button variant="outline" size="sm">View Courses</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Assignments</CardTitle>
                                    <CardDescription>Track your assignments and deadlines</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Submit assignments and track your progress.
                                    </p>
                                    <Button variant="outline" size="sm">View Assignments</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Grades</CardTitle>
                                    <CardDescription>View your academic performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Check your grades and feedback from instructors.
                                    </p>
                                    <Button variant="outline" size="sm">View Grades</Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Teacher View (for demonstration) */}
                    {userRole === 'TEACHER' && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Course Management</CardTitle>
                                    <CardDescription>Manage your courses and curriculum</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Create and manage courses, assignments, and student progress.
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
                                        Monitor student progress and provide feedback.
                                    </p>
                                    <Button variant="outline" size="sm">View Students</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Grading</CardTitle>
                                    <CardDescription>Grade assignments and provide feedback</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Review and grade student submissions.
                                    </p>
                                    <Button variant="outline" size="sm">Grade Assignments</Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Admin View (for demonstration) */}
                    {(userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">User Management</CardTitle>
                                    <CardDescription>Manage users and permissions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Add, edit, and manage user accounts and roles.
                                    </p>
                                    <Button variant="outline" size="sm">Manage Users</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">System Overview</CardTitle>
                                    <CardDescription>Monitor system performance and usage</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        View analytics and system health metrics.
                                    </p>
                                    <Button variant="outline" size="sm">View Analytics</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-body">Settings</CardTitle>
                                    <CardDescription>Configure system settings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-sm text-theme/70 mb-4">
                                        Manage institutional settings and configuration.
                                    </p>
                                    <Button variant="outline" size="sm">System Settings</Button>
                                </CardContent>
                            </Card>
                        </>
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
                        <p><strong>Architecture:</strong> Unified Global Router + Protected Route</p>
                    </CardContent>
                </Card>

                {/* Navigation Example */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-body">Quick Navigation</CardTitle>
                        <CardDescription>Test role-based page access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/teacher'}
                            >
                                Teacher Page
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
                            Note: Global Router will redirect you based on your role permissions.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
