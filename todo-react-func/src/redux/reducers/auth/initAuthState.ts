import { AuthState } from '../../../globalVariables/typesVariables'
import { getStoredToken } from '../../../utils/localStore/authLocalStore'

export const initAuthState: AuthState = {
    token: getStoredToken() || null,
    isLoading: false,
    error: null,
}
