import { FILTER_STATUS } from '../../../../globalVariables/todoVariables'
import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'

const filterReducer = (state: TodoState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_TODO_STATUS:
            const toggledTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.id) {
                    return {
                        ...todo,
                        status:
                            todo.status === FILTER_STATUS.active
                                ? FILTER_STATUS.completed
                                : FILTER_STATUS.active,
                    }
                }
                return todo
            })
            return { ...state, todos: toggledTodos }
        default:
            return state
    }
}

export default filterReducer
