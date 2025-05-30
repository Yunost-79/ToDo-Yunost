import { UserState } from '../../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../../actions/actionTypes'
import { UserActions } from '../../../actions/userActions'

const removeUserReducer = (state: UserState, action: UserActions, initUserState: UserState) => {
    switch (action.type) {
        case ACTION_TYPES.REMOVE_USER:
            return initUserState

        default:
            return state
    }
}

export default removeUserReducer
