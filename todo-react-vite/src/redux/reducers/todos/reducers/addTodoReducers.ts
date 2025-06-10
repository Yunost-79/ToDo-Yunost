import { FILTER_STATUS } from '../../../../globalVariables/todoVariables'
import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const addTodoReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
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

        default:
            return state
    }
}

export default addTodoReducers
