import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { FC } from 'react'

type MainLoaderProps = {
    customStyles?: Interpolation<Theme> | Array<Interpolation<Theme>>
}

const MainLoader: FC<MainLoaderProps> = ({ customStyles }) => {
    return <StyledMainLoader customStyles={[customStyles]}></StyledMainLoader>
}

const StyledMainLoader = styled.div<MainLoaderProps>`
    aspect-ratio: 1;
    border-radius: 50%;
    border: 5px solid lightblue;
    border-right-color: orange;
    animation: l2 1s infinite linear;

    @keyframes l2 {
        to {
            transform: rotate(1turn);
        }
    }

    ${(props) => props.customStyles}
`

export default MainLoader
