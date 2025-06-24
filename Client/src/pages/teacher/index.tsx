import React from 'react'
import { useTranslation } from 'react-i18next'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, BarChart3, Calendar, GraduationCap } from 'lucide-react'

const TeacherPage: React.FC = () => {
    const { t } = useTranslation()
    const currentUser = useAppSelector(selectCurrentUser)

    return (
        <ProtectedRoute allowedRoles={['TEACHER']}>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{t('pages.teacher.title')}</h1>
                            <p className="text-muted-foreground">
                                {t('common.welcome')}, {currentUser?.name || 'Teacher'}!
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
                        {/* My Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>{t('navigation.courses')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.teacher.coursesDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    {t('pages.student.viewCourses')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Students */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>{t('navigation.students')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.teacher.studentsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    View Students
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Grades & Assessment */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5" />
                                    <span>{t('navigation.grades')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.teacher.gradesDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Manage Grades
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Schedule */}
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>{t('navigation.calendar')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.teacher.scheduleDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">8</div>
                                        <div className="text-sm text-muted-foreground">Active Courses</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">156</div>
                                        <div className="text-sm text-muted-foreground">Total Students</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">23</div>
                                        <div className="text-sm text-muted-foreground">Pending Grades</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">15</div>
                                        <div className="text-sm text-muted-foreground">Classes This Week</div>
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

export default TeacherPage

export async function getServerSideProps() {
    return {
        props: {}
    }
}
