import styled from '@emotion/styled'
import { Component } from 'react'
import { TodoState } from '../../globalVariables/typesVariables'
import TodoItem from './TodoItem/TodoItem'

type TodoListProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void

}

class TodoList extends Component<TodoListProps> {
    render() {
        const {
            todoState,
            setTodoState,

        } = this.props
        const { todos } = todoState

        const sortedTodos = todos.sort((a, b) => b.dateOfCreation - a.dateOfCreation)
        return (
            <StyledUl>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        todoState={todoState}
                        setTodoState={setTodoState}

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
