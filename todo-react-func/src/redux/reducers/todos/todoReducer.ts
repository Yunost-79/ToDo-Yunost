import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'

const filterStatus = getItem('filter') || FILTER_STATUS.all

const initTodoState: TodoState = {
    todos: [],
    counter: 0,
    filter: filterStatus,
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
            return {
                ...state,
                page: 1,
                isEnd: false,
                filter: action.payload.filter,
            }

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
                isLoading: false,
                // counter: state.counter + action.payload.newTodos.length,
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
            return {
                ...state,
                todos: [action.payload.todo, ...state.todos],
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
            if(taskId === 'all'){
                return{ ...initTodoState}    
            }
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.taskId !== taskId),
            }

        case ACTION_TYPES.REMOVE_TODO_FAILURE:
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
