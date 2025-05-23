import styled from '@emotion/styled'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { COLORS } from '../../globalVariables/styledVariables'

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

const Span = styled.span`
    & a {
        color: ${COLORS.HARD_GREY};
        transition: 0.2s;

        &:hover {
            color: ${COLORS.HARD_ORANGE};
        }
    }
`

export default AuthFooter
