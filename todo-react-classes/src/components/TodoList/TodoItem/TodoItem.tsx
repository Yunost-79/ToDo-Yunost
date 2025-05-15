import styled from '@emotion/styled'
import { Component } from 'react'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemState = {
    isEdit: boolean
}

class TodoItem extends Component {
    state: TodoItemState = {
        isEdit: true,
    }
    render() {
        return (
            <StyledLi>
                <TodoContext isEdit={this.state.isEdit} />
                <TodoControl />
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
`

export default TodoItem
