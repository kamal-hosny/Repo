'use client'

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectEffectiveTheme, setSystemTheme } from '@/store/slices/themeSlice'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const effectiveTheme = useAppSelector(selectEffectiveTheme)

    useEffect(() => {
        // Detect system theme preference (client-side only)
        if (typeof window === 'undefined') return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            dispatch(setSystemTheme(e.matches ? 'dark' : 'light'))
        }

        // Set initial system theme
        dispatch(setSystemTheme(mediaQuery.matches ? 'dark' : 'light'))

        // Listen for system theme changes
        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [dispatch])

    useEffect(() => {
        // Apply theme to document (client-side only)
        if (typeof window === 'undefined') return

        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)
    }, [effectiveTheme])

    return <>{children}</>
}
