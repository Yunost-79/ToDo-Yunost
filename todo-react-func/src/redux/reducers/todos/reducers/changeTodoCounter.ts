import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const changeTodoCounter = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_TODO_COUNTER:
            return { ...state, counter: action.payload.counter }

        default:
            return state
    }
}

export default changeTodoCounter
