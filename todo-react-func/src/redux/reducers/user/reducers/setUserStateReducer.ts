import { UserState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { UserActions } from '../../../actions/userActions'

const setUserStateReducer = (state: UserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER_STATE:
            return {
                ...state,
                ...action.payload.userState,
            }
        default:
            return state
    }
}

export default setUserStateReducer
