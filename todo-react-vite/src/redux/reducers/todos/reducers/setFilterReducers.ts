import { TodoState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { TodoActions } from '../../../actions/todoActions'

const setFilterReducers = (state: TodoState, action: TodoActions, initTodoState?: TodoState) => {
    switch (action.type) {
        case ACTION_TYPES.SET_FILTER:
            const filter = action.payload.filter
            return {
                ...state,
                page: 1,
                isEnd: false,
                filter: filter,
                todos: state.todos.filter((todo) => todo.status === filter),
            }

        default:
            return state
    }
}

export default setFilterReducers
