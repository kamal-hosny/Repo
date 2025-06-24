import React from 'react'
import { useTranslation } from 'react-i18next'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, BarChart3, Settings, GraduationCap } from 'lucide-react'

const AdminPage: React.FC = () => {
    const { t } = useTranslation()
    const currentUser = useAppSelector(selectCurrentUser)

    return (
        <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{t('pages.admin.title')}</h1>
                            <p className="text-muted-foreground">
                                {t('common.welcome')}, {currentUser?.name || 'Admin'}!
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-8 w-8 text-primary" />
                            <span className="font-semibold text-lg text-primary">Task-Flow</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* User Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>User Management</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.admin.usersDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Manage Users
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Course Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>Course Management</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.admin.coursesDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Manage Courses
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Reports & Analytics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5" />
                                    <span>Reports</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.admin.reportsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    View Reports
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Settings className="h-5 w-5" />
                                    <span>System Settings</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.admin.settingsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    System Settings
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Overview */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>System Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">2,345</div>
                                        <div className="text-sm text-muted-foreground">Total Users</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">156</div>
                                        <div className="text-sm text-muted-foreground">Active Courses</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">45</div>
                                        <div className="text-sm text-muted-foreground">Pending Requests</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">98%</div>
                                        <div className="text-sm text-muted-foreground">System Uptime</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}

export default AdminPage

export async function getServerSideProps() {
    return {
        props: {}
    }
}
