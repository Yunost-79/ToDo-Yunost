import { TodoState } from '../../../../globalVariables/typesVariables'
import { ASYNC_ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const asyncSetTodosReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ASYNC_ACTION_TYPES.ASYNC_SET_TODOS:
            return {
                ...state,
                todos: action.payload.todos,
            }

        default:
            return state
    }
}

export default asyncSetTodosReducer
