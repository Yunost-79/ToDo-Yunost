import { AuthState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { AuthActions } from '../../../actions/authActions'

const failureReducer = (state: AuthState, action: AuthActions | any) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN_FAILURE:
        case ACTION_TYPES.SIGN_UP_FAILURE:
        case ACTION_TYPES.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            }
        default:
            return state
    }
}

export default failureReducer
