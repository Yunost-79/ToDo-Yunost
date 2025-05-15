import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Component, ReactElement } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

type ControlButtonProps = {
    children?: ReactElement | string
    status?: string
    customStyles?: Interpolation<Theme>
}

class ControlButton extends Component<ControlButtonProps> {
    render() {
        const { customStyles, status, children, ...props } = this.props

        return (
            <Button className={status} customStyles={[customStyles]} {...props}>
                {children}
            </Button>
        )
    }
}

const Button = styled.button<ControlButtonProps>`
    ${({ customStyles: cssProp }) => cssProp};

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    padding: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    opacity: 0.75;
    gap: 6px;
    transition: 0.2s;

    &:hover {
        cursor: pointer;
        opacity: 1;

        svg {
            opacity: 0.9;
        }
    }

    &.edit:hover {
        background-color: ${COLORS.LIGHT_GOLD};
    }

    &.close:hover {
        background-color: ${COLORS.LIGHT_ALARM_RED};
    }

    svg {
        width: 20px;
        height: 20px;
        opacity: 0.75;
    }
`

export default ControlButton
