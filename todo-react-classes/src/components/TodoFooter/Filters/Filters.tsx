import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { FilterStatus, TodoState } from '../../../globalVariables/typesVariables'

type FiltersForRender = {
    text: string
    status: FilterStatus
    isActive: boolean
}

type FiltersProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
}

type FiltersState = {
    filters: FiltersForRender[]
}

class Filters extends Component<FiltersProps, FiltersState> {
    state = {
        filters: [
            { text: 'All', status: FILTER_STATUS.all, isActive: true },
            { text: 'Active', status: FILTER_STATUS.active, isActive: false },
            { text: 'Completed', status: FILTER_STATUS.completed, isActive: false },
        ],
    }

    filteringTodos = (filterStatus: FilterStatus) => {
        const { todoState, setTodoState } = this.props

        const status = filterStatus || FILTER_STATUS.all

        let filteredTodos = []

        switch (status) {
            case FILTER_STATUS.all:
                filteredTodos = todoState.todos.filter(
                    (todo) => todo.status === FILTER_STATUS.active,
                )
                break
            case FILTER_STATUS.completed:
                filteredTodos = todoState.todos.filter(
                    (todo) => todo.status === FILTER_STATUS.completed,
                )
                break
            default:
                filteredTodos = [...todoState.todos]
        }

        setTodoState({
            ...todoState,
            filteredTodos,
            filter: status,
            counter: filteredTodos.length,
        })
    }

    handleChangeFilter = (status: FilterStatus) => {
        this.setState({
            filters: this.state.filters.map((filter) => ({
                ...filter,
                isActive: filter.status === status,
            })),
        })
        this.filteringTodos(status)
    }

    render() {
        return (
            <StyledTodoFilters>
                {this.state.filters.map((filter: FiltersForRender, index: number) => (
                    <FilterSpan
                        key={index}
                        className={filter.isActive ? 'active' : ''}
                        onClick={() => this.handleChangeFilter(filter.status)}
                    >
                        {filter.text}
                    </FilterSpan>
                ))}
            </StyledTodoFilters>
        )
    }
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
