import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, ReactElement } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

type AddButton = {
    children?: ReactElement | string
    onClick?: () => void
    customStyles?: Interpolation<Theme>
}

const AddButton: FC<AddButton> = ({ customStyles, onClick, children, ...props }) => {
    return (
        <Button customStyles={[customStyles]} onClick={onClick} {...props}>
            {children}
        </Button>
    )
}

const Button = styled.button<AddButton>`
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
