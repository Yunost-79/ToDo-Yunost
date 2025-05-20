import { TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

export const setState = (payload: TodoState) => ({
    type: ACTION_TYPES.SET_STATE,
    payload,
})

export const addTodo = (payload: string) => ({
    type: ACTION_TYPES.ADD_TODO,
    payload,
})

export const setWarning = (payload: string) => ({
    type: ACTION_TYPES.SET_WARNING,
    payload,
})
