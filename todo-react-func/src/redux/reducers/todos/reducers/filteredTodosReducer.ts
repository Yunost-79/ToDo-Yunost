import { FILTER_STATUS } from '../../../../globalVariables/todoVariables'
import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'

const filteredTodosReducer = (state: TodoState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FILTER_TODOS:
            const filter = action.payload.status || state.filter

            let filteredTodos = []

            if (filter === FILTER_STATUS.active) {
                filteredTodos = state.todos.filter((todo) => todo.status === FILTER_STATUS.active)
            } else if (filter === FILTER_STATUS.completed) {
                filteredTodos = state.todos.filter(
                    (todo) => todo.status === FILTER_STATUS.completed,
                )
            } else {
                filteredTodos = [...state.todos]
            }

            return { ...state, filteredTodos, filter }

        default:
            return state
    }
}

export default filteredTodosReducer
