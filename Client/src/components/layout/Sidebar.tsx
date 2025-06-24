import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectUserRole } from '@/store/slices/authSlice'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Home,
    BookOpen,
    FileText,
    GraduationCap,
    Calendar,
    Users,
    Settings,
    BarChart3,
    Shield
} from 'lucide-react'

const Sidebar: React.FC = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const userRole = useAppSelector(selectUserRole)

    const getNavigationItems = () => {
        const baseItems = [
            { href: '/', icon: Home, label: t('navigation.home') }
        ]

        switch (userRole) {
            case 'STUDENT':
                return [
                    ...baseItems,
                    { href: '/student', icon: Home, label: t('dashboard.overview') },
                    { href: '/student/courses', icon: BookOpen, label: t('navigation.courses') },
                    { href: '/student/assignments', icon: FileText, label: t('navigation.assignments') },
                    { href: '/student/grades', icon: GraduationCap, label: t('navigation.grades') },
                    { href: '/student/calendar', icon: Calendar, label: t('navigation.calendar') },
                ]

            case 'TEACHER':
                return [
                    ...baseItems,
                    { href: '/teacher', icon: Home, label: t('dashboard.overview') },
                    { href: '/teacher/courses', icon: BookOpen, label: t('navigation.courses') },
                    { href: '/teacher/students', icon: Users, label: t('teacher.myStudents') },
                    { href: '/teacher/assignments', icon: FileText, label: t('navigation.assignments') },
                    { href: '/teacher/grading', icon: GraduationCap, label: t('teacher.gradeAssignments') },
                ]

            case 'ADMIN':
                return [
                    ...baseItems,
                    { href: '/admin', icon: Home, label: t('dashboard.overview') },
                    { href: '/admin/users', icon: Users, label: t('admin.userManagement') },
                    { href: '/admin/courses', icon: BookOpen, label: t('navigation.courses') },
                    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
                    { href: '/admin/settings', icon: Settings, label: t('navigation.settings') },
                ]

            case 'SUPER_ADMIN':
                return [
                    ...baseItems,
                    { href: '/superadmin', icon: Home, label: t('superAdmin.systemOverview') },
                    { href: '/superadmin/universities', icon: Shield, label: 'Universities' },
                    { href: '/superadmin/admins', icon: Users, label: t('superAdmin.adminManagement') },
                    { href: '/superadmin/system', icon: Settings, label: 'System' },
                    { href: '/superadmin/analytics', icon: BarChart3, label: 'Analytics' },
                ]

            default:
                return baseItems
        }
    }

    const navigationItems = getNavigationItems()

    return (
        <aside className="w-64 bg-theme border-r border-primary/10 min-h-[calc(100vh-80px)]">
            <nav className="p-4 space-y-2">
                {navigationItems.map((item) => {
                    const isActive = router.pathname === item.href
                    const IconComponent = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-white'
                                    : 'text-theme hover:bg-primary/10 hover:text-primary'
                                }`}
                        >
                            <IconComponent className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
