import { styled } from '@mui/material'
import TodoAddInputBlock from '../components/TodoAddInputBlock/TodoAddInputBlock'
import TodoFooter from '../components/TodoFooter/TodoFooter'
import TodoHeader from '../components/TodoHeader/TodoHeader'
import TodoList from '../components/TodoList/TodoList'
import TodoSignOut from '../components/TodoSignOut/TodoSignOut'
import ChangeModeButton from '../components/UI/Buttons/ChangeModeButton'

const TodoPage = () => {
    return (
        <>
            <ChangeModeButton />
            <StyledContainer>
                <StyledTodoContainer>
                    <TodoSignOut />
                    <TodoHeader />
                    <TodoAddInputBlock />
                    <TodoList />
                    <TodoFooter />
                </StyledTodoContainer>
            </StyledContainer>
        </>
    )
}

const StyledContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
})

const StyledTodoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    backgroundColor: theme.palette.background.default,
    width: '60%',
    padding: '24px',
    borderRadius: '8px',

    '@media (max-width: 1025px)': {
        width: '80%',
    },
}))

export default TodoPage
