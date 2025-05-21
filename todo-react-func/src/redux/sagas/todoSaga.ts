import { put, takeEvery } from 'redux-saga/effects'
import { ASYNC_ACTION_TYPES, AsyncActionType } from '../actions/actionTypes'
import { addTodo, editTodoContext, removeAllTodos, removeTodo } from '../actions/todoActions'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* asyncAddTodo(action: { type: AsyncActionType; payload: { value: string } }) {
    yield delay(500)
    yield put(addTodo(action.payload.value))
}

function* asyncRemoveTodo(action: { type: AsyncActionType; payload: { id: number } }) {
    yield delay(500)
    yield put(removeTodo(action.payload.id))
}

function* asyncRemoveAllTodos() {
    yield delay(500)
    yield put(removeAllTodos())
}

function* asyncEditTodoContext(action: {
    type: AsyncActionType
    payload: { id: number; value: string; currentDate: Date | null }
}) {
    const { id, value, currentDate } = action.payload

    yield delay(500)
    yield put(editTodoContext(id, value, currentDate))
}

export function* todoWatcher() {
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_ADD_TODO, asyncAddTodo)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO, asyncRemoveTodo)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS, asyncRemoveAllTodos)
    yield takeEvery(ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO_CONTEXT, asyncEditTodoContext)

    yield console.log('Working todoWatcher in saga')
}
