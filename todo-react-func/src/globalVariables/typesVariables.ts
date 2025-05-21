import { FILTER_STATUS } from './todoVariables'

export type FilterStatus = (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]

export type Todo = {
    id: number
    value: string
    isEdit: boolean
    status: FilterStatus
    dateOfCreation: Date
    dateOfChange: Date | null
}

export type TodoState = {
    todosState: any
    todos: Todo[]
    filteredTodos: Todo[]
    counter: number
    filter: FilterStatus
}

export type Warning = {
    isWarning: boolean
    warningText?: string
}
