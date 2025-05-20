import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

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
    ${(props) => props.customStyles}
`

export default Button
