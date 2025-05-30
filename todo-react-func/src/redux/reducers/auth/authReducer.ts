import { AuthState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { AuthActions } from '../../actions/authActions'
import failureReducer from './reducers/failureReducer'
import removeAuthErrorAndLoadingReducer from './reducers/removeAuthErrorAndLoadingReducer'
import requestReducer from './reducers/requestReducer'
import successSignInReducer from './reducers/successSignInReducer'
import successSignOutReducer from './reducers/successSignOutReducer'
import successSignUpReducer from './reducers/successSignUpReducer'

const initAuthState: AuthState = {
    isLoading: false,
    error: null,
    isSignedIn: false,
    isSignedUp: false,
}

const authReducer = (state: AuthState = initAuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_REQUEST:
        case ACTION_TYPES.SIGN_UP_REQUEST:
        case ACTION_TYPES.SIGN_OUT_REQUEST:
            return requestReducer(state, action)

        case ACTION_TYPES.SIGN_IN_SUCCESS:
            return successSignInReducer(state, action)

        case ACTION_TYPES.SIGN_OUT_SUCCESS:
            return successSignOutReducer(state, action)

        case ACTION_TYPES.SIGN_UP_SUCCESS:
            return successSignUpReducer(state, action)

        case ACTION_TYPES.SIGN_IN_FAILURE:
        case ACTION_TYPES.SIGN_UP_FAILURE:
        case ACTION_TYPES.SIGN_OUT_FAILURE:
            return failureReducer(state, action)

        case ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING:
            return removeAuthErrorAndLoadingReducer(state, action)

        default:
            return state
    }
}
export default authReducer
