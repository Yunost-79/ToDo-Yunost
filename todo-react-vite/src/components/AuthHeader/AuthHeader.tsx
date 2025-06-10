import { styled, Typography } from '@mui/material'
import { FC } from 'react'

type AuthHeaderProps = {
    title: string
}

const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
    return <StyledTypography variant="h1">{title}</StyledTypography>
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '32px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 600,
}))

export default AuthHeader
