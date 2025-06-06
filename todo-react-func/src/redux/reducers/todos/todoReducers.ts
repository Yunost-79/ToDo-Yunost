import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'
import addTodoReducers from './reducers/addTodoReducers'
import getTodosReducers from './reducers/getTodosReducers'
import removeTodoReducers from './reducers/removeTodoReducers'
import reorderTodosReducers from './reducers/reorderTodosReducers'
import resetTodosReducers from './reducers/resetTodosReducers'
import setFilterReducers from './reducers/setFilterReducers'
import todoIsEditReducers from './reducers/todoIsEditReducer'
import updateTodoReducers from './reducers/updateTodoReducers'

const initTodoState: TodoState = {
    todos: [],
    counter: 0,
    filter: getItem('filter') || FILTER_STATUS.all,
    page: 1,
    isEnd: false,
    isLoading: false,
    error: null,
}

const todoReducers = (state: TodoState = initTodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_TODOS:
            return resetTodosReducers(state, action, initTodoState)

        case ACTION_TYPES.SET_FILTER:
            return setFilterReducers(state, action)

        case ACTION_TYPES.REORDER_TODOS:
            return reorderTodosReducers(state, action)
        // return { ...state, todos: action.payload.reorderedTodos }

        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            return todoIsEditReducers(state, action)

        //Reducers for saga

        case ACTION_TYPES.GET_TODOS_REQUEST:
        case ACTION_TYPES.GET_TODOS_SUCCESS:
        case ACTION_TYPES.GET_TODOS_FAILURE:
            return getTodosReducers(state, action)

        case ACTION_TYPES.ADD_TODO_REQUEST:
        case ACTION_TYPES.ADD_TODO_SUCCESS:
        case ACTION_TYPES.ADD_TODO_FAILURE:
            return addTodoReducers(state, action)

        case ACTION_TYPES.REMOVE_TODO_REQUEST:
        case ACTION_TYPES.REMOVE_TODO_SUCCESS:
        case ACTION_TYPES.REMOVE_TODO_FAILURE:
            return removeTodoReducers(state, action, initTodoState)

        case ACTION_TYPES.UPDATE_TODO_REQUEST:
        case ACTION_TYPES.UPDATE_TODO_SUCCESS:
        case ACTION_TYPES.UPDATE_TODO_FAILURE:
            return updateTodoReducers(state, action)

        default:
            return state
    }
}

export default todoReducers
