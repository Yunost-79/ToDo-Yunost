import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES, ASYNC_ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'

const savedState = getItem('todoState')

const initTodoState: TodoState = {
    todos: [],
    counter: 0,
    filter: savedState.filter || FILTER_STATUS.all,
}

const todoReducer = (state: TodoState = initTodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODO_STATE:
            return {
                ...state,
                todos: action.payload.todosState.todos,
            }

        case ASYNC_ACTION_TYPES.ASYNC_SET_TODOS:
            return {
                ...state,
                todos: action.payload.todos,
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
            return {
                ...state,
                todos: toggledTodos,
            }

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: closeAllTodosIsEdit }

        case ACTION_TYPES.FILTER_TODOS:
            if (action.type !== ACTION_TYPES.FILTER_TODOS) return state

            const filter = action.payload.status || state.filter
            return {
                ...state,
                filter,
            }

        case ACTION_TYPES.CHANGE_TODO_COUNTER:
            return { ...state, counter: action.payload.counter }
        default:
            return state
    }
}

export default todoReducer
