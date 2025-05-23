import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { COLORS } from '../../../../globalVariables/styledVariables'

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    customStyles?: Interpolation<Theme> | Array<Interpolation<Theme>>
    children?: ReactNode
}

const AuthButton: FC<AuthButtonProps> = ({ customStyles, children, ...props }) => {
    return (
        <StyledAuthButton customStyles={[customStyles]} {...props}>
            {children}
        </StyledAuthButton>
    )
}

const StyledAuthButton = styled.button<AuthButtonProps>`
    width: 100%;
    padding: 5px;
    outline: none;
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
    border: none;
    background-color: ${COLORS.LIGHT_ORANGE};
    cursor: pointer;
    transition: 0.25s;

    &:hover {
        background-color: ${COLORS.HARD_ORANGE};
    }

    ${(props) => props.customStyles}
`

export default AuthButton
