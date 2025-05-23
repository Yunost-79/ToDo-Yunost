import { SignInUserData, SignUpUserData } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

export const setToken = (token: string) => ({
    type: ACTION_TYPES.SET_TOKEN,
    payload: { token },
})

export const signInSuccess = (token: string) => ({
    type: ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: { token },
})

export const signInFailure = (error: string) => ({
    type: ACTION_TYPES.SIGN_IN_FAILURE,
    payload: { error },
})

export const signInRequest = (credentials: SignInUserData) => ({
    type: ACTION_TYPES.SIGN_IN_REQUEST,
    payload: { credentials },
})

export const signUpSuccess = (token: string) => ({
    type: ACTION_TYPES.SIGN_UP_SUCCESS,
    payload: { token },
})

export const signUpFailure = (error: string) => ({
    type: ACTION_TYPES.SIGN_UP_FAILURE,
    payload: { error },
})

export const signUpRequest = (credentials: SignUpUserData) => ({
    type: ACTION_TYPES.SIGN_UP_REQUEST,
    payload: { credentials },
})

export const signOutSuccess = () => ({
    type: ACTION_TYPES.SIGN_OUT_SUCCESS,
})

export const signOutFailure = (error: string) => ({
    type: ACTION_TYPES.SIGN_OUT_FAILURE,
    payload: { error },
})

export const signOutRequest = () => ({
    type: ACTION_TYPES.SIGN_OUT_REQUEST,
})

export const removeAuthErrorAndLoading = () => ({
    type: ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING,
})

export type AuthActions =
    | ReturnType<typeof signInRequest>
    | ReturnType<typeof signInSuccess>
    | ReturnType<typeof signInFailure>
    | ReturnType<typeof signUpRequest>
    | ReturnType<typeof signUpSuccess>
    | ReturnType<typeof signUpFailure>
    | ReturnType<typeof signOutRequest>
    | ReturnType<typeof signOutSuccess>
    | ReturnType<typeof signOutFailure>
    | ReturnType<typeof removeAuthErrorAndLoading>
