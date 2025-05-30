import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const filterTodosReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.FILTER_TODOS:
            if (action.type !== ACTION_TYPES.FILTER_TODOS) return state

            const filter = action.payload.status || state.filter
            return {
                ...state,
                filter,
            }
        default:
            return state
    }
}

export default filterTodosReducer
