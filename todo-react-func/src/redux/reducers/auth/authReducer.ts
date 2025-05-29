import { ACTION_TYPES } from '../../actions/actionTypes'
import { initAuthState } from './initAuthState'

const authReducer = (state = initAuthState, action: any) => {
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

        case ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedIn: true,
            }

        case ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedIn: false,
                isSignedUp: false,
            }
        case ACTION_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                isSignedUp: true,
            }

        case ACTION_TYPES.SIGN_IN_FAILURE:
        case ACTION_TYPES.SIGN_UP_FAILURE:
        case ACTION_TYPES.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }

        case ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING:
            return {
                ...state,
                error: null,
                isLoading: false,
                isSignedUp: false,
            }

        default:
            return state
    }
}
export default authReducer
