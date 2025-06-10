import { ACTION_TYPES } from './actionTypes'

export const setModeTheme = (modeTheme: 'light' | 'dark') => ({
    type: ACTION_TYPES.SET_MODE_THEME,
    payload: { modeTheme },
})

export type ThemeActions = ReturnType<typeof setModeTheme>
