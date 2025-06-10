import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../API/axiosInstance'
import { SignInUserData, SignUpUserData } from '../../globalVariables/typesVariables'
import { getAccessToken } from '../../utils/cookies/cookies'
import { removeItem } from '../../utils/localStore/localStore'
import { ACTION_TYPES, ActionType } from '../actions/actionTypes'
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
} from '../actions/authActions'
import { resetTodos } from '../actions/todoActions'
import { setUser } from '../actions/userActions'

function* asyncSignInUser(action: { type: ActionType; payload: { credentials: SignInUserData } }) {
    try {
        const response: AxiosResponse = yield call(() =>
            instance.post('/users/login', action.payload.credentials),
        )

        const token = getAccessToken()

        if (response && token) {
            yield put(signInSuccess(token))
            yield put(setUser(response.data.user))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncSignInUser', e)
        yield put(signInFailure(e.response?.data.error))
    }
}

function* asyncSignUpUser(action: { type: ActionType; payload: { credentials: SignUpUserData } }) {
    try {
        const response: AxiosResponse = yield call(() =>
            instance.post('/users/register', action.payload.credentials),
        )

        if (response) {
            yield put(signUpSuccess())
            yield alert(response.data.message)
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncSignUpUser', e)
        yield put(signUpFailure(e.response?.data.error))
    }
}

function* asyncSignOutUser() {
    try {
        const response: AxiosResponse = yield call(() => instance.post('/users/logout'))

        if (response) {
            yield put(signOutSuccess())
            yield removeItem('filter')
            yield put(resetTodos())
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncSignOutUser', e)
        yield put(signOutFailure(e.response?.data.error))
    }
}

export function* authWatcher() {
    yield takeEvery(ACTION_TYPES.SIGN_IN_REQUEST, asyncSignInUser)
    yield takeEvery(ACTION_TYPES.SIGN_UP_REQUEST, asyncSignUpUser)
    yield takeEvery(ACTION_TYPES.SIGN_OUT_REQUEST, asyncSignOutUser)

    yield console.log('Working authWatcher in saga')
}
