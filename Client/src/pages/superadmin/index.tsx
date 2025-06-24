import React from 'react'
import { useTranslation } from 'react-i18next'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Users, BarChart3, Wrench, Database, GraduationCap } from 'lucide-react'

const SuperAdminPage: React.FC = () => {
    const { t } = useTranslation()
    const currentUser = useAppSelector(selectCurrentUser)

    return (
        <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{t('pages.superadmin.title')}</h1>
                            <p className="text-muted-foreground">
                                {t('common.welcome')}, {currentUser?.name || 'Super Admin'}!
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
                        {/* System Configuration */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Shield className="h-5 w-5" />
                                    <span>System Config</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.superadmin.systemDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    System Settings
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Global User Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>Global Users</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.superadmin.usersDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Manage All Users
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Analytics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5" />
                                    <span>Analytics</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.superadmin.analyticsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    View Analytics
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Maintenance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Wrench className="h-5 w-5" />
                                    <span>Maintenance</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.superadmin.maintenanceDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    System Maintenance
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Database Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Database className="h-5 w-5" />
                                    <span>Database</span>
                                </CardTitle>
                                <CardDescription>
                                    Manage database and backups
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    Database Tools
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Global System Stats */}
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Global Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Institutions</span>
                                        <span className="font-semibold">25</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Users</span>
                                        <span className="font-semibold">15,234</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Active Sessions</span>
                                        <span className="font-semibold">1,523</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">System Uptime</span>
                                        <span className="font-semibold text-green-600">99.9%</span>
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

export default SuperAdminPage

export async function getServerSideProps() {
    return {
        props: {}
    }
}
