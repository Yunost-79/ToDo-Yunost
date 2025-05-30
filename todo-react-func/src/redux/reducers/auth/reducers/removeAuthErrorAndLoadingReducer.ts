import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const removeAuthErrorAndLoadingReducer = (state: AuthState, action: AuthActions | any) => {
    switch (action.type) {
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

export default removeAuthErrorAndLoadingReducer
