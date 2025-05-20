export const ACTION_TYPES = {
    SET_STATE: 'SET_STATE',
    ADD_TODO: 'ADD_TODO',
    SET_WARNING: 'SET_WARNING',
} as const

export type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES]
