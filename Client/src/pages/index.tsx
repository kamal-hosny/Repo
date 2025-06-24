import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectIsAuthenticated, selectCurrentUser } from '@/store/slices/authSlice'
import { selectCurrentTheme, toggleTheme } from '@/store/slices/themeSlice'
import { selectCurrentLanguage, setLanguage } from '@/store/slices/languageSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export default function TestPage() {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()

  // Redux state
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const currentUser = useAppSelector(selectCurrentUser)
  const currentTheme = useAppSelector(selectCurrentTheme)
  const currentLanguage = useAppSelector(selectCurrentLanguage)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const handleLanguageToggle = () => {
    dispatch(setLanguage(currentLanguage === 'en' ? 'ar' : 'en'))
  }

  return (
    <div className="min-h-screen bg-theme text-theme p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-logo text-primary">Task-Flow LMS</h1>
          <p className="text-lg font-body text-theme/80">{t('common.testPage')}</p>
        </header>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="font-body">{t('common.controls')}</CardTitle>
            <CardDescription className="font-body">{t('common.testFeatures')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button onClick={handleThemeToggle} variant="outline">
                {t('common.toggleTheme')} ({String(currentTheme)})
              </Button>
              <Button onClick={handleLanguageToggle} variant="outline">
                {t('common.toggleLanguage')} ({currentLanguage.toUpperCase()})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Redux State Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-body">{t('common.authState')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-body">
              <p><strong>{t('common.authenticated')}:</strong> {isAuthenticated ? t('common.yes') : t('common.no')}</p>
              {currentUser && (
                <>
                  <p><strong>{t('common.user')}:</strong> {currentUser.name}</p>
                  <p><strong>{t('common.role')}:</strong> {t(`roles.${currentUser.role.toLowerCase()}`)}</p>
                  <p><strong>{t('common.email')}:</strong> {currentUser.email}</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-body">{t('common.systemState')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-body">
              <p><strong>{t('common.theme')}:</strong> {String(currentTheme)}</p>
              <p><strong>{t('common.language')}:</strong> {currentLanguage.toUpperCase()}</p>
              <p><strong>{t('common.direction')}:</strong> {currentLanguage === 'ar' ? 'RTL' : 'LTR'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Font Demonstration */}
        <Card>
          <CardHeader>
            <CardTitle className="font-body">{t('common.fontDemo')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-signature text-2xl text-primary">Dancing Script - {t('common.signature')}</p>
              <p className="font-logo text-xl text-primary">Edu NSW ACT Hand - {t('common.logo')}</p>
              <p className="font-body text-theme">Lora - {t('common.bodyText')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-body">{t('common.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              {!isAuthenticated ? (
                <Button onClick={() => window.location.href = '/login'}>
                  {t('auth.login')}
                </Button>
              ) : (
                <Button onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('token')
                    window.location.reload()
                  }
                }}>
                  {t('auth.logout')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
