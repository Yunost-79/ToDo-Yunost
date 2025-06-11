import { styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import { horizontalShake } from '../../../helpers/animations'

type ErrorSpanProps = {
    children?: ReactNode
}

const ErrorSpan: FC<ErrorSpanProps> = ({ children, ...props }) => {
    return <StyledSpan {...props}>{children}</StyledSpan>
}

const StyledSpan = styled('span')(({ theme }) => ({
    color: theme.palette.alarm.primary,
    fontSize: '18px',
    animation: `${horizontalShake} 0.25s easy`,
}))

export default ErrorSpan
