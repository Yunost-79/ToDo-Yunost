import { UserState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { UserActions } from '../../../actions/userActions'

const getUserReducers = (state: UserState, action: UserActions) => {
    switch (action.type) {
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

export default getUserReducers
