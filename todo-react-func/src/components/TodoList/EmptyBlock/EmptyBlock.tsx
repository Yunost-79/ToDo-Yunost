import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'

type EmptyElement = {
    status: FilterStatus
    title: string
    img: React.FC<React.SVGProps<SVGSVGElement>>
}

type EmptyBlockProps = {
    emptyBlock: EmptyElement
}

class EmptyBlock extends Component<EmptyBlockProps> {
    render() {
        const { emptyBlock } = this.props
        return (
            <StyledEmptyBlock>
                <emptyBlock.img />
                <Title>{emptyBlock.title}</Title>
            </StyledEmptyBlock>
        )
    }
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
