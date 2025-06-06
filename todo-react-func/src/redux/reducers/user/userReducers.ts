import { UserState } from '../../../globalVariables/typesVariables'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { UserActions } from '../../actions/userActions'
import getUserReducers from './reducers/getUserReducers'
import removeUserReducers from './reducers/removeUserReducers'
import setUserReducers from './reducers/setUserReducers'
import setUserStateReducers from './reducers/setUserStateReducers'

const initUserState: UserState = {
    userId: null,
    username: null,
    avatar: null,
    isLoading: false,
    error: null,
}

const userReducers = (state: UserState = initUserState, action: UserActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER_STATE:
            return setUserStateReducers(state, action)

        case ACTION_TYPES.SET_USER:
            return setUserReducers(state, action)

        case ACTION_TYPES.REMOVE_USER:
            return removeUserReducers(state, action, initUserState)

        case ACTION_TYPES.GET_USER_REQUEST:
        case ACTION_TYPES.GET_USER_SUCCESS:
        case ACTION_TYPES.GET_USER_FAILURE:
            return getUserReducers(state, action)

        default:
            return state
    }
}
export default userReducers
