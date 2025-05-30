import { UserState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { UserActions } from '../../actions/userActions'

const initUserState: UserState = {
    userId: null,
    username: null,
    avatar: null,
}

const userReducer = (state = initUserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER_STATE:
            return {
                ...state,
                ...action.payload.userState,
            }

        case ACTION_TYPES.SET_USER:
            return {
                ...action.payload.userData,
            }

        case ACTION_TYPES.REMOVE_USER:
            return initUserState

        default:
            return state
    }
}
export default userReducer
