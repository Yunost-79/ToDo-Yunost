import LogoutIcon from '@mui/icons-material/Logout'
import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type LogoutButtonProps = {
    onClick: () => void
    children?: ReactNode
}

const LogoutButton: FC<LogoutButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <StyledLogoutButton onClick={onClick} {...props}>
            <LogoutIcon />
        </StyledLogoutButton>
    )
}

const StyledLogoutButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '5px',
    borderRadius: '50%',
    color: theme.palette.btn.main,

    '&:hover': {
        backgroundColor: theme.palette.btn.support,
        opacity: 0.9,

        '& svg': {
            color: theme.palette.btn.authSupport,
        },
    },
}))

export default LogoutButton
