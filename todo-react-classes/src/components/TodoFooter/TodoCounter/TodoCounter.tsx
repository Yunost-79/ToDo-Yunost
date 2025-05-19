import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus, TodoState } from '../../../globalVariables/typesVariables'
import { handleSetListElement } from '../../../helpers/helpers'

type TodoCounterProps = {
    todoState: TodoState
}

type CounterTitle = {
    title: string
    status: FilterStatus
}

type TodoCounterState = {
    counterTitle: CounterTitle[]
}

class TodoCounter extends Component<TodoCounterProps, TodoCounterState> {
    state = {
        counterTitle: [
            { title: 'Todos:', status: FILTER_STATUS.all },
            { title: 'Active todos:', status: FILTER_STATUS.active },
            { title: 'Completed todos:', status: FILTER_STATUS.completed },
        ],
    }

    render() {
        const { todoState } = this.props
        const { counterTitle } = this.state

        const counterTitleElement = handleSetListElement(counterTitle, todoState)
        return (
            <StyledTodoCounter>
                <CounterSpan>{counterTitleElement?.title}</CounterSpan>
                <CounterSpan>{todoState.counter}</CounterSpan>
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
