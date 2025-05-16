import styled from '@emotion/styled'
import { Component } from 'react'
import { TodoState } from '../../globalVariables/typesVariables'
import TodoItem from './TodoItem/TodoItem'

type TodoListProps = {
    todoState: TodoState
    removeTodo: (id: number) => void
    toggleTodoStatus: (id: number) => void
}

class TodoList extends Component<TodoListProps> {
    render() {
        const { todoState, removeTodo, toggleTodoStatus } = this.props
        const { todos } = todoState

        return (
            <StyledUl>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodoStatus={toggleTodoStatus}
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
