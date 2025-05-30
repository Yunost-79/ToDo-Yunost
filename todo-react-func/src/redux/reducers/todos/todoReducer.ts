import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES, ASYNC_ACTION_TYPES } from '../../actions/actionTypes'
import { TodoActions } from '../../actions/todoActions'
import asyncChangeTodoStatusReducer from './reducers/asyncChangeTodoStatusReducer'
import asyncSetTodosReducer from './reducers/asyncSetTodosReducer'
import changeTodoCounter from './reducers/changeTodoCounter'
import changeTodoIsEditReducer from './reducers/changeTodoIsEditReducer'
import filterTodosReducer from './reducers/filterTodosReducer'
import setTodoStateReducer from './reducers/setTodoStateReducer'

const savedState = getItem('todoState') || FILTER_STATUS.all

const initTodoState: TodoState = {
    todos: [],
    counter: 0,
    filter: savedState.filter,
}

const todoReducer = (state: TodoState = initTodoState, action: TodoActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODO_STATE:
            return setTodoStateReducer(state, action)

        case ASYNC_ACTION_TYPES.ASYNC_SET_TODOS:
            return asyncSetTodosReducer(state, action)

        case ACTION_TYPES.CHANGE_TODO_IS_EDIT:
            return changeTodoIsEditReducer(state, action)

        case ASYNC_ACTION_TYPES.ASYNC_CHANGE_TODO_STATUS:
            return asyncChangeTodoStatusReducer(state, action)

        case ACTION_TYPES.CLOSE_ALL_TODOS_IS_EDIT:
            return asyncChangeTodoStatusReducer(state, action)

        case ACTION_TYPES.FILTER_TODOS:
            return filterTodosReducer(state, action)

        case ACTION_TYPES.CHANGE_TODO_COUNTER:
            return changeTodoCounter(state, action)
        default:
            return state
    }
}

export default todoReducer
