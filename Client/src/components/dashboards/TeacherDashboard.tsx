import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectTeacherDashboard, setTeacherSection } from '@/store/slices/dashboardSlice'
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
                        <CardTitle className="text-lg">{t('navigation.courses')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">3</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('teacher.myStudents')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">127</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Active Assignments</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">8</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Pending Grades</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">15</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('teacher.upcomingLectures')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Data Structures - Lecture 15</p>
                                    <p className="text-xs text-theme/70">Today, 10:00 AM - Room 301</p>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Algorithms - Lab Session</p>
                                    <p className="text-xs text-theme/70">Tomorrow, 2:00 PM - Lab 1</p>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">John Doe submitted Binary Tree Assignment</p>
                                    <p className="text-xs text-theme/70">30 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">5 students pending for Graph Algorithms</p>
                                    <p className="text-xs text-theme/70">Due in 2 days</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const CoursesSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('teacher.courseManagement')}</h2>
                <Button>{t('forms.create')} Course</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Structures</CardTitle>
                        <CardDescription>CS-301 • 45 Students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Active Assignments</span>
                                <span>3</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Avg. Grade</span>
                                <span>82%</span>
                            </div>
                            <Button className="w-full" variant="outline">Manage Course</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const StudentsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('teacher.myStudents')}</h2>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="text-left p-4">Student</th>
                                    <th className="text-left p-4">Course</th>
                                    <th className="text-left p-4">Progress</th>
                                    <th className="text-left p-4">Last Activity</th>
                                    <th className="text-left p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-medium">John Doe</p>
                                            <p className="text-sm text-theme/70">john.doe@university.edu</p>
                                        </div>
                                    </td>
                                    <td className="p-4">Data Structures</td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-full bg-primary/20 rounded-full h-2">
                                                <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                                            </div>
                                            <span className="text-sm">78%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">2 hours ago</td>
                                    <td className="p-4">
                                        <Button size="sm" variant="outline">View Profile</Button>
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

const AssignmentsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('teacher.createAssignment')}</h2>
                <Button>{t('teacher.createAssignment')}</Button>
            </div>

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Binary Search Tree Implementation</CardTitle>
                        <CardDescription>Data Structures • Due: March 20, 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <p className="text-sm">Submissions: 35/45</p>
                                <p className="text-sm text-theme/70">Graded: 20/35</p>
                            </div>
                            <div className="space-x-2">
                                <Button size="sm" variant="outline">View Submissions</Button>
                                <Button size="sm">{t('forms.edit')}</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const GradingSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('teacher.gradeAssignments')}</h2>

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Pending Grading Queue</CardTitle>
                        <CardDescription>15 submissions waiting for review</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">John Doe - Binary Tree Assignment</p>
                                    <p className="text-sm text-theme/70">Submitted 2 days ago</p>
                                </div>
                                <Button size="sm">Grade Now</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Jane Smith - Graph Algorithms</p>
                                    <p className="text-sm text-theme/70">Submitted 1 day ago</p>
                                </div>
                                <Button size="sm">Grade Now</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const TeacherDashboard: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { activeSection } = useAppSelector(selectTeacherDashboard)

    const sections = [
        { id: 'overview', label: t('dashboard.overview'), component: OverviewSection },
        { id: 'courses', label: t('navigation.courses'), component: CoursesSection },
        { id: 'students', label: t('teacher.myStudents'), component: StudentsSection },
        { id: 'assignments', label: t('navigation.assignments'), component: AssignmentsSection },
        { id: 'grading', label: t('teacher.gradeAssignments'), component: GradingSection },    ]

    return (
        <div className="min-h-screen bg-theme">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-theme mb-2">Teacher Dashboard</h1>
                    <p className="text-theme/70">Manage your courses, students, and assignments</p>
                </div>

                <Tabs value={activeSection} onValueChange={(value) => dispatch(setTeacherSection(value as 'overview' | 'courses' | 'students' | 'assignments' | 'grading'))}>
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

export default TeacherDashboard
