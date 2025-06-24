import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SupportedLanguage = 'en' | 'ar'
export type TextDirection = 'ltr' | 'rtl'

interface LanguageState {
    currentLanguage: SupportedLanguage
    direction: TextDirection
    isLoading: boolean
}

const initialState: LanguageState = {
    currentLanguage: 'en',
    direction: 'ltr',
    isLoading: false,
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
            state.currentLanguage = action.payload
            state.direction = action.payload === 'ar' ? 'rtl' : 'ltr'
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        toggleLanguage: (state) => {
            const newLanguage: SupportedLanguage = state.currentLanguage === 'en' ? 'ar' : 'en'
            state.currentLanguage = newLanguage
            state.direction = newLanguage === 'ar' ? 'rtl' : 'ltr'
        },
    },
})

export const { setLanguage, setLoading, toggleLanguage } = languageSlice.actions

// Selectors
export const selectLanguage = (state: { language: LanguageState }) => state.language
export const selectCurrentLanguage = (state: { language: LanguageState }) => state.language.currentLanguage
export const selectTextDirection = (state: { language: LanguageState }) => state.language.direction
