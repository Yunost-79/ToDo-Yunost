import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

class Filters extends Component {
    render() {
        return (
            <StyledTodoFilters>
                <FilterSpan>All</FilterSpan>
                <FilterSpan>Active</FilterSpan>
                <FilterSpan>Completed</FilterSpan>
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
