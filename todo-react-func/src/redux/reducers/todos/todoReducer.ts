import { TodoState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { initTodoState } from './initTodoState'
import filteredTodosReducer from './reducers/filteredTodosReducer'
import filterReducer from './reducers/filterReducer'
import todoListReducer from './reducers/todoListReducer'

const todoReducer = (state: TodoState = initTodoState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODO_STATE:
        case ACTION_TYPES.RESET_STATE:
        case ACTION_TYPES.ADD_TODO:
        case ACTION_TYPES.REMOVE_TODO:
        case ACTION_TYPES.REMOVE_ALL_TODOS:
        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
        case ACTION_TYPES.EDIT_TODO_CONTEXT:
            return todoListReducer(state, action)

        case ACTION_TYPES.CHANGE_TODO_STATUS:
            return filterReducer(state, action)

        case ACTION_TYPES.FILTER_TODOS:
            return filteredTodosReducer(state, action)

        default:
            return state
    }
}

export default todoReducer
