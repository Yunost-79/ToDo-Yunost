import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { COLORS } from '../../../globalVariables/styledVariables'
import Button from '../../UI/Buttons/Button'
import ModalWindow from '../../UI/Modals/ModalWindow'

type FooterRemoveAllModalProps = {
    isOpenModal: boolean
    handleRemoveAllTodos: () => void
    handleCloseModal: () => void
}

const FooterRemoveAllModal: FC<FooterRemoveAllModalProps> = ({
    isOpenModal,
    handleCloseModal,
    handleRemoveAllTodos,
}) => {
    return (
        <ModalWindow
            customStyles={StyledModalWindow}
            isOpen={isOpenModal}
            onClose={handleCloseModal}
        >
            <Span>Are you sure?</Span>
            <ButtonsBlock>
                <Button customStyles={StyledAgreeButton} onClick={handleRemoveAllTodos}>
                    Yes
                </Button>
                <Button customStyles={StyledDisagreeButton} onClick={handleCloseModal}>
                    No
                </Button>
            </ButtonsBlock>
        </ModalWindow>
    )
}

const StyledModalWindow = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    background-color: ${COLORS.WHITE};
    border-radius: 8px;
    max-width: 80%;
    padding: 24px;
`

const Span = styled.span`
    font-size: 20px;
    text-align: center;
    color: ${COLORS.HARD_GREY};
`

const ButtonsBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    width: 100%;
`

const StyledBlockButton = css`
    width: 100px;
    opacity: 0.75;
    background-color: ${COLORS.LIGHT_GREY};
    color: ${COLORS.HARD_GREY};
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    transition: 0.2s;
    cursor: pointer;
`

const StyledAgreeButton = css`
    ${StyledBlockButton}
    &:hover {
        opacity: 0.95;
        background-color: ${COLORS.LIGHT_GREEN};
        color: ${COLORS.BLACK};
    }
`

const StyledDisagreeButton = css`
    ${StyledBlockButton}
    &:hover {
        opacity: 0.95;
        background-color: ${COLORS.LIGHT_ALARM_RED};
        color: ${COLORS.HARD_ALARM_RED};
    }
`

export default FooterRemoveAllModal
