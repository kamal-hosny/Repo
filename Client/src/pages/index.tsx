import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/store/hooks'
import { selectIsAuthenticated, selectUserRole } from '@/store/slices/authSlice'
import { getRoleBasedRoute } from '@/lib/routes'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const userRole = useAppSelector(selectUserRole)

  useEffect(() => {
    // Redirect logic will be handled by UnifiedRouter
    // This page serves as a landing page for public access
    if (isAuthenticated && userRole) {
      const roleRoute = getRoleBasedRoute(userRole)
      router.replace(roleRoute)
    }
  }, [isAuthenticated, userRole, router])

  // Public landing page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-foreground mb-4">
            {t('app.name')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('app.description')}
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => router.push('/login')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('auth.login')}
            </button>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('roles.student')}
              </h3>
              <p className="text-muted-foreground">
                {t('pages.student.coursesDescription')}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('roles.teacher')}
              </h3>
              <p className="text-muted-foreground">
                {t('pages.teacher.coursesDescription')}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('roles.admin')}
              </h3>
              <p className="text-muted-foreground">
                {t('pages.admin.usersDescription')}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('roles.super_admin')}
              </h3>
              <p className="text-muted-foreground">
                {t('pages.superadmin.systemDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
