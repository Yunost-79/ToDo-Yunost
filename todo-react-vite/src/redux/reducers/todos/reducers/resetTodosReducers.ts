import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const resetTodosReducers = (state: TodoState, action: TodoActions, initTodoState: TodoState) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_TODOS:
            return {
                ...initTodoState,
                filter: state.filter,
            }

        default:
            return state
    }
}

export default resetTodosReducers
