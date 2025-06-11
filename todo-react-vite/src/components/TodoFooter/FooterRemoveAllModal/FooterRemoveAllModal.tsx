import { styled } from '@mui/material'
import { FC } from 'react'
import TodoButton from '../../UI/Buttons/TodoButton'
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
        <StyledModalWindow
            open={isOpenModal}
            handleClose={handleCloseModal}
        >
            <StyledSpan>Are you sure?</StyledSpan>
            <ButtonsBlock>
                <StyledTodoButton className="agree" onClick={handleRemoveAllTodos}>
                    Yes
                </StyledTodoButton>
                <StyledTodoButton className="disagree" onClick={handleCloseModal}>
                    No
                </StyledTodoButton>
            </ButtonsBlock>
        </StyledModalWindow>
    )
}

const StyledModalWindow = styled(ModalWindow)({
    '& .MuiBox-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
    },
})

const StyledSpan = styled('span')({
    fontSize: '20px',
    textAlign: 'center',
})

const ButtonsBlock = styled('div')({
    display: 'flex',
    gap: '10px',
})

const StyledTodoButton = styled(TodoButton)(({ theme }) => ({
    padding: '5px 35px',
    borderRadius: '8px',

    backgroundColor: theme.palette.btn.support,

    '&:hover': {
        '&.agree': {
            backgroundColor: theme.palette.btn.agree,
            color: theme.palette.btn.agreeSupport,
        },

        '&.disagree': {
            backgroundColor: theme.palette.btn.disagree,
            color: theme.palette.btn.disagreeSupport,
        },
    },
}))

export default FooterRemoveAllModal
