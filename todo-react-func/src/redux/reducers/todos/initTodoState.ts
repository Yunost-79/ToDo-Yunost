import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { TodoState } from '../../../globalVariables/typesVariables'

export const initTodoState: TodoState = {
    todos: [],
    filteredTodos: [],
    filter: FILTER_STATUS.all,
}
