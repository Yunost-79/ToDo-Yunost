import styled from '@emotion/styled'
import { FC } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

type ClearAllTodosButtonProps = {
    onClick?: () => void
}

const ClearAllTodosButton: FC<ClearAllTodosButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick}>Clear all todos</Button>
}

const Button = styled.button`
    opacity: 0.75;
    background-color: ${COLORS.LIGHT_GREY};
    color: ${COLORS.HARD_GREY};
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        opacity: 0.95;
        background-color: ${COLORS.LIGHT_ALARM_RED};
        color: ${COLORS.HARD_ALARM_RED};
    }
`

export default ClearAllTodosButton
