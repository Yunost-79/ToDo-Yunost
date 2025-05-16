import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { FILTER_STATUS } from '../../globalVariables/todoVariables'
import { Todo, TodoState } from '../../globalVariables/typesVariables'
import AddButton from './UI/AddButton'
import AddInput from './UI/AddInput'

type TodoAddInputBlockProps = {
    todoState: TodoState
    setTodoState: (state: TodoState, callback?: () => void) => void
}

type TodoAddInputBlockState = {
    inputValue: string
}

class TodoAddInputBlock extends Component<TodoAddInputBlockProps, TodoAddInputBlockState> {
    state = {
        inputValue: '',
    }

    addTodo = (value: string) => {
        const { todoState, setTodoState } = this.props

        const checkedValue = value.trim()

        if (checkedValue === '') {
            setTodoState({
                ...todoState,
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

        setTodoState({
            ...todoState,
            todos: [...todoState.todos, todo],
            warning: {
                isWarning: false,
            },
        })
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        e.preventDefault()
        this.setState({ inputValue: value })
    }

    handleAddTodo = (value: string) => {
        this.addTodo(value)
        this.setState({ inputValue: '' })
    }

    render() {
        const { todoState } = this.props
        const { inputValue } = this.state

        return (
            <StyledTodoAddInputBlock>
                <AddInput
                    customStyles={CssInputItem}
                    warning={todoState.warning}
                    placeholder={
                        todoState.warning.isWarning
                            ? todoState.warning.warningText
                            : 'Enter your todo'
                    }
                    type="text"
                    value={inputValue}
                    onChange={this.handleChange}
                />
                <AddButton
                    onClick={() => this.handleAddTodo(inputValue)}
                    customStyles={CssInputItem}
                >
                    Add
                </AddButton>
            </StyledTodoAddInputBlock>
        )
    }
}

const CssInputItem = css`
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
`

const StyledTodoAddInputBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

export default TodoAddInputBlock
