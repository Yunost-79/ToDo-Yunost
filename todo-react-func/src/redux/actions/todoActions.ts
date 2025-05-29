import { FilterStatus, TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES, ASYNC_ACTION_TYPES } from './actionTypes'

export const setTodoState = (todosState: TodoState) => ({
    type: ACTION_TYPES.SET_TODO_STATE,
    payload: { todosState },
})

export const resetState = () => ({
    type: ACTION_TYPES.RESET_STATE,
})

export const addTodo = (value: string) => ({
    type: ACTION_TYPES.ADD_TODO,
    payload: { value },
})

export const removeTodo = (id: number) => ({
    type: ACTION_TYPES.REMOVE_TODO,
    payload: { id },
})

export const removeAllTodos = () => ({
    type: ACTION_TYPES.REMOVE_ALL_TODOS,
})

export const changeTodoStatus = (id: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_STATUS,
    payload: { id },
})

export const changeTodoIsEdit = (id: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_IS_EDIT,
    payload: { id },
})

export const closeAllTodosIsEdit = () => ({
    type: ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT,
})

export const editTodoContext = (id: number, value: string, currentDate: Date | null) => ({
    type: ACTION_TYPES.EDIT_TODO_CONTEXT,
    payload: { id, value, currentDate },
})

export const filteringTodosByStatus = (status: FilterStatus) => ({
    type: ACTION_TYPES.FILTER_TODOS,
    payload: { status },
})

// async methods

export const asyncAddTodo = (value: string) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_ADD_TODO,
    payload: { value },
})

export const asyncRemoveTodo = (id: number) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO,
    payload: { id },
})

export const asyncEditTodoContext = (id: number, value: string, currentDate: Date | null) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO_CONTEXT,
    payload: { id, value, currentDate },
})

export const asyncRemoveAllTodos = () => ({
    type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS,
})
