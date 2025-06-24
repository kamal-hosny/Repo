import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/slices/authSlice'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StudentDashboard from '@/components/dashboards/StudentDashboard'
import TeacherDashboard from '@/components/dashboards/TeacherDashboard'
import AdminDashboard from '@/components/dashboards/AdminDashboard'
import SuperAdminDashboard from '@/components/dashboards/SuperAdminDashboard'

const DashboardPage: React.FC = () => {
    const user = useAppSelector(selectUser)

    if (!user) {
        return <div>Loading...</div>
    }

    const renderDashboard = () => {
        switch (user.role) {
            case 'STUDENT':
                return <StudentDashboard />
            case 'TEACHER':
                return <TeacherDashboard />
            case 'ADMIN':
                return <AdminDashboard />
            case 'SUPER_ADMIN':
                return <SuperAdminDashboard />
            default:
                return <div>Invalid role</div>
        }
    }

    return (
        <DashboardLayout>
            {renderDashboard()}
        </DashboardLayout>
    )
}

export default DashboardPage

// Add getServerSideProps to disable static optimization
export async function getServerSideProps() {
    return {
        props: {}
    }
}