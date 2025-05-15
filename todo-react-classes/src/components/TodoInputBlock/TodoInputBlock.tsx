import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import AddButton from './UI/AddButton'
import AddInput from './UI/AddInput'

type TodoInputBlockState = {
    isWarning: boolean
}

class TodoInputBlock extends Component {
    state: TodoInputBlockState = {
        isWarning: false,
    }

    render() {
        return (
            <StyledTodoInputBlock>
                <AddInput
                    customStyles={CssInputItem}
                    isWarning={this.state.isWarning}
                    placeholder={this.state.isWarning ? 'Input is empty' : 'Enter your todo'}
                    type="text"
                />
                <AddButton customStyles={CssInputItem}>Add</AddButton>
            </StyledTodoInputBlock>
        )
    }
}

const CssInputItem = css`
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
`

const StyledTodoInputBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

export default TodoInputBlock
