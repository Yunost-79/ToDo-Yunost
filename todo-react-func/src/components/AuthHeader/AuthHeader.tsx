import styled from '@emotion/styled'
import { FC } from 'react'

type AuthHeaderProps = {
    title: string
}

const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
    return <H1>{title}</H1>
}

const H1 = styled.h1`
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 600;
`
export default AuthHeader
