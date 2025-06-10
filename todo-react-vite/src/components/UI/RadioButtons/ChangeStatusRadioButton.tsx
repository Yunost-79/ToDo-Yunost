import styled from '@emotion/styled'
import { ButtonHTMLAttributes, FC } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import CheckIcon from '../Icons/CheckIcon'

type RadioButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const ChangeStatusRadioButton: FC<RadioButtonProps> = ({ ...props }) => {
    return (
        <StyledRadioButton {...props}>
            <CheckIcon color={COLORS.HARD_GREY} />
        </StyledRadioButton>
    )
}

const StyledRadioButton = styled.button`
    position: relative;
    background-color: transparent;
    border: solid 1px ${COLORS.LIGHT_ORANGE};
    border-radius: 5px;
    width: 22px;
    height: 22px;
    cursor: pointer;

    &:hover {
        border: solid 1px ${COLORS.HARD_ORANGE};

        svg {
            opacity: 0.75;
        }
    }

    svg {
        position: absolute;
        top: -1px;
        left: 0px;
        width: 20px;
        height: 20px;
        opacity: 0;
        transition: 0.2s;
    }

    &.completed {
        svg {
            opacity: 0.75;
        }

        &:hover {
            svg {
                opacity: 1;
            }
        }
    }
`

export default ChangeStatusRadioButton
