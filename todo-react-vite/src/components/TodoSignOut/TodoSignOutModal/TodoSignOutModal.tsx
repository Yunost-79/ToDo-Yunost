import { FC } from 'react'
import ModalWindow from '../../UI/Modals/ModalWindow'
import { styled } from '@mui/material'
import TodoButton from '../../UI/Buttons/TodoButton'

type TodoSignOutModalProps = {
    isOpenModal: boolean
    handleCloseModal: () => void
    handleSignOut: () => void
}

const TodoSignOutModal: FC<TodoSignOutModalProps> = ({
    isOpenModal,
    handleCloseModal,
    handleSignOut,
}) => {
    return (
        <StyledModalWindow open={isOpenModal} handleClose={handleCloseModal}>
            <StyledSpan>Sign out?</StyledSpan>
            <ButtonsBlock>
                <StyledTodoButton className="agree" onClick={handleSignOut}>
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

// const StyledModalWindow = css`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 24px;

//     background-color: ${COLORS.WHITE};
//     border-radius: 8px;
//     max-width: 80%;
//     padding: 24px;
// `

// const Span = styled.span`
//     font-size: 20px;
//     text-align: center;
//     color: ${COLORS.HARD_GREY};
// `

// const ButtonsBlock = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 12px;

//     width: 100%;
// `

// const StyledBlockButton = css`
//     width: 100px;
//     opacity: 0.75;
//     background-color: ${COLORS.LIGHT_GREY};
//     color: ${COLORS.HARD_GREY};
//     padding: 7px;
//     font-size: 14px;
//     border-radius: 5px;
//     border: none;
//     transition: 0.2s;
//     cursor: pointer;
// `

// const StyledAgreeButton = css`
//     ${StyledBlockButton}
//     &:hover {
//         opacity: 0.95;
//         background-color: ${COLORS.LIGHT_GREEN};
//         color: ${COLORS.BLACK};
//     }
// `

// const StyledDisagreeButton = css`
//     ${StyledBlockButton}
//     &:hover {
//         opacity: 0.95;
//         background-color: ${COLORS.LIGHT_ALARM_RED};
//         color: ${COLORS.HARD_ALARM_RED};
//     }
// `

export default TodoSignOutModal
