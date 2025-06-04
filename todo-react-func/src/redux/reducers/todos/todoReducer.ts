import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'

const initTodoState: TodoState = {
    todos: [],
    counter: 0,
    filter: getItem('filter') || FILTER_STATUS.all,
    page: 1,
    isEnd: false,
    isLoading: false,
    error: null,
}

const todoReducer = (state: TodoState = initTodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_TODOS:
            return {
                ...initTodoState,
                filter: state.filter,
            }

        case ACTION_TYPES.SET_FILTER:
            const filter = action.payload.filter
            return {
                ...state,
                page: 1,
                isEnd: false,
                filter: filter,
                todos: state.todos.filter((todo) => todo.status === filter),
            }

        case ACTION_TYPES.REORDER_TODOS:
            return { ...state, todos: action.payload.reorderedTodos }

        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            const changedTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
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

        //Reducers for saga

        case ACTION_TYPES.GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case ACTION_TYPES.GET_TODOS_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, ...action.payload.newTodos],
                isEnd: action.payload.isEnd,
                counter: action.payload.counter,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.GET_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }

        case ACTION_TYPES.ADD_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case ACTION_TYPES.ADD_TODO_SUCCESS:
            const newTodo = action.payload.todo
            const shouldShow = state.filter === FILTER_STATUS.all || newTodo.status === state.filter
            return {
                ...state,
                counter: state.counter + 1,
                todos: shouldShow ? [newTodo, ...state.todos] : state.todos,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.ADD_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action,
            }

        case ACTION_TYPES.REMOVE_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case ACTION_TYPES.REMOVE_TODO_SUCCESS:
            const taskId = action.payload.taskId
            if (taskId === 'all') {
                return { ...initTodoState }
            }
            return {
                ...state,
                counter: state.counter - 1,
                todos: state.todos.filter((todo) => todo.taskId !== taskId),
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.REMOVE_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action,
            }

        case ACTION_TYPES.UPDATE_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case ACTION_TYPES.UPDATE_TODO_SUCCESS:
            const updatedTodo = action.payload.todo
            const filterStatus = state.filter

            const isFilter =
                filterStatus === FILTER_STATUS.all || updatedTodo.status === filterStatus

            const updatedTodos = isFilter
                ? state.todos.map((todo) =>
                      todo.taskId === updatedTodo.taskId
                          ? { ...todo, ...updatedTodo, isEdit: false }
                          : todo,
                  )
                : state.todos.filter((todo) => todo.taskId !== updatedTodo.taskId)

            return {
                ...state,
                todos: updatedTodos,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.UPDATE_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action,
            }
        default:
            return state
    }
}

export default todoReducer
