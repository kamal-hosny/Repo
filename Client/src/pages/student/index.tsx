import React from 'react'
import { useTranslation } from 'react-i18next'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { BookOpen, Calendar, FileText, User, GraduationCap } from 'lucide-react'

const StudentPage: React.FC = () => {
    const { t } = useTranslation()
    const currentUser = useAppSelector(selectCurrentUser)

    return (
        <ProtectedRoute allowedRoles={['STUDENT']}>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{t('pages.student.title')}</h1>
                            <p className="text-muted-foreground">
                                {t('common.welcome')}, {currentUser?.name || 'Student'}!
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-8 w-8 text-primary" />
                                <span className="font-semibold text-lg text-primary">Task-Flow</span>
                            </div>
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
                                    {t('pages.student.coursesDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    {t('pages.student.viewCourses')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Assignments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>{t('navigation.assignments')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.student.assignmentsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    {t('pages.student.viewAssignments')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Schedule */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>{t('navigation.calendar')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.student.scheduleDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    {t('pages.student.viewSchedule')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Profile */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>{t('pages.student.profile')}</span>
                                </CardTitle>
                                <CardDescription>
                                    {t('pages.student.profileDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    {t('pages.student.editProfile')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>{t('pages.student.quickStats')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">5</div>
                                        <div className="text-sm text-muted-foreground">{t('pages.student.enrolledCourses')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">3</div>
                                        <div className="text-sm text-muted-foreground">{t('pages.student.completedAssignments')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">2</div>
                                        <div className="text-sm text-muted-foreground">{t('pages.student.pendingAssignments')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">87%</div>
                                        <div className="text-sm text-muted-foreground">{t('pages.student.averageGrade')}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>                </main>
            </div>
        </ProtectedRoute>
    )
}

export default StudentPage

export async function getServerSideProps() {
    return {
        props: {}
    }
}
