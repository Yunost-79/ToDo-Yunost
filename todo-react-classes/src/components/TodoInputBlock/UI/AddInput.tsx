import { css, Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { horizontalShake } from '../../../helpers/animations'

type AddInputProps = {
    type: string
    placeholder?: string
    isWarning?: boolean
    customStyles?: Interpolation<Theme>
}

class AddInput extends Component<AddInputProps> {
    render() {
        const { customStyles, isWarning, ...props } = this.props
        return <Input isWarning={isWarning} customStyles={[customStyles]} {...props} />
    }
}

const Input = styled.input<AddInputProps>`
    ${({ customStyles: cssProp }) => cssProp};
    border: solid 1px ${({ isWarning }) => (isWarning ? COLORS.MEDIUM_ALARM_RED : COLORS.MAIN_GREY)};
    width: 100%;
    padding: 5px;
    transition: 0.25s;
    outline: none;

    ${({ isWarning }) =>
        isWarning &&
        css`
            animation: ${horizontalShake} 0.25s ease-in-out;
        `}

    &:hover {
        border-color: ${({ isWarning }) => (isWarning ? COLORS.HARD_ALARM_RED : COLORS.HARD_GREY)};

        &::placeholder {
            color: ${(isWarning) => (isWarning ? COLORS.HARD_GREY : COLORS.BLACK)};
        }
    }

    &:focus {
        border: solid 1px
            ${({ isWarning }) => (isWarning ? COLORS.HARD_ALARM_RED : COLORS.HARD_GREY)};
    }

    &::placeholder {
        color: ${({ isWarning }) => (isWarning ? COLORS.HARD_ALARM_RED : COLORS.HARD_GREY)};
        transition: 0.25s;
    }
`

export default AddInput
