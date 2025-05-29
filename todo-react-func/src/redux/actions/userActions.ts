import { UserState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

export const setUserState = (userState: UserState) => ({
    type: ACTION_TYPES.SET_USER_STATE,
    payload: { userState },
})

export const setUser = (userData: UserState) => ({
    type: ACTION_TYPES.SET_USER,
    payload: { userData },
})

export const removeUser = () => ({
    type: ACTION_TYPES.REMOVE_USER,
})

export type UserActions =
    | ReturnType<typeof setUserState>
    | ReturnType<typeof setUser>
    | ReturnType<typeof removeUser>
