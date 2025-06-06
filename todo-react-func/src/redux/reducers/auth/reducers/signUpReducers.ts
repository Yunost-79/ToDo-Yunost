import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const signUpReducers = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_UP_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                isSignedUp: false,
                isSignedIn: false,
            }

        case ACTION_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedUp: true,
            }

        case ACTION_TYPES.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }

        default:
            return state
    }
}

export default signUpReducers
