import styled from '@emotion/styled'
import { FC } from 'react'
import { ReactComponent as CheckImg } from '../../../assets/check.svg'
import { COLORS } from '../../../globalVariables/styledVariables'

type RadioButtonProps = {
    className: string
    onClick: () => void
}

const ChangeStatusRadioButton: FC<RadioButtonProps> = ({ className, onClick, ...props }) => {
    return (
        <StyledRadioButton className={className} onClick={onClick}>
            <CheckImg />
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
