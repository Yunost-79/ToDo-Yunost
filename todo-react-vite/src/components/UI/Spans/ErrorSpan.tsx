import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { FC, ReactNode } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { horizontalShake } from '../../../helpers/animations'

type ErrorSpanProps = {
    customStyles?: Interpolation<Theme> | Array<Interpolation<Theme>>
    children?: ReactNode
}

const ErrorSpan: FC<ErrorSpanProps> = ({ customStyles, children, ...props }) => {
    return (
        <Span customStyles={[customStyles]} {...props}>
            {children}
        </Span>
    )
}

const Span = styled.span<ErrorSpanProps>`
    color: ${COLORS.HARD_ALARM_RED};
    font-size: 18px;
    animation: ${horizontalShake} 0.25s ease-in-out;

    ${(props) => props.customStyles}
`

export default ErrorSpan
