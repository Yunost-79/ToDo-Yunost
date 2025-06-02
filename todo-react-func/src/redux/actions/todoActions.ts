import { FilterStatus, Todo, TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES, ASYNC_ACTION_TYPES } from './actionTypes'

export const setTodoState = (todosState: TodoState) => ({
    type: ACTION_TYPES.SET_TODO_STATE,
    payload: { todosState },
})

export const changeTodoIsEdit = (taskId: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_IS_EDIT,
    payload: { taskId },
})

export const closeAllTodosIsEdit = () => ({
    type: ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT,
})

export const filteringTodosByStatus = (status: FilterStatus) => ({
    type: ACTION_TYPES.FILTER_TODOS,
    payload: { status },
})

export const changeTodoCounter = (counter: number) => ({
    type: ACTION_TYPES.CHANGE_TODO_COUNTER,
    payload: { counter },
})

export const reorderTodos = (newOrder: Todo[]) => ({
    type: ACTION_TYPES.REORDER_TODOS,
    payload: { newOrder },
})

//asyncs

export const getTodos = () => ({
    type: ASYNC_ACTION_TYPES.ASYNC_GET_TODOS,
})

export const setTodos = (todos: Todo[]) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_SET_TODOS,
    payload: { todos },
})

export const addTodo = (value: string) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_ADD_TODO,
    payload: { value },
})

export const removeTodo = (taskId: number) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO,
    payload: { taskId },
})

export const removeAllTodos = () => ({
    type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS,
})

export const editTodo = (taskId: number, value: string) => ({
    type: ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO,
    payload: { taskId, value },
})

export const changeStatus = (taskId: number, status: 'active' | 'completed') => ({
    type: ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS,
    payload: { taskId, status },
})

export type TodoActions =
    | ReturnType<typeof setTodoState>
    | ReturnType<typeof changeTodoIsEdit>
    | ReturnType<typeof closeAllTodosIsEdit>
    | ReturnType<typeof getTodos>
    | ReturnType<typeof setTodos>
    | ReturnType<typeof addTodo>
    | ReturnType<typeof removeTodo>
    | ReturnType<typeof editTodo>
    | ReturnType<typeof changeStatus>
    | ReturnType<typeof filteringTodosByStatus>
    | ReturnType<typeof changeTodoCounter>
    | ReturnType<typeof reorderTodos>
