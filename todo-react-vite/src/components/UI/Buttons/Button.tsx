import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    customStyles?: Interpolation<Theme> | Array<Interpolation<Theme>>
    children?: ReactNode
}

const Button: FC<ButtonProps> = ({ customStyles, children, ...props }) => {
    return (
        <StyledButton customStyles={[customStyles]} {...props}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<ButtonProps>`
    padding: 5px;
    outline: none;
    border-radius: 5px;
    white-space: nowrap;
    border: solid 2px ${COLORS.HARD_GREY};
    transition: 0.25s;

    background-color: transparent;
    cursor: pointer;

    &:hover {
        border-color: transparent;
        background-color: ${COLORS.HARD_ORANGE};
    }

    ${(props) => props.customStyles}
`

export default Button
