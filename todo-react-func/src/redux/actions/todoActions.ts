import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

export const resetTodos = () => ({
    type: ACTION_TYPES.RESET_TODOS,
})

export const setFilter = (filter: FilterStatus) => ({
    type: ACTION_TYPES.SET_FILTER,
    payload: { filter },
})

export const reorderTodos = (reorderedTodos: Todo[]) => ({
    type: ACTION_TYPES.REORDER_TODOS,
    payload: { reorderedTodos },
})

export const changeTodoIsEdit = (taskId: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_IS_EDIT,
    payload: { taskId },
})

export const closeAllTodosIsEdit = () => ({
    type: ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT,
})

//ACTION SECTION: get todos actions
export const getTodosRequest = () => ({
    type: ACTION_TYPES.GET_TODOS_REQUEST,
})

export const getTodosSuccess = (newTodos: Todo[], isEnd: boolean, counter: number) => ({
    type: ACTION_TYPES.GET_TODOS_SUCCESS,
    payload: { newTodos, isEnd, counter },
})
export const getTodosFailure = (error: string | Error | null) => ({
    type: ACTION_TYPES.GET_TODOS_FAILURE,
    payload: { error },
})

//ACTION SECTION: add todo actions
export const addTodoRequest = (value: string) => ({
    type: ACTION_TYPES.ADD_TODO_REQUEST,
    payload: { value },
})
export const addTodoSuccess = (todo: Todo) => ({
    type: ACTION_TYPES.ADD_TODO_SUCCESS,
    payload: { todo },
})

export const addTodoFailure = (error: string | Error | null) => ({
    type: ACTION_TYPES.ADD_TODO_FAILURE,
    payload: { error },
})

//ACTION SECTION: remove/s todo actions

export const removeTodoRequest = (taskId?: number | 'all') => ({
    type: ACTION_TYPES.REMOVE_TODO_REQUEST,
    payload: { taskId },
})
export const removeTodoSuccess = (taskId: number | 'all') => ({
    type: ACTION_TYPES.REMOVE_TODO_SUCCESS,
    payload: { taskId },
})

export const removeTodoFailure = (error: string | Error | null) => ({
    type: ACTION_TYPES.REMOVE_TODO_FAILURE,
    payload: { error },
})

//ACTION SECTION: update todo actions

export const updateTodoRequest = (
    taskId: number,
    updates: Partial<{
        status: 'active' | 'completed'
        value: string
    }>,
) => ({
    type: ACTION_TYPES.UPDATE_TODO_REQUEST,
    payload: { taskId, updates },
})
export const updateTodoSuccess = (todo: Todo) => ({
    type: ACTION_TYPES.UPDATE_TODO_SUCCESS,
    payload: { todo },
})

export const updateTodoFailure = (error: string | Error | null) => ({
    type: ACTION_TYPES.UPDATE_TODO_FAILURE,
    payload: { error },
})

export type TodoActions =
    | ReturnType<typeof resetTodos>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof reorderTodos>
    | ReturnType<typeof changeTodoIsEdit>
    | ReturnType<typeof closeAllTodosIsEdit>
    | ReturnType<typeof getTodosRequest>
    | ReturnType<typeof getTodosSuccess>
    | ReturnType<typeof getTodosFailure>
    | ReturnType<typeof addTodoRequest>
    | ReturnType<typeof addTodoSuccess>
    | ReturnType<typeof addTodoFailure>
    | ReturnType<typeof removeTodoRequest>
    | ReturnType<typeof removeTodoSuccess>
    | ReturnType<typeof removeTodoFailure>
    | ReturnType<typeof updateTodoRequest>
    | ReturnType<typeof updateTodoSuccess>
    | ReturnType<typeof updateTodoFailure>
