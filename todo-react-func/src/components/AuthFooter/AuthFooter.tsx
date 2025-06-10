import { styled } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'

type AuthFooterProps = {
    to: string
}

const AuthFooter: FC<AuthFooterProps> = ({ to }) => {
    return to === PATHS.SIGN_IN ? (
        <Span>
            For <Link to={PATHS.SIGN_IN}>login</Link> if you have an account
        </Span>
    ) : (
        <Span>
            For <Link to={PATHS.SIGN_UP}>registration</Link> if you don't have an account
        </Span>
    )
}

const Span = styled('span')(({ theme }) => ({
    color: theme.palette.text.primary,

    '& a': {
        color: theme.palette.text.secondary,

        '&:hover': {
            color: theme.palette.text.support,
        },
    },
}))

export default AuthFooter
