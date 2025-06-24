import React from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectUser, clearAuth } from '@/store/slices/authSlice'
import { selectUnreadCount } from '@/store/slices/notificationSlice'
import { ThemeToggle } from '@/components/ui/theme-toggle'
// import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Bell, User, LogOut } from 'lucide-react'

const Header: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const unreadCount = useAppSelector(selectUnreadCount)

    const handleLogout = () => {
        dispatch(clearAuth())
    }

    return (
        <header className="bg-theme border-b border-primary/10 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-logo text-primary">{t('app.name')}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </Button>

                    {/* Theme Toggle */}
                    <ThemeToggle />                    {/* Language Switcher */}
                    {/* <LanguageSwitcher /> */}

                    {/* User Menu */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">                                {user?.avatar ? (
                                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <User className="h-4 w-4 text-primary" />
                                )}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-theme">{user?.name}</p>
                                <p className="text-xs text-theme/70">{user?.role}</p>
                            </div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
