import React from 'react'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'

const AdminsPage: React.FC = () => {
    return (
        <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
            <DashboardLayout>
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-theme mb-6">Admins Management</h1>
                    <div className="bg-theme-surface p-6 rounded-lg border">
                        <p className="text-theme/70">Admins list and management interface will be implemented here.</p>
                        <p className="text-theme/70 mt-2">Accessible by: Super Admins only</p>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default AdminsPage

export async function getServerSideProps() {
    return {
        props: {}
    }
}
