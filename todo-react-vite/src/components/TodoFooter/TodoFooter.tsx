import { styled } from '@mui/material'
import Filters from './Filters/Filters'
import RemoveAllTodos from './RemoveAllTodos/RemoveAllTodos'
import TodoCounter from './TodoCounter/TodoCounter'

const TodoFooter = () => {
    return (
        <StyledTodoFooter>
            <TodoCounter />
            <Filters />
            <RemoveAllTodos />
        </StyledTodoFooter>
    )
}

const StyledTodoFooter = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    color: theme.palette.text.secondary,

    '& span': {
        color: theme.palette.text.secondary,
    },
}))

export default TodoFooter
