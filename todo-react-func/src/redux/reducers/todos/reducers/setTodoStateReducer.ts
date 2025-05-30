import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const setTodoStateReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODO_STATE:
            return {
                ...state,
                todos: action.payload.todosState.todos,
            }

        default:
            return state
    }
}

export default setTodoStateReducer
