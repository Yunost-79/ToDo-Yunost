import { FILTER_STATUS } from './todoVariables'

export type FilterStatus = (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]

export type Todo = {
    taskId: number
    value: string
    isEdit: boolean
    status: FilterStatus
    dateOfCreation: Date
    dateOfChange: Date | null
}

export type TodoState = {
    todos: Todo[]
    filteredTodos: Todo[]
    filter: FilterStatus
}

export type Warning = {
    isWarning: boolean
    warningText?: string
}

export type SignInUserData = {
    username: string
    password: string
}

export type SignUpUserData = {
    username: string
    password: string
    rePassword?: string
}

export type AuthState = {
    isLoading: boolean
    error: string | null | Error
    isSignedUp: boolean
    isSignedIn: boolean
}

export type UserState = {
    userId: number | null
    username: string | null
    avatar: string | null
}
