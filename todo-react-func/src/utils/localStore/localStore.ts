export const getItem = (key: string) => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (e) {
        const err = e as Error

        console.error('Error in getItem', err)
        return null
    }
}

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        const err = e as Error
        console.error('Error in setItem', err)
    }
}

export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (e) {
        const err = e as Error
        console.error('Error in removeItem', err)
    }
}
