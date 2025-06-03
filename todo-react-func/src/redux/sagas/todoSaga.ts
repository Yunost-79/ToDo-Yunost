// // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

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
} from '../actions/todoActions'
import { RootState } from '../store'

// import { AxiosError, AxiosResponse } from 'axios'
// import { call, put, select, takeEvery } from 'redux-saga/effects'
// import instance from '../../API/axiosInstance'
// import { Todo } from '../../globalVariables/typesVariables'
// import { removeItem } from '../../utils/localStore/localStore'
// import { ASYNC_ACTION_TYPES, AsyncActionType } from '../actions/actionTypes'
// import { changeTodoCounter, setIsEndTodos, setLoadingTodos } from '../actions/todoActions'
// import { RootState } from '../store'

// // function* asyncGetTodos() {
// //     try {
// //         const response: AxiosResponse = yield call(() => instance.get('/tasks'))

// //         if (response.data) {
// //             const todos = response.data.tasks.map((task: Todo) => {
// //                 return { ...task, isEdit: false }
// //             })
// //             yield put(setTodos(todos))
// //         }
// //     } catch (err) {
// //         const e = err as AxiosError
// //         console.error('Error in asyncGetTodos', e)
// //     }
// // }

// function* asyncGetTodos() {
//     let { page, filter } = yield select((state: RootState) => state.todos)

//     try {
//         const limit = 10

//         console.log('page in asyncGetTodos', page, filter)

//         const response: AxiosResponse = yield call(() =>
//             instance.post(`/tasks/limit/${limit}/page/${page}`, { status: filter }),
//         )

//         console.log('response', response.data)

//         if (response.data) {
//             const todos = response.data.tasks.map((task: Todo) => {
//                 return { ...task, isEdit: false }
//             })

//             yield put(setIsEndTodos(response.data.isEnd))

//             yield put(setLoadingTodos(todos))

//             yield put(changeTodoCounter(response.data.count))
//         }
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncGetTodos', e)
//     }
// }

// function* asyncAddTodo(action: { type: AsyncActionType; payload: { value: string } }) {
//     try {
//         yield call(() => instance.post('/tasks', { value: action.payload.value }))

//         yield call(asyncGetTodos)
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncAddTodo', e)
//     }
// }

// function* asyncRemoveTodoById(action: { type: AsyncActionType; payload: { taskId: number } }) {
//     try {
//         yield call(() => instance.delete(`/tasks/${action.payload.taskId}`))

//         yield call(asyncGetTodos)
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncRemoveTodoById', e)
//     }
// }

// function* asyncRemoveAllTodos() {
//     try {
//         yield call(() => instance.delete(`/tasks`))

//         yield call(asyncGetTodos)
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncRemoveAllTodos', e)
//     }
// }

// function* asyncEditTodoById(action: {
//     type: AsyncActionType
//     payload: { taskId: number; value: string }
// }) {
//     try {
//         yield call(() =>
//             instance.put(`/tasks/${action.payload.taskId}`, { value: action.payload.value }),
//         )

//         yield call(asyncGetTodos)
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncEditTodoById', e)
//     }
// }

// function* asyncChangeTodoStatusById(action: {
//     type: AsyncActionType
//     payload: { taskId: number; status: 'active' | 'completed' }
// }) {
//     try {
//         yield call(() =>
//             instance.put(`/tasks/${action.payload.taskId}`, { status: action.payload.status }),
//         )

//         yield call(asyncGetTodos)
//     } catch (err) {
//         const e = err as AxiosError
//         console.error('Error in asyncChangeTodoStatusById', e)
//     }
// }

// export function* todoWatcher() {
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_GET_TODOS, asyncGetTodos)
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_ADD_TODO, asyncAddTodo)
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO, asyncRemoveTodoById)
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO, asyncEditTodoById)
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS, asyncChangeTodoStatusById)
//     yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS, asyncRemoveAllTodos)

//     yield console.log('Working todoWatcher in saga')
// }

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

            console.log(response.data)

            yield put(getTodosSuccess(tasks, isEnd))
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

export function* todoWatcher() {
    yield takeEvery(ACTION_TYPES.GET_TODOS_REQUEST, asyncGetTodos)
    yield takeEvery(ACTION_TYPES.ADD_TODO_REQUEST, asyncAddTodo)
    yield takeEvery(ACTION_TYPES.REMOVE_TODO_REQUEST, asyncRemoveTodo)

    yield console.log('Working todoWatcher in saga')
}
