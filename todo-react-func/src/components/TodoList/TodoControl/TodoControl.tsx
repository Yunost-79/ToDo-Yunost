import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import Button from '../../UI/Buttons/Button'
import CloseIcon from '../../UI/Icons/CloseIcon'
import EditIcon from '../../UI/Icons/EditIcon'

type TodoControlProps = {
    handleTodoIsEdit: () => void
    removeTodo: () => void
}

const TodoControl: FC<TodoControlProps> = ({ handleTodoIsEdit, removeTodo }) => {
    return (
        <StyledTodoControl>
            <Button customStyles={StyledEditButton} onClick={handleTodoIsEdit}>
                <EditIcon color={COLORS.HARD_GREY} />
            </Button>
            <Button customStyles={StyledRemoveButton} onClick={removeTodo}>
                <CloseIcon color={COLORS.HARD_GREY} />
            </Button>
        </StyledTodoControl>
    )
}

const StyledTodoControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

const StyledControlButtons = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    padding: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    opacity: 0.75;
    gap: 6px;
    transition: 0.2s;

    &:hover {
        cursor: pointer;
        opacity: 1;

        svg {
            opacity: 0.9;
        }
    }

    svg {
        width: 20px;
        height: 20px;
        opacity: 0.75;
    }
`

const StyledEditButton = css`
    ${StyledControlButtons}
    &:hover {
        background-color: ${COLORS.LIGHT_GOLD};
    }
`

const StyledRemoveButton = css`
    ${StyledControlButtons}
    &:hover {
        background-color: ${COLORS.LIGHT_ALARM_RED};
        color: ${COLORS.HARD_ALARM_RED};
    }
`

export default TodoControl
