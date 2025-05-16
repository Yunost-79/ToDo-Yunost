import styled from '@emotion/styled'
import { Component } from 'react'
import { FilterStatus, TodoState } from '../../globalVariables/typesVariables'
import Filters from './Filters/Filters'
import TodoCounter from './TodoCounter/TodoCounter'
import ClearAllTodosButton from './UI/ClearAllTodosButton'

type TodoFooterProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
    filteringTodos: (filterStatus: FilterStatus) => void
    removeAllTodos: () => void
}

class TodoFooter extends Component<TodoFooterProps> {
    render() {
        const { todoState, setTodoState, filteringTodos, removeAllTodos } = this.props
        return (
            <StyledTodoFooter>
                <TodoCounter />
                <Filters
                    todoState={todoState}
                    setTodoState={setTodoState}
                    filteringTodos={filteringTodos}
                />
                <ClearAllTodosButton onClick={removeAllTodos} />
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
