import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Component, ReactElement } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

interface AddInputState {}

type AddButtonProps = {
    children?: ReactElement | string
    onClick: () => void
    customStyles?: Interpolation<Theme>
}

class AddButton extends Component<AddButtonProps, AddInputState> {
    render() {
        const { onClick, customStyles, children, ...props } = this.props

        return (
            <Button onClick={onClick} customStyles={[customStyles]} {...props}>
                {children}
            </Button>
        )
    }
}

const Button = styled.button<AddButtonProps>`
    ${({ customStyles: cssProp }) => cssProp};
    background-color: ${COLORS.LIGHT_ORANGE};
    padding: 7px;
    cursor: pointer;
    transition: 0.2s;
    border: none;

    &:hover {
        background-color: ${COLORS.HARD_ORANGE};
    }
`

export default AddButton
