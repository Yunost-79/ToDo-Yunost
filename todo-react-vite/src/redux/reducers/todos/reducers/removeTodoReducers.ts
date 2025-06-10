import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const removeTodoReducers = (state: TodoState, action: TodoActions, initTodoState: TodoState) => {
    switch (action.type) {
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

        default:
            return state
    }
}

export default removeTodoReducers
