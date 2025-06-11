import { styled, TextField } from '@mui/material'
import { FC } from 'react'
import TodoButton from '../../../UI/Buttons/TodoButton'

type ContextEditProps = {
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSaveEdit: () => void
    handleCloseEdit: () => void
}

const ContextEdit: FC<ContextEditProps> = ({
    value,
    onChange,
    handleSaveEdit,
    handleCloseEdit,
}) => {
    return (
        <StyledContextEdit>
            <StyledTextField
                type="text"
                variant="standard"
                size="small"
                value={value}
                onChange={onChange}
            />

            <StyledFunctionBlock>
                <StyledTodoButton className="save" onClick={() => handleSaveEdit()}>
                    Save
                </StyledTodoButton>
                <StyledTodoButton className="close" onClick={() => handleCloseEdit()}>
                    Close
                </StyledTodoButton>
            </StyledFunctionBlock>
        </StyledContextEdit>
    )
}

const StyledContextEdit = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
})

const StyledTextField = styled(TextField)({
    '& .MuiInput-input': {
        paddingBottom: '2px',
    },
})

const StyledFunctionBlock = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
})

const StyledTodoButton = styled(TodoButton)(({ theme }) => ({
    padding: '3px 5px',
    borderRadius: '5px',

    color: theme.palette.text.secondary,

    '&:hover': {
        '&.save': {
            backgroundColor: theme.palette.btn.agree,
            color: theme.palette.btn.agreeSupport,
        },

        '&.close': {
            backgroundColor: theme.palette.btn.disagree,
            color: theme.palette.btn.disagreeSupport,
        },
    },
}))

// const StyledContextEdit = styled.div`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     background-color: transparent;
//     padding: 5px;
//     border-radius: 5px;
//     border: none;
//     cursor: pointer;
//     opacity: 0.75;
//     gap: 6px;
//     transition: 0.2s;

//     &:hover {
//         cursor: pointer;
//         opacity: 1;
//     }
// `

// const StyledEditInput = css`
//     width: 100%;
//     font-size: 18px;
//     background-color: transparent;
//     border: solid 1px ${COLORS.LIGHT_ORANGE};
//     border-radius: 5px;
//     padding: 2px 10px 2px 10px;
//     outline: none;

//     &:hover {
//         border: solid 1px ${COLORS.HARD_ORANGE};
//     }

//     &:focus {
//         border: solid 1px ${COLORS.HARD_ORANGE};
//         outline: none;
//     }
// `

// const CssEditButton = css`
//     background-color: transparent;
//     opacity: 0.75;
//     padding: 5px;
//     border-radius: 5px;
//     transition: 0.2s;
//     cursor: pointer;
//     border: none;

//     &:hover {
//         opacity: 1;
//         color: ${COLORS.BLACK};
//     }
// `

// const StyledSaveButton = css`
//     ${CssEditButton}

//     &:hover {
//         background-color: ${COLORS.LIGHT_GREEN};
//     }
// `
// const StyledCloseButton = css`
//     ${CssEditButton}

//     &:hover {
//         background-color: ${COLORS.LIGHT_ALARM_RED};
//     }
// `

export default ContextEdit
