import styled from '@emotion/styled'
import TodoAddInputBlock from '../components/TodoAddInputBlock/TodoAddInputBlock'
import TodoFooter from '../components/TodoFooter/TodoFooter'
import TodoHeader from '../components/TodoHeader/TodoHeader'
import TodoList from '../components/TodoList/TodoList'
import TodoSignOut from '../components/TodoSignOut/TodoSignOut'
import { COLORS } from '../globalVariables/styledVariables'

const TodoPage = () => {
    return (
        <>
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

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px 0;
`

const StyledTodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    background-color: ${COLORS.WHITE};
    width: 50%;
    padding: 24px;
    border-radius: 8px;

    @media (max-width: 1025px) {
        width: 80%;
    }
`
export default TodoPage
