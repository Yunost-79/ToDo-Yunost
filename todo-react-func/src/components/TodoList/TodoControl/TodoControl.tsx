import styled from '@emotion/styled'
import { FC } from 'react'
import { ReactComponent as CloseImg } from '../../../assets/close.svg'
import { ReactComponent as EditImg } from '../../../assets/edit.svg'
import ControlButton from '../UI/ControlButton'

type TodoControlProps = {
    handleTodoIsEdit: () => void
    removeTodo: () => void
}

const TodoControl: FC<TodoControlProps> = ({ handleTodoIsEdit, removeTodo }) => {
    return (
        <StyledTodoControl>
            <ControlButton status="edit" onClick={handleTodoIsEdit}>
                <EditImg />
            </ControlButton>
            <ControlButton status="close" onClick={removeTodo}>
                <CloseImg />
            </ControlButton>
        </StyledTodoControl>
    )
}

const StyledTodoControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

export default TodoControl
