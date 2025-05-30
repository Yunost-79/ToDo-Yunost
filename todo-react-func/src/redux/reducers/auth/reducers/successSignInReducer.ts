import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const successSignInReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedIn: true,
            }
        default:
            return state
    }
}

export default successSignInReducer
