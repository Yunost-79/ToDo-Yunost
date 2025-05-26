import { AuthState } from '../../../globalVariables/typesVariables'
import { getStoredToken } from '../../../utils/localStore/authLocalStore'
import { ACTION_TYPES } from '../../actions/actionTypes'

const initState: AuthState = {
    token: getStoredToken() || null,
    isLoading: false,
    error: null,
}

const authReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_REQUEST:
        case ACTION_TYPES.SIGN_UP_REQUEST:
        case ACTION_TYPES.SIGN_OUT_REQUEST:
            return { ...state, isLoading: true, error: null }

        case ACTION_TYPES.SET_TOKEN:
        case ACTION_TYPES.SIGN_IN_SUCCESS:
        case ACTION_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.SIGN_IN_FAILURE:
        case ACTION_TYPES.SIGN_UP_FAILURE:
        case ACTION_TYPES.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }

        case ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                token: null,
                isLoading: false,
                error: null,
            }

        case ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING:
            return {
                ...state,
                error: null,
                isLoading: false,
            }

        // case ACTION_TYPES.SET_TOKEN:
        //     return { ...state, token: action.payload.token, error: null, isLoading: false }

        // case ACTION_TYPES.SIGN_IN_REQUEST:
        //     return { ...state, isLoading: true, error: null }

        // case ACTION_TYPES.SIGN_IN_SUCCESS:
        //     return { ...state, token: action.payload.token, isLoading: false }

        // case ACTION_TYPES.SIGN_IN_FAILURE:
        //     return { ...state, error: action.payload.error, isLoading: false }

        // case ACTION_TYPES.SIGN_UP_REQUEST:
        //     return { ...state, isLoading: true, error: null }

        // case ACTION_TYPES.SIGN_UP_SUCCESS:
        //     return { ...state, token: action.payload.token, isLoading: false }

        // case ACTION_TYPES.SIGN_UP_FAILURE:
        //     return { ...state, error: action.payload.error, isLoading: false }

        // case ACTION_TYPES.SIGN_OUT_REQUEST:
        //     return { ...state, isLoading: true, error: null }

        // case ACTION_TYPES.SIGN_OUT_SUCCESS:
        //     return { ...state, token: null, isLoading: false, error: null }

        // case ACTION_TYPES.SIGN_OUT_FAILURE:
        //     return { ...state, error: action.payload.error, isLoading: false }

        // case ACTION_TYPES.REMOVE_AUTH_ERROR_AND_LOADING:
        //     return { ...state, error: null, isLoading: false }

        default:
            return state
    }
}
export default authReducer
