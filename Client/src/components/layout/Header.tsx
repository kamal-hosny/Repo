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
import LanguageSwitcher from '../ui/language-switcher'

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
                    <h1 className="text-2xl font-signature text-primary">{t('app.name')}</h1>
                </div>

                <div className="flex items-center space-x-4">


                    {/* Theme Toggle */}
                    <ThemeToggle />                    
                    {/* Language Switcher */}
                    <LanguageSwitcher />
                    {/* <LanguageSwitcher /> */}



                </div>
            </div>
        </header>
    )
}

export default Header
