import AddIcon from '@mui/icons-material/Add'
import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type AddTodoButtonProps = {
    onClick: () => void
    children?: ReactNode
}

const AddTodoButton: FC<AddTodoButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <StyledAddTodoButton onClick={onClick} {...props}>
            <AddIcon />
        </StyledAddTodoButton>
    )
}

const StyledAddTodoButton = styled(Button)(({ theme }) => ({
    padding: '4px',
    borderRadius: '5px',
    color: theme.palette.btn.auth,

    '& svg': {
        width: 40,
        height: 40,
    },

    '&:hover': {
        opacity: 0.9,

        '& svg': {
            color: theme.palette.btn.authSupport,
        },
    },
}))

export default AddTodoButton
