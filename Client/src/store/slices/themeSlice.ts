import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
    mode: ThemeMode
    systemTheme: 'light' | 'dark'
    effectiveTheme: 'light' | 'dark'
}

const initialState: ThemeState = {
    mode: 'system',
    systemTheme: 'light',
    effectiveTheme: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload
            state.effectiveTheme = action.payload === 'system' ? state.systemTheme : action.payload
        },
        setSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.systemTheme = action.payload
            if (state.mode === 'system') {
                state.effectiveTheme = action.payload
            }
        },        toggleTheme: (state) => {
            if (state.mode === 'system') {
                state.mode = state.systemTheme === 'light' ? 'dark' : 'light'
            } else {
                state.mode = state.mode === 'light' ? 'dark' : 'light'
            }
            state.effectiveTheme = state.mode as 'light' | 'dark'
        },
    },
})

export const { setThemeMode, setSystemTheme, toggleTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state: { theme: ThemeState }) => state.theme
export const selectCurrentTheme = (state: { theme: ThemeState }) => state.theme.effectiveTheme
export const selectEffectiveTheme = (state: { theme: ThemeState }) => state.theme.effectiveTheme
