import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'
import { handleSetListElement } from '../../../helpers/helpers'
import { RootState } from '../../../redux/store'

type CounterTitle = {
    title: string
    status: FilterStatus
}

const TodoCounter = () => {
    const { counter, filter } = useSelector((state: RootState) => state.todos)

    const counterTitleBlock: CounterTitle[] = [
        { title: 'Todos:', status: FILTER_STATUS.all },
        { title: 'Active todos:', status: FILTER_STATUS.active },
        { title: 'Completed todos:', status: FILTER_STATUS.completed },
    ]

    const counterTitle = handleSetListElement(counterTitleBlock, filter)
    return (
        <StyledTodoCounter>
            <span>{counterTitle?.title}</span>
            <span>{counter}</span>
        </StyledTodoCounter>
    )
}

const StyledTodoCounter = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
})

export default TodoCounter
