import { Middleware } from '@reduxjs/toolkit'
import { setLanguage } from '@/store/slices/languageSlice'
import { setThemeMode } from '@/store/slices/themeSlice'

// Middleware to sync state with localStorage
export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action)

    // Only run on client side
    if (typeof window !== 'undefined') {
        const state = store.getState()

        // Sync language to localStorage
        if (action.type === setLanguage.type || action.type === 'language/toggleLanguage') {
            localStorage.setItem('language', state.language.currentLanguage)
        }

        // Sync theme to localStorage
        if (action.type === setThemeMode.type || action.type === 'theme/toggleTheme') {
            localStorage.setItem('theme', state.theme.mode)
        }
    }

    return result
}

// Hydration helper to load initial state from localStorage
export const loadStateFromLocalStorage = () => {
    if (typeof window === 'undefined') {
        return {}
    }

    try {
        const language = localStorage.getItem('language') as 'en' | 'ar' | null
        const theme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null

        const state: any = {}

        if (language) {
            state.language = {
                currentLanguage: language,
                direction: language === 'ar' ? 'rtl' : 'ltr',
                isLoading: false
            }
        }

        if (theme) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            state.theme = {
                mode: theme,
                systemTheme: systemTheme,
                effectiveTheme: theme === 'system' ? systemTheme : theme
            }
        }

        return state
    } catch (error) {
        console.error('Error loading state from localStorage:', error)
        return {}
    }
}
