import { FILTER_STATUS } from '../../../../globalVariables/todoVariables'
import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const updateTodoReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case ACTION_TYPES.UPDATE_TODO_SUCCESS:
            const updatedTodo = action.payload.todo
            const filterStatus = state.filter

            const isFilter =
                filterStatus === FILTER_STATUS.all || updatedTodo.status === filterStatus

            const updatedTodos = isFilter
                ? state.todos.map((todo) =>
                      todo.taskId === updatedTodo.taskId
                          ? { ...todo, ...updatedTodo, isEdit: false }
                          : todo,
                  )
                : state.todos.filter((todo) => todo.taskId !== updatedTodo.taskId)

            return {
                ...state,
                todos: updatedTodos,
                counter: isFilter ? state.counter : updatedTodos.length,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.UPDATE_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action,
            }

        default:
            return state
    }
}

export default updateTodoReducers
