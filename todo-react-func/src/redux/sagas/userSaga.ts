import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../API/axiosInstance'
import { ACTION_TYPES, ActionType } from '../actions/actionTypes'
import { getUserDataFailure, getUserDataSuccess } from '../actions/userActions'

function* asyncGetUserData(action: { type: ActionType }) {
    try {
        const response: AxiosResponse = yield call(() => instance.get('/users'))

        if (response.data) {
            yield put(getUserDataSuccess(response.data.user))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncGetUserData', e)
        yield put(getUserDataFailure(e.response?.data.error))
    }
}

export function* userWatcher() {
    yield takeEvery(ACTION_TYPES.GET_USER_REQUEST, asyncGetUserData)

    yield console.log('Working userWatcher in saga')
}
