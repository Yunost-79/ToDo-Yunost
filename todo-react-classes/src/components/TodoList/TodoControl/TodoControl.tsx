import styled from '@emotion/styled'
import { Component } from 'react'
import { ReactComponent as CloseImg } from '../../../assets/close.svg'
import { ReactComponent as EditImg } from '../../../assets/edit.svg'
import ControlButton from '../UI/ControlButton'

type TodoControlProps = {
    id: number
    removeTodo: () => void
    handleTodoEdit: () => void
}

class TodoControl extends Component<TodoControlProps> {
    render() {
        const { id, removeTodo, handleTodoEdit } = this.props
        return (
            <StyledTodoControl>
                <ControlButton status="edit" onClick={handleTodoEdit}>
                    <EditImg />
                </ControlButton>
                <ControlButton status="close" onClick={removeTodo}>
                    <CloseImg />
                </ControlButton>
            </StyledTodoControl>
        )
    }
}

const StyledTodoControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

export default TodoControl
