import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const changeTodoIsEditReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            const changedTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
                    return { ...todo, isEdit: true }
                }
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: changedTodos }

        default:
            return state
    }
}

export default changeTodoIsEditReducer
