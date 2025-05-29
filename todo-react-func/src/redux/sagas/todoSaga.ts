// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../API/axiosInstance'
import { FilterStatus } from '../../globalVariables/typesVariables'
import { ASYNC_ACTION_TYPES, AsyncActionType } from '../actions/actionTypes'
import { setFilteredTodos, setTodos } from '../actions/todoActions'

function* asyncGetTodos() {
    try {
        const response: AxiosResponse = yield call(() => instance.get('/tasks'))

        if (response.data) {
            yield put(setTodos(response.data.tasks))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncAddTodo', e)
        // yield put(signInFailure(e.response?.data.error))
    }
}

function* asyncGetFilteredTodos(action: {
    type: AsyncActionType
    payload: { status: FilterStatus }
}) {
    try {
        const response: AxiosResponse = yield call(() =>
            instance.get(`/tasks/filter/${action.payload.status}`),
        )

        if (response.data) {
            // console.log('response.data in asyncGetFilteredTodos', response.data.tasks)
            yield setFilteredTodos(response.data.tasks)
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncAddTodo', e)
        // yield put(signInFailure(e.response?.data.error))
    }
}

function* asyncAddTodo(action: { type: AsyncActionType; payload: { value: string } }) {
    try {
        yield call(() => instance.post('/tasks', { value: action.payload.value }))

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncAddTodo', e)
        // yield put(signInFailure(e.response?.data.error))
    }
}

export function* todoWatcher() {
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_GET_TODOS, asyncGetTodos)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_GET_FILTERED_TODOS, asyncGetFilteredTodos)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_ADD_TODO, asyncAddTodo)

    yield console.log('Working todoWatcher in saga')
}
