import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const getTodosReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
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

        default:
            return state
    }
}

export default getTodosReducers
