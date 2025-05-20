import styled from '@emotion/styled'
import PersistState from '../components/PersistState/PersistState'
import TodoAddInputBlock from '../components/TodoAddInputBlock/TodoAddInputBlock'
import TodoFooter from '../components/TodoFooter/TodoFooter'
import TodoHeader from '../components/TodoHeader/TodoHeader'
import TodoList from '../components/TodoList/TodoList'
import { COLORS } from '../globalVariables/styledVariables'

const TodoPage = () => {
    // closeAllTodoEdit = () => {
    //     const closedAllTodosEdit = this.state.todos.map((todo) => {
    //         return { ...todo, isEdit: false }
    //     })

    //     this.setState(
    //         {
    //             ...this.state,
    //             todos: closedAllTodosEdit,
    //             filteredTodos: closedAllTodosEdit,
    //         },
    //         () => {
    //             this.setData(this.state)
    //         },
    //     )
    // }

    return (
        <>
            <PersistState />
            <StyledContainer>
                <StyledTodoContainer>
                    <TodoHeader />
                    <TodoAddInputBlock />
                    <TodoList
                    // todoState={this.state}
                    // setTodoState={this.setTodoState}
                    // closeAllTodoEdit={this.closeAllTodoEdit}
                    />
                    <TodoFooter
                    // todoState={this.state}
                    // setTodoState={this.setTodoState}
                    // closeAllTodoEdit={this.closeAllTodoEdit}
                    />
                </StyledTodoContainer>
            </StyledContainer>
        </>
    )
}
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
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
