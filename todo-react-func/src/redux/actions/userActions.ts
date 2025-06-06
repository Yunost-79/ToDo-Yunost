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

//ACTION SECTION: get user data actions

export const getUserDataSuccess = (user: UserState) => ({
    type: ACTION_TYPES.GET_USER_SUCCESS,
    payload: { user },
})

export const getUserDataFailure = (error: string) => ({
    type: ACTION_TYPES.GET_USER_FAILURE,
    payload: { error },
})

export const getUserDataRequest = () => ({
    type: ACTION_TYPES.GET_USER_REQUEST,
})

export type UserActions =
    | ReturnType<typeof setUserState>
    | ReturnType<typeof setUser>
    | ReturnType<typeof removeUser>
    | ReturnType<typeof getUserDataSuccess>
    | ReturnType<typeof getUserDataFailure>
    | ReturnType<typeof getUserDataRequest>
