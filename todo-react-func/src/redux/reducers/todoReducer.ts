import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { TodoState } from '../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../actions/actionTypes'

const initState: TodoState = {
    todos: [],
    filteredTodos: [],
    counter: 0,
    filter: FILTER_STATUS.all,
    warning: {
        isWarning: false,
        text: '',
    },
}

const todoReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_STATE:
            return action.payload

        case ACTION_TYPES.ADD_TODO:
            const newTodo = {
                id: Date.now(),
                value: action.payload,
                isEdit: false,
                status: FILTER_STATUS.active,
                dateOfCreation: Date.now(),
            }

            const todos = [...state.todos, newTodo]

            return {
                ...state,
                todos,
                warning: {
                    isWarning: false,
                    text: '',
                },
            }

        case ACTION_TYPES.SET_WARNING:
            return {
                ...state,
                warning: {
                    isWarning: true,
                    text: action.payload,
                },
            }
        default:
            return state
    }
}
export default todoReducer
