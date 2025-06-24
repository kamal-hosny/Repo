import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectStudentDashboard, setStudentSection, setStudentCoursesView } from '@/store/slices/dashboardSlice'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

// Sub-components for each section
const OverviewSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('student.myCourses')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">5</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('student.myAssignments')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">12</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('dashboard.upcomingEvents')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">3</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{t('dashboard.notifications')}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">8</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Assignment submitted: Data Structures</p>
                                    <p className="text-xs text-theme/70">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Grade received: Algorithms Quiz</p>
                                    <p className="text-xs text-theme/70">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('dashboard.upcomingEvents')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Database Systems Exam</p>
                                    <p className="text-xs text-theme/70">Tomorrow, 10:00 AM</p>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Project Presentation</p>
                                    <p className="text-xs text-theme/70">March 25, 2:00 PM</p>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
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
    const dispatch = useAppDispatch()
    const { coursesView } = useAppSelector(selectStudentDashboard)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('student.myCourses')}</h2>
                <div className="flex space-x-2">
                    <Button
                        variant={coursesView === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setStudentCoursesView('grid'))}
                    >
                        Grid
                    </Button>
                    <Button
                        variant={coursesView === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => dispatch(setStudentCoursesView('list'))}
                    >
                        List
                    </Button>
                </div>
            </div>

            <div className={coursesView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {/* Course cards would be rendered here */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Structures</CardTitle>
                        <CardDescription>CS-301 • Dr. Smith</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-primary/20 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const AssignmentsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('student.myAssignments')}</h2>
            {/* Assignment list would be rendered here */}
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Binary Search Tree Implementation</CardTitle>
                        <CardDescription>Data Structures • Due: March 20, 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Pending</span>
                            <Button size="sm">{t('student.submitAssignment')}</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const GradesSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('student.myGrades')}</h2>
            {/* Grades table would be rendered here */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="text-left p-4">Assignment</th>
                                    <th className="text-left p-4">Course</th>
                                    <th className="text-left p-4">Grade</th>
                                    <th className="text-left p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4">Midterm Exam</td>
                                    <td className="p-4">Algorithms</td>
                                    <td className="p-4 text-green-600 font-medium">85/100</td>
                                    <td className="p-4">March 15, 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const CalendarSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('navigation.calendar')}</h2>
            {/* Calendar component would be rendered here */}
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-theme/70">
                        <p>Calendar component will be implemented here</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const StudentDashboard: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { activeSection } = useAppSelector(selectStudentDashboard)

    const sections = [
        { id: 'overview', label: t('dashboard.overview'), component: OverviewSection },
        { id: 'courses', label: t('navigation.courses'), component: CoursesSection },
        { id: 'assignments', label: t('navigation.assignments'), component: AssignmentsSection },
        { id: 'grades', label: t('navigation.grades'), component: GradesSection }, { id: 'calendar', label: t('navigation.calendar'), component: CalendarSection },
    ]

    return (
        <div className="min-h-screen bg-theme">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-theme mb-2">{t('dashboard.myDashboard')}</h1>
                    <p className="text-theme/70">{t('app.welcome')}</p>
                </div>

                <Tabs value={activeSection} onValueChange={(value) => dispatch(setStudentSection(value as 'overview' | 'courses' | 'assignments' | 'grades' | 'calendar'))}>
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

export default StudentDashboard
