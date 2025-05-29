import styled from '@emotion/styled'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'

type CounterTitle = {
    title: string
    status: FilterStatus
}

const TodoCounter = () => {
    // const todosState: TodoState = useSelector((state: RootState) => state.todos)
    // const dispatch = useDispatch()

    // const counterTitleBlock: CounterTitle[] = [
    //     { title: 'Todos:', status: FILTER_STATUS.all },
    //     { title: 'Active todos:', status: FILTER_STATUS.active },
    //     { title: 'Completed todos:', status: FILTER_STATUS.completed },
    // ]

    // const counterTitle = handleSetListElement(counterTitleBlock, todosState)

    // useEffect(() => {
    //     dispatch(filteringTodosByStatus(todosState.filter))
    // }, [todosState.todos])

    return (
        <StyledTodoCounter>
            {/* <CounterSpan>{counterTitle?.title}</CounterSpan>
            <CounterSpan>{todosState.filteredTodos.length}</CounterSpan> */}
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
