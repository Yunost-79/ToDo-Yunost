import styled from '@emotion/styled'
import { FC } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import GhostIcon from '../../UI/Icons/GhostIcon'

type EmptyBlockProps = {
    title?: string
}

const EmptyBlock: FC<EmptyBlockProps> = ({ title }) => {
    return (
        <StyledEmptyBlock>
            <GhostIcon color={COLORS.HARD_GREY} />
            <Title>{title}</Title>
        </StyledEmptyBlock>
    )
}

const StyledEmptyBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & svg {
        width: 80px;
        height: 80px;
        opacity: 0.75;
    }
`

const Title = styled.h3`
    color: ${COLORS.HARD_GREY};
`

export default EmptyBlock
