import { ThemeState } from '../../../globalVariables/typesVariables'
import { getItem } from '../../../utils/localStore/localStore'
import { ACTION_TYPES } from '../../actions/actionTypes'
import { ThemeActions } from '../../actions/themeActions'

const initTheme: ThemeState = {
    modeTheme: getItem('modeTheme') === 'dark' ? 'dark' : 'light',
}

const themeReducer = (state: ThemeState = initTheme, action: ThemeActions) => {
    switch (action.type) {
        case ACTION_TYPES.SET_MODE_THEME:
            return { ...state, modeTheme: action.payload.modeTheme }
        default:
            return state
    }
}
export default themeReducer
