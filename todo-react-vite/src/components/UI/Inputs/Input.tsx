import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    customStyles?: Interpolation<Theme> | Array<Interpolation<Theme>>
}

const Input: FC<InputProps> = ({ customStyles, ...props }) => {
    return <StyledInput customStyles={[customStyles]} {...props} />
}

const StyledInput = styled.input<InputProps>`
    ${(props) => props.customStyles}
`

export default Input
