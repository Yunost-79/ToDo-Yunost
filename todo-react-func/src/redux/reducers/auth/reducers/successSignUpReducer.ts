import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const successSignUpReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedUp: true,
            }
        default:
            return state
    }
}

export default successSignUpReducer
