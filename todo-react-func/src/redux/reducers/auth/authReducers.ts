import { AuthState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { AuthActions } from '../../actions/authActions'
import removeAuthErrorAndLoadingReducer from './reducers/removeAuthErrorAndLoadingReducer'
import signInReducers from './reducers/signInReducers'
import signOutReducers from './reducers/signOutReducers'
import signUpReducers from './reducers/signUpReducers'

const initAuthState: AuthState = {
    isLoading: false,
    error: null,
    isSignedIn: false,
    isSignedUp: false,
}

const authReducers = (state: AuthState = initAuthState, action: AuthActions) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_REQUEST:
        case ACTION_TYPES.SIGN_IN_SUCCESS:
        case ACTION_TYPES.SIGN_IN_FAILURE:
            return signInReducers(state, action)

        case ACTION_TYPES.SIGN_UP_REQUEST:
        case ACTION_TYPES.SIGN_UP_SUCCESS:
        case ACTION_TYPES.SIGN_UP_FAILURE:
            return signUpReducers(state, action)

        case ACTION_TYPES.SIGN_OUT_REQUEST:
        case ACTION_TYPES.SIGN_OUT_SUCCESS:
        case ACTION_TYPES.SIGN_OUT_FAILURE:
            return signOutReducers(state, action)

        case ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING:
            return removeAuthErrorAndLoadingReducer(state, action)

        default:
            return state
    }
}
export default authReducers
