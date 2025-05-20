import styled from '@emotion/styled'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FilterStatus, TodoState } from '../../../globalVariables/typesVariables'

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

const TodoCounter = () => {
    // state = {
    //     counterTitle: [
    //         { title: 'Todos:', status: FILTER_STATUS.all },
    //         { title: 'Active todos:', status: FILTER_STATUS.active },
    //         { title: 'Completed todos:', status: FILTER_STATUS.completed },
    //     ],
    // }

    // const { todoState } = this.props
    // const { counterTitle } = this.state

    // const counterTitleElement = handleSetListElement(counterTitle, todoState)
    return (
        <StyledTodoCounter>
            <CounterSpan>
                {/* {counterTitleElement?.title} */}
                Todos:
            </CounterSpan>
            <CounterSpan>{/* {todoState.counter} */}0</CounterSpan>
        </StyledTodoCounter>
    )
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
