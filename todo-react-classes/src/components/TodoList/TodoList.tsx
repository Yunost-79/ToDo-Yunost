import styled from '@emotion/styled'
import { Component } from 'react'
import { TodoState } from '../../globalVariables/typesVariables'
import TodoItem from './TodoItem/TodoItem'

type TodoListProps = {
    todoState: TodoState
    removeTodo: (id: number) => void
    toggleTodoStatus: (id: number) => void
    editTodoContext: (id: number, value: string) => void
    handleTodoEdit: (id: number) => void
    handleCloseAllTodoEdit: () => void
}

class TodoList extends Component<TodoListProps> {
    render() {
        const {
            todoState,
            removeTodo,
            toggleTodoStatus,
            editTodoContext,
            handleTodoEdit,
            handleCloseAllTodoEdit,
        } = this.props
        const { todos } = todoState
        
        const sortedTodos = todos.sort((a, b) => b.dateOfCreation - a.dateOfCreation)
        return (
            <StyledUl>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodoStatus={toggleTodoStatus}
                        editTodoContext={editTodoContext}
                        handleTodoEdit={handleTodoEdit}
                        handleCloseAllTodoEdit={handleCloseAllTodoEdit}
                    />
                ))}
            </StyledUl>
        )
    }
}

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 100%;
`

export default TodoList
