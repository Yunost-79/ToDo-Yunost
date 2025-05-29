// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../API/axiosInstance'
import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { ASYNC_ACTION_TYPES, AsyncActionType } from '../actions/actionTypes'
import { setFilteredTodos, setTodos } from '../actions/todoActions'

function* asyncGetTodos() {
    try {
        const response: AxiosResponse = yield call(() => instance.get('/tasks'))

        if (response.data) {
            const todos = response.data.tasks.map((task: Todo) => {
                return { ...task, isEdit: false }
            })
            yield put(setTodos(todos))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncGetTodos', e)
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
            const todos = response.data.tasks.map((task: Todo) => {
                return { ...task, isEdit: false }
            })
            yield setFilteredTodos(todos)
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncGetFilteredTodos', e)
    }
}

function* asyncAddTodo(action: { type: AsyncActionType; payload: { value: string } }) {
    try {
        yield call(() => instance.post('/tasks', { value: action.payload.value }))

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncAddTodo', e)
    }
}

function* asyncRemoveTodoById(action: { type: AsyncActionType; payload: { taskId: number } }) {
    try {
        yield call(() => instance.delete(`/tasks/${action.payload.taskId}`))

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncRemoveTodoById', e)
    }
}

function* asyncRemoveAllTodos() {
    try {
        yield call(() => instance.delete(`/tasks`))

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncRemoveAllTodos', e)
    }
}

function* asyncEditTodoById(action: {
    type: AsyncActionType
    payload: { taskId: number; value: string }
}) {
    try {
        yield call(() =>
            instance.put(`/tasks/${action.payload.taskId}`, { value: action.payload.value }),
        )

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncEditTodoById', e)
    }
}

function* asyncChangeTodoStatusById(action: {
    type: AsyncActionType
    payload: { taskId: number; status: 'active' | 'completed' }
}) {
    try {
        yield call(() =>
            instance.put(`/tasks/${action.payload.taskId}`, { status: action.payload.status }),
        )

        yield call(asyncGetTodos)
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncChangeTodoStatusById', e)
    }
}

export function* todoWatcher() {
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_GET_TODOS, asyncGetTodos)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_GET_FILTERED_TODOS, asyncGetFilteredTodos)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_ADD_TODO, asyncAddTodo)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO, asyncRemoveTodoById)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO, asyncEditTodoById)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS, asyncChangeTodoStatusById)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS, asyncRemoveAllTodos)

    yield console.log('Working todoWatcher in saga')
}
