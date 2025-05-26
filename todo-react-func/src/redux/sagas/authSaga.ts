import { call, put, takeEvery } from 'redux-saga/effects'
import { SignInUserData, SignUpUserData } from '../../globalVariables/typesVariables'
import { comparePasswords, generateHashPassword } from '../../utils/bcrypt/bcrypt'
import { clearToken, storeToken } from '../../utils/localStore/authLocalStore'
import { ACTION_TYPES } from '../actions/actionTypes'
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
} from '../actions/authActions'

// type AuthResponse = {
//     token: string
// }

// password: qweqweQ1!
// username: username

const signInRequest = async (credentials: SignInUserData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storedHash = generateHashPassword('qweqweQ1!')

    const isMatchPasswords = comparePasswords(credentials.password, storedHash)

    if (credentials.username === 'username' && isMatchPasswords) {
        return {
            userId: '12343211',
            username: credentials.username,
            token: 'jwtToken',
        }
    }

    throw new Error('Invalid username or password')
}

function* asyncSignInUser(action: { type: string; payload: { credentials: SignInUserData } }) {
    try {
        const response: { token: string } = yield call(signInRequest, action.payload.credentials)

        if (response) {
            console.log('ok sign in', response)
            yield call(storeToken, response.token)
            yield put(signInSuccess(response.token))
        }
    } catch (err) {
        const e = err as Error
        console.error('Error in asyncSignInUser', e)
        yield put(signInFailure(e.message))
    }
}

const signUpRequest = async (credentials: SignUpUserData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // const hashPassword = generateHashPassword(credentials.password)
    if (credentials.username !== 'username') {
        return {
            userId: '12343211',
            username: credentials.username,
            token: 'jwtToken',
        }
    }

    throw new Error('A user with this username already exists')
}

function* asyncSignUpUser(action: { type: string; payload: { credentials: SignInUserData } }) {
    try {
        const response: { token: string } = yield call(signUpRequest, action.payload.credentials)

        if (response) {
            console.log('ok sign up', response)
            yield call(storeToken, response.token)
            yield put(signUpSuccess(response.token))
        }
    } catch (err) {
        const e = err as Error
        console.error('Error in asyncSignUpUser', e)
        yield put(signUpFailure(e.message))
    }
}

const signOutRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { message: 'User was logout' }
}

function* asyncSignOutUser() {
    try {
        const response: { token: string } = yield call(signOutRequest)

        if (response) {
            console.log('ok sign out', response)
            yield call(clearToken)
            yield put(signOutSuccess())
        }
    } catch (err) {
        const e = err as Error
        console.error('Error in asyncSignOutUser', e)
        yield put(signOutFailure(e.message))
    }
}

export function* authWatcher() {
    yield takeEvery(ACTION_TYPES.SIGN_IN_REQUEST, asyncSignInUser)
    yield takeEvery(ACTION_TYPES.SIGN_UP_REQUEST, asyncSignUpUser)
    yield takeEvery(ACTION_TYPES.SIGN_OUT_REQUEST, asyncSignOutUser)

    yield console.log('Working authWatcher in saga')
}
