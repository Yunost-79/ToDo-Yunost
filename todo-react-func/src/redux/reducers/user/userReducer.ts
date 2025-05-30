import { UserState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { UserActions } from '../../actions/userActions'
import removeUserReducer from './reducers/removeUserReducer'
import setUserReducer from './reducers/setUserReducer'
import setUserStateReducer from './reducers/setUserStateReducer'

const initUserState: UserState = {
    userId: null,
    username: null,
    avatar: null,
}

const userReducer = (state: UserState = initUserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER_STATE:
            return setUserStateReducer(state, action)
        // return {
        //     ...state,
        //     ...action.payload.userState,
        // }

        case ACTION_TYPES.SET_USER:
            return setUserReducer(state, action)

        // return {
        //     ...action.payload.userData,
        // }

        case ACTION_TYPES.REMOVE_USER:
            return removeUserReducer(state, action, initUserState)

        default:
            return state
    }
}
export default userReducer
