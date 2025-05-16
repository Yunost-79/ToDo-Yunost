import styled from '@emotion/styled'
import { Component } from 'react'
import TodoAddInputBlock from '../components/TodoAddInputBlock/TodoAddInputBlock'
import TodoFooter from '../components/TodoFooter/TodoFooter'
import TodoHeader from '../components/TodoHeader/TodoHeader'
import TodoList from '../components/TodoList/TodoList'
import { COLORS } from '../globalVariables/styledVariables'
import { FILTER_STATUS } from '../globalVariables/todoVariables'
import { FilterStatus, Todo, Warning } from '../globalVariables/typesVariables'

type TodoPageState = {
    todos: Todo[]
    filteredTodos: Todo[]
    counter: number
    filter: FilterStatus
    warning: Warning
}

class TodoPage extends Component<{}, TodoPageState> {
    state: TodoPageState = {
        todos: [],
        filteredTodos: [],
        counter: 0,
        filter: FILTER_STATUS.all,
        warning: {
            isWarning: false,
            warningText: '',
        },
    }

    componentDidMount(): void {
        const storedState = localStorage.getItem('state')

        if (storedState) {
            const stateData = JSON.parse(storedState)
            this.setState({
                todos: stateData.todos || [],
                filteredTodos: stateData.filteredTodos || [],
                counter: stateData.counter || 0,
                filter: stateData.filter || FILTER_STATUS.all,
            })
        }
    }

    setData = (state: TodoPageState) => {
        if (!state) return

        const checkedState = {
            todos: state.todos || [],
            filteredTodos: state.filteredTodos || [],
            counter: state.counter || 0,
            filter: state.filter || FILTER_STATUS.all,
        }
        localStorage.setItem('state', JSON.stringify(checkedState))
    }

    updateTodoState = (newState: any) => {
        this.setState(newState, () => this.setData(this.state))
    }

    render() {
        return (
            <StyledContainer>
                <StyledTodoContainer>
                    <TodoHeader />
                    <TodoAddInputBlock
                        todoState={this.state}
                        setTodoState={this.updateTodoState}
                    />
                    <TodoList
                        todoState={this.state}
                        setTodoState={this.updateTodoState}
                    />
                    <TodoFooter
                        todoState={this.state}
                        setTodoState={this.updateTodoState}
                    />
                </StyledTodoContainer>
            </StyledContainer>
        )
    }
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
