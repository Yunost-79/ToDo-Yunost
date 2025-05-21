import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../actions/actionTypes'

const initState: TodoState = {
    todos: [],
    filteredTodos: [],
    counter: 0,
    filter: FILTER_STATUS.all,
    todosState: undefined,
}

const todoReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_STATE:
            return {
                ...state,
                ...action.payload.todosState,
            }

        case ACTION_TYPES.ADD_TODO:
            const newTodo = {
                id: new Date().getTime(),
                value: action.payload.value,
                isEdit: false,
                status: FILTER_STATUS.active,
                dateOfCreation: new Date(),
                dateOfChange: null,
            }

            const todos = [...state.todos, newTodo]

            return { ...state, todos, filteredTodos: todos }

        case ACTION_TYPES.REMOVE_TODO:
            const filteredRemoveTodos = state.todos.filter((todo) => todo.id !== action.payload.id)

            return { ...state, todos: filteredRemoveTodos }

        case ACTION_TYPES.REMOVE_ALL_TODOS:
            return { ...state, todos: [], filter: FILTER_STATUS.all }

        case ACTION_TYPES.CHANGE_TODO_STATUS:
            const toggledTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
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
                if (todo.id === action.payload.id) {
                    return { ...todo, isEdit: true }
                }
                return { ...todo, isEdit: false }
            })

            return { ...state, todos: changedTodos }

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })

            return { ...state, todos: closeAllTodosIsEdit }

        case ACTION_TYPES.EDIT_TODO_CONTEXT:
            const changedTodosWithContext = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        value: action.payload.value,
                        isEdit: false,
                        dateOfChange: action.payload.currentDate,
                    }
                }
                return todo
            })

            return { ...state, todos: changedTodosWithContext }

        case ACTION_TYPES.FILTER_TODOS:
            const filter = action.payload.status || state.filter

            let filteredTodos = []

            if (filter === FILTER_STATUS.active) {
                filteredTodos = state.todos.filter((todo) => todo.status === FILTER_STATUS.active)
            } else if (filter === FILTER_STATUS.completed) {
                filteredTodos = state.todos.filter(
                    (todo) => todo.status === FILTER_STATUS.completed,
                )
            } else {
                filteredTodos = [...state.todos]
            }

            return { ...state, filteredTodos, filter, counter: filteredTodos.length }

        default:
            return state
    }
}
export default todoReducer
