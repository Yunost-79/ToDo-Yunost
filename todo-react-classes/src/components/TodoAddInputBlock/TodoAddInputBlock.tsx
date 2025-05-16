import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { Warning } from '../../globalVariables/typesVariables'
import AddButton from './UI/AddButton'
import AddInput from './UI/AddInput'

type TodoAddInputBlockProps = {
    addTodo: (value: string) => void
    warning: Warning
}

type TodoAddInputBlockState = {
    inputValue: string
}

class TodoAddInputBlock extends Component<TodoAddInputBlockProps, TodoAddInputBlockState> {
    state = {
        inputValue: '',
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        this.setState({ inputValue: value })
    }

    handleAddTodo = (value: string) => {
        const { addTodo } = this.props

        addTodo(value)
        this.setState({ inputValue: '' })
    }

    render() {
        const { warning } = this.props
        const { inputValue } = this.state

        return (
            <StyledTodoAddInputBlock>
                <AddInput
                    customStyles={CssInputItem}
                    warning={warning}
                    placeholder={warning.isWarning ? warning.warningText : 'Enter your todo'}
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
