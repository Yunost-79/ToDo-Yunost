import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'
import { RootState } from '../../../redux/store'

type CounterTitle = {
    title: string
    status: FilterStatus
}

const TodoCounter = () => {
    const todoState = useSelector((state: RootState) => state.todos)

    // console.log('todoState in counter', todoState)

    const counterTitleBlock: CounterTitle[] = [
        { title: 'Todos:', status: FILTER_STATUS.all },
        { title: 'Active todos:', status: FILTER_STATUS.active },
        { title: 'Completed todos:', status: FILTER_STATUS.completed },
    ]

    // const counterTitle = handleSetListElement(counterTitleBlock, todoState)
    return (
        <StyledTodoCounter>
            {/* <CounterSpan>{counterTitle?.title}</CounterSpan>
            <CounterSpan>{todoState.counter}</CounterSpan> */}
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
