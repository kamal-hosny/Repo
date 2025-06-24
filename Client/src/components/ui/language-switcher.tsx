'use client'

import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
    const [language, setLanguage] = useState<'en' | 'ar'>('en')

    useEffect(() => {
        // Check for saved language preference or default to 'en'
        const savedLang = localStorage.getItem('language') as 'en' | 'ar' | null
        const initialLang = savedLang || 'en'
        setLanguage(initialLang)
        updateLanguage(initialLang)
    }, [])

    const updateLanguage = (newLang: 'en' | 'ar') => {
        const root = document.documentElement
        root.lang = newLang
        root.dir = newLang === 'ar' ? 'rtl' : 'ltr'
        localStorage.setItem('language', newLang)
    }

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en'
        setLanguage(newLang)
        updateLanguage(newLang)
    }

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary font-body font-medium"
            aria-label="Toggle language"
        >
            {language === 'en' ? 'عربي' : 'EN'}
        </button>
    )
}
