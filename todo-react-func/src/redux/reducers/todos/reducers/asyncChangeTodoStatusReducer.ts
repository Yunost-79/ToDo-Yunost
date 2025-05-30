import { FILTER_STATUS } from '../../../../globalVariables/todoVariables'
import { TodoState } from '../../../../globalVariables/typesVariables'
import { ASYNC_ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const asyncChangeTodoStatusReducer = (state: TodoState, action: TodoActions) => {
    switch (action.type) {
        case ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS:
            const toggledTodos = state.todos.map((todo) => {
                if (todo.taskId === action.payload.taskId) {
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
            return {
                ...state,
                todos: toggledTodos,
            }
        default:
            return state
    }
}

export default asyncChangeTodoStatusReducer
