import { put, select, takeLatest } from 'redux-saga/effects'
import { getItem } from '../../utils/localStore/localStore'
import { ACTION_TYPES } from '../actions/actionTypes'
import { RootState } from '../store'

const getToken = (state: RootState) => state.auth.token

function* checkToken() {
    const tokenInStore: string = yield select(getToken)
    const tokenInLocalStore: string = getItem('authToken')

    if (!tokenInStore || !tokenInLocalStore) {
        yield put({ type: ACTION_TYPES.SIGN_OUT_REQUEST })
    }
}

export function* watchTodoStateChange() {
    yield takeLatest(
        [
            ACTION_TYPES.SET_STATE,
            ACTION_TYPES.ADD_TODO,
            ACTION_TYPES.REMOVE_TODO,
            ACTION_TYPES.REMOVE_ALL_TODOS,
            ACTION_TYPES.CHANGE_TODO_STATUS,
            ACTION_TYPES.EDIT_TODO_CONTEXT,
        ],
        checkToken,
    )
}
