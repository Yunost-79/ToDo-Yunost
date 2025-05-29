import { takeLatest } from 'redux-saga/effects'
import { getAccessToken } from '../../utils/cookies/cookies'
import { ACTION_TYPES } from '../actions/actionTypes'

function* checkToken() {
    const token = getAccessToken()

    if (!token) {
        // yield put({ type: ACTION_TYPES.SIGN_OUT_REQUEST })
    }
}

export function* watchTodoStateChange() {
    yield takeLatest(
        [
            ACTION_TYPES.SET_TODO_STATE,
            ACTION_TYPES.SET_USER_STATE,
            ACTION_TYPES.ADD_TODO,
            ACTION_TYPES.REMOVE_TODO,
            ACTION_TYPES.REMOVE_ALL_TODOS,
            ACTION_TYPES.CHANGE_TODO_STATUS,
            ACTION_TYPES.EDIT_TODO_CONTEXT,
        ],
        checkToken,
    )
}
