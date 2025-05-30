import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const requestReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_REQUEST:
        case ACTION_TYPES.SIGN_UP_REQUEST:
        case ACTION_TYPES.SIGN_OUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                isSignedUp: false,
                isSignedIn: false,
            }
        default:
            return state
    }
}

export default requestReducer
