import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../actions/actionTypes'

const initState: TodoState = {
    todos: [],
    filteredTodos: [],
    counter: 0,
    filter: FILTER_STATUS.all,
}

const todoReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_STATE:
            return {
                ...action.payload,
            }

        case ACTION_TYPES.ADD_TODO:
            const newTodo = {
                id: Date.now(),
                value: action.payload,
                isEdit: false,
                status: FILTER_STATUS.active,
                dateOfCreation: Date.now(),
                dateOfEdit: 0,
            }

            const todos = [...state.todos, newTodo]

            return {
                ...state,
                todos,
            }

        case ACTION_TYPES.REMOVE_TODO:
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload)
            return { ...state, todos: filteredTodos }

        case ACTION_TYPES.CHANGE_TODO_STATUS:
            const toggledTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
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

        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            const changedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, isEdit: true }
                }
                return { ...todo, isEdit: false }
            })

            return { ...state, todos: changedTodos }

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })

            console.log('closed all edit', closeAllTodosIsEdit)

            return { ...state, todos: closeAllTodosIsEdit }

        case ACTION_TYPES.EDIT_TODO_CONTEXT:
            const changedTodosWithContext = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, value: action.payload.value, isEdit: false }
                }
                return todo
            })

            return { ...state, todos: changedTodosWithContext }

        default:
            return state
    }
}
export default todoReducer
