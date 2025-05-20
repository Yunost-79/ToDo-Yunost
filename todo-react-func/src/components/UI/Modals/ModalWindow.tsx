import { css, Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, ReactNode } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'

type ModalWindowProps = {
    customStyles?: Interpolation<Theme>
    isOpen?: boolean
    onClose?: () => void
    children?: ReactNode
}

const ModalWindow: FC<ModalWindowProps> = ({ customStyles, onClose, children, ...props }) => {
    return (
        <StyledModalWindow {...props}>
            <StyledModalOverlay onClick={onClose} />
            <StyledModalContent customStyles={customStyles}>{children}</StyledModalContent>
        </StyledModalWindow>
    )
}

const StyledModalWindow = styled.div<ModalWindowProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    transition: 0.3s all ease-in-out;
    ${({ isOpen }) =>
        isOpen
            ? css`
                  display: flex;
                  opacity: 1;
                  pointer-events: auto;
              `
            : css`
                  opacity: 0;
                  pointer-events: none;
              `}
`

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${COLORS.BLACK};
    opacity: 0.2;
`

const StyledModalContent = styled.div<ModalWindowProps>`
    z-index: 100;
    // background-color: ${COLORS.WHITE};
    // border-radius: 8px;

    // // width: 100%;
    // padding: 24px;
    max-height: 100%;
    overflow-y: auto;
    box-shadow: -1px 2px 500px 10px ${COLORS.HARD_GREY};

    @media (max-width: 576px) {
        max-width: 80%;
    }

    ${(props) => props.customStyles}
`

export default ModalWindow
