import styled from '@emotion/styled'
import { Component } from 'react'
import { ReactComponent as CloseImg } from '../../../assets/close.svg'
import { ReactComponent as EditImg } from '../../../assets/edit.svg'
import ControlButton from '../UI/ControlButton'

class TodoControl extends Component {
    render() {
        return (
            <StyledTodoControl>
                <ControlButton status="edit">
                    <EditImg />
                </ControlButton>
                <ControlButton status="close">
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
