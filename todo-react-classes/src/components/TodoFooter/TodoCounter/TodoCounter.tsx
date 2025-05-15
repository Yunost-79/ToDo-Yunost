import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

class TodoCounter extends Component {
    render() {
        return (
            <StyledTodoCounter>
                <CounterSpan>Todos:</CounterSpan>
                <CounterSpan>0</CounterSpan>
            </StyledTodoCounter>
        )
    }
}

const StyledTodoCounter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const CounterSpan = styled.span`
    color: ${COLORS.HARD_GREY};
`

export default TodoCounter
