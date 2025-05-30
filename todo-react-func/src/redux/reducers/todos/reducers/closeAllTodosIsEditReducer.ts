import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const asyncChangeTodoStatusReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: closeAllTodosIsEdit }
        default:
            return state
    }
}

export default asyncChangeTodoStatusReducer
