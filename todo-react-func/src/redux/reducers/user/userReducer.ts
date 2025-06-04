import { UserState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { UserActions } from '../../actions/userActions'
import removeUserReducer from './reducers/removeUserReducer'
import setUserReducer from './reducers/setUserReducer'
import setUserStateReducer from './reducers/setUserStateReducer'

const initUserState: UserState = {
    userId: null,
    username: null,
    avatar: null,
    isLoading: false,
    error: null,
}

const userReducer = (state: UserState = initUserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER_STATE:
            return setUserStateReducer(state, action)

        case ACTION_TYPES.SET_USER:
            return setUserReducer(state, action)

        case ACTION_TYPES.REMOVE_USER:
            return removeUserReducer(state, action, initUserState)

        case ACTION_TYPES.GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case ACTION_TYPES.GET_USER_SUCCESS:
            return {
                ...state,
                userId: action.payload.user.userId,
                username: action.payload.user.username,
                avatar: action.payload.user.avatar,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default:
            return state
    }
}
export default userReducer
