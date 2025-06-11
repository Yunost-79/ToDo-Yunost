import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

type TodoButtonProps = {
    onClick?: () => void
    className?: string
    disabled?: boolean
    children?: ReactNode
}

const TodoButton: FC<TodoButtonProps> = ({ onClick, className, disabled, children, ...props }) => {
    return (
        <Button onClick={onClick} className={className} disabled={disabled} {...props}>
            {children}
        </Button>
    )
}

export default TodoButton
