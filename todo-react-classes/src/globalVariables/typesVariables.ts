import { FILTER_STATUS } from './todoVariables'

export type FilterStatus = (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]

export type Todo = {
    id: number
    value: string
    isEdit: boolean
    status: FilterStatus
    dateOfCreation: number
}

export type TodoState = {
    todos: Todo[]
    counter: number
    filter: FilterStatus
    warning: Warning
}

export type Warning = {
    isWarning: boolean
    warningText?: string
}
