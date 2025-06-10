import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const signInReducers = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                isSignedUp: false,
                isSignedIn: false,
            }

        case ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedIn: true,
            }

        case ACTION_TYPES.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }

        default:
            return state
    }
}

export default signInReducers
