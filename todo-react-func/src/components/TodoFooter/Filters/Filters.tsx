import styled from '@emotion/styled'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FilterStatus, TodoState } from '../../../globalVariables/typesVariables'

type FiltersForRender = {
    text: string
    status: FilterStatus
    isActive: boolean
}

type FiltersProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
    closeAllTodoEdit: () => void
}

type FiltersState = {
    filters: FiltersForRender[]
}

const Filters = () => {
    // state = {
    //     filters: [
    //         { text: 'All', status: FILTER_STATUS.all, isActive: true },
    //         { text: 'Active', status: FILTER_STATUS.active, isActive: false },
    //         { text: 'Completed', status: FILTER_STATUS.completed, isActive: false },
    //     ],
    // }

    // componentDidMount(): void {
    //     const { todoState } = this.props

    //     this.filteringTodos(todoState.filter)
    // }

    // componentDidUpdate(prevProps: Readonly<FiltersProps>): void {
    //     const { todoState, closeAllTodoEdit } = this.props

    //     if (prevProps.todoState.filter !== todoState.filter) {
    //         closeAllTodoEdit()
    //     }

    //     if (prevProps.todoState.todos !== todoState.todos) {
    //         this.filteringTodos(todoState.filter)
    //     }
    // }

    // filteringTodos = (filterStatus: FilterStatus) => {
    //     const { todoState, setTodoState } = this.props

    //     const status = filterStatus || todoState.filter

    //     let filteredTodos = []

    //     switch (status) {
    //         case FILTER_STATUS.active:
    //             filteredTodos = todoState.todos.filter(
    //                 (todo) => todo.status === FILTER_STATUS.active,
    //             )
    //             break
    //         case FILTER_STATUS.completed:
    //             filteredTodos = todoState.todos.filter(
    //                 (todo) => todo.status === FILTER_STATUS.completed,
    //             )
    //             break
    //         default:
    //             filteredTodos = [...todoState.todos]
    //     }

    //     setTodoState({
    //         ...todoState,
    //         filteredTodos,
    //         filter: status,
    //         counter: filteredTodos.length,
    //     })
    // }

    // handleChangeFilter = (status: FilterStatus) => {
    //     this.filteringTodos(status)
    // }

    // const { todoState } = this.props

    return (
        <StyledTodoFilters>
            {/* {this.state.filters.map((filter: FiltersForRender, index: number) => ( */}
            <FilterSpan
            // key={index}
            // className={filter.status === todoState.filter ? 'active' : ''}
            // onClick={() => this.handleChangeFilter(filter.status)}
            >
                {/* {filter.text} */}
                All
            </FilterSpan>
            {/* ))} */}
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
