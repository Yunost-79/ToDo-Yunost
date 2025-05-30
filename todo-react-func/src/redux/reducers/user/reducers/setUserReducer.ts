import { UserState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { UserActions } from '../../../actions/userActions'

const setUserReducer = (state: UserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return {
                ...action.payload.userData,
            }
        default:
            return state
    }
}

export default setUserReducer
