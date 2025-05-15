import styled from '@emotion/styled'
import { Component } from 'react'
import TodoItem from './TodoItem/TodoItem'

class TodoList extends Component {
    render() {
        return (
            <StyledUl>
                <TodoItem />
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
