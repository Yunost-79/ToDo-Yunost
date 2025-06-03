// import { FilterStatus, Todo, TodoState } from '../../globalVariables/typesVariables'
// import { ACTION_TYPES, ASYNC_ACTION_TYPES } from './actionTypes'

import { FilterStatus, Todo } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from './actionTypes'

// export const setTodoState = (todosState: TodoState) => ({
//     type: ACTION_TYPES.SET_TODO_STATE,
//     payload: { todosState },
// })

// export const changeTodoIsEdit = (taskId: number) => ({
//     type: ACTION_TYPES.CHANGE_TODO_IS_EDIT,
//     payload: { taskId },
// })

// export const closeAllTodosIsEdit = () => ({
//     type: ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT,
// })

// export const filteringTodosByStatus = (status: FilterStatus) => ({
//     type: ACTION_TYPES.FILTER_TODOS,
//     payload: { status },
// })

// export const changeTodoCounter = (counter: number) => ({
//     type: ACTION_TYPES.CHANGE_TODO_COUNTER,
//     payload: { counter },
// })

// export const reorderTodos = (newOrder: Todo[]) => ({
//     type: ACTION_TYPES.REORDER_TODOS,
//     payload: { newOrder },
// })

// export const setPaginationPage = (page: number) => ({
//     type: ACTION_TYPES.SET_PAGINATION_PAGE,
//     payload: { page },
// })

// export const setIsEndTodos = (isEnd: boolean) => ({
//     type: ACTION_TYPES.SET_IS_END_TODOS,
//     payload: { isEnd },
// })

// export const resetTodoState = () => ({
//     type: ACTION_TYPES.RESET_TODO_STATE,
// })

// //asyncs

// export const getTodos = () => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_GET_TODOS,
// })

// export const setTodos = (todos: Todo[]) => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_SET_TODOS,
//     payload: { todos },
// })

// export const addTodo = (value: string) => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_ADD_TODO,
//     payload: { value },
// })

// export const removeTodo = (taskId: number) => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_TODO,
//     payload: { taskId },
// })

// export const removeAllTodos = () => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_REMOVE_ALL_TODOS,
// })

// export const editTodo = (taskId: number, value: string) => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_EDIT_TODO,
//     payload: { taskId, value },
// })

// export const changeStatus = (taskId: number, status: 'active' | 'completed') => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS,
//     payload: { taskId, status },
// })

// export const setLoadingTodos = (
//     todos: Todo[],
//     options: { reset?: boolean; filter?: FilterStatus } = {},
// ) => ({
//     type: ASYNC_ACTION_TYPES.ASYNC_SET_LOADING_TODOS,
//     payload: {
//         todos,
//         reset: options.reset || false,
//         filter: options.filter,
//     },
// })

// export type TodoActions =
//     | ReturnType<typeof setTodoState>
//     | ReturnType<typeof changeTodoIsEdit>
//     | ReturnType<typeof closeAllTodosIsEdit>
//     | ReturnType<typeof getTodos>
//     | ReturnType<typeof setTodos>
//     | ReturnType<typeof addTodo>
//     | ReturnType<typeof removeTodo>
//     | ReturnType<typeof editTodo>
//     | ReturnType<typeof changeStatus>
//     | ReturnType<typeof filteringTodosByStatus>
//     | ReturnType<typeof changeTodoCounter>
//     | ReturnType<typeof reorderTodos>
//     | ReturnType<typeof setLoadingTodos>
//     | ReturnType<typeof setPaginationPage>
//     | ReturnType<typeof setIsEndTodos>
//     | ReturnType<typeof resetTodoState>

export const resetTodos = () => ({
    type: ACTION_TYPES.RESET_TODOS,
})

export const setFilter = (filter: FilterStatus) => ({
    type: ACTION_TYPES.SET_FILTER,
    payload: { filter },
})

export const getTodosRequest = () => ({
    type: ACTION_TYPES.GET_TODOS_REQUEST,
})

export const getTodosSuccess = (newTodos: Todo[], isEnd: boolean) => ({
    type: ACTION_TYPES.GET_TODOS_SUCCESS,
    payload: { newTodos, isEnd },
})
export const getTodosFailure = (error: string | Error | null) => ({
    type: ACTION_TYPES.GET_TODOS_FAILURE,
    payload: { error },
})

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

export type TodoActions =
    | ReturnType<typeof resetTodos>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof getTodosRequest>
    | ReturnType<typeof getTodosSuccess>
    | ReturnType<typeof getTodosFailure>
    | ReturnType<typeof addTodoRequest>
    | ReturnType<typeof addTodoSuccess>
    | ReturnType<typeof addTodoFailure>
    | ReturnType<typeof removeTodoRequest>
    | ReturnType<typeof removeTodoSuccess>
    | ReturnType<typeof removeTodoFailure>
