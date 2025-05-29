import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES, ASYNC_ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'
import { initTodoState } from './initTodoState'

const todoReducer = (state: TodoState = initTodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODO_STATE:
            return {
                ...state,
                todos: action.payload.todosState.todos,
                filteredTodos: action.payload.todosState.filter,
            }

        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            const changedTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
                    return { ...todo, isEdit: true }
                }
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: changedTodos }

        case ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS:
            const toggledTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
                    return {
                        ...todo,
                        status:
                            todo.status === FILTER_STATUS.active
                                ? FILTER_STATUS.completed
                                : FILTER_STATUS.active,
                    }
                }
                return todo
            })
            return { ...state, todos: toggledTodos }

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: closeAllTodosIsEdit }

        case ASYNC_ACTION_TYPES.ASYNC_SET_TODOS:
            return {
                ...state,
                todos: action.payload.todos,
            }
        case ASYNC_ACTION_TYPES.ASYNC_SET_FILTERED_TODOS:
            return {
                ...state,
                filteredTodos: action.payload.todos,
            }

        // case ACTION_TYPES.SET_TODO_STATE:
        // case ACTION_TYPES.RESET_STATE:
        // case ACTION_TYPES.ADD_TODO:
        // case ACTION_TYPES.REMOVE_TODO:
        // case ACTION_TYPES.REMOVE_ALL_TODOS:
        // case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
        // case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
        // case ACTION_TYPES.EDIT_TODO_CONTEXT:
        //     return todoListReducer(state, action)

        // case ACTION_TYPES.CHANGE_TODO_STATUS:
        //     return filterReducer(state, action)

        // case ACTION_TYPES.FILTER_TODOS:
        //     return filteredTodosReducer(state, action)

        default:
            return state
    }
}

export default todoReducer
