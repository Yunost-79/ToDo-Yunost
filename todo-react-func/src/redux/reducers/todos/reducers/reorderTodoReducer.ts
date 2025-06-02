import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const reorderTodoReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.REORDER_TODOS:
            return { ...state, todos: action.payload.newOrder }

        default:
            return state
    }
}

export default reorderTodoReducer
