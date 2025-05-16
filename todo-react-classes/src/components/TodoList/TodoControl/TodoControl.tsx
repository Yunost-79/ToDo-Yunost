import styled from '@emotion/styled'
import { Component } from 'react'
import { ReactComponent as CloseImg } from '../../../assets/close.svg'
import { ReactComponent as EditImg } from '../../../assets/edit.svg'
import ControlButton from '../UI/ControlButton'

type TodoControlProps = {
    id: number
    removeTodo: (id: number) => void
}

class TodoControl extends Component<TodoControlProps> {
    render() {
        const { id, removeTodo } = this.props
        return (
            <StyledTodoControl>
                <ControlButton status="edit">
                    <EditImg />
                </ControlButton>
                <ControlButton status="close" onClick={() => removeTodo(id)}>
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
