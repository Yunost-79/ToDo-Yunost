import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const todoIsEditReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            const changedTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
                    return { ...todo, isEdit: true }
                }
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: changedTodos }

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            const closeAllTodosIsEdit = state.todos.map((todo) => {
                return { ...todo, isEdit: false }
            })
            return { ...state, todos: closeAllTodosIsEdit }

        default:
            return state
    }
}

export default todoIsEditReducers
