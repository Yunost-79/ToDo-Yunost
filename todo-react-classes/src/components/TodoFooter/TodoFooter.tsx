import styled from '@emotion/styled'
import { Component } from 'react'
import Filters from './Filters/Filters'
import TodoCounter from './TodoCounter/TodoCounter'
import ClearAllTodosButton from './UI/ClearAllTodosButton'

class TodoFooter extends Component {
    render() {
        return (
            <StyledTodoFooter>
                <TodoCounter />
                <Filters />
                <ClearAllTodosButton />
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
