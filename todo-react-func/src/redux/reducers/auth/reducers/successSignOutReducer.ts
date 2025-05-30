import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const successSignOutReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedIn: false,
                isSignedUp: false,
            }
        default:
            return state
    }
}

export default successSignOutReducer
