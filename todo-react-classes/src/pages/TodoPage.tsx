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
    counter: number
    filter: FilterStatus
    warning: Warning
}

class TodoPage extends Component<{}, TodoPageState> {
    state: TodoPageState = {
        todos: [],
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
                counter: stateData.counter || 0,
                filter: stateData.filter || FILTER_STATUS.all,
            })
        }
    }

    setData = (state: TodoPageState) => {
        if (!state) return

        const checkedState = {
            todos: state.todos || [],
            counter: state.counter || 0,
            filter: state.filter || FILTER_STATUS.all,
        }
        localStorage.setItem('state', JSON.stringify(checkedState))
    }

    addTodo = (value: string) => {
        const checkedValue = value.trim()

        if (checkedValue === '') {
            this.setState({
                warning: {
                    isWarning: true,
                    warningText: 'Input is empty',
                },
            })
            return
        }

        const todo: Todo = {
            id: Date.now(),
            value: checkedValue,
            isEdit: false,
            status: FILTER_STATUS.active,
            dateOfCreation: Date.now(),
        }

        this.setState(
            {
                todos: [...this.state.todos, todo],
                counter: this.state.todos.length,
                warning: {
                    isWarning: false,
                },
            },
            () => this.setData(this.state),
        )
    }

    removeTodo = (id: number) => {
        const filteredTodos = this.state.todos.filter((todo) => todo.id !== id)
        this.setState(
            {
                todos: filteredTodos,
            },
            () => this.setData(this.state),
        )
    }

    toggleTodoStatus = (id: number) => {
        const toggledTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status:
                        todo.status === FILTER_STATUS.active
                            ? FILTER_STATUS.completed
                            : FILTER_STATUS.active,
                }
            }
            return todo
        })

        this.setState(
            {
                todos: toggledTodos,
            },
            () => this.setData(this.state),
        )
    }

    render() {
        return (
            <StyledContainer>
                <StyledTodoContainer>
                    <TodoHeader />
                    <TodoAddInputBlock addTodo={this.addTodo} warning={this.state.warning} />
                    <TodoList
                        todoState={this.state}
                        toggleTodoStatus={this.toggleTodoStatus}
                        removeTodo={this.removeTodo}
                    />
                    <TodoFooter />
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
