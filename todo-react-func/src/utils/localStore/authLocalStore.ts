import { getItem, removeItem, setItem } from "./localStore"

export const storeToken = (token: string): void => {
    setItem('authToken', token)
}

export const getStoredToken = (): string | null => {
    return getItem('authToken')
}

export const clearToken = (): void => {
    removeItem('authToken')
}
