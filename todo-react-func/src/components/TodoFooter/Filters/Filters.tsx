import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'
import { RootState } from '../../../redux/store'

type FiltersForRender = {
    text: string
    status: FilterStatus
}

const Filters = () => {
    const dispatch = useDispatch()
    // const { filter } = useSelector((state: RootState) => state.todos)

    const filtersForRender: FiltersForRender[] = [
        { text: 'All', status: FILTER_STATUS.all },
        { text: 'Active', status: FILTER_STATUS.active },
        { text: 'Completed', status: FILTER_STATUS.completed },
    ]

    const handleFilteringTodos = (status: FilterStatus) => {
        // dispatch(filteringTodosByStatus(status))
    }

    return (
        <StyledTodoFilters>
            {filtersForRender.map((filterItem: FiltersForRender, index: number) => (
                <FilterSpan
                    key={index}
                    // className={filterItem.status === filter ? 'active' : ''}
                    onClick={() => handleFilteringTodos(filterItem.status)}
                >
                    {filterItem.text}
                </FilterSpan>
            ))}
        </StyledTodoFilters>
    )
}

const StyledTodoFilters = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`
const FilterSpan = styled.span`
    color: ${COLORS.HARD_GREY};
    opacity: 0.7;
    cursor: pointer;
    transition: 0.2s;

    &.active {
        opacity: 1;
        color: ${COLORS.BLACK};
        text-decoration: underline;
    }
`

export default Filters
