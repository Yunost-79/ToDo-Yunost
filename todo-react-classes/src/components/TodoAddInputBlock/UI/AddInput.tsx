import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { Warning } from '../../../globalVariables/typesVariables'
import { horizontalShake } from '../../../helpers/animations'

type AddInputProps = {
    type: string
    placeholder?: string
    warning?: Warning
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    customStyles?: Interpolation<Theme>
}

class AddInput extends Component<AddInputProps> {
    render() {
        const { customStyles, warning, value, onChange, placeholder, ...props } = this.props
        return (
            <Input
                value={value}
                onChange={onChange}
                className={warning?.isWarning ? 'warning' : ''}
                placeholder={placeholder}
                customStyles={[customStyles]}
                {...props}
            />
        )
    }
}

const Input = styled.input<AddInputProps>`
    ${({ customStyles: cssProp }) => cssProp};
    border: solid 2px ${COLORS.MAIN_GREY};
    width: 100%;
    padding: 5px;
    transition: 0.25s;
    outline: none;

    &:hover {
        border-color: ${COLORS.HARD_GREY};

        &::placeholder {
            color: ${COLORS.BLACK};
        }
    }

    &:focus {
        border: solid 2px ${COLORS.HARD_GREY};
    }

    &::placeholder {
        color: ${COLORS.HARD_GREY};
        transition: 0.25s;
    }

    &.warning {
        border: solid 2px ${COLORS.MEDIUM_ALARM_RED};
        animation: ${horizontalShake} 0.25s ease-in-out;

        &::placeholder {
            color: ${COLORS.MEDIUM_ALARM_RED};
        }

        &:hover {
            border-color: ${COLORS.HARD_ALARM_RED};

            &::placeholder {
                color: ${COLORS.HARD_GREY};
            }
        }

        &:focus {
            border: solid 2px ${COLORS.HARD_ALARM_RED};
        }
    }
`

export default AddInput
