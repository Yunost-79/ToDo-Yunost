import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { styled } from '@mui/material'
import { FC } from 'react'
import TodoButton from '../../UI/Buttons/TodoButton'

type TodoControlProps = {
    handleTodoIsEdit: () => void
    removeTodo: () => void
}

const TodoControl: FC<TodoControlProps> = ({ handleTodoIsEdit, removeTodo }) => {
    return (
        <StyledTodoControl>
            <StyledTodoButton className="edit" onClick={() => handleTodoIsEdit()}>
                <EditOutlinedIcon />
            </StyledTodoButton>

            <StyledTodoButton className="remove" onClick={() => removeTodo()}>
                <CloseOutlinedIcon />
            </StyledTodoButton>
        </StyledTodoControl>
    )
}

const StyledTodoControl = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
})

const StyledTodoButton = styled(TodoButton)(({ theme }) => ({
    borderRadius: '5px',
    padding: '2px',

    '& svg': {
        color: theme.palette.btn.helper,
        height: '25px',
    },

    '&:hover': {
        '&.edit': {
            backgroundColor: theme.palette.btn.editSupport,

            '& svg': {
                color: theme.palette.btn.edit,
            },
        },

        '&.remove': {
            backgroundColor: theme.palette.btn.disagreeSupport,

            '& svg': {
                color: theme.palette.btn.disagree,
            },
        },
    },
}))

export default TodoControl
