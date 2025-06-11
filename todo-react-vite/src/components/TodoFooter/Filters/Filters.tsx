import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'
import { setFilter } from '../../../redux/actions/todoActions'
import { RootState } from '../../../redux/store'

type FiltersForRender = {
    text: string
    status: FilterStatus
}

const Filters = () => {
    const dispatch = useDispatch()
    const { filter } = useSelector((state: RootState) => state.todos)

    const filtersForRender: FiltersForRender[] = [
        { text: 'All', status: FILTER_STATUS.all },
        { text: 'Active', status: FILTER_STATUS.active },
        { text: 'Completed', status: FILTER_STATUS.completed },
    ]

    const handleFilteringTodos = (status: FilterStatus) => {
        dispatch(setFilter(status))
    }

    return (
        <StyledTodoFilters>
            {filtersForRender.map((filterItem: FiltersForRender, index: number) => (
                <FilterSpan
                    key={index}
                    className={filterItem.status === filter ? 'active' : ''}
                    onClick={() => handleFilteringTodos(filterItem.status)}
                >
                    {filterItem.text}
                </FilterSpan>
            ))}
        </StyledTodoFilters>
    )
}

const StyledTodoFilters = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gap: '5px',
})

const FilterSpan = styled('span')(({ theme }) => ({
    cursor: 'pointer',

    '&.active': {
        color: theme.palette.btn.auth,
    },
}))

export default Filters
