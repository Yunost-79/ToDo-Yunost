import { AxiosError, AxiosResponse } from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import instance from '../../API/axiosInstance'
import { Todo, TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES, ActionType } from '../actions/actionTypes'
import {
    addTodoFailure,
    addTodoSuccess,
    getTodosFailure,
    getTodosSuccess,
    removeTodoFailure,
    removeTodoSuccess,
    updateTodoSuccess,
} from '../actions/todoActions'
import { RootState } from '../store'

function* asyncGetTodos() {
    try {
        const { todos, filter }: TodoState = yield select((state: RootState) => state.todos)

        const response: AxiosResponse = yield call(() =>
            instance.get('/tasks/paginated', {
                params: { offset: todos.length || 0, status: filter },
            }),
        )

        if (response.data) {
            const tasks = response.data.tasks.map((task: Todo) => {
                return { ...task, isEdit: false }
            })

            const isEnd = response.data.isEnd
            const counter = response.data.count

            yield put(getTodosSuccess(tasks, isEnd, counter))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncChangeTodoStatusById', e)
        yield put(getTodosFailure(e.response?.data.error || 'Failed to fetch todos'))
    }
}

function* asyncAddTodo(action: { type: ActionType; payload: { value: string } }) {
    try {
        const response: AxiosResponse = yield call(() =>
            instance.post('/tasks', { value: action.payload.value }),
        )

        if (response.data) {
            const task = { ...response.data.task, isEdit: false }

            yield put(addTodoSuccess(task))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncChangeTodoStatusById', e)
        yield put(addTodoFailure(e.response?.data.error || 'Failed to add todo'))
    }
}

function* asyncRemoveTodo(action: { type: ActionType; payload: { taskId: number | 'all' } }) {
    try {
        const { todos } = yield select((state: RootState) => state.todos)

        if (todos.length === 0) return

        const taskId = action.payload.taskId

        const requestUrl = taskId === 'all' ? '/tasks/remove' : `/tasks/remove/${taskId}`

        const response: AxiosResponse = yield call(() => instance.delete(requestUrl))

        if (response.data) {
            yield put(removeTodoSuccess(taskId))
        }
    } catch (err) {
        const e = err as AxiosError | any
        console.error('Error in asyncChangeTodoStatusById', e)
        yield put(removeTodoFailure(e.response?.data.error || 'Failed to remove todo'))
    }
}

function* asyncUpdateTodo(action: {
    type: ActionType
    payload: {
        taskId: number
        updates: Partial<{
            status: 'active' | 'completed'
            value: string
        }>
    }
}) {
    try {
        const response: AxiosResponse = yield call(() =>
            instance.put(`/tasks/${action.payload.taskId}`, { updates: action.payload.updates }),
        )
        if (response.data) {
            yield put(updateTodoSuccess(response.data.task))
        }
    } catch (err) {
        const e = err as AxiosError
        console.error('Error in asyncUpdateTodo', e)
    }
}

export function* todoWatcher() {
    yield takeEvery(ACTION_TYPES.GET_TODOS_REQUEST, asyncGetTodos)
    yield takeEvery(ACTION_TYPES.ADD_TODO_REQUEST, asyncAddTodo)
    yield takeEvery(ACTION_TYPES.REMOVE_TODO_REQUEST, asyncRemoveTodo)
    yield takeEvery(ACTION_TYPES.UPDATE_TODO_REQUEST, asyncUpdateTodo)

    yield console.log('Working todoWatcher in saga')
}
