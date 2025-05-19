import styled from '@emotion/styled'
import { Component } from 'react'
import { TodoState } from '../../globalVariables/typesVariables'
import Filters from './Filters/Filters'
import TodoCounter from './TodoCounter/TodoCounter'
import ClearAllTodosButton from './UI/ClearAllTodosButton'

type TodoFooterProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
    closeAllTodoEdit: () => void
}

class TodoFooter extends Component<TodoFooterProps> {
    removeAllTodos = () => {
        const { todoState, setTodoState } = this.props
        setTodoState({
            ...todoState,
            todos: [],
        })
    }

    render() {
        const { todoState, setTodoState, closeAllTodoEdit } = this.props
        return (
            <StyledTodoFooter>
                <TodoCounter todoState={todoState} />
                <Filters
                    todoState={todoState}
                    setTodoState={setTodoState}
                    closeAllTodoEdit={closeAllTodoEdit}
                />
                <ClearAllTodosButton onClick={this.removeAllTodos} />
            </StyledTodoFooter>
        )
    }
}

const StyledTodoFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export default TodoFooter
