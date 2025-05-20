import styled from '@emotion/styled'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo, TodoState } from '../../../globalVariables/typesVariables'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
    closeAllTodoEdit: () => void
}

const TodoItem = () => {
    // removeTodo = (id: number) => {
    //     const { todoState, setTodoState } = this.props
    //     const filteredTodos = todoState.todos.filter((todo) => todo.id !== id)
    //     setTodoState({
    //         ...todoState,
    //         todos: filteredTodos,
    //     })
    // }

    // toggleTodoStatus = (id: number) => {
    //     const { todoState, setTodoState } = this.props

    //     const toggledTodos = todoState.todos.map((todo) => {
    //         if (todo.id === id) {
    //             return {
    //                 ...todo,
    //                 status:
    //                     todo.status === FILTER_STATUS.active
    //                         ? FILTER_STATUS.completed
    //                         : FILTER_STATUS.active,
    //             }
    //         }
    //         return todo
    //     })

    //     setTodoState({
    //         ...todoState,
    //         todos: toggledTodos,
    //     })
    // }

    // editTodoContext = (id: number, value: string) => {
    //     const { todoState, setTodoState } = this.props

    //     const checkedValue = value.trim()

    //     const changedTodosWithContext = todoState.todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, value: checkedValue, isEdit: false }
    //         }
    //         return todo
    //     })

    //     setTodoState({
    //         ...todoState,
    //         todos: changedTodosWithContext,
    //     })
    // }

    // handleTodoEdit = (id: number) => {
    //     const { todoState, setTodoState } = this.props

    //     const todosForEdit = todoState.todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, isEdit: true }
    //         }
    //         return { ...todo, isEdit: false }
    //     })

    //     setTodoState({
    //         ...todoState,
    //         todos: todosForEdit,
    //     })
    // }

    // const { todo, closeAllTodoEdit } = this.props

    return (
        <StyledLi 
        // className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
        >
            <TodoContext
                // status={todo.status}
                // isEdit={todo.isEdit}
                // value={todo.value}
                // id={todo.id}
                // toggleTodoStatus={this.toggleTodoStatus}
                // handleTodoEdit={() => this.handleTodoEdit(todo.id)}
                // editTodoContext={this.editTodoContext}
                // closeAllTodoEdit={closeAllTodoEdit}
            />
            <TodoControl
                // id={todo.id}
                // removeTodo={() => this.removeTodo(todo.id)}
                // handleTodoEdit={() => this.handleTodoEdit(todo.id)}
            />
        </StyledLi>
    )
}

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    list-style-type: none;
    padding: 5px;
    border-radius: 5px;
    transition: 0.2s;

    &.completed {
        background-color: ${COLORS.LIGHT_GREY};
    }
`

export default TodoItem
