import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectSuperAdminDashboard, setSuperAdminSection } from '@/store/slices/dashboardSlice'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const OverviewSection: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Universities</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">5</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Total Admins</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">15</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">System Health</CardTitle>
                        <CardDescription className="text-2xl font-bold text-green-600">Excellent</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Active Sessions</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">1,247</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>System-wide Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New university registered: Tech Institute</p>
                                    <p className="text-xs text-theme/70">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">System backup completed successfully</p>
                                    <p className="text-xs text-theme/70">4 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Performance optimization applied</p>
                                    <p className="text-xs text-theme/70">6 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Global Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Total Users</span>
                                <span className="font-bold">12,456</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Total Courses</span>
                                <span className="font-bold">345</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Total Assignments</span>
                                <span className="font-bold">2,134</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Storage Usage</span>
                                <span className="font-bold">2.3TB / 10TB</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const UniversitiesSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('superAdmin.universitySettings')}</h2>
                <Button>Add University</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>State University</CardTitle>
                        <CardDescription>state-uni.edu • Active since 2020</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Total Users</span>
                                <span>2,456</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Active Admins</span>
                                <span>3</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Status</span>
                                <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">Manage</Button>
                                <Button size="sm" variant="outline" className="flex-1">Settings</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tech Institute</CardTitle>
                        <CardDescription>tech-inst.edu • Active since 2021</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Total Users</span>
                                <span>1,890</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Active Admins</span>
                                <span>2</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Status</span>
                                <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">Manage</Button>
                                <Button size="sm" variant="outline" className="flex-1">Settings</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const AdminsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('superAdmin.adminManagement')}</h2>
                <Button>Create Admin</Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="text-left p-4">Admin</th>
                                    <th className="text-left p-4">University</th>
                                    <th className="text-left p-4">Role</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-left p-4">Last Login</th>
                                    <th className="text-left p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">JD</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">John Davis</p>
                                                <p className="text-sm text-theme/70">john.davis@state-uni.edu</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">State University</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Admin</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Active</span>
                                        </div>
                                    </td>
                                    <td className="p-4">2 hours ago</td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline">{t('forms.edit')}</Button>
                                            <Button size="sm" variant="outline">Suspend</Button>
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

const SystemSection: React.FC = () => {
    const { systemView } = useAppSelector(selectSuperAdminDashboard)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Management</h2>
                <div className="flex space-x-2">
                    <Button
                        variant={systemView === 'dashboard' ? 'default' : 'outline'}
                        size="sm"
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant={systemView === 'logs' ? 'default' : 'outline'}
                        size="sm"
                    >
                        Logs
                    </Button>
                    <Button
                        variant={systemView === 'performance' ? 'default' : 'outline'}
                        size="sm"
                    >
                        Performance
                    </Button>
                    <Button
                        variant={systemView === 'security' ? 'default' : 'outline'}
                        size="sm"
                    >
                        Security
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Server Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>API Server</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Online</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Database</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Connected</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Redis Cache</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Running</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>File Storage</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">Available</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">CPU Usage</span>
                                    <span className="text-sm font-medium">45%</span>
                                </div>
                                <div className="w-full bg-primary/20 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Memory Usage</span>
                                    <span className="text-sm font-medium">62%</span>
                                </div>
                                <div className="w-full bg-primary/20 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Disk Usage</span>
                                    <span className="text-sm font-medium">23%</span>
                                </div>
                                <div className="w-full bg-primary/20 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '23%' }}></div>
                                </div>
                            </div>
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
            <h2 className="text-2xl font-bold">Global Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Usage Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Daily Active Users</span>
                                <div className="text-right">
                                    <span className="font-bold">1,247</span>
                                    <p className="text-xs text-green-600">+5.2%</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Weekly Active Users</span>
                                <div className="text-right">
                                    <span className="font-bold">5,834</span>
                                    <p className="text-xs text-green-600">+3.1%</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Monthly Active Users</span>
                                <div className="text-right">
                                    <span className="font-bold">12,456</span>
                                    <p className="text-xs text-green-600">+8.7%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Total Assignments</span>
                                <span className="font-bold">2,134</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Submissions Today</span>
                                <span className="font-bold">89</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Grades Issued</span>
                                <span className="font-bold">1,567</span>
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
                                <span>Uptime</span>
                                <span className="font-bold text-green-600">99.98%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Avg Response Time</span>
                                <span className="font-bold">89ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Error Rate</span>
                                <span className="font-bold text-green-600">0.02%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const SuperAdminDashboard: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { activeSection } = useAppSelector(selectSuperAdminDashboard)

    const sections = [
        { id: 'overview', label: t('superAdmin.systemOverview'), component: OverviewSection },
        { id: 'universities', label: 'Universities', component: UniversitiesSection },
        { id: 'admins', label: t('superAdmin.adminManagement'), component: AdminsSection },
        { id: 'system', label: 'System', component: SystemSection },
        { id: 'analytics', label: 'Analytics', component: AnalyticsSection },]

    return (
        <div className="min-h-screen bg-theme">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-theme mb-2">Super Admin Dashboard</h1>
                    <p className="text-theme/70">Manage the entire Task-Flow ecosystem</p>
                </div>

                <Tabs value={activeSection} onValueChange={(value) => dispatch(setSuperAdminSection(value as 'overview' | 'universities' | 'admins' | 'system' | 'analytics'))}>
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

export default SuperAdminDashboard
