import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type AuthButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    type: 'submit'
    disabled: boolean
    children?: ReactNode
}

const AuthButton: FC<AuthButtonProps> = ({ onClick, type, disabled, children, ...props }) => {
    return (
        <StyledAuthButton
            onClick={onClick}
            type={type}
            tabIndex={0}
            disabled={disabled}
            {...props}
        >
            {children}
        </StyledAuthButton>
    )
}

const StyledAuthButton = styled(Button)(({ theme }) => ({
    width: '100%',
    padding: '5px',
    borderRadius: '5px',
    fontSize: '20px',
    whiteSpace: 'nowrap',
    border: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.btn.auth,

    '&:hover': {
        backgroundColor: theme.palette.btn.authSupport,
    },
}))

export default AuthButton
