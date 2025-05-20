import { TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

export const setState = (todosState: TodoState) => ({
    type: ACTION_TYPES.SET_STATE,
    payload: todosState,
})

export const addTodo = (value: string) => ({
    type: ACTION_TYPES.ADD_TODO,
    payload: value,
})

export const removeTodo = (id: number) => ({
    type: ACTION_TYPES.REMOVE_TODO,
    payload: id,
})

export const changeTodoStatus = (id: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_STATUS,
    payload: id,
})

export const changeTodoIsEdit = (id: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_IS_EDIT,
    payload: id,
})

export const closeAllTodosIsEdit = () => ({
    type: ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT,
})

export const editTodoContext = (id: number, value: string) => ({
    type: ACTION_TYPES.EDIT_TODO_CONTEXT,
    payload: { id, value },
})
