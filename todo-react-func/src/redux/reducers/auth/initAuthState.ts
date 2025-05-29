import { AuthState } from '../../../globalVariables/typesVariables'

export const initAuthState: AuthState = {
    isLoading: false,
    error: null,
    isSignedIn: false,
    isSignedUp: false,
}
