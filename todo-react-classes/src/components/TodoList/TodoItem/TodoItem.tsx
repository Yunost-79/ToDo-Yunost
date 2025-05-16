import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
    removeTodo: (id: number) => void
    toggleTodoStatus: (id: number) => void
    editTodoContext: (id: number, value: string) => void
    handleTodoEdit: (id: number) => void
    handleCloseAllTodoEdit: () => void
}

class TodoItem extends Component<TodoItemProps> {
    render() {
        const {
            todo,
            removeTodo,
            toggleTodoStatus,
            editTodoContext,
            handleTodoEdit,
            handleCloseAllTodoEdit,
        } = this.props

        return (
            <StyledLi className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}>
                <TodoContext
                    status={todo.status}
                    isEdit={todo.isEdit}
                    value={todo.value}
                    id={todo.id}
                    toggleTodoStatus={toggleTodoStatus}
                    editTodoContext={editTodoContext}
                    handleCloseAllTodoEdit={handleCloseAllTodoEdit}
                />
                <TodoControl
                    id={todo.id}
                    removeTodo={() => removeTodo(todo.id)}
                    handleTodoEdit={() => handleTodoEdit(todo.id)}
                />
            </StyledLi>
        )
    }
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
