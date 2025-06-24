import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectAdminDashboard, setAdminSection, setAdminUsersView } from '@/store/slices/dashboardSlice'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const OverviewSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('admin.teachers')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">24</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('admin.students')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">456</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('admin.onlineUsers')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">89</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Active Courses</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">18</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>System Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New teacher account created: Dr. Johnson</p>
                                    <p className="text-xs text-theme/70">30 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Student enrollment updated: Computer Science</p>
                                    <p className="text-xs text-theme/70">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Online Users</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">89</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Offline Users</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                    <span className="text-sm font-medium">391</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const UsersSection: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { usersView } = useAppSelector(selectAdminDashboard)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('admin.userManagement')}</h2>
                <div className="flex space-x-2">
                    <Button
                        variant={usersView === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setAdminUsersView('all'))}
                    >
                        {t('admin.allUsers')}
                    </Button>
                    <Button
                        variant={usersView === 'teachers' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setAdminUsersView('teachers'))}
                    >
                        {t('admin.teachers')}
                    </Button>
                    <Button
                        variant={usersView === 'students' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setAdminUsersView('students'))}
                    >
                        {t('admin.students')}
                    </Button>
                    <Button>{t('admin.addUser')}</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="text-left p-4">Name</th>
                                    <th className="text-left p-4">Email</th>
                                    <th className="text-left p-4">Role</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-left p-4">Last Active</th>
                                    <th className="text-left p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">DS</span>
                                            </div>
                                            <span className="font-medium">Dr. Smith</span>
                                        </div>
                                    </td>
                                    <td className="p-4">dr.smith@university.edu</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Teacher</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Online</span>
                                        </div>
                                    </td>
                                    <td className="p-4">Active now</td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline">{t('forms.edit')}</Button>
                                            <Button size="sm" variant="destructive">{t('forms.delete')}</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const CoursesSection: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Course Management</h2>
                <Button>Create Course</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Structures</CardTitle>
                        <CardDescription>CS-301 • Dr. Smith • 45 Students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Enrollment</span>
                                <span>45/50</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Active Assignments</span>
                                <span>3</span>
                            </div>
                            <Button className="w-full" variant="outline">Manage</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const AnalyticsSection: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Daily Active Users</span>
                                <span className="font-bold">89</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Weekly Active Users</span>
                                <span className="font-bold">234</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Monthly Active Users</span>
                                <span className="font-bold">456</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Server Uptime</span>
                                <span className="font-bold text-green-600">99.9%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Response Time</span>
                                <span className="font-bold">120ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Storage Used</span>
                                <span className="font-bold">45GB/100GB</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const SettingsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('admin.systemSettings')}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">User Registration</p>
                                    <p className="text-sm text-theme/70">Allow new user registrations</p>
                                </div>
                                <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-theme/70">Send system notifications via email</p>
                                </div>
                                <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-theme/70">Require 2FA for admin accounts</p>
                                </div>
                                <Button variant="outline" size="sm">Required</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Password Policy</p>
                                    <p className="text-sm text-theme/70">Minimum 8 characters, mixed case</p>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const AdminDashboard: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { activeSection } = useAppSelector(selectAdminDashboard)

    const sections = [
        { id: 'overview', label: t('dashboard.overview'), component: OverviewSection },
        { id: 'users', label: t('admin.userManagement'), component: UsersSection },
        { id: 'courses', label: t('navigation.courses'), component: CoursesSection },
        { id: 'analytics', label: 'Analytics', component: AnalyticsSection },
        { id: 'settings', label: t('navigation.settings'), component: SettingsSection },]

    return (
        <div className="min-h-screen bg-theme">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-theme mb-2">Admin Dashboard</h1>
                    <p className="text-theme/70">Manage users, courses, and system settings</p>
                </div>

                <Tabs value={activeSection} onValueChange={(value) => dispatch(setAdminSection(value as 'overview' | 'users' | 'courses' | 'analytics' | 'settings'))}>
                    <TabsList className="grid w-full grid-cols-5">
                        {sections.map((section) => (
                            <TabsTrigger key={section.id} value={section.id}>
                                {section.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {sections.map((section) => (
                        <TabsContent key={section.id} value={section.id} className="mt-6">
                            <section.component />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default AdminDashboard
