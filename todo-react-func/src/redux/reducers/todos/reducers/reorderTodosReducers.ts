import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const reorderTodosReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
        case ACTION_TYPES.REORDER_TODOS:
            return { ...state, todos: action.payload.reorderedTodos }

        default:
            return state
    }
}

export default reorderTodosReducers
