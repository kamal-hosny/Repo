'use client'

import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentLanguage, selectTextDirection } from '@/store/slices/languageSlice'
import i18n from '@/lib/i18n'

interface LanguageProviderProps {
    children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const currentLanguage = useAppSelector(selectCurrentLanguage)
    const textDirection = useAppSelector(selectTextDirection)

    useEffect(() => {
        // Change i18n language and update document (client-side only)
        if (typeof window === 'undefined') return

        // Change i18n language
        i18n.changeLanguage(currentLanguage)

        // Update document language and direction
        const root = document.documentElement
        root.lang = currentLanguage
        root.dir = textDirection
    }, [currentLanguage, textDirection])

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}
